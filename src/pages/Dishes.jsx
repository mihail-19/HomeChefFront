import { useEffect, useState } from "react"
import { getAllDishes } from "../services/DishService"
import { Link } from "react-router-dom"
import imagesUrl from "../imagesUrl"
import emptyDishIconImg from '../assets/dishImg.png'
import rankingIcon from '../assets/rankingIcon.png'
import './Dishes.css'
import { addDishToCart, isValidDishLocality } from "../services/CartService"
import Loading from "../elements/utility/Loading"
import DishCard from "../elements/DishCard"
import { useRef } from "react"
import Snackbar from "../elements/utility/Snackbar"
import Confirm from "../elements/utility/Confirm"
const Dishes = ({loadCart}) => {
    const [dishes, setDishes] = useState([])
    const [loading, setLoading] = useState(true)
    const dishToSave = useRef({})
    const snackbarRef = useRef(null)
    const confirmRef = useRef(null)
    useEffect(() => {
        loadDishes()
    }, [])
    async function loadDishes(){
        setLoading(true)
        const {data} = await getAllDishes()
        setDishes(data)
        setLoading(false)
    }

    async function sendAddToCart(dish){
       
        dishToSave.current = dish
        confirmRef.current.show('Блюдо не відповідає заданому місту. Все одно додати в кошик?')
       // isValidDishLocality(dish, cart, undefined)
       
    }

    async function sendAfterConfirmed(){
        setLoading(true)
        await addDishToCart(dishToSave.current)
        loadCart()
        setLoading(false)
    }

    function rejectAddingDish(){
        dishToSave.current = {}

    }

   
    return (
        <div className="dishes">
            <Loading isActive={loading} seIsActive={setLoading}/>
            <Snackbar ref={snackbarRef}/>
            <Confirm okFunction={sendAfterConfirmed} noFunction={rejectAddingDish} ref={confirmRef}/>
            <h1>Страви</h1>
            <div className="dishes__menu"></div>
            <div className="dishes__content">
                {dishes.map(dish => {
                    return <DishCard dish={dish} sendAddToCart={sendAddToCart}/>
                })}

            </div>
        </div>
    )
}

export default Dishes