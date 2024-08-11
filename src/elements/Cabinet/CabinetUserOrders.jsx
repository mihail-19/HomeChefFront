import { useEffect, useState } from "react"
import OrderState from "../utility/OrderState"
import { getUserOrders } from "../../services/OrderService"
import ModalCenter from "../utility/ModalCenter"
import imagesUrl from "../../imagesUrl"



const CabinetUserOrders = () => {
    const [orders, setOrders] = useState([])
    const [showOrder, setShowOrder] = useState(false)
    const [orderToShow, setOrderToShow] = useState(null)

    useEffect(() => {
        loadOrders()
    }, [])
    async function loadOrders(){
        const {data} = await getUserOrders()
        setOrders(data)
    }

    function openOrderWindow(order){
        setOrderToShow(order)
        setShowOrder(true)
    }

    const orderListStyle = {
        display: "flex",
        flexWrap: "wrap",
        fontFamily: "Montserrat",
        gap: "10px"
    }
    return(
        <div className="user-orders">
        <ModalCenter isActive={showOrder} setIsActive={setShowOrder} content={orderDetailsWindow()}/>
            <h1>Активні замовлення</h1>
            <div style={orderListStyle} className="user-order-list">
                {orders.map(order => {
                    return userOrder(order)
                })}
            </div>
        </div>
    )

    function userOrder(order){
        const orderStyle = {
            width: "300px",
            border: "1px solid gray",
            borderRadius: "10px"
        }
        return (
            <div style={orderStyle} className="user-order">
                
                <div style={{
                    display: "flex", 
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "5px"
                }}>
                    <h3 style={{margin: "0 5px", fontSize: "22px"}}>#{order.id} </h3>
                    <div>{prettyPrintDate(order.creationDate)}</div>
                </div>
                <OrderState order={order}/>
                <ul style={{margin: "10px", paddingInlineStart:"0px", height: "140px", listStyle: "inside", display:"block"}}>
                    {order.products.map(product => {
                        return <li style={{padding: "2px"}}>{product.dish.name}: {product.dishNumber} шт.</li>
                    })}
                </ul>
                <div style={{display: "flex", justifyContent: "flex-end", margin: "0 10px 10px 10px"}}>
                    <button onClick={() => openOrderWindow(order)} style={{
                        backgroundColor: "black",
                        color: "white",
                        padding: "7px 15px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontSize: "16px"
                    }}>
                        Деталі
                    </button>
                </div>
            </div>
        )
         
    }

    function orderDetailsWindow(){
        if(!orderToShow){
            return null
        }
        return(
            <div style={{
                    width: "340px",
                    padding: "5px",
                    fontFamily: "Montserrat",
                    fontSize: "16px"
                }}>
                <h3 style={{margin: "5px 5px 10px 5px"}}>Замовлення № {orderToShow.id}</h3>
                <OrderState order={orderToShow}/>
                {orderToShow.products.map(p => {
                    return (
                        <div style={{display: "flex", gap: "10px", margin: "10px 0"}}>
                            <div style={{width: "140px", height: "77px"}}>
                                <img src={imagesUrl + p.dish.imageURL} style={{width: "100%", height: "100%", objectFit: "cover"}}></img>
                            </div>
                            <div>
                                <div><b>{p.dish.name}</b></div>
                                <div style={{fontStyle: "italic", fontSize: "14px"}}>К-ть: {p.dishNumber}</div>
                                <div>Ціна: {p.dish.price}грн</div>
                            </div>
                        </div>
                    )
                })}
                <div>Разом: <b>{orderTotalPrice(orderToShow)} грн</b></div>
            </div>
        )
    }


   

    function orderTotalPrice(order){
        if(!order || !order.products){
            return 0
        }
        var res = 0
        order.products.forEach(p => {
            res += p.dish.price * p.dishNumber
        })
        return res
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

export default CabinetUserOrders