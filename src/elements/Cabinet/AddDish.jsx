import { useEffect, useState } from "react"
import '../../pages/Cabinet.css'
import dishImg from '../../assets/dishImg.png'
import questionImg from '../../assets/questionImg.png'
import closeImg from '../../assets/burgerCloseButton.png'
import {addDish} from '../../services/DishService'
import { useOutletContext } from "react-router-dom"
import { getDishCategories, getTags } from "../../services/DataService"
const AddDish = ({showAddDish, setShowAddDish}) => {
   console.log(showAddDish)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [isActive, setIsActive] = useState(true)
    const [cookingTime, setCookingTime] = useState(30)
    const [price, setPrice] = useState(1)
    const [categoryId, setCatehoryId] = useState(1)
    const [tags, setTags] = useState([])
    const [weight, setWeight] = useState(1)
    const [image, setImage] = useState(undefined)
    const context = useOutletContext()
    const [categoryList, setCategoryList] = useState([
        
    ])
    const [tagList, setTagList] = useState([
        
    ])
    useEffect(() => {
        loadCategoryList()
        loadTagList()
    }, [])

    async function loadCategoryList(){
        const {data} = await getDishCategories()
        setCategoryList(data)
    }
    async function loadTagList(){
        const {data} = await getTags()
        setTagList(data)
    }

    async function sendAddDish(){
        const dishCategory = categoryList.find(c => Number(categoryId) === c.id)
      
        const dish = {
            name: name,
            description: description,
            ingredients: ingredients,
            isActive: isActive,
            cookingTime: cookingTime,
            price: price,
            weight: weight,
            dishCategory: dishCategory,
            dishTags: tags
        }
        await addDish(dish, image)
        context.loadChef()
        setShowAddDish(false)
    }
    

    function addTag(tagId){
        const tag = tagList.find(t => t.id === tagId)
        if(tags.find(t => t.id === tagId)){
            return
        }
        setTags([
            ...tags,
            tag
        ])
        setTagList(tagList.filter(t => t.id !== tagId))
    }
    function removeTag(tagId){
        const tag = tags.find(t => t.id === tagId)
        setTags(tags.filter(t => t.id !== tagId))
        if(tagList.find(t => t.id === tagId)){
            return
        }
        setTagList([
            ...tagList,
            tag
        ])
    }
    
    return (
        <div className={showAddDish ? "add-dish modal-active" : "add-dish"} onClick={() => setShowAddDish(false)}>
            <div className="add-dish__content" onClick={e => e.stopPropagation()}>
                <div className="add-dish__inner">
                    <div className="add-dish__top">
                        <div className="add-dish__close-button" onClick={() => setShowAddDish(false)}>
                            <img src={closeImg}></img>
                        </div>
                    </div>
                    <div className="add-dish__row">

                        <div className="add-dish__photo">
                            <div className="add-dish__image">
                                <img src={dishImg}></img>
                            </div>
                            <button className="add-dish__add-photo-button" onClick={() => document.getElementById('imageInput').click()}>Додати фото</button>
                            <input id="imageInput" type="file"  onChange={e => setImage(e.target.files[0])} ></input>
                        </div>

                        <div className="add-dish__top-column">
                            <label>
                                <div className="add-dish__question-img">
                                    <img src={questionImg}></img>    
                                </div>
                                Назва страви    
                            </label>
                            <input className="add-dish__name" type="text" value={name} onChange={e => setName(e.target.value)}></input>
                            <label>
                                <div className="add-dish__question-img">
                                    <img src={questionImg}></img>    
                                </div>
                                Опис страви 
                            </label>
                            <textarea value={description} onChange={e => setDescription(e.target.value)}></textarea>
                            <label>
                                <div className="add-dish__question-img">
                                    <img src={questionImg}></img>    
                                </div>
                                З чого складається страва 
                            </label>
                            <textarea className="add-dish__textarea-ingredient" value={ingredients} onChange={e => setIngredients(e.target.value)}></textarea>
                        </div>

                        <div className="add-dish__top-column">
                            <div>
                                <label>
                                    <div className="add-dish__question-img">
                                        <img src={questionImg}></img>    
                                    </div>
                                    Ціна, грн    
                                </label>
                                <input className="add-dish__time" type="text" value={price} onChange={e => setPrice(e.target.value)}></input>
                            </div>
                            <div>
                                <label>
                                    <div className="add-dish__question-img">
                                        <img src={questionImg}></img>    
                                    </div>
                                    Час приготування, хв.    
                                </label>
                                <input className="add-dish__time" type="text" value={cookingTime} onChange={e => setCookingTime(e.target.value)}></input>
                            </div>
                            <div>
                                <label>
                                    <div className="add-dish__question-img">
                                        <img src={questionImg}></img>    
                                    </div>
                                    Вага, грам    
                                </label>
                                <input className="add-dish__time" type="text" value={weight} onChange={e => setWeight(e.target.value)}></input>
                            </div>
                            <div>
                                <label>
                                    <div className="add-dish__question-img">
                                        <img src={questionImg}></img>    
                                    </div>
                                    Активність    
                                </label>
                                <select className="add-dish__is-active" value={isActive} onChange={e => setIsActive(e.target.value)}>
                                    <option value={true}>Активна</option>
                                    <option value={false}>Не активна</option>
                                </select>
                            </div>
                        </div>
                    </div> 


                    <div className="add-dish__row">
                        <div className="add-dish__categories">
                            <label>
                                <div className="add-dish__question-img">
                                    <img src={questionImg}></img>    
                                </div>
                                Категорія    
                            </label>
                            <select className="add-dish__is-active" value={categoryId} onChange={e => setCatehoryId(e.target.value)}>
                                {categoryList.map(c => {
                                    if(c.id === categoryId){
                                        return <option value={c.id} selected>{c.name}</option>
                                    } else {
                                        return <option value={c.id}>{c.name}</option>
                                    }
                                })}
                            </select>
                        </div>
                        
                        <div className="add-dish__tags">
                            <label>
                                <div className="add-dish__question-img">
                                    <img src={questionImg}></img>    
                                </div>
                                Теги    
                            </label>
                            <div className="add-dish__selected-tags">
                                {tags.map(tag => {
                                    return <div className="add-dish__tag_selected-tags">{tag.name} <span onClick={() => removeTag(tag.id)}><img src={closeImg}></img></span></div>
                                })}
                            </div>
                            <div className="add-dish__tag-list">
                                {tagList.map(tag => {
                                    return <div className="add-dish__tag_tag-list" onClick={() => addTag(tag.id)}>{tag.name}</div>
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="add-dish__bottom">
                        <button className="add-dish__save-button" onClick={sendAddDish}>Зберегти</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default AddDish