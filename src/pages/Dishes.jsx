import { useEffect, useState } from "react"
import { getAllDishes } from "../services/DishService"
import { Link } from "react-router-dom"
import imagesUrl from "../imagesUrl"
import emptyDishIconImg from '../assets/dishImg.png'
import rankingIcon from '../assets/rankingIcon.png'
import './Dishes.css'
import { addDishToCart } from "../services/CartService"
const Dishes = ({loadCart}) => {
    const [dishes, setDishes] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        loadDishes()
    }, [])
    async function loadDishes(){
        const {data} = await getAllDishes()
        setDishes(data)
        setLoading(false)
    }

    async function sendAddToCart(dish){
        await addDishToCart(dish)
        loadCart()
    }

    if(loading){
        return <div className="dishes">Завантажуємо...</div>
    }
    return (
        <div className="dishes">
            <h1>Страви</h1>
            <div className="dishes__menu"></div>
            <div className="dishes__content">
                {dishes.map(dish => {
                    return <div className="dishes__dish">
                        <div className="dishes__chef-info">
                            <div className="dishes__chef-img">
                                <img src={dish.chef.imageURL ? imagesUrl + dish.chef.imageURL : emptyDishIconImg}></img>
                            </div>
                            <div className="dishes__chef-rating">
                                <span><img src={rankingIcon}></img></span> {dish.chef.ranking ? dish.chef.ranking.rank : "0/0"}
                            </div>
                        </div>
                        <div className="dishes__dish-img">
                            <img src={dish.imageURL ? imagesUrl + dish.imageURL : emptyDishIconImg}></img>
                        </div>
                        <div className="dishes__dish-info">
                            <div className="dishes__dish-chef-name">Шеф {dish.chef.firstName}</div>
                            <div className="dishes__dish-name">{dish.name}</div>
                            <div className="dishes__dish-description">{dish.description}</div>
                            <div className="dishes__dish-tags">
                                {dish.dishTags?.map(tag => {
                                    return <div className="dish__dish-tag">{tag.name}</div>
                                })}
                            </div>
                            <div className="dishes__dish-buttons">
                                <button onClick={() => sendAddToCart(dish)}>Додати у кошик</button>
                                <Link to={"/HomeChefFront/chefs/" + dish.chef.id + "/dishes"}>Інші страви шефа</Link>
                            </div>
                        </div>
                    </div>
                })}

            </div>
        </div>
    )
}

export default Dishes