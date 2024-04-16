import { useState } from "react"
import AddDish from "./AddDish"
import '../../pages/Cabinet.css'
const CabinetChefMenu = () =>{
    const [showAddDish, setShowAddDish] = useState(false)
    function openAddDishWindow(){
        setShowAddDish(true)
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
            </div>
        </div>
    )
}

export default CabinetChefMenu