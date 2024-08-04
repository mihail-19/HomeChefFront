import { useEffect, useState } from "react"
import OrderState from "../utility/OrderState"
import { getUserOrders } from "../../services/OrderService"



const CabinetUserOrders = () => {
    const [orders, setOrders] = useState([])
    const [showOrder, setShoworder] = useState(false)

    useEffect(() => {
        loadOrders()
    }, [])
    async function loadOrders(){
        const {data} = await getUserOrders()
        setOrders(data)
    }

    const orderListStyle = {
        display: "flex",
        flexWrap: "wrap",
        fontFamily: "Montserrat",
        gap: "10px"
    }
    return(
        <div className="user-orders">
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
                <ul style={{margin: "10px", paddingInlineStart:"0px", height: "150px", listStyle: "inside", display:"block"}}>
                    {order.products.map(product => {
                        return <li style={{padding: "2px"}}>{product.dish.name}: {product.dishNumber} шт.</li>
                    })}
                </ul>
            </div>
        )
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