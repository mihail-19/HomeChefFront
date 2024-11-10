import { Link, useParams } from "react-router-dom"
import { getDishesForChefPaged } from "../services/DishService"
import DishCard from "../elements/DishCard"
import { addDishToCart, isDishLocalityValidToUser } from "../services/CartService"
import Loading from "../elements/utility/Loading"
import { useEffect, useRef, useState } from "react"
import Confirm from "../elements/utility/Confirm"
import Pages from "../elements/utility/Pages"
import './ChefDishes.css'

const ChefDishes = ({loadCart}) => {
    const PAGE_SIZE = 2
    const {id, pageNumber} = useParams()
    const [loading, setLoading] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [dishes, setDishes] = useState([])
    const [totalDishes, setTotalDishes] = useState(0)
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [chefLocality, setChefLocality] = useState(null)
    const dishToSave = useRef(null)
    const confirmRef = useRef(null)
    useEffect(() => {
        console.log(pageNumber)
        loadDishes()
    }, [])
    useEffect(() => {
        loadDishes()
    },[pageNumber])
   
    async function loadDishes() {
        const pageNum = pageNumber ? pageNumber-1 : 0
        const {data} = await getDishesForChefPaged(pageNum, PAGE_SIZE, id)
        const dishPages = data.dishes
        if(dishPages.totalPages !== totalPages){
            setTotalPages(dishPages.totalPages)
        }
        setDishes(dishPages.content)
        setTotalDishes(dishPages.totalElements)
        setUsername(data.chefUsername)
        setFirstName(data.chefFirstName)
        setChefLocality(data.chefLocality)
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
        // if(!isDishLocalityValidCartLocalities(dishToSave.current, cart)){
        //     snackbarRef.current.show(<div>Не можна додавати страви з різних міст <Link to="/cart">Кошик</Link></div>, true, 5000)
        //     return
        // }
        setLoading(true)
        
        await addDishToCart(dishToSave.current)
        loadCart()
        setLoading(false)
    }
    function rejectAddingDish(){
        dishToSave.current = {}

    }

    function buildLinkToPage(page){
        return '/chef/' + id + '/dishes/' + parseInt(page)
    }

    return (
        <div className="chef-dishes">
             <Loading isActive={loading} seIsActive={setLoading}/>
             <Confirm okFunction={sendAfterConfirmed} noFunction={rejectAddingDish} ref={confirmRef}/>
             <h1>Страви шефа <Link to={"/chef/" + id} className="chef-dishes__chef-link">{firstName} </Link></h1>
             <div className="chef-dishes__dish-count">Всього страв - {totalDishes}</div>
            <div className="chef-dishes__dish-list">
                {dishes?.map(dish => {
                    return <DishCard dish={dish} sendAddToCart={sendAddToCart}/>
                })}
                
            </div>
            <Pages currentPage={pageNumber ? parseInt(pageNumber) : 1} totalPages={totalPages} buildLinkToPage={buildLinkToPage}/>
        </div>
    )

    
}


export default ChefDishes




function parse(paramsString){
    if(!paramsString || paramsString.length === 0){
        return undefined
    }
    const paramsSplitted = paramsString.split(';')
    const paramsObject = {}
    paramsSplitted.forEach(element => {
        const param = element.split('=')
        if(param.length > 1){
            if(param[0] === 'page'){
                paramsObject.page = parseInt(param[1])
            } else if(param[0] === 'chef'){
                paramsObject.chef = parseInt(param[1])
            }
        }
    });
    return Object.keys(paramsObject).length > 0 ? paramsObject : undefined
}


function stringify(params){
    if(!params){
        return ''
    }
    let res = ''
    if(params.page && params.page > 1){
        if(res.length > 0){
            res += ';'
        }
        res += 'page=' + params.page
    }
    if(params.chef && isFinite(params.chef)){
        if(res.length > 0){
            res += ';'
        }
        res += 'chef=' + params.chef
    }
    
    return res
}