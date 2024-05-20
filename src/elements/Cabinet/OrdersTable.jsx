
import actionsButton from '../../assets/actionsButton.png'

import './CabinetOrders.css'
import closeIcon from '../../assets/registerCloseIcon.png'
import CabinetOrder from './CabinetOrder'
import { useEffect, useState } from 'react'
const OrdersTable = ({orders, setOrders, setLoading}) => {
    const [showOrder, setShowOrder] = useState(false)
    const [currentOrder, setCurrentOrder] = useState({})
    console.log('orders table rendered')
    function openOrderWindow(order){
        setCurrentOrder(order)
        setShowOrder(true)
    }
    useEffect(() => {
        if(currentOrder && showOrder){
            setCurrentOrder(orders.filter(o => o.id === currentOrder.id))
            setShowOrder(true)
        }
    }, [orders])
   
    return(
        <table className="orders">
            <CabinetOrder showOrder={showOrder} setShowOrder={setShowOrder} order={currentOrder} setOrder={setCurrentOrder} setOrders={setOrders} setLoading={setLoading}/>
            <tr>
                <th>ID(№)</th>
                <th>Дата отримання</th>
                <th>Ім'я</th>
                <th>Телефон</th>
                <th>Сума</th>
                <th>Адреса</th>
                <th>Дата доставки</th>
                <th>Статус</th>
                <th>Дії</th>
            </tr>
            {orders.map(order => {
                return <tr>
                    
                    <td>{order.id} </td>
                    <td>{order.dateReceived}</td>
                    <td>{order.name}</td>
                    <td>{order.phone}</td>
                    <td>{calculateTotalPrice(order)}</td>
                    <td>{order.address}</td>
                    <td>{prettyPrintDate(order.dateTimeToMake)}</td>
                    <td>
                        <OrderState order={order}/>
                    </td>
                    <td>
                        <button onClick={() => openOrderWindow(order)} className="orders__actions-button">
                            <img src={actionsButton}></img>
                            
                        </button>
                    </td>
                </tr>
            })}
        </table>
    )

    function OrderState({order}){
        let clsName = ''
        let txt = ''
        switch(order.state){
            case "NEW":
                clsName = 'orders__order-state_new'
                txt = 'новий'
                break;
            case "CONFIRMED":
                clsName = 'orders__order-sate_submitted'
                txt = 'підтверджено'
                break;
            case "COOKING":
                clsName = 'orders__order-state_cooking'
                txt = 'готуємо'
                break;
            case "READY":
                clsName = 'orders__order-state_ready'
                txt = 'приготували'
                break;
            case "DELIVERING":
                clsName = 'orders__order-state_delivering'
                txt = 'відправлений'
                break;
            case "DELIVERED":
                clsName = 'orders__order-state_delivered'
                txt = 'доставлений'
                break;
            case "CANCELED":
                clsName = 'orders__order-state_canceled'
                txt = 'відмінений'
                break;
        }
        return <div className={'orders__order-state ' + clsName}>{txt}</div>
        
    }

    function OrdersActions(order){
        if(order.state === "NEW"){
            
        }
        return(
            <div className='orders__actions'>
                <div className='orders__actions-top'>
                    <div className='orders__actions-close'>
                        <img src={closeIcon}></img>
                    </div>
                </div>
                {order.sate === "NEW" && 
                    <button className='orders__actions-confirm-button'>Підтвердити</button>
                }
                {order.state === "SUBMITTED" && 
                    <button className='orders__actions-confirm-button'>Почати готувати</button>
                }
                {(order.state === "COOKING" || order.state === "SUBMITTED") && 
                    <button className='orders__actions-confirm-button'>Готов до відправки</button>
                }
                {(order.state === "READY" || order.state === "COOKING" || order.state === "SUBMITTED") && 
                    <button className='orders__actions-confirm-button'>Відправлено</button>
                }
                {(order.state === "DELIVERING" || order.state === "READY" || order.state === "COOKING" || order.state === "SUBMITTED") && 
                    <button className='orders__actions-confirm-button'>Доставлено</button>
                }
            </div>
        )
    }


    function calculateTotalPrice(order){
        let price = 0
        order.products.forEach(product => {
            price += product.dish.price * product.dishNumber
        })
        return price
    }
    function prettyPrintDate(d){
        const date = new Date(d)
        const month = date.getMonth() + 1
        const monthTxt = month < 10 ? '0' + month : month
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        return day + '.' + monthTxt + '.' + date.getFullYear() + ' - ' + hour + ':' + minute
    }
}

export default OrdersTable