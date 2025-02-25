import { useEffect, useRef, useState, useCallback } from 'react'
import defaultChefIcon from "../../assets/defaultChefIcon.png"
import { getChef, updateChef } from '../../services/ChefService'
import { Link, useOutletContext } from 'react-router-dom'
import { updateImage } from '../../services/PersonService'
import Snackbar from '../utility/Snackbar'
import Loading from '../utility/Loading'
import serverUrl from '../../serverUrl'
import imagesUrl from '../../imagesUrl'
import LocalityList from '../LocalityList'
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
const CabinetMyProfile = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [legalStatusId, setLegalStatusId] = useState(null)
    const [isActive, setIsActive] = useState(false)
    const [image, setImage] = useState(undefined)
    const [imageUrl, setImageUrl] = useState(defaultChefIcon)
    const [locality, setLocality] = useState({})
    const [localityName, setLocalityName] = useState('')
    const [isActiveLocality, setIsActiveLocality] = useState(false)
    const [position, setPosition] = useState(null)
    const [hasSelfPickup, setHasSelfPickup] = useState(false)
    const snackbarRef = useRef(null)
    const context = useOutletContext()
    const localitySearchClickListener = useCallback((e) => {
        if(!document.getElementById("menu-localities").contains(e.target)){
            setIsActiveLocality(false)
            document.removeEventListener('click', localitySearchClickListener)
        }
    })
    useEffect(() => {
        L.Icon.Default.mergeOptions({
          iconUrl: '/leaflet/images/marker-icon.png',
          iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
          shadowUrl: '/leaflet/images/marker-shadow.png',
        });
      }, []);
    useEffect(() =>{
        if(context && context.chef){
            setFirstName(context.chef.firstName)
            setEmail(context.chef.email)
            setPhone(context.chef.phone)
            setDescription(context.chef.description)
            setAddress(context.chef.address)
            setLegalStatusId(0)
            setIsActive(context.chef.isActive)
            setImageUrl(imagesUrl + context.chef.imageURL)
            setIsLoading(false)
            setLocality(context.chef.locality)
            setLocalityName(context.chef.locality ? context.chef.locality.name : '')
            setHasSelfPickup(context.chef.hasSelfPickup)
            if(context.chef.geoLocation){
                setPosition({lat: context.chef.geoLocation.lattitude, lng: context.chef.geoLocation.longitude})
            }
            // if(context.chef.person.locality){
            //     setLocalityName(locality.name)
            // }
        }
    }, [context])

    

    let profileData = 
        {
            id: 1,
            username: "inna_chef",
            firstName: "Інна",
            email: "inna@gmail.com",
            phone: "0111111111",
            city: {id:1, name:"Київ"},
            index: "1114",
            description: "Lorem ipsum dolor sit amet consectetur. Ullamcorper congue nunc in ut turpis sed auctor nulla tempus. Sit malesuada morbi libero praesent. Ullamcorper congue nunc in ut turpis sed auctor nulla tempus. Sit malesuada morbi libero praesent.Ullamcorper congue nunc in ut turpis sed auctor nulla tempus. Sit malesuada morbi libero praesent.",
            address: "просп. Незалежності, 12",
            isActive: true,
            legalStatus: {id:2, value:"фізична особа-підприємець"},
            imageUrl: null
        }
    let cityList = 
        [
            {id:1, name:"Київ"},
            {id:2, name:"Харків"}
        ]
    let legalStatusList = 
        [
            {id:1, value:"фізична особа"},
            {id:2, value:"фізачни особа-підприємець"},
            {id:3, value:"самозайнята особа"}
        ]
     
   
     async function saveChef(){
        const chef = {
            firstName: firstName,
            phone: phone,
            description: description,
            address: address,
            isActive: isActive,
            email: email,
            localityId: locality.id,
            longitude: position?.lng,
            lattitude: position?.lat,
            hasSelfPickup: hasSelfPickup
        }
        setIsLoading(true)
        try{
            await updateChef(chef)
            if(image){
                await updateImage(image)
            }
            snackbarRef.current.show('Дані оновлено', false)
            context.loadChef()
        } catch(error){
            snackbarRef.current.show('Помилка: ' + error.response.data, true, 5000)
        } finally{
            setIsLoading(false)
        }
     }
     function setLocalityAndName(locality){
        //todo chef profile city change to locality
        setLocality(locality)
        setLocalityName(locality.name)
    }  

   
    function searchCity(name){
        setLocalityName(name)
        document.addEventListener('click', localitySearchClickListener)
        setIsActiveLocality(true)
    }
    return (
        <div className="profile">
            <Loading isActive={isLoading} setIsActive={setIsLoading}/>
            <Snackbar ref={snackbarRef}/>
            <div className="profile__top">
                <div className="profile__user-image">
                    {!image && 
                        <img src={context && context.chef && context.chef.imageURL ? imagesUrl + context.chef.imageURL : defaultChefIcon}></img>
                    }
                    {image && 
                        <img src={URL.createObjectURL(image)}></img>
                    }
                </div>
                <div className='profile__id'>{context?.chef?.username} #{context?.chef?.id}</div>
            </div>
            <div className='profile__top-button-container'>
                <button className='profile__update-photo-button' onClick={() => document.getElementById('imageInput').click()} >Редагувати</button>
                <input id="imageInput" type="file"  onChange={e => setImage(e.target.files[0])} ></input>
            </div>
            <div className='profile__info'>
                <div className='profile__info-inputs'>
                    <div className='profile__info-row'>
                        <div className='profile__info-column'>
                            <div className='profile__info-element'>
                                <label className='profile__info-tag'>
                                    Ім'я
                                </label>
                                <input type="text" className='profile__info-input' value={firstName} onChange={e => setFirstName(e.target.value)}></input>
                            </div>
                            <div className='profile__info-element'>
                                <label className='profile__info-tag'>
                                    Пошта
                                </label>
                                <input type="text" className='profile__info-input' value={email} onChange={e => setEmail(e.target.value)} disabled></input>
                            </div>
                            <div className='profile__info-element'>
                                <label className='profile__info-tag'>
                                    Номер телефону
                                </label>
                                <input type="text" className='profile__info-input' value={phone} onChange={e => setPhone(e.target.value)}></input>
                            </div>
                        </div>
                        <div className='profile__info-column'>
                            <div className='profile__info-element'>
                                <label className='profile__info-tag'>
                                    Про мене
                                </label>
                                <textarea value={description} onChange={e => setDescription(e.target.value)}></textarea>
                            </div>
                        </div>
                        
                    </div>
                    <div className='profile__info-row'>
                        <div className='profile__info-column'>
                            <div id="menu-localities" className='profile__info-element'>
                                <label className='profile__info-tag'>
                                    Місто 
                                </label>
                                <input type="text" className='profile__info-input' value={localityName} onFocus={(e) => searchCity(e.target.value)} onChange={e => searchCity(e.target.value)}></input>
                                <div className='profile__locality-container'>
                                    <LocalityList isActive={isActiveLocality} setIsActive={setIsActiveLocality} setLocality={setLocalityAndName} name={localityName}/>
                                </div> 
                            </div>
                            <div className='profile__info-element'>
                                <label className='profile__info-tag'>
                                    Статус
                                </label>
                                <select value={legalStatusId} onChange={e => setLegalStatusId(e.target.value)}>
                                    {legalStatusList.map(ls => {
                                        return <option value={ls.id}>{ls.value}</option>
                                    })}
                                </select> 
                            </div>
                            
                            
                        </div>
                        <div className='profile__info-column'>
                            <div className='profile__info-element'>
                                <label className='profile__info-tag'>
                                    Адреса
                                </label>
                                <input type="text" className='profile__info-input' value={address} onChange={e => setAddress(e.target.value)}></input>
                            </div>
                            <div className='profile__info-element'>
                                <label className='profile__info-tag'>
                                    Активність 
                                </label>
                                <select value={isActive} onChange={e => setIsActive(e.target.value)}>
                                    <option value={true}>Активний</option>
                                    <option value={false}>Не активний</option>
                                </select> 
                            </div>
                            <div className='profile__info-element'>
                            <label className='checkbox-container'> Самовивіз
                                 <input type='checkbox' style={{width: '20px', height: '20px'}} checked={hasSelfPickup} onChange={() => setHasSelfPickup(!hasSelfPickup)}></input> 
                                 <span className='checkbox-checkmark'></span>
                            </label>
                            
                        </div>
                            
                        </div>
                        
                    </div>
            </div>
                <div className='profile__map-container'>
                    <label className='profile__info-tag'>
                    {position?.lat} {position?.lng}
                    </label>
                    <div className='profile__info-map'>
                        <MapContainer center={[49.991034, 36.229475]} zoom={13} >
                            <ChangeView center={position} zoom={13}/>
                            <TileLayer  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <AddMarker/>
                        </MapContainer>
                    </div>
                </div>
            </div>
            <button className='profile__submit-button' onClick={saveChef}>Зберегти зміни</button>
            <div className='profile__change-credentials'>
                <h3>Зміна даних для авторизації</h3>
                <Link    to="/cabinet/change-password" className='profile__change-pwd-button'>Змінити пароль</Link>
            </div>
        </div>
    
    )
    function ChangeView({center, zoom}){
        const map = useMap()
        if(center){
            map.setView(center)
        }
        return null

    }
    function AddMarker(){
        
        const map = useMapEvents({
           
            click: (e) => {
                const corrected = {lat: e.latlng.lat.toPrecision(8), lng: e.latlng.lng.toPrecision(8)}
                setPosition(corrected)
            }
        })
        return position ? <Marker position={position}></Marker> : null
    }
}

export default CabinetMyProfile