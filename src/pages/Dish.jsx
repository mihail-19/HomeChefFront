import { useEffect, useState } from "react"
import { getDish, getDishesForChef } from "../services/DishService"
import imagesUrl from "../imagesUrl"
import ChefRank from "../elements/ChefRank"
import { Link, useParams } from "react-router-dom"
import './Dish.css'
import DishCard from "../elements/DishCard"
import Loading from "../elements/utility/Loading"
const Dish = () => {
    
    const {id} = useParams()
    console.log('dish page, id=' + id)
    const [dish, setDish] = useState({})
    const [chefDishes, setChefDishes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        loadDish()
    }, [id])
    useEffect(() => {
        loadDish()
    }, [])
    async function loadDish(){
        setIsLoading(true)
        console.log('dish page, load dish with id=' + id)
        if(dish && dish.imageURL){
            dish.imageURL = undefined
        }
        const {data} = await getDish(id)
        await loadChefDishes(data.chef.id)
        setDish(data)
        setIsLoading(false)
    }

    async function loadChefDishes(chefId){
        const {data} = await getDishesForChef(chefId)
        setChefDishes(data)
    }

    if(isLoading){
        return <></>
    }

    return (
        <div className="dish">
            <Loading isActive={isLoading} seIsActive={setIsLoading}/>
            <div className="dish__main-content">
                <div className="dish__left">
                    <div className="dish__img">
                        <img src={imagesUrl + dish.imageURL}></img>
                    </div>
                    
                </div>
                <div className="dish__right">
                        <h1>{dish.name}</h1>
                        <div className="dish__dish-menu">
                            <div className="dish__price">{dish.price} ₴</div>
                            
                            <button className="dish__buy-button">Замовити</button>
                        </div>
                        <div className="dish__weight">Вага: {dish.weight} гр.</div>
                        <div className="dish__desription">{dish.description}</div>
                        <h3>Склад страви:</h3>
                        <div className="dish__ingredients">{dish.ingredients}</div>
                </div>
            </div>

            <div className="dish__chef-dishes-container">
                <div className="dish__chef-container">
                        <div className="dish__chef">
                            <div className="dish__chef-top">
                                <div className="dish__chef-img">
                                    <img src={imagesUrl + dish.chef?.imageURL} loading="eager"></img>
                                </div>
                                <div className="dish__chef-name">
                                    Шеф <b>{dish.chef.firstName}</b>
                                </div>
                            </div>
                            <div className="dish__chef-rank">
                                <ChefRank rank={dish.chef?.ranking}/>
                            </div>
                            <Link to={"/HomeChefFront/chef/" + dish.chef?.id + "/dishes"} className="dish__chef-dishes-button">Всі страви</Link> 
                        </div>
                </div>
                <h2>Інші страви шефа в цій категорії</h2>
                <div className="dish__dishes">
                    {chefDishes.map(d => {
                       return <DishCard dish={d} sendAddToCart={undefined}/>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Dish