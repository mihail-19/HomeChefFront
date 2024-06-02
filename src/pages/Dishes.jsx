import { useEffect, useState } from "react"
import { getAllDishes } from "../services/DishService"
import { Link, useParams } from "react-router-dom"
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
import arrow from '../assets/headerCityArrow.png'
const Dishes = ({cart, loadCart}) => {
    const [dishes, setDishes] = useState([])
    const [loading, setLoading] = useState(true)
    const [totalPages, setTotalPages] = useState(0)

    const dishToSave = useRef({})
    const snackbarRef = useRef(null)
    const confirmRef = useRef(null)


    const {params} = useParams()
    const [paramsParsed, setParamsParsed] = useState({})
   
    useEffect(() => {
        console.log(params)
        setParamsParsed(parse(params))
    }, [params])

    useEffect(() => {
        loadDishes()
    }, [paramsParsed])
    async function loadDishes(){
        setLoading(true)
        const pageNumber = paramsParsed && paramsParsed.page ? paramsParsed.page-1 : 0
        const {data} = await getAllDishes(pageNumber)
        if(data.totalPages !== totalPages){
            setTotalPages(data.totalPages)
        }
        setDishes(data.content)
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

   
    return (
        <div className="dishes">
            <Loading isActive={loading} seIsActive={setLoading}/>
            <Snackbar ref={snackbarRef}/>
            <Confirm okFunction={sendAfterConfirmed} noFunction={rejectAddingDish} ref={confirmRef}/>
            <DishMenu params={paramsParsed}/>
            <div className="dishes__content">
                <div className="dishes__list">
                    {dishes.map(dish => {
                        return <DishCard dish={dish} sendAddToCart={sendAddToCart}/>
                    })}
                    
                </div>
                <Pages params={paramsParsed} totalPages={totalPages}/>
            </div>
        </div>
    )

    function DishMenu({params}){
        const [showCategory, setShowCategory] = useState(params && params.category ? true : false)
        const [showTags, setShowTags] = useState(params && params.tags ? true : false)
        const [price, setShowPrice] = useState(false)
        const [categories, setCategories] = useState([])
        const [tags, setTags] = useState([])
        async function loadCategories(){
            const {data} = await getDishCategories()
            setCategories(data)
        }
        async function loadTags(){
            const {data} = await getTags()
            setTags(data.filter(tag => !hasTagWithId(params.tags, tag.id)))
            //setTags(data)
        }
        function hasTagWithId(tags, id){
            return tags.find(t => t === id) ? true : false
        }
        
        
        useEffect(() => {
            if(showCategory){
                loadCategories()
            }
        }, [showCategory])
        useEffect(() => {
            if(showTags){
                loadTags()
            }
        }, [showTags])

        function categoryToLink(category){
            const paramsCopy = {...params}
            paramsCopy.category = category.id
            const url = '/HomeChefFront/dishes/' + stringify(paramsCopy)
            return <Link to={url} className="dishes__category-link">{category.name}</Link>
        }
        function tagToLink(tag){
            const paramsCopy = JSON.parse(JSON.stringify(params))
            if(!paramsCopy.tags){
                paramsCopy.tags = []
            } 
            paramsCopy.tags.push(tag.id)
            const url = '/HomeChefFront/dishes/' + stringify(paramsCopy)
            return <Link to={url} className="dishes__tag-link">{tag.name}</Link>
        }


        return (
            <div className="dishes__menu">
                <div className="dishes__menu-element" onClick={() => showCategory ? setShowCategory(false) : setShowCategory(true)}>
                    Категорія 
                    <div className={showCategory ? "dishes__menu-arrow dishes__menu-arrow_active" : "dishes__menu-arrow"}>
                        <img src={arrow}></img>
                    </div>
                </div>
                {showCategory && 
                    <div className="dishes__menu-params">
                       {categories?.map(categoryToLink)}
                    </div>
                }

                <div className="dishes__menu-element" onClick={() => showTags ? setShowTags(false) : setShowTags(true)}>
                    Теги 
                    <div className={showTags ? "dishes__menu-arrow dishes__menu-arrow_active" : "dishes__menu-arrow"}>
                        <img src={arrow}></img>
                    </div>
                </div>
                {showTags && 
                    <div className="dishes__menu-tags">
                       {tags?.map(tagToLink)}
                    </div>
                }
            </div>
        )
    }



    function Pages ({params, totalPages}){
        const blocksMaxNumber = 4
        console.log(params)
        if(!totalPages || totalPages === 0){
            console.log(totalPages)
            
            return <></>
        }
        const currentPage = params && params.page ? params.page : 1
        function buildLinkToPage(page){
            const paramsCopy = {...params}
            paramsCopy.page = page
            return '/HomeChefFront/dishes/' + stringify(paramsCopy)
        }
        function buildPages(){
            const pages = []
            
            for(let i = 1; i < totalPages+1; i++){
                if(i === currentPage){
                    pages.push({
                        pageNumber: i,
                        isCurrent: true
                    })
                } else {
                    pages.push({
                        pageNumber: i,
                        isCurrent: false
                    })
                }
                
            }
            console.log(pages)
            return pages
        }
            
        

        return (
            <div className="dishes__pages">
                <Link to={currentPage > 1 ? buildLinkToPage(currentPage - 1) : ''} className="dishes__page">{'<'}</Link>
                <div className="dishes__page-blocks">
                    {buildPages().map(p => {
                        return <Link to={buildLinkToPage(p.pageNumber)} className={p.isCurrent ? 'dishes__page dishes__page_current' : 'dishes__page'}>{p.pageNumber}</Link>
                    })}
                </div>
                <div className="dishes__page">{'>'}</div>
            </div>
        )
    }
}

export default Dishes