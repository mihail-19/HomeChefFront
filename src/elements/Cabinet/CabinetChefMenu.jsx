import { useEffect, useState } from "react"
import AddDish from "./AddDish"
import '../../pages/Cabinet.css'
import { useOutletContext } from "react-router-dom"
import serverUrl from "../../serverUrl"
const CabinetChefMenu = () =>{
    const [showAddDish, setShowAddDish] = useState(false)
    const context = useOutletContext()
    const [dishes, setDishes] = useState([])
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
                            <div className="chef-menu__dish-img">
                                <img src={serverUrl + dish.imageURL}></img>
                                
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
                                    <div className="chef-menu__dish-param">Категорія: {dish.dishCategory}</div>
                                    <div className="chef-menu__dish-param">{dish.isActive ? "Активна" : "Не активна"}</div>
                                </div>
                                <div className="chef-menu__dish-row">
                                    <button className="chef-menu__edit-dish-button">Редагувати</button>
                                    <button className="chef-menu__delete-dish-button">Видалити</button>
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