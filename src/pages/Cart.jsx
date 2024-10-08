
import {addDishToCart, decreaseDishNumber, removeDish} from '../services/CartService'
import imagesUrl from '../imagesUrl'
import removeIcon from '../assets/delete.png'
import defaultDishImg from '../assets/defaultDish.jpg'
import './Cart.css'
import Order from '../elements/Order'
import { useEffect, useState } from 'react'
import DatePicker from 'react-date-picker'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import HomeChefCalendar from '../elements/utility/HomeChefCalendar'
const Cart = ({cart, loadCart}) => {

    const [showOrder, setShowOrder] = useState(false)
    const [date, setDate] = useState(new Date())
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [currentProducts, setCurrentProducts] = useState([])
    const [productsDivided, setProductsDivided] = useState([])
    useEffect(() => {
        if(cart && cart.cartProducts){
            setProductsDivided(divideProducts(cart.cartProducts))
        }
    }, [])

    useEffect(() => {
        if(cart && cart.cartProducts){
            setProductsDivided(divideProducts(cart.cartProducts))
        }
    }, [cart, cart.cartProducts])

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

    function calculateTotalPrice(products){
        if(!products){
            return 0
        }
        let price = 0
        products.forEach(p => price = price + p.dish.price*p.dishNumber)
        return price
    }


    if(!cart || !cart.cartProducts || cart.cartProducts.lengt < 1){
        return <div className="cart__no-products">Корзина пуста
            </div>
    }

    return (
        <div className="cart">
            <Order showOrder={showOrder} setShowOrder={setShowOrder} products={currentProducts} loadCart={loadCart}/>
            <div className="cart__top">
                <h1>Корзина</h1>
                {productsDivided && productsDivided.length > 1 && <span style={{fontStyle: 'italic'}}>Замовлення розбито на {productsDivided.length} частин(и) оскільки страви належать різним шефам</span>}
            </div>
            {/*
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
            <div className='cart__total-price'>Сума до сплати: {calculateTotalPrice(cart?.cartProducts)} ₴</div>
            <button className='cart__order-button' onClick={() => setShowOrder(true)}>Замовити</button>
            */}
            {cartDivided(productsDivided)}
        </div>
    )

    function openOrder(products){
        setCurrentProducts(products)
        setShowOrder(true)
    }

    function cartDivided(products){
       
        if(!products){
            return null
        }
        return (
            <div>
                {productsDivided.map(prod => {
                    return (
                        <div className='cart__order'>
                            <div className="cart__products">
                                {prod.products.map(product => {
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
                            <div className='cart__total-price'>Сума до сплати: {calculateTotalPrice(prod.products)} ₴</div>
                            <button className='cart__order-button' onClick={() => openOrder(prod.products)}>Замовити</button>
                        </div>
                    )
                })}
            </div>
            )
    }

    function divideProducts(products){
        if(products.length === 0){
            return []
        }
        const res = []
        /*
            1 - test if arr contins group with same chef
             - if true - add to that array
             - if no - create new array
            2 - ...
            One pass through initial arry. Every time pass through res array.
        */
        for(let i = 0; i<products.length; i++){
            let alreadyHasChef = false
            for(let j = 0; j<res.length; j++){
                if(res[j].chefId == products[i].dish.chef.id){
                    res[j].products.push(products[i])
                    alreadyHasChef = true
                } 
            }
            if(!alreadyHasChef){
                res.push({chefId:products[i].dish.chef.id, products:[products[i]]})
            }
            
        }
        console.log(res)
        return res
    }
}

export default Cart