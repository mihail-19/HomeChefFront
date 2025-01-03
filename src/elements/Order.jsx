
import { useEffect, useRef, useState } from 'react'
import ModalCenter from './utility/ModalCenter'
import HomeChefCalendar from './utility/HomeChefCalendar'
import './Order.css'
import HomeChefTimePicker from './utility/HomeChefTimePicker'
import { addOrder } from '../services/OrderService'
import { removeAllFromCart } from '../services/CartService'
import Snackbar from './utility/Snackbar'
const Order = ({showOrder, setShowOrder, products, loadCart, person}) =>{
    const [orderLocality, steOrderLocality] = useState({})
    const [cityName, setCityName] = useState('')
    const [address, setAddress] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [date, setDate] = useState(new Date())
    const [order, setOrder] = useState([])
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [showCityError, setShowCityError] = useState(false)
    const [locality, setLocality] = useState({})
    const [nameErrMsg, setNameErrMsg] = useState(null)
    const [phoneErrMsg, setPhoneErrMsg] = useState(null)
    const [isReady, setIsReady] = useState(false)
    const [deliveryType, setDeliveryType] = useState('courier')

    const snackbarRef = useRef(null)

    console.log(products)


    useEffect(() => {
        const locality = localStorage.getItem('locality')
        if(locality){
            setCityName(JSON.parse(locality).name)
            steOrderLocality(locality)
        }
        
    }, [])

    useEffect(() => {
        if(!showOrder && isConfirmed){
            loadCart()
            setIsConfirmed(false)
        }
    }, [showOrder, isConfirmed])

    useEffect(() => {
        checkDishLocality()
    }, [products])


    useEffect(() => {
        checkIsReady()
    }, [name, phone])

    useEffect(() => {
        if(person && person.firstName){
            setName(person.firstName)
        }
        if(person && person.phone){
            setPhone(person.phone)
        }
    }, [])

    useEffect(() => {
        if(person && person.firstName){
            setName(person.firstName)
        }
        if(person && person.phone){
            setPhone(person.phone)
        }
    }, [person])

    function checkDishLocality(){
        if(!products || products.length < 1){
            setShowCityError(false)
            return
        }
        if(products.length < 2){
            setShowCityError(false)
            setLocality(products[0].dish.chef.locality)
            return
        }
        const firstLocalityId = products[0].dish.chef.locality.id
        for(let i = 1; i<products.length; i++){
            console.log(firstLocalityId + ' : ' + products[i].dish.chef.locality.id)
            if(firstLocalityId !== products[i].dish.chef.locality.id){
                setShowCityError(true)
                return
            }
        }
        setShowCityError(false)
        setLocality(firstLocalityId)
    }



    function checkPhone(value){
        if(/^\+38(0\d{9})$/.test(value)){
            setPhoneErrMsg(null)
            return true
        } else {
            setPhoneErrMsg('Некоректний телефон')
            return false
        }
    }

    function checkName(value){
        if(value && value.length > 1 && value.length<30){
            setNameErrMsg(false)
            return true
        } else {
            if(!value || value.length < 1){
                setNameErrMsg('Ім\'я не має бути пустим')
                return false
            }
        }
    }

    function checkIsReady(){
        
        if(checkPhone(phone) && checkName(name)){
            setIsReady(true)
        } else {
            setIsReady(false)
        }
    }

    return (
        <ModalCenter isActive={showOrder} setIsActive={setShowOrder} content={ isConfirmed ? afterConfirmWindow() : windowContent()}/>
    )
    function calculateTotalPrice(){
        let price = 0
        products?.forEach(p => price = price + p.dish.price*p.dishNumber)
        return price
    }

    async function sendConfirmOrder(){
        if(!isReady){
            return
        }
        const order = {
            name: name,
            phone: phone,
            address: address,
            dateTimeToMake: date,
            selfPickup: deliveryType === 'selfPickup',
            products: products.map(p => {
                return {dishId: p.dish.id, dishNumber: p.dishNumber}
            })
        }
        try{
            const {data} = await addOrder(order)
            setOrder(data)
            setIsConfirmed(true)
            //now it is done on server
            //const res = await removeAllFromCart()
            snackbarRef.current.show('Замовлення додано', false)
        } catch (error){
            console.log(error)
            snackbarRef.current.show('Помилка: ' + error.response.data, true, 5000)
        }
    }

    function afterConfirmWindow(){
        return (
            <div className='order'>
                <div className='order__results'>
                    <h2>Ваше замовлення оформлене</h2>
                    <h3>Номер замовлення: {order.id}</h3>
                    <p>Очікуйте підтвердження - найближчим часом з Вами зв'яжеться шеф</p>
                    <p>Дякуємо, що користуєтесь нашим сервісом!</p>
                </div>  
            </div>
        )
    }


    function hasSelfPickup(){
        if(!products || products.length === 0){
            return false
        }
        return products[0].dish.chef.hasSelfPickup
    }
   

    function windowContent(){

        
        function onChangePhone(value){
            checkPhone(value)
            setPhone(value)
        }

        
        function onChangeName(value){
            checkName(value)
            setName(value)
        }


        const errMsgStyle = {
            fontSize: '12px',
            color: 'red',
            height: '14px'
        }
        return (
            <div className='order' id="order">
                <Snackbar ref={snackbarRef}/>
                <h2>Оформити замовлення</h2>
                <div className='order__item'>
                    <div className='order__city'>Місто: {locality?.name}</div>
                    {showCityError && <div className='order__error'>Страви у Вашому замовленні готють шефи з разних міст. Будь ласка, <b>видаліть страви</b>, що готують шефи не з Вашого міста!</div>}
                </div>
                <div className='order__item'>
                    <select className='order__self-pickup-select' value={deliveryType} onChange={e => setDeliveryType(e.target.value)}>
                        {products[0] && products[0].dish.chef.hasSelfPickup &&
                            <option value='selfPickup'>Самовивіз</option>
                        }
                        <option value='courier'>Доставка кур'єром</option>
                    </select>
                    
                    
                </div>
                {deliveryType && deliveryType !== 'selfPickup' &&
                    <div className='order__item'>
                        <label>Адреса доставки</label>
                        <input type="text" className='order__input' value={address} onChange={e => setAddress(e.target.value)}></input>
                        <div style={errMsgStyle}></div>
                    </div>
                }
                <div className='order__item'>
                    <label>Контактний телефон</label>
                    <input type="text" className='order__input' value={phone} onChange={e => onChangePhone(e.target.value)}></input>
                    <div style={errMsgStyle}>{phoneErrMsg}</div>
                </div>
                <div className='order__item'>
                    <label>Як до Вас звертатися</label>
                    <input type="text" className='order__input' value={name} onChange={e => onChangeName(e.target.value)}></input>
                    <div style={errMsgStyle}>{nameErrMsg}</div>
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
                <button className={isReady ? 'order__submit-button order__submit-button_active' : 'order__submit-button'} onClick={sendConfirmOrder}>Замовити</button>
            </div>
        )
    }
}

export default Order