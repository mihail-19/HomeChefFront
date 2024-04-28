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
                    <button className="chef-menu__add-dish-button" onClick={openAddDishWindow}>Додати страву</button>
                    <AddDish showAddDish={showAddDish} setShowAddDish={setShowAddDish}/>
                    
                </div>
                <div className="chef-menu__dishes">
                    {dishes.map(dish => {
                        return <div className="chef-menu__dish">
                            <UpdateDish showUpdateDish={showUpdateDish} setShowUpdateDish={setShowUpdateDish} dish={dish}/>
                            <div className="chef-menu__dish-img" >
                                <img src={imagesUrl + dish.imageURL}></img>
                                
                            </div>
                            <div className="chef-menu__dish-info">
                                <div className="chef-menu__dish-name">Назва: <b>{dish.name}</b></div>
                                <div className="chef-menu__dish-description">Опис: {dish.description}</div>
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
                                    <button className="chef-menu__edit-dish-button" onClick={() => {if(!showUpdateDish) setShowUpdateDish(true)}}>Редагувати</button>
                                    <button className="chef-menu__delete-dish-button" onClick={() => sendRemoveDish(dish.id)}>Видалити</button>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default CabinetChefMenu