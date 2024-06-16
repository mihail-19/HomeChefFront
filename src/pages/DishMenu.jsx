import { useState } from "react"
import RangeSlider from "../elements/utility/RangeSlider"
import arrow from '../assets/headerCityArrow.png'
import {parse, stringify} from '../services/DishParamService'
import { Link } from "react-router-dom"
import selectedIcon from '../assets/checkboxSelectedBlack.png'
function DishMenu({params, maxPriceRange, priceValues, setPriceValues, dishesLocality, activeLocalities, categories, tags, navigate}){
    const [showCategory, setShowCategory] = useState(params && params.categories ? true : false)
    const [showTags, setShowTags] = useState(params && params.tags ? true : false)
    const [price, setShowPrice] = useState(false)
    const [showChooseLocality, setShowChooseLocality] = useState(false)
    
   console.log('dish menu refresh')
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

    function localityToLink(loc){
        const paramsCopy = {...params}
        if(loc){
            paramsCopy.city = loc.id
        } else {
            paramsCopy.city = 0
        }
        const url = '/HomeChefFront/dishes/' + stringify(paramsCopy)
        return(
            <Link to={url} className={loc && dishesLocality && loc.id === dishesLocality.id ? "dishes__city-link dishes__city-link_active" : "dishes__city-link"}>{loc ? loc.name : 'Всі'}</Link>
        )
    }

    function localitiesList(){
        return activeLocalities.map(al => localityToLink(al.locality))
    }
   
    function navigateOnPriceChange(price){
        console.log('naigate on price change')
        if(!price || price.length < 2){
            return
        }
       
        const paramsCopy = params ? {...params} : {}
        paramsCopy.price = price
        console.log(paramsCopy)
        const url = '/HomeChefFront/dishes/' + stringify(paramsCopy)
        console.log(price)
        console.log(url)
        navigate(url)
    }

    return (
        <div className="dishes__menu">
            
            <RangeSlider rangeMax={maxPriceRange} values={priceValues} setValues={setPriceValues} onChangeCommited={navigateOnPriceChange}/>
            
            <div className="dishes__menu-element" onClick={() => showChooseLocality ? setShowChooseLocality(false) : setShowChooseLocality(true)}>
                <div className="dishes__menu-element-text">{dishesLocality ? dishesLocality.name : 'Місто'}</div> 
                <div className={showChooseLocality ? "dishes__menu-arrow dishes__menu-arrow_active" : "dishes__menu-arrow"}>
                    <img src={arrow}></img>
                </div>
            </div>
            {showChooseLocality &&
                <div className="dishes__menu-params">
                    {localityToLink(null)}
                    {localitiesList()}
                </div>
               //<ActiveLocalityList isActive={showChooseLocality} setIsActive={undefined} locality={dishesLocality} setLocality={setDishesLocality}/>
            }
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

export default DishMenu