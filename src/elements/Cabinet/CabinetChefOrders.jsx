import { useEffect, useState } from "react"
import { getChefOrders } from "../../services/OrderService"
import Loading from "../utility/Loading"
import OrdersTable from "./OrdersTable"
const CabinetChefOrders = () => {
    const [loading, setLoading] = useState(true)
    const [windowNumber, setWindowNumber] = useState(1)
    const [orders, setOrders] = useState([])
    const [newOrdersNum, setNewOrdersNum] = useState(0)
    useEffect(() => {
        loadOrders()
    }, [])

    useEffect(() => {
        setNewOrdersNum(orders.filter(o => o.state === "NEW").length)
    }, [orders])


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
                <OrdersTable orders={filteredOrders()} setOrders={setOrders} setLoading={setLoading}/>
            </div>
        </div>
    )

    function TopMenu(){
        return (
            <div className="chef-orders__menu">
                <button onClick={() => setWindowNumber(0)} className={windowNumber === 0 ? "chef-orders__menu-element chef-orders__menu-element_all" : "chef-orders__menu-element"}>
                    Всі
                </button>
                <button onClick={() => setWindowNumber(1)} className={windowNumber === 1 ? "chef-orders__menu-element chef-orders__menu-element_new" : "chef-orders__menu-element"}>
                    В очікуванні
                    {newOrdersNum > 0 &&
                        <div className="chef-orders__menu-count">{newOrdersNum}</div>
                    }
                </button>
                <button onClick={() => setWindowNumber(2)} className={windowNumber === 2 ? "chef-orders__menu-element chef-orders__menu-element_in-progres" : "chef-orders__menu-element"}>
                    В роботі
                </button>
                <button onClick={() => setWindowNumber(3)} className={windowNumber === 3 ? "chef-orders__menu-element chef-orders__menu-element_finished" : "chef-orders__menu-element"}>
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
            return orders.filter(o => o.state === 'NEW')
        } else if (windowNumber === 2){
            return orders.filter(o => o.state !== "NEW" && o.state !== "DELIVERED")
        } else if (windowNumber === 3){
            return orders.filter(o => o.state === "DELIVERED")
        } else {
            return orders
        }
    }
    function countNewOrders(){
        return orders.filter(o => o.state === "NEW").length
    }
    

}

export default CabinetChefOrders