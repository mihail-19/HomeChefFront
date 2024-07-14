import { useEffect, useState } from "react"
import { getAllDishes, getAllDishesWithFilters, getPriceRange } from "../services/DishService"
import { Link, useNavigate, useParams } from "react-router-dom"
import imagesUrl from "../imagesUrl"
import emptyDishIconImg from '../assets/dishImg.png'
import rankingIcon from '../assets/rankingIcon.png'
import './Dishes.css'
import { addDishToCart, isDishLocalityValidToUser, isDishLocalityValidCartLocalities } from "../services/CartService"
import Loading from "../elements/utility/Loading"
import DishCard from "../elements/DishCard"
import { useRef } from "react"
import Snackbar from "../elements/utility/Snackbar"
import Confirm from "../elements/utility/Confirm"
import {parse, stringify} from '../services/DishParamService'
import {getDishCategories, getTags} from '../services/DataService'

import removeIcon from '../assets/burgerCloseButton.png'
import leftArrowIcon from '../assets/leftArrowIcon.png'
import ActiveLocalityList from "../elements/ActiveLocalityList"
import axios from "axios"
import serverUrl from "../serverUrl"
import RangeSlider from "../elements/utility/RangeSlider"
import { Slider } from "@mui/material"
import TestEntity from "./TestEntity"
import DishMenu from "./DishMenu"
import Pages from "../elements/utility/Pages"
const Dishes = ({cart, loadCart, locality}) => {
    const [dishes, setDishes] = useState([])
    const [loading, setLoading] = useState(true)
    const [totalPages, setTotalPages] = useState(0)
    const [totalDishes, setTotalDishes] = useState(0)
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [dishesLocality, setDishesLocality] = useState(locality)
    const [activeLocalities, setActiveLocalities] = useState([])
    const [maxPriceRange, setMaxPriceRange] = useState({low:0, high:1000000})
    const dishToSave = useRef({})
    const snackbarRef = useRef(null)
    const confirmRef = useRef(null)
    const navigate = useNavigate()
    const {params} = useParams()
    const [paramsParsed, setParamsParsed] = useState({})
    const [priceValues, setPriceValues] = useState(undefined)
    const [showDishMenu, setShowDishMenu] = useState(false)
    const [sortParam, setSortParam] = useState('')
    console.log('refresh')

   useEffect(() => {
    console.log('load price')
    loadPrice()
   }, [])
    useEffect(() => {
        if(!paramsParsed || !paramsParsed.city){
            setDishesLocality(locality)
            loadTagsAndCategories(params)
        }
    }, [locality])
    useEffect(() => {
       loadTagsAndCategories(params)
    }, [])
    useEffect(() => {
        
        loadTagsAndCategories(params)
    }, [params])

    useEffect(() => {
        loadPrice()
    }, [paramsParsed])

    //Navigate if params contains not valid data or ID of params are not contained in list
    function parseParams(params, tags, categories, activeLocalities){
        let pParsed = parse(params)
        if(!pParsed && !locality){
            setDishesLocality(undefined)
        }
        if(locality){
            if(!pParsed){
                pParsed = {city:locality.id}
            } else if(!isFinite(pParsed.city)){
                pParsed.city = locality.id
            }
        }
        if(pParsed && isFinite(pParsed.city)){
            if (pParsed.city === 0){
                setDishesLocality(undefined)
            } else {
                const foundLocality = activeLocalities.find(al => al.locality.id === pParsed.city)
                if(foundLocality){
                    setDishesLocality(foundLocality.locality)
                } else{
                    pParsed.city = undefined
                }
            } 
        }
        if(pParsed && pParsed.categories){
            const categoryIds = categories.map(c => c.id)
            pParsed.categories = pParsed.categories.filter(cId => categoryIds.includes(cId))
        }
        if(pParsed && pParsed.tags){
            const tagIds = tags.map(c => c.id)
            pParsed.tags = pParsed.tags.filter(tId => tagIds.includes(tId))
        }
        if(pParsed && pParsed.sortParam){
            setSortParam(pParsed.sortParam)
        }
        if(pParsed && stringify(pParsed) !== params){
            console.log(pParsed)
            console.log(stringify(pParsed))
            console.log(params)
            navigate('/HomeChefFront/dishes/' + stringify(pParsed))
        } else {
            setParamsParsed(pParsed)
            loadDishes(pParsed)
        }
    }

    async function loadPrice(){
        const maxPriceRangeRes = await getPriceRange(paramsParsed?.categories, paramsParsed?.tags, paramsParsed?.city)
        setMaxPriceRange(maxPriceRangeRes.data)
        if(!paramsParsed?.price){
            setPriceValues([maxPriceRangeRes.data.low, maxPriceRangeRes.data.high])
        } else {
            setPriceValues([paramsParsed.price[0], paramsParsed.price[1]])
        }
    }
    async function loadTagsAndCategories(params){
        const tagsRes = await getTags()
        const categoriesRes = await getDishCategories()
        const localitiesRes = await loadActiveLocalities()
       
        parseParams(params, tagsRes.data, categoriesRes.data, localitiesRes.data)
        setTags(tagsRes.data)
        setCategories(categoriesRes.data)
        setActiveLocalities(localitiesRes.data.sort((a, b) => {
            if(a.type === 'місто' && b.type !== 'місто'){
                return -1
            } else if (b.type === 'місто' && a.type !== 'місто'){
                return 1
            }
            return 0
        }))
       
    }


    async function loadActiveLocalities(){
        const url = serverUrl + '/common-data/active-localities/with-dishes'
        return axios.get(url, {withCredentials:true})
    }
    async function loadDishes(paramsParsed){
        setLoading(true)
        const pageNumber = paramsParsed && paramsParsed.page ? paramsParsed.page-1 : 0
        let res
        res = await getAllDishesWithFilters(pageNumber, paramsParsed)
        // if(paramsParsed && (paramsParsed.categories || paramsParsed.tags)){
        //     res = await getAllDishesWithFilters(pageNumber, paramsParsed.categories, paramsParsed.tags)
        // } else {
        //     res = await getAllDishesWithFilters(pageNumber)
        // }
        const data = res.data
        if(data.totalPages !== totalPages){
            setTotalPages(data.totalPages)
        }
        setDishes(data.content)
        setTotalDishes(data.numberOfElements)
        setLoading(false)
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
        setLoading(true)
        await addDishToCart(dishToSave.current)
        loadCart()
        setLoading(false)
    }

    function rejectAddingDish(){
        dishToSave.current = {}

    }

    function buildLinkToPage(page){
        const paramsCopy = {...params}
        paramsCopy.page = page
        return '/HomeChefFront/dishes/' + stringify(paramsCopy)
    }
   
    return (

        <div className="dishes__container">
            <Loading isActive={loading} seIsActive={setLoading}/>
            <Snackbar ref={snackbarRef}/>
            <Confirm okFunction={sendAfterConfirmed} noFunction={rejectAddingDish} ref={confirmRef}/>
            <ParamsSelected params={paramsParsed}/>
            <div className={showDishMenu ? "dishes__menu-dark-area dishes__menu-dark-area_active" : "dishes__menu-dark-area"} onClick={() => setShowDishMenu(false)}></div>
            <div className="dishes">
                <div className={showDishMenu ? "dishes__menu-container dishes__menu-container_active" : "dishes__menu-container"}>
                   <div className={showDishMenu ? "dishes__menu-title dishes__menu-title_active" : "dishes__menu-title"} onClick={() => setShowDishMenu(false)}> <img src={leftArrowIcon}></img> Фільтри</div>
                    <DishMenu 
                        params={paramsParsed} 
                        maxPriceRange={maxPriceRange} 
                        priceValues={priceValues} 
                        setPriceValues={setPriceValues} 
                        dishesLocality={dishesLocality} 
                        activeLocalities={activeLocalities}
                        categories={categories}
                        tags={tags}
                        navigate={navigate}
                    />
                </div>
                <div className="dishes__content">
                    
                    <div className="dishes__list-container">
                        <div className="dishes__list">
                            {dishes?.map(dish => {
                                return <DishCard dish={dish} sendAddToCart={sendAddToCart}/>
                            })}
                            
                        </div>
                    </div>
                    <Pages currentPage={paramsParsed && paramsParsed.page ? paramsParsed.page : 1} totalPages={totalPages} buildLinkToPage={buildLinkToPage}/>
                </div>
            </div>
        </div>
    )

    function ParamsSelected({params}){
        let chosenTags = undefined
        let chosenCategories = undefined
        if(params?.tags){
            chosenTags = params.tags.map(tagId => tags.find(tag => tag.id === tagId))
        }
        if(params?.categories){
            chosenCategories = params.categories.map(cId => categories.find(c => c.id === cId))
        }
        function removeCategoryElement(c){
            if(!params || !params.categories || !c){
                return
            }
            const paramsCopy = JSON.parse(JSON.stringify(params))
            if(paramsCopy.categories.length > 1){
                paramsCopy.categories = paramsCopy.categories.filter(cId => c.id !== cId)
            } else {
                paramsCopy.categories = undefined
            }
            const url = '/HomeChefFront/dishes/' + stringify(paramsCopy)

            return removeElement(url, c.name)
        }
        function removeTagElement(t){
            if(!params || !params.tags || !t){
                return
            }
            const paramsCopy = JSON.parse(JSON.stringify(params))
            paramsCopy.tags = paramsCopy.tags.filter(tag => t.id !== tag)
            const url = '/HomeChefFront/dishes/' + stringify(paramsCopy)
            return removeElement(url, t.name)
        }

        function removePrice(){
            if(!params || !params.price){
                return
            }
            const paramsCopy = JSON.parse(JSON.stringify(params))
            paramsCopy.price = undefined
            const url = '/HomeChefFront/dishes/' + stringify(paramsCopy)
            const txt = params.price[0] + '-' + params.price[1] + ' грн'
            return removeElement(url, txt)
        }
        function removeSearch(){
            if(!params || !params.search){
                return null
            }
            const paramsCopy = {...params}
            paramsCopy.search = undefined
            const url = '/HomeChefFront/dishes/' + stringify(paramsCopy)
            const txt = '\'' + params.search +'\''
            return removeElement(url, txt)
        }

        function removeElement(url, text){
                return (
                    <div className="dishes__param">
                        {text}
                        <Link to={url} className="dishes__remove-param">
                            <img src={removeIcon}></img>
                        </Link>
                    </div>
                )
        }
        function removeAllFilters(){
            if(!params || (!params.tags && !params.categories && !params.price && !params.search)){
                return <div></div>
            }
            // const paramsCopy = {...params}
            // paramsCopy.tags = undefined
            // paramsCopy.categories = undefined
            const url = '/HomeChefFront/dishes' 
            return removeElement(url, 'Скинути все')
        }

        return (
            <div className="dishes__params">
                <div className="dishes__params-left">
                    <div className="dishes__params-show-menu" onClick={() => setShowDishMenu(!showDishMenu)}>Фільтри</div>
                    <div className="dishes__params-dishes-count">Знайдено блюд: {totalDishes}</div>
                    <div className="dishes__params-filters">
                        {removeAllFilters()}
                        {removeSearch()}
                        {params && params.price && removePrice()}
                        {chosenCategories &&
                            <div className="dishes__params-name"> Категорія:</div> 
                            
                        }
                        {chosenCategories && 
                            chosenCategories?.map(c => removeCategoryElement(c))
                        }
                        {chosenTags && 
                            <div className="dishes__params-name"> Теги:</div>
                        
                        }
                        {chosenTags && 
                            chosenTags?.map(t => removeTagElement(t))
                        }
                    </div>
                </div>
                <div className="dishes__params-right">
                    <div className="dishes__params-sort">
                        <select value={sortParam} onChange={e => onSortChange(e.target.value)}>
                            <option value="popular">Популярні</option>
                            <option value="cheap">Спочатку дешеві</option>
                            <option value="expensive">Спочатку дорогі</option>
                            <option value="latest">Нові</option>
                        </select>
                    </div>
                </div>
            </div>
        )

        function onSortChange(sortValue){
            setSortParam(sortValue)
            const paramsCopy = {...params}
            paramsCopy.sort = sortValue
            navigate("/HomeChefFront/dishes/" + stringify(paramsCopy))
        }
       

    }

    



    
        
       
}

export default Dishes