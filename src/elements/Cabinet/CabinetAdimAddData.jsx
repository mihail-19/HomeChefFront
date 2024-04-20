import { useEffect, useState } from "react"
import { getCities, addCity, removeCity, addDishCategory, getDishCategories, removeDishCategory, getTags, addTag, removeTag  } from "../../services/DataService"
import '../../pages/Cabinet.css'
import removeImg from '../../assets/delete.png'
import { useNavigate } from "react-router-dom"
const CabinetAdminAddData = ({person}) => {
    const [city, setCity] = useState('')
    const [cities, setCities] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        
        loadCities()
    }, [])
    async function loadCities(){
        const {data} = await getCities()
        setCities(data)
    }
    async function sendAddCity(){
        await addCity(city)
        loadCities()
    }
    async function sendRemoveCity(id){
        await removeCity(id)
        loadCities()
    }
   
    return(
        <div className="admin-add-data">
            <div className="admin-add-data__segment">
                <h3>Список міст</h3>
                <label>Додати місто</label>
                <div className="admin-add-data__input-element">
                    <input type="text" value={city} onChange={e => setCity(e.target.value)}></input>
                    <button onClick={sendAddCity}>Додати</button>
                </div>
                <div className="admin-add-data__data-container">
                    {cities.map(city => {
                        return <div className="admin-add-data__data">{city.name} <button onClick={() => sendRemoveCity(city.id)}><img src={removeImg}></img></button></div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default CabinetAdminAddData