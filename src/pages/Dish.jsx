import { useEffect, useState } from "react"
import { getDish } from "../services/DishService"
import imagesUrl from "../imagesUrl"
import ChefRank from "../elements/ChefRank"
import { Link, useParams } from "react-router-dom"
import './Dish.css'

const Dish = () => {
    
    const {id} = useParams()
    console.log('dish page, id=' + id)
    const [dish, setDish] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        loadDish()
    }, [])
    async function loadDish(){
        console.log('dish page, load dish with id=' + id)
        const {data} = await getDish(id)
        setDish(data)
        setIsLoading(false)
    }

    if(isLoading){
        return <></>
    }

    return (
        <div className="dish">
            <div className="dish__main-content">
                <div className="dish__left">
                    <div className="dish__img">
                        <img src={imagesUrl + dish.imageURL}></img>
                    </div>
                    <div className="dish__chef">
                        <div className="dish__chef-top">
                            <div className="dish__chef-img">
                                <img src={imagesUrl + dish.chef?.imageURL}></img>
                            </div>
                            <div className="dish__chef-name">
                                {dish.chef?.name}
                            </div>
                        </div>
                        <div className="dish__chef-rank">
                            <ChefRank rank={dish.chef?.ranking}/>
                        </div>
                        <Link to={"/HomeChefFront/chef/" + dish.chef?.id + "/dishes"} className="dish__chef-dishes-button">Всі страви</Link> 
                    </div>
                </div>
                <div className="dish__right">
                        <h1>{dish.name}</h1>
                        <div className="dish__dish-menu">
                            <div className="dish__price">{dish.price}</div>
                            <div className="dish__weight">Вага: {dish.weight}</div>
                            <button className="dish__buy-button">Замовити</button>
                        </div>
                        <div className="dish__desription">{dish.description}</div>
                        <h3>Склад страви:</h3>
                        <div className="dish__ingredients">{dish.ingredients}</div>
                </div>
            </div>


            <h2>Інші страви шефа в цій категорії</h2>
            <div className="dish__dishes">

            </div>
        </div>
    )
}

export default Dish