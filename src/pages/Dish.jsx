import { useEffect, useState, useRef } from "react"
import { getDish, getDishesForChef } from "../services/DishService"
import { addDishToCart, isDishLocalityValidToUser, isDishLocalityValidCartLocalities } from "../services/CartService"
import imagesUrl from "../imagesUrl"
import ChefRank from "../elements/ChefRank"
import { Link, useParams } from "react-router-dom"
import './Dish.css'
import DishCard from "../elements/DishCard"
import Loading from "../elements/utility/Loading"
import Snackbar from "../elements/utility/Snackbar"
import Confirm from "../elements/utility/Confirm"
import defaultDishImg from '../assets/defaultDish.jpg'
import Rating from "../elements/utility/Rating"
const Dish = ({cart, loadCart}) => {
    
    const {id} = useParams()
    console.log('dish page, id=' + id)
    const [dish, setDish] = useState({})
    const [chefDishes, setChefDishes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const dishToSave = useRef({})
    const snackbarRef = useRef(null)
    const confirmRef = useRef(null)
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

    async function sendAddToCart(dish){
       
        dishToSave.current = dish
        const locality = JSON.parse(localStorage.getItem('locality'))
        if(!isDishLocalityValidToUser(dish, locality)){
            let txt
            if(locality){
                txt ='Блюдо готується в населеному пункті ' + dish.chef.locality.name + ', Ви обрали місто ' + locality?.name + '. Все одно додати в кошик?'
                
            } else {
                txt ='Блюдо готується в населеному пункті ' + dish.chef.locality.name + ', а Ви не обрали місто. Все одно додати в кошик?'
            }
            confirmRef.current.show(txt)
        } else {
            sendAfterConfirmed()
        }
        
       
    }

    async function sendAfterConfirmed(){
        if(!isDishLocalityValidCartLocalities(dishToSave.current, cart)){
            snackbarRef.current.show(<div>Не можна додавати страви з різних міст <Link to="/HomeChefFront/cart">Кошик</Link></div>, true, 5000)
            return
        }
        setIsLoading(true)
        await addDishToCart(dishToSave.current)
        loadCart()
        setIsLoading(false)
    }
    function rejectAddingDish(){
        dishToSave.current = {}

    }

    if(isLoading){
        return <></>
    }

    return (
        <div className="dish">
            <Loading isActive={isLoading} seIsActive={setIsLoading}/>
            <Snackbar ref={snackbarRef}/>
            <Confirm okFunction={sendAfterConfirmed} noFunction={rejectAddingDish} ref={confirmRef}/>
            <div className="dish__top-navigation">
                <Link to={'/HomeChefFront/dish/' + id} className="dish__navigation-button dish__navigation-button_active">Страва</Link>
                <Link to={'/HomeChefFront/dish/' + id + '/comments'} className="dish__navigation-button">Відгуки</Link>
            </div>
            <div className="dish__main-content">
                <div className="dish__left">
                    <div className="dish__img">
                        <div className="dish__dish-rating">
                            <Rating rating={dish.ranking ? dish.ranking.rank : 0}/>
                        </div>
                        <img src={dish.imageURL ? imagesUrl + dish.imageURL : defaultDishImg}></img>
                    </div>
                    
                </div>
                <div className="dish__right">
                        <h1>{dish.name}</h1>
                        <div className="dish__dish-menu">
                            <div className="dish__price">{dish.price} ₴</div>
                            
                            <button className="dish__buy-button" onClick={() => sendAddToCart(dish)}>Замовити</button>
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
                       return <DishCard dish={d} sendAddToCart={sendAddToCart}/>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Dish