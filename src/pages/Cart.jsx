
import {addDishToCart, decreaseDishNumber, removeDish} from '../services/CartService'
import imagesUrl from '../imagesUrl'
import removeIcon from '../assets/delete.png'
import defaultDishImg from '../assets/defaultDish.jpg'
import './Cart.css'
import Order from '../elements/Order'
import { useState } from 'react'
import DatePicker from 'react-date-picker'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import HomeChefCalendar from '../elements/utility/HomeChefCalendar'
const Cart = ({cart, loadCart}) => {

    const [showOrder, setShowOrder] = useState(false)
    const [date, setDate] = useState(new Date())
    const [isConfirmed, setIsConfirmed] = useState(false)
    async function sendIncreaseDishNumber(dish){
        await addDishToCart(dish)
        loadCart()
    }
    async function sendDecreaseDishNumber(dish){
        await decreaseDishNumber(dish)
        loadCart()
    }

    async function sendRemoveDish(dish){
        await removeDish(dish)
        loadCart()
    }

    function calculateTotalPrice(){
        let price = 0
        cart?.cartProducts?.forEach(p => price = price + p.dish.price*p.dishNumber)
        return price
    }


    if(!cart || !cart.cartProducts || cart.cartProducts.lengt < 1){
        return <div className="cart__no-products">Корзина пуста
            </div>
    }

    return (
        <div className="cart">
            <Order showOrder={showOrder} setShowOrder={setShowOrder} cart={cart} loadCart={loadCart}/>
            <div className="cart__top"></div>
            <div className="cart__products">
                {cart.cartProducts.map(product => {
                  return  <div className="cart__product">
                        <div className="cart__product-left">
                            <div className="cart__product-img">
                                <img src={product.dish.imageURL ? imagesUrl + product.dish.imageURL : defaultDishImg}></img>
                            </div>
                            <div className='cart__product-menu'>
                                <div className="cart__product-number-menu">
                                    <button className="cart__product-number-menu-button" onClick={() => sendDecreaseDishNumber(product.dish)}>-</button>
                                    <div className="cart__product-number">{product.dishNumber}</div>
                                    <button className="cart__product-number-menu-button" onClick={() => sendIncreaseDishNumber(product.dish)}>+</button>
                                </div>
                                <button className='cart__product-remove-button'>
                                    <img src={removeIcon} onClick={() => sendRemoveDish(product.dish)}></img>
                                </button>
                            </div>
                        </div>
                        <div className='cart__product-right'>
                            <div className='cart__dish-name'>Страва: {product.dish.name}</div>
                            <div className='cart__dish-price'>Ціна: {product.dish.price} ₴</div>
                            <div className='cart__dish-chef-info'>Шеф {product.dish.chef.firstName}, місто {product.dish.chef.locality?.name}</div>
                        </div>
                        
                    </div>
                })}
            </div>
            <div className='cart__total-price'>Сума до сплати: {calculateTotalPrice()} ₴</div>
            <button className='cart__order-button' onClick={() => setShowOrder(true)}>Замовити</button>
        </div>
    )
}

export default Cart