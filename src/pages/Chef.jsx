import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getChefById } from "../services/ChefService"
import defaultChefIcon from "../assets/defaultChefIcon.png"
import imagesUrl from "../imagesUrl"
import rankingIcon from "../assets/rankingIcon.png"
import DishCard from "../elements/DishCard"
import { getDishesForChef } from "../services/DishService"
import './Chefs.css'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet"
import 'leaflet/dist/leaflet.css'
const Chef = () => {
    const {id} = useParams()
    const [chef, setChef] = useState(undefined)
    const [dishes, setDishes] = useState([])

    useEffect(() => {
        if(id){
            loadChef(id)
            loadDishes(id)
        }
    }, [])
    useEffect(() => {
        if(id){
            loadChef(id)
            loadDishes(id)
        }
    }, [id])


    const loadChef = async(chefId) => {
        const {data} = await getChefById(chefId)
        setChef(data)
    }

    const loadDishes = async(chefId) => {
        const {data} = await getDishesForChef(chefId)
        setDishes(data)
    }
   
    return (
        <div className="chef">
            
            <div className="chef__info-container">
                <div className="chef__info">
                    <div className="chef__info-top">
                        <div className="chef__info-top-left">
                            <div className="chef__chef-image">
                                <img src={chef && chef.imageURL ? imagesUrl + chef.imageURL : defaultChefIcon}></img>
                            </div>
                            <div className="chefs__chef-rating">
                                <span><img src={rankingIcon}></img></span>
                                {buildRank(chef?.ranking)}
                            </div>
                           
                        </div>
                        <div>
                            <h1>{'[' + chef?.username + ']'} {chef?.firstName}</h1>
                            <div className="chef__info-locality">{chef?.locality?.name}</div>
                            <a className="chef__info-link" href={"tel:" + chef?.phone}>{chef?.phone}</a>
                            <a className="chef__info-link" href={"mailto:" + chef?.email}>{chef?.email}</a>
                        </div>
                    </div>
                    <div className="chef__description">{chef?.description}</div>
                </div>

                {chef && chef.geoLocation && 
                    <div className="chef__map">
                        <MapContainer center={chef && chef.geoLocation ? [chef.geoLocation.lattitude, chef.geoLocation.longitude] : [49.991034, 36.229475]} zoom={13} >
                            <TileLayer  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={chef && chef.geoLocation ? [chef.geoLocation.lattitude, chef.geoLocation.longitude] : [49.991034, 36.229475]} >
                                <Popup>{chef?.username}</Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                }
            </div>
            <h3>Страви шефа {'(всього - ' + dishes?.length + ')'}</h3>
            <div className="chef__dishes">
                {dishes?.map(dish => {
                    return <DishCard dish={dish} sendAddToCart={undefined}/>
                })}
            </div>
        </div>
    )
    
    
    function buildRank(ranking){
        if(!ranking){
            return '0/0'
        }
        let voters = ranking.voters
        if(voters > 999){
            voters = voters/1000 + 'k'
        }
        return ranking.rank + '/' + voters
    }
}

export default Chef