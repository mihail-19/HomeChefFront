
import { useEffect, useState } from 'react'
import ModalCenter from './utility/ModalCenter'
import HomeChefCalendar from './utility/HomeChefCalendar'
import './Order.css'
import HomeChefTimePicker from './utility/HomeChefTimePicker'
import { addOrder } from '../services/OrderService'
import { removeAllFromCart } from '../services/CartService'
const Order = ({showOrder, setShowOrder, cart, loadCart}) =>{
    const [address, setAddress] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [date, setDate] = useState(new Date())
    const [orders, setOrders] = useState([])
    const [isConfirmed, setIsConfirmed] = useState(false)

    useEffect(() => {
        if(!showOrder && isConfirmed){
            loadCart()
            setIsConfirmed(false)
        }
    }, [showOrder, isConfirmed])

    return (
        <ModalCenter isActive={showOrder} setIsActive={setShowOrder} content={ isConfirmed ? afterConfirmWindow() : windowContent()}/>
    )
    function calculateTotalPrice(){
        let price = 0
        cart?.cartProducts?.forEach(p => price = price + p.dish.price*p.dishNumber)
        return price
    }

    async function sendConfirmOrder(){

        const order = {
            name: name,
            phone: phone,
            address: address,
            dateTimeToMake: date,
            products: cart.cartProducts
        }
        const {data} = await addOrder(order)
        setOrders(data)
        setIsConfirmed(true)
        const res = await removeAllFromCart()
    }

    function afterConfirmWindow(){
        return (
            <div className='order'>
                {orders.map(order => {
                    return <div className='order__results'>
                                <h2>Ваше замовлення оформелене</h2>
                                {orders.length > 1 && 'Ви обрали блюда різних шефів, тож замовлення розбито на ' + orders.length + ' заказів'}
                                <h3>Номер замовлення: {order.id}</h3>
                                <p>Очікуйте підтвердження - найближчим часом з Вами зв'яжеться шеф</p>
                                <p>Дякуємо, що користуєтесь нашим сервісом!</p>
                        </div>  
                })}
            </div>
        )
    }

    function windowContent(){
        return (
            <div className='order'>
                <h2>Оформити замовлення</h2>
                <div className='order__item'>
                    <label>Місто</label>
                    
                </div>
                <div className='order__item'>
                    <label>Адреса доставки</label>
                    <input type="text" className='order__input' value={address} onChange={e => setAddress(e.target.value)}></input>
                </div>
                <div className='order__item'>
                    <label>Контактний телефон</label>
                    <input type="text" className='order__input' value={phone} onChange={e => setPhone(e.target.value)}></input>
                </div>
                <div className='order__item'>
                    <label>Як до Вас звертатися</label>
                    <input type="text" className='order__input' value={name} onChange={e => setName(e.target.value)}></input>
                </div>
                <div className='order__datetime'>
                    <div className='order__datetime-item'>
                        <label>Дата доставки</label>
                        <HomeChefCalendar date={date} setDate={setDate}/>
                    </div>
                    <div className='order__datetime-item'>
                        <label>Орієнтовний час</label>
                        <HomeChefTimePicker date={date} setDate={setDate}/>
                    </div>
                </div>
                <div className='order__sum'>Сума: {calculateTotalPrice()}</div>
                <div className='order__delivery'>Доставка: прораховується окремо</div>
                <button className='order__submit-button' onClick={sendConfirmOrder}>Замовити</button>
            </div>
        )
    }
}

export default Order