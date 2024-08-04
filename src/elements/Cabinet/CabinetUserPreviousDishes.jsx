import { useEffect, useState } from 'react'
import DishCard from '../../elements/DishCard.jsx'
import {previousDishes} from '../../services/PersonService.js'

const CabinetUserDishStory = ({person, cart, loadCart}) => {
    
    const [dishes, setDishes] = useState([])
    useEffect(() => {
        if(person){
            loadPreviousDishes()
        }
    }, [person])

    async function loadPreviousDishes(){
        const {data} = await previousDishes()
        setDishes(data)
    }

    //style
    const containerStyle = {
        fontFamily: "Montserrat",
        padding: "10px"
    }
    const dishListStyle = {
        display: "flex",
        flexWrap: "wrap",
        gap: "15px",
        width: "100%"
    }
    //

    return(
        <div style={containerStyle}>
            <div style={dishListStyle}>
                {dishes.map(dish => {
                    return  <DishCard dish={dish} />
                })}
               
            </div>
        </div>
    )

  
}

export default CabinetUserDishStory