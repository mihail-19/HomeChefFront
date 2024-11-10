import { useParams } from "react-router-dom"
import { getDishesForChefPaged } from "../services/DishService"
import DishCard from "../elements/DishCard"
import { isDishLocalityValidToUser } from "../services/CartService"
import Loading from "../elements/utility/Loading"


const ChefDishes = () => {
    const PAGE_SIZE = 10
    const {id, pageNumber} = useParams()
    const [loading, setLoading] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [dishes, setDishes] = useState([])
   
    useState(() => {
        loadDishes()
    }, [])
   
    const loadDishes = async () => {
        const pageNum = pageNumber ? pageNumber-1 : 0
        const {data} = await getDishesForChefPaged(pageNum, PAGE_SIZE, id)
        if(data.totalPages !== totalPages){
            setTotalPages(data.totalPages)
        }
        setDishes(data.content)
        setTotalDishes(data.totalElements)
    }
    async function sendAddToCart(dish){
       
        dishToSave.current = dish
        const locality = JSON.parse(localStorage.getItem('locality'))
        if(!isDishLocalityValidToUser(dish, locality)){
            let txt
            if(locality){
                txt ='Блюдо готується в населеному пункті ' + dish.chef.locality.name + ', Ви обрали місто ' + locality?.name + '. Все одно додати в кошик?'
                
            } else {
                txt ='Блюдо готується в населеному пункті ' + dish.chef.locality.name + ', а Ви не обрали місто. Все одно додати в кошик?'
            }
            confirmRef.current.show(txt)
        } else {
            sendAfterConfirmed()
        }
        
       
    }
    async function sendAfterConfirmed(){
        // if(!isDishLocalityValidCartLocalities(dishToSave.current, cart)){
        //     snackbarRef.current.show(<div>Не можна додавати страви з різних міст <Link to="/cart">Кошик</Link></div>, true, 5000)
        //     return
        // }
        setLoading(true)
        
        await addDishToCart(dishToSave.current)
        loadCart()
        setLoading(false)
    }

    return (
        <div className="chef-dishes">
             <Loading isActive={loading} seIsActive={setLoading}/>
            <div className="chef-dishes__dish-list">
                {dishes?.map(dish => {
                    return <DishCard dish={dish} sendAddToCart={sendAddToCart}/>
                })}
                
            </div>
        </div>
    )

    
}


export default ChefDishes




function parse(paramsString){
    if(!paramsString || paramsString.length === 0){
        return undefined
    }
    const paramsSplitted = paramsString.split(';')
    const paramsObject = {}
    paramsSplitted.forEach(element => {
        const param = element.split('=')
        if(param.length > 1){
            if(param[0] === 'page'){
                paramsObject.page = parseInt(param[1])
            } else if(param[0] === 'chef'){
                paramsObject.chef = parseInt(param[1])
            }
        }
    });
    return Object.keys(paramsObject).length > 0 ? paramsObject : undefined
}


function stringify(params){
    if(!params){
        return ''
    }
    let res = ''
    if(params.page && params.page > 1){
        if(res.length > 0){
            res += ';'
        }
        res += 'page=' + params.page
    }
    if(params.chef && isFinite(params.chef)){
        if(res.length > 0){
            res += ';'
        }
        res += 'chef=' + params.chef
    }
    
    return res
}