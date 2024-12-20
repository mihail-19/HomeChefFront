import { useEffect, useState } from "react"
import AddDish from "./AddDish"
import UpdateDish from './UpdateDish'
import '../../pages/Cabinet.css'
import { useOutletContext } from "react-router-dom"
import serverUrl from "../../serverUrl"
import imagesUrl from "../../imagesUrl"
import { removeDish} from "../../services/DishService"
const CabinetChefMenu = () =>{
    const [showAddDish, setShowAddDish] = useState(false)
    const context = useOutletContext()
    const [dishes, setDishes] = useState([])
    const [showUpdateDish, setShowUpdateDish] = useState(false)
    const [dishToUpdate, setDishToUpdate] = useState(null)
    const MAX_DISHES = 15
    function openAddDishWindow(){
        setShowAddDish(true)
    }
    useEffect(() => {
        console.log('cabinetChefMenu use effect')
        if(context && context.chef && context.chef.dishes){
            console.log(context.chef.dishes)
            setDishes(context.chef.dishes)
        }
    }, [context])

    async function sendRemoveDish(id){
        console.log('remove dish')
        await removeDish(id)
        context.loadChef()
    }
    return(
        <div className="chef-menu">
            <div className="chef-menu__top">
               
                    <div className="chef-menu__add-dish">
                        <div className="chef-menu__add-dish-image">
                        
                        </div>
                        {!dishes || dishes.length < MAX_DISHES && 
                        <button className="chef-menu__add-dish-button" onClick={openAddDishWindow}>Додати страву</button>
                        }
                         {dishes && dishes.length >= MAX_DISHES && 
                            <div>
                            Досягнуто ліміт страв у {MAX_DISHES} одиниць.
                            </div>
                        }
                        <AddDish showAddDish={showAddDish} setShowAddDish={setShowAddDish}/>
                        <UpdateDish showUpdateDish={showUpdateDish} setShowUpdateDish={setShowUpdateDish} dish={dishToUpdate}/>
                    </div>
               
                    
                <div className="chef-menu__dishes">
                    {dishes.map(dish => {
                        return <div className="chef-menu__dish">
                           
                            <div className="chef-menu__dish-img" >
                                <img src={imagesUrl + dish.imageURL}></img>
                                
                            </div>
                            <div className="chef-menu__dish-info">
                                <div className="chef-menu__dish-name">Назва: <b>{dish.name}</b></div>
                                <div className="chef-menu__dish-description" style={{overflow: 'hidden', wordWrap: 'break-word'}}>Опис: {dish.description}</div>
                                <div className="chef-menu__dish-row">
                                    <div className="chef-menu__dish-param">Ціна: {dish.price} грн</div>
                                    <div className="chef-menu__dish-param">Вага: {dish.weight} гр.</div>
                                    <div className="chef-menu__dish-param">Час пригот.: {dish.cookingTime} хв.</div>
                                </div>
                                <div className="chef-menu__dish-row">
                                    <div className="chef-menu__dish-param">Категорія: {dish.dishCategory?.name}</div>
                                    <div className="chef-menu__dish-param">{dish.isActive ? "Активна" : "Не активна"}</div>
                                </div>
                                <div className="chef-menu__dish-tags">
                                    Теги: {dish.dishTags?.map(tag => {
                                        return <div className="add-dish__tag_selected-tags">{tag.name}</div>
                                    })}
                                </div>
                                <div className="chef-menu__dish-row">
                                    <button className="chef-menu__edit-dish-button" onClick={() => {openUpdateDishWondow(dish)}}>Редагувати</button>
                                    <button className="chef-menu__delete-dish-button" onClick={() => sendRemoveDish(dish.id)}>Видалити</button>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )

    function openUpdateDishWondow(dish){
        if(!showUpdateDish){
            setDishToUpdate(dish)
            setShowUpdateDish(true)
            
        } 
    }
}

export default CabinetChefMenu