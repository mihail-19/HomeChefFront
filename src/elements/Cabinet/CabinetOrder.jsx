import ModalCenter from "../utility/ModalCenter"
import defaultDishImg from '../../assets/dishImg.png'
import imageUrl from '../../imagesUrl'
import './CabinetOrders.css'
import { Link } from "react-router-dom"
import OrderState from "../OrderState"
import {promoteOrder, getChefOrders, cancelOrder} from '../../services/OrderService'
import prettyPrintDate from '../../elements/utility/prettyPrintDate'
import { useEffect, useState } from "react"
const CabinetOrder = ({showOrder, setShowOrder, order, setOrder, loadOrders, setLoading}) => {
    const [currentOrder, setCurrentOrder] = useState(order)
    if(!order ){
        return <></>
    }
    useEffect(() => {
        setCurrentOrder(order)
    }, [order])
    useEffect(() => {
        if(!showOrder){
            console.log('on close')
            loadOrders()
        }
    }, [showOrder])

    // async function loadOrders(){
    //     setLoading(true)
    //     const {data} = await getChefOrders()
    //     setOrders(data)
    //     setLoading(false)
    // }

    function showSelfPickup(hasSelfPickup){
        return hasSelfPickup ? 'так' : 'ні'
    }
    return <ModalCenter isActive={showOrder} setIsActive={setShowOrder} content={windowContent()}/>

    function windowContent(){
       return <div className="cabinet-order">
                <h1>Замовлення № {currentOrder.id}</h1>
                <div className="cabinet-order__order-date">{prettyPrintDate(currentOrder.creationDate)}</div>
                <div className="cabinet-order__state">
                    <OrderState state={currentOrder.state}/>
                </div>
                <div className="cabinet-order__controls">
                    {createButtons()}
                    <button className="cabinet-order__cancel-button" onClick={() => sendCancelOrder(currentOrder.id)}>Відмінити</button>
                </div>
                <h3>Вартість: {calculatePrice(currentOrder.products)}₴</h3>
                <table>
                    <tr>
                        <td>Замовник</td>
                        <td>{currentOrder.name}</td>
                    </tr>
                    <tr>
                        <td>Телефон</td>
                        <td>{currentOrder.phone}</td>
                    </tr>
                    <tr>
                        <td>Термін виконання</td>
                        <td>{prettyPrintDate(currentOrder.dateTimeToMake)}</td>
                    </tr>
                    <tr>
                        <td>Самовивіз</td>
                        <td>{showSelfPickup(currentOrder.selfPickup)}</td>
                    </tr>
                </table>
                <OrderProducts products={currentOrder.products}/>
            </div>
    }

    function OrderProducts({products}){
        if(!products){
            return <></>
        }
        return (
            <div className="cabinet-order__products">
                <h3>Страви:</h3>
                {products.map(product => {
                   return <div className="cabinet-order__product">
                        <Link to={"/dish/" + product.dish.id} className="cabinet-order__dish-img">
                            <img src={product.dish.imageURL ? imageUrl + product.dish.imageURL : defaultDishImg}></img>
                        </Link>
                        <div className="cabinet-order__product-info">
                            <Link to={"/dish/" + product.dish.id} className='cabinet-order__dish-name'>{product.dish.name}</Link>
                            <div>Ціна: {product.dish.price}₴</div>
                            <div>К-ть: {product.dishNumber}</div>
                            <div>Вартість: {product.dish.price * product.dishNumber}</div>
                        </div>
                    </div>
                })}
            </div>
        )
    }

    function calculatePrice(products){
        if(!products){
            return 0
        }
        let price = 0
        products.forEach(product => {
            price += product.dish.price * product.dishNumber
        })
        return price
    }

    async function sendPromoteOrder(){
        setLoading(true)
        const {data} = await promoteOrder(currentOrder)
     //   loadOrders()
        setCurrentOrder(data)
        console.log(data)
        setLoading(false)
    }

    async function sendCancelOrder(id){
        setLoading(true)
        try{
            const {data} = await cancelOrder(id)
            setCurrentOrder(data)
        } finally{
            setLoading(false)
        }
        
    }

    function createButtons(){
        switch(currentOrder.state){
            case "NEW":
                return <button className="cabinet-order__action-button" onClick={sendPromoteOrder}>Підтвердити</button>
            case "CONFIRMED":
                return <button className="cabinet-order__action-button" onClick={sendPromoteOrder}>Почати готувати</button>
            case "COOKING":
                return <button className="cabinet-order__action-button" onClick={sendPromoteOrder}>Підтвердити готовність</button>
            case "READY":
                return <button className="cabinet-order__action-button" onClick={sendPromoteOrder}>Віддати кур'єру</button>
            case "DELIVERING":
                return <button className="cabinet-order__action-button" onClick={sendPromoteOrder}>Віддано у доставку</button>
            case "DELIVERED":
                return <button className="cabinet-order__action-button" onClick={sendPromoteOrder}>Доставлено</button>
        }
    }
}

export default CabinetOrder