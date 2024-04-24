
import {addDishToCart, decreaseDishNumber, removeDish} from '../services/CartService'
import imagesUrl from '../imagesUrl'
import removeIcon from '../assets/delete.png'
import './Cart.css'
const Cart = ({cart, loadCart}) => {

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
        return <div className="cart__no-products">Корзина пуста</div>
    }

    return (
        <div className="cart">
            <div className="cart__top"></div>
            <div className="cart__products">
                {cart.cartProducts.map(product => {
                  return  <div className="cart__product">
                        <div className="cart__product-left">
                            <div className="cart__product-img">
                                <img src={imagesUrl + product.dish.imageURL}></img>
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
                            <div className='cart__dish-description'>{product.dish.description}</div>
                        </div>
                        
                    </div>
                })}
            </div>
            <div className='cart__total-price'>Сума до сплати: {calculateTotalPrice()} ₴</div>
            <button className='cart__order-button'>Замовити</button>
        </div>
    )
}

export default Cart