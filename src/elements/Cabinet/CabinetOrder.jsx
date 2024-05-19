import ModalCenter from "../utility/ModalCenter"
import defaultDishImg from '../../assets/dishImg.png'
import './CabinetOrders.css'
import { Link } from "react-router-dom"
import OrderState from "../OrderState"
import {promoteOrder, getChefOrders} from '../../services/OrderService'
const CabinetOrder = ({showOrder, setShowOrder, order, setOrders, setLoading}) => {
    
    if(!order || !order.products){
        return <></>
    }

    return <ModalCenter isActive={showOrder} setIsActive={setShowOrder} content={windowContent()}/>

    function windowContent(){
       return <div className="cabinet-order">
                <h1>Замовлення № {order.id}</h1>
                <div className="cabinet-order__state">
                    <OrderState state={order.state}/>
                </div>
                <div className="cabinet-order__controls">
                    {createButtons()}
                </div>
                <h3>Вартість: {calculatePrice(order.products)}₴</h3>
                <div>Замовник: {order.name}</div>
                
                <div>Тел.: {order.phone}</div>
                <OrderProducts products={order.products}/>
            </div>
    }

    function OrderProducts({products}){
        return (
            <div className="cabinet-order__products">
                {products.map(product => {
                   return <div className="cabinet-order__product">
                        <Link to={"/HomeChefFront/dishes/" + product.dish.id} className="cabinet-order__dish-img">
                            <img src={product.dish.imageURL ? imageUrl + product.dish.imageURL : defaultDishImg}></img>
                        </Link>
                        <div className="cabinet-order__product-info">
                            <Link to={"/HomeChefFront/dishes/" + product.dish.id} className='cabinet-order__dish-name'>{product.dish.name}</Link>
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
        let price = 0
        products.forEach(product => {
            price += product.dish.price * product.dishNumber
        })
        return price
    }

    async function sendPromoteOrder(){
        setLoading(true)
        const res = await promoteOrder(order)
        const {data} = await getChefOrders()
        setOrders(data)
        order = data.filter(o => o.id === order.id)
        setLoading(false)
    }

    function createButtons(){
        switch(order.state){
            case "NEW":
                return <button className="cabinet-order__action-button" onClick={sendPromoteOrder}>Підтвердити</button>
            case "CONFIRMED":
                return <button className="cabinet-order__action-button" onClick={sendPromoteOrder}>Почати готувати</button>
            case "COOKING":
                return <button className="cabinet-order__action-button" onClick={sendPromoteOrder}>Підтвердити готовність</button>
            case "DELIVERING":
                return <button className="cabinet-order__action-button" onClick={sendPromoteOrder}>Віддано у доставку</button>
            case "DELIVERED":
                return <button className="cabinet-order__action-button" onClick={sendPromoteOrder}>Доставлено</button>
        }
    }
}

export default CabinetOrder