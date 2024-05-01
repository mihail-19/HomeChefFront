import { useEffect, useState } from "react"
import { getAllDishes } from "../services/DishService"
import { Link } from "react-router-dom"
import imagesUrl from "../imagesUrl"
import emptyDishIconImg from '../assets/dishImg.png'
import rankingIcon from '../assets/rankingIcon.png'
import './Dishes.css'
import { addDishToCart } from "../services/CartService"
import Loading from "../elements/utility/Loading"
import DishCard from "../elements/DishCard"
const Dishes = ({loadCart}) => {
    const [dishes, setDishes] = useState([])
    const [loading, setLoading] = useState(true)
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
        setLoading(true)
        await addDishToCart(dish)
        loadCart()
        setLoading(false)
    }

   
    return (
        <div className="dishes">
            <Loading isActive={loading} seIsActive={setLoading}/>
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