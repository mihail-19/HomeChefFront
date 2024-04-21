import { useEffect, useState } from "react"
import { getCities, addCity, removeCity, addDishCategory, getDishCategories, removeDishCategory, getTags, addTag, removeTag  } from "../../services/DataService"
import '../../pages/Cabinet.css'
import removeImg from '../../assets/delete.png'
import { useNavigate } from "react-router-dom"
const CabinetAdminAddData = ({person}) => {
    const [loading, setLoading] = useState(true)
    const [city, setCity] = useState('')
    const [cities, setCities] = useState([])
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([])
    const [tag, setTag] = useState('')
    const [tags, setTags] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        if(person && person.authorities){
            setLoading(false)
            if(person.authorities.find(a => a.authority === 'admin') === undefined){
                navigate("/HomeChefFront")
            }
        }
    },[person])

    useEffect(() => {
        loadCities()
        loadCategories()
        loadTags()
    }, [])
    async function loadCities(){
        const {data} = await getCities()
        setCities(data)
    }
    async function loadCategories(){
        const {data} = await getDishCategories()
        setCategories(data)
    }
    async function loadTags(){
        const {data} = await getTags()
        setTags(data)
    }


    async function sendAddCity(){
        await addCity(city)
        loadCities()
    }
    async function sendAddCategory(){
        await addDishCategory(category)
        loadCategories()
    }
    async function sendAddTag(){
        await addTag(tag)
        loadTags()
    }

    async function sendRemoveCity(id){
        await removeCity(id)
        loadCities()
    }
    async function sendRemoveCategory(id){
        await removeDishCategory(id)
        loadCategories()
    }
    async function sendRemoveTag(id){
        await removeTag(id)
        loadTags()
    }

    if(loading){
        return <div className="admin-add-data">Завантажуємо...</div>
    }

    return(
        <div className="admin-add-data">
            <div className="admin-add-data__segment">
                <h3>Міста</h3>
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
            <div className="admin-add-data__segment">
                <h3>Категорії страв</h3>
                <label>Додати категорію</label>
                <div className="admin-add-data__input-element">
                    <input type="text" value={category} onChange={e => setCategory(e.target.value)}></input>
                    <button onClick={sendAddCategory}>Додати</button>
                </div>
                <div className="admin-add-data__data-container">
                    {categories.map(c => {
                        return <div className="admin-add-data__data">{c.name} <button onClick={() => sendRemoveCategory(c.id)}><img src={removeImg}></img></button></div>
                    })}
                </div>
            </div>
            <div className="admin-add-data__segment">
                <h3>Теги</h3>
                <label>Додати тег</label>
                <div className="admin-add-data__input-element">
                    <input type="text" value={tag} onChange={e => setTag(e.target.value)}></input>
                    <button onClick={sendAddTag}>Додати</button>
                </div>
                <div className="admin-add-data__data-container">
                    {tags.map(t => {
                        return <div className="admin-add-data__data">{t.name} <button onClick={() => sendRemoveTag(t.id)}><img src={removeImg}></img></button></div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default CabinetAdminAddData