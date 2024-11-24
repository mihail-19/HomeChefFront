import { useEffect, useState, useRef } from "react"
import { getCities, updateCities, removeCity, addDishCategory, getDishCategories, removeDishCategory, getTags, addTag, removeTag, getKitchenTypes, addKitchenType, deleteKitchenType, updateDishCategory, updateTag, updateKitchenType  } from "../../services/DataService"
import '../../pages/Cabinet.css'
import removeImg from '../../assets/delete.png'
import { useNavigate } from "react-router-dom"
import Snackbar from "../utility/Snackbar"
import Loading from "../utility/Loading"
import ModalCenter from "../utility/ModalCenter"
const CabinetAdminAddData = ({person}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [city, setCity] = useState('')
    const [cities, setCities] = useState([])
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([])
    const [tag, setTag] = useState('')
    const [tags, setTags] = useState([])
    const [kitchenType, setKitchenType] = useState('')
    const [kitchenTypes, setKitchenTypes] = useState([])
    const [showUpdate, setShowUpdate] = useState(false)
    const [updatedEntity, setUpdatetEntity] = useState(null)
    const [newName, setNewName] = useState('')
    const snackbarRef = useRef(null)
    const navigate = useNavigate()
    useEffect(() => {
        if(person && person.authorities){
            setIsLoading(false)
            if(person.authorities.find(a => a.authority === 'admin') === undefined){
                navigate("/HomeChefFront")
            }
        }
    },[person])

    useEffect(() => {
        loadCities()
        loadCategories()
        loadTags()
        loadKitchenTypes()
    }, [])
    async function loadCities(){
        const {data} = await getCities()
        setCities(data)
    }
    async function loadCategories(){
        const {data} = await getDishCategories()
        data.sort(compare)
        setCategories(data)
    }
    async function loadTags(){
        const {data} = await getTags()
        data.sort(compare)
        setTags(data)
    }
    async function loadKitchenTypes(){
        const {data} = await getKitchenTypes()
        data.sort(compare)
        setKitchenTypes(data)
    }
    function compare( a, b ) {
        if(!a || !b || !a.name || !b.name){
            return 0
        }
        if ( a.name < b.name ){
          return -1;
        }
        if ( a.name > b.name ){
          return 1;
        }
        return 0;
      }


    async function sendUpdateCities(){
        setIsLoading(true)
        await updateCities(city)
        setIsLoading(false)
        snackbarRef.current.show('Дані міст оновлено', false)
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

    async function sendAddKitchenType(){
        await addKitchenType(kitchenType)
        loadKitchenTypes()
    }
    async function sendRemoveKitchenType(id){
        await deleteKitchenType(id)
        loadKitchenTypes()
    }


    async function sendUpdateCategory(id, name){
        const res = await updateDishCategory(id, name)
        loadCategories()
        setNewName('')
        setUpdatetEntity(null)
        setShowUpdate(false)
    }
    async function sendUpdateTag(id, name){
        await updateTag(id, name)
        loadTags()
        setNewName('')
        setUpdatetEntity(null)
        setShowUpdate(false)
    }
    async function sendUpdateKitchenType(id, name){
        await updateKitchenType(id, name)
        loadKitchenTypes()
        setNewName('')
        setUpdatetEntity(null)
        setShowUpdate(false)
    }


    

    function openUpdateWindow(type, entity){
        setUpdatetEntity({type:type, entity: entity})
        setNewName(entity.name)
        setShowUpdate(true)
    }


    return(
        <div className="admin-add-data">
            <ModalCenter isActive={showUpdate} setIsActive={setShowUpdate} content={windowContent()}/>
            <Loading isActive={isLoading} setIsActive={setIsLoading}/>
            <Snackbar ref={snackbarRef}/>
            <div className="admin-add-data__segment">
                <h3>Міста</h3>
                <label>Населені пункти</label>
                <div className="admin-add-data__input-element">
                    <button onClick={sendUpdateCities}>Оновити</button>
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
                        return <div className="admin-add-data__data"><span onClick={() => openUpdateWindow('category', c)}>{c.name}</span> <button onClick={() => sendRemoveCategory(c.id)}><img src={removeImg}></img></button></div>
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
                        return <div className="admin-add-data__data"><span onClick={() => openUpdateWindow('tag', t)}>{t.name}</span> <button onClick={() => sendRemoveTag(t.id)}><img src={removeImg}></img></button></div>
                    })}
                </div>
            </div>
            <div className="admin-add-data__segment">
                <h3>Тип кухні</h3>
                <label>Додати тип кухні</label>
                <div className="admin-add-data__input-element">
                    <input type="text" value={kitchenType} onChange={e => setKitchenType(e.target.value)}></input>
                    <button onClick={sendAddKitchenType}>Додати</button>
                </div>
                <div className="admin-add-data__data-container">
                    {kitchenTypes.map(t => {
                        return <div className="admin-add-data__data"><span onClick={() => openUpdateWindow('kitchenType', t)}>{t.name}</span> <button onClick={() => sendRemoveKitchenType(t.id)}><img src={removeImg}></img></button></div>
                    })}
                </div>
            </div>
        </div>
    )

    function windowContent(){
        if(!updatedEntity || !newName){
            return <></>
        }
        
        function onSubmitUpdate(){
            if(updatedEntity.type === 'category'){
                sendUpdateCategory(updatedEntity.entity.id, newName)
            } else if (updatedEntity.type === 'tag'){
                sendUpdateTag(updatedEntity.entity.id, newName)
            } else if (updatedEntity.type === 'kitchenType'){
                sendUpdateKitchenType(updatedEntity.entity.id, newName)
            }
        }
        

        var type
        if(updatedEntity.type === 'category'){
            type = 'категорію'
        } else if (updatedEntity.type === 'tag'){
            type = 'тег'
        } else if (updatedEntity.type === 'kitchenType'){
            type = 'тип кухні'
        }
        return (
            <div className="admin-add-data__update">
                <h3>Внесення змін в {type}</h3>
                <input type="text" value={newName} onChange={e => setNewName(e.target.value)}></input>
                <button onClick={onSubmitUpdate}>Зберегти</button>
            </div>
        )
    }
}

export default CabinetAdminAddData