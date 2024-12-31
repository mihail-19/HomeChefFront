import { useEffect, useState } from "react"
import {getAllChefs} from '../services/ChefService'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import L from 'leaflet';
import defaultChefIcon from "../assets/defaultChefIcon.png"
import imagesUrl from "../imagesUrl"
import rankingIcon from "../assets/rankingIcon.png" 
import './Chefs.css'
import { Icon } from "leaflet"
import { Link } from "react-router-dom"
const ChefsMap = () => {
    const [chefs, setChefs] = useState([])
    useEffect(() => {
        L.Icon.Default.mergeOptions({
          iconUrl: '/leaflet/images/marker-icon.png',
          iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
          shadowUrl: '/leaflet/images/marker-shadow.png',
        });
      }, []);
    useEffect(() => {
        loadChefs()
    }, [])

    async function loadChefs(){
        const {data} = await getAllChefs(null, true)
        setChefs(data.content)
    }

    return (
        <div className="chefs-map">
            <h1>Наші шефи на карті</h1>
            <div className="chefs-map__params">

            </div>
            <div className="chef-map__map-container">
                 <div className="chefs-map__map">
                    <MapContainer center={[49.35375571830993, 32.29980468750001]} zoom={6} minZoom={5}>
                        
                        <TileLayer  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {chefs.filter(c => c.geoLocation).map(chef => {
                            
                           return <Marker position={[chef.geoLocation.lattitude, chef.geoLocation.longitude]}>
                                <Popup>
                                    <Link to={"/chef/" + chef.id} className="chefs-map__popup">
                                        <div className="chefs-map__popup-name"><b>{chef.firstName}</b></div>
                                        <div className="chefs-map__popup-img">
                                            <img src={chef.imageURL ? imagesUrl + chef.imageURL : defaultChefIcon}></img>
                                        </div>
                                        <div className="chefs__chef-rating chefs-map__popup-rating">
                                            <span><img src={rankingIcon}></img></span>
                                            {buildRank(chef?.ranking)}
                                        </div>
                                        <div className="chefs-map__popup-dishes">Страв: {chef.dishNumber}</div>
                                    </Link>
                                </Popup>
                           </Marker>
                        })}
                    </MapContainer>
                </div>
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

export default ChefsMap