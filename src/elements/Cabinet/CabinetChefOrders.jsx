import { useEffect, useState } from "react"
import { getChefOrders } from "../../services/OrderService"
import Loading from "../utility/Loading"
import OrdersTable from "./OrdersTable"
const CabinetChefOrders = () => {
    const [loading, setLoading] = useState(true)
    const [windowNumber, setWindowNumber] = useState(1)
    const [orders, setOrders] = useState([])
    useEffect(() => {
        loadOrders()
    }, [])


    async function loadOrders(){
        const {data} = await getChefOrders()
        setOrders(data)
        setLoading(false)
    }

    return (
        <div className="chef-orders">
            <Loading isActive={loading} seIsActive={setLoading}/>
            <TopMenu/>
            <div className="chef-orders__orders-list">
                <OrdersTable orders={orders} setOrders={setOrders} setLoading={setLoading}/>
            </div>
        </div>
    )

    function TopMenu(){
        return (
            <div className="chef-orders__menu">
                <button onClick={setWindowNumber(0)} className="chef-orders__menu-element">
                    Всі
                </button>
                <button onClick={setWindowNumber(1)} className="chef-orders__menu-element">
                    В очікуванні
                <div className="chef-orders__menu-count">{countNewOrders()}</div>
                </button>
                <button onClick={setWindowNumber(2)} className="chef-orders__menu-element">
                    В роботі
                </button>
                <button onClick={setWindowNumber(3)} className="chef-orders__menu-element">
                    Завершені
                </button>
            </div>
        )
    }

    //Orders according to chosen button in top menu - all, new, in progres etc.
    function filteredOrders(){
        if(windowNumber === 0){
            return orders
        } else if (windowNumber === 1){
            return orders.filter(o => o.state === '')
        }
        orders.filter()
    }
    function countNewOrders(){
        return orders.filter(o => o.state === "NEW").length
    }
    

}

export default CabinetChefOrders