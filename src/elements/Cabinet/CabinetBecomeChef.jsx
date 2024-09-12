import { useCallback, useEffect, useRef, useState } from 'react'
import { getChef, registerChef } from '../../services/ChefService'
import { getPerson } from '../../services/PersonService'
import LocalityList from '../LocalityList'
import Loading from '../utility/Loading'
import Snackbar from '../utility/Snackbar'
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import SelectMultiple from '../utility/SelectMultiple'
import { getKitchenTypes } from '../../services/DataService'

const CabinetMyProfile = ({person, setPerson}) => {
    
    let legalStatusList = 
        [
            {id:1, value:"фізична особа"},
            {id:2, value:"фізачни особа-підприємець"},
            {id:3, value:"самозайнята особа"}
        ]

    const [isLoading, setIsLoading] = useState(false)
    const snackbarRef = useRef(null)

    const [firstName, setFirstName] = useState(person.firstName)
    const [email, setEmail] = useState(person.email)
    const [phone, setPhone] = useState('')
    const [cityName, setCityName] = useState(person && person.locality ? person.locality.name : '')
    const [locality, setLocality] = useState({})
    const [isActiveLocality, setIsActiveLocality] = useState(false)
    const [description, setDecription] = useState('')
    const [address, setAddress] = useState('')
    const [legalStatusId, setLegalStatusId] = useState(1)
    const [isActive, setIsActive] = useState(true)
    const [kitchenTypes, setKitchenTypes] = useState([])
    const [chosenKitchenTypes, setChosenKitchenTypes] = useState([])
    const [hasSelfPickup, setHasSelfPickup] = useState(false)
    
    const [position, setPosition] = useState(null)
   

    useEffect(() => {
        loadKitchenTypes()
    }, [])


    async function loadKitchenTypes(){
        const {data} = await getKitchenTypes()
        setKitchenTypes(data)
    }

    async function sendRegisterChef(){
        setIsLoading(true)
        const kitchenTypeIds = chosenKitchenTypes.map(t => {
            return t.id
        })
        const chef = {
            firstName: firstName, 
            email: email, 
            localityId: locality.id,
            phone: phone,
            description: description,
            address: address,
            isActive: isActive,
            longitude: position?.lng,
            lattitude: position?.lat,
            kitchenTypeIds: kitchenTypeIds,
            hasSelfPickup: hasSelfPickup
        }
        try{
            const {data} = await registerChef(chef)
            const res = await getPerson()
            setPerson(res.data)
        } catch(error){
            snackbarRef.current.show('Помилка: ' + error.response.data, true, 5000)
        } finally{
            setIsLoading(false)
        }
        
    }

    const localitySearchClickListener = useCallback((e) => {
        if(!document.getElementById("menu-localities").contains(e.target)){
            setIsActiveLocality(false)
            document.removeEventListener('click', localitySearchClickListener)
        }
    })
    function searchCity(name){
        setCityName(name)
        document.addEventListener('click', localitySearchClickListener)
        setIsActiveLocality(true)
        // if(name.length > 1){
        //     setIsActiveLocality(true)
        // } else {
        //     setIsActiveLocality(false)
        // }
    }
    function setLocalityAndName(locality){
        //todo chef profile city change to locality
        setLocality(locality)
        setCityName(locality.name)
    }


    return (
        <div className="profile">
            <Loading isActive={isLoading} setIsActive={setIsLoading}/>
            <Snackbar ref={snackbarRef}/>
            <div className="profile__top">
                <h2>Стати шефом</h2>
            </div>
            
            <div className='profile__info'>
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
                            <input type="text" className='profile__info-input' value={email} onChange={e => setEmail(e.target.value)}></input>
                        </div>
                        <div className='profile__info-element'>
                            <label className='profile__info-tag'>
                                Номер телефону
                            </label>
                            <input type="text" className='profile__info-input' value={phone} onChange={e => setPhone(e.target.value)}></input>
                        </div>
                        <div id="menu-localities" className='profile__info-element'>
                            <label className='profile__info-tag'>
                                Місто 
                            </label>
                            <input type="text" className='profile__info-input' value={cityName} onFocus={(e) => searchCity(e.target.value)} onChange={e => searchCity(e.target.value)}></input>
                            <div  className='profile__locality-container'>
                                <LocalityList isActive={isActiveLocality} setIsActive={setIsActiveLocality} setLocality={setLocalityAndName} name={cityName}/>
                            </div> 
                        </div>
                        <div className='profile__info-element'>
                            <label className='profile__info-tag'>
                                Адреса
                            </label>
                            <input type="text" className='profile__info-input' value={address} onChange={e => setAddress(e.target.value)}></input>
                        </div>
                        
                        
                        
                        
                    </div>
                    <div className='profile__info-column'>
                        <div className='profile__info-element'>
                            <label className='profile__info-tag'>
                                Про мене
                            </label>
                            <textarea value={description} onChange={e => setDecription(e.target.value)}></textarea>
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
                        <div className='profile__info-element'>
                            <label className='profile__info-tag'>
                                Активність 
                            </label>
                            <select value={isActive} onChange={e => setIsActive(e.target.value)} >
                                <option value={true}>Активний</option>
                                <option value={false}>Не активний</option>
                            </select> 
                        </div>
                        
                        <div className='profile__info-element'>
                           <SelectMultiple name={'Тип кухні'} variants={kitchenTypes} setSelectedVariants={setChosenKitchenTypes}/>
                        </div>
                        <div className='profile__info-element'>
                            <label className='profile__info-tag' style={{padding: '0', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer'}}>
                                 <input type='checkbox' style={{width: '20px', height: '20px'}} checked={hasSelfPickup} onChange={() => setHasSelfPickup(!hasSelfPickup)}></input> Самовивіз
                            </label>
                            
                        </div>
                        
                        
                    </div>
                    <div className='profile__map-container'>
                        <label className='profile__info-tag'>
                            Мої координати: {position?.lat} {position?.lng}
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
                   
               
            </div>
            <button className='profile__submit-button' onClick={sendRegisterChef}>Зберегти зміни</button>
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