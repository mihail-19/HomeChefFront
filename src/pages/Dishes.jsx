import { useEffect, useState } from "react"
import { getAllDishes, getAllDishesWithFilters } from "../services/DishService"
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
import removeIcon from '../assets/burgerCloseButton.png'
import selectedIcon from '../assets/checkboxSelectedBlack.png'
const Dishes = ({cart, loadCart}) => {
    const [dishes, setDishes] = useState([])
    const [loading, setLoading] = useState(true)
    const [totalPages, setTotalPages] = useState(0)
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const dishToSave = useRef({})
    const snackbarRef = useRef(null)
    const confirmRef = useRef(null)


    const {params} = useParams()
    const [paramsParsed, setParamsParsed] = useState({})
    useEffect(() => {
        if(params){
            const pParsed = parse(params)
            setParamsParsed(pParsed)
            loadDishes(pParsed)
        }
        loadTagsAndCategories()
    }, [])
    useEffect(() => {
        const pParsed = parse(params)
        setParamsParsed(pParsed)
        loadDishes(pParsed)
    }, [params])


    async function loadTagsAndCategories(){
        const tagsRes = await getTags()
        const categoriesRes = await getDishCategories()
        setTags(tagsRes.data)
        setCategories(categoriesRes.data)
    }



    async function loadDishes(paramsParsed){
        setLoading(true)
        const pageNumber = paramsParsed && paramsParsed.page ? paramsParsed.page-1 : 0
        let res
        if(paramsParsed && (paramsParsed.categories || paramsParsed.tags)){
            res = await getAllDishesWithFilters(pageNumber, paramsParsed.categories, paramsParsed.tags)
        } else {
            res = await getAllDishes(pageNumber)
        }
        const data = res.data
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
                <ParamsSelected params={paramsParsed}/>
                <div className="dishes__list">
                    {dishes?.map(dish => {
                        return <DishCard dish={dish} sendAddToCart={sendAddToCart}/>
                    })}
                    
                </div>
                <Pages params={paramsParsed} totalPages={totalPages}/>
            </div>
        </div>
    )

    function ParamsSelected({params}){
        if(!params){
            return <></>
        }
        let chosenTags = undefined
        let chosenCategories = undefined
        if(params.tags){
            chosenTags = params.tags.map(tagId => tags.find(tag => tag.id === tagId))
        }
        if(params.categories){
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
        return (
            <div className="dishes__params">
                {chosenCategories &&
                    <div className="dishes__params-category">
                       <div> Категорія:</div> 
                       {chosenCategories?.map(c => removeCategoryElement(c))}
                    </div>
                }
                {chosenTags && 
                    <div className="dishes__params-tags">
                        <div> Теги:</div>
                        {chosenTags?.map(t => removeTagElement(t))}
                    </div>
                }
            </div>
        )

    }

    function DishMenu({params}){
        const [showCategory, setShowCategory] = useState(params && params.categories ? true : false)
        const [showTags, setShowTags] = useState(params && params.tags ? true : false)
        const [price, setShowPrice] = useState(false)
       
       
        function hasTagWithId(tags, id){
            if(!params || !params.tags){
                return false
            }
            return params.tags.find(t => t === id) ? true : false
        }
        
        
        function categoryToLink(category){
            const paramsCopy = params ? JSON.parse(JSON.stringify(params)) : {}
            const hasCategory = paramsCopy.categories && paramsCopy.categories.find(c => c === category.id)
            if(!paramsCopy.categories){
                paramsCopy.categories = []
            }
            if(hasCategory){
                if(paramsCopy.categories.length > 1){
                    paramsCopy.categories = paramsCopy.categories.filter(c => c !== category.id)
                } else {
                    paramsCopy.categories = undefined
                }
            } else {
                paramsCopy.categories.push(category.id)
            }
            const url = '/HomeChefFront/dishes/' + stringify(paramsCopy)
            return (
                <Link to={url} className="dishes__category-link">
                    <div className={hasCategory ? 'dishes__category-checkbox dishes__category-checkbox_selected' : 'dishes__category-checkbox'}>
                        <img src={selectedIcon}></img>
                    </div>
                    {category.name}
                </Link>
            )
        }
        function tagToLink(tag){
            const paramsCopy = params ? JSON.parse(JSON.stringify(params)) : {}
            if(!paramsCopy.tags){
                paramsCopy.tags = []
            } 
            paramsCopy.tags.push(tag.id)
            const url = '/HomeChefFront/dishes/' + stringify(paramsCopy)
            return (
                <Link to={url} className="dishes__tag-link">{tag.name}</Link>
            )
        }


        return (
            <div className="dishes__menu">
                <div className="dishes__menu-element" onClick={() => showCategory ? setShowCategory(false) : setShowCategory(true)}>
                    <div className="dishes__menu-element-text">Категорія</div> 
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
                    <div className="dishes__menu-element-text">Теги </div>
                    <div className={showTags ? "dishes__menu-arrow dishes__menu-arrow_active" : "dishes__menu-arrow"}>
                        <img src={arrow}></img>
                    </div>
                </div>
                {showTags && 
                    <div className="dishes__menu-tags">
                       {tags?.filter(tag => !hasTagWithId(params?.tags, tag.id)).map(tagToLink)}
                    </div>
                }
            </div>
        )
    }



    function Pages ({params, totalPages}){
        const blocksMaxNumber = 4
        if(!totalPages || totalPages === 0){
            
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