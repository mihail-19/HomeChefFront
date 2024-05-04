import { useState } from 'react'
import { getChef, registerChef } from '../../services/ChefService'
import { getPerson } from '../../services/PersonService'
import LocalityList from '../LocalityList'

const CabinetMyProfile = ({person, setPerson}) => {
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
    const [firstName, setFirstName] = useState(person.firstName)
    const [email, setEmail] = useState(person.email)
    const [phone, setPhone] = useState('')
    const [cityId, setCityId] = useState(person.city ? profileData.city.id : null)
    const [cityName, setCityName] = useState('')
    const [locality, setLocality] = useState({})
    const [isActiveLocality, setIsActiveLocality] = useState(false)
    const [description, setDecription] = useState('')
    const [address, setAddress] = useState('')
    const [legalStatusId, setLegalStatusId] = useState(1)
    const [isActive, setIsActive] = useState(true)
    async function sendRegisterChef(){
        const tempPerson = {firstName: firstName, email: email}
       
        const chef = {
            person: tempPerson,
            phone: phone,
            description: description,
            address: address,
            isActive: isActive,
        }
        const {data} = await registerChef(chef)
        const res = await getPerson()
        setPerson(res.data)
    }

    function searchCity(name){
        setCityName(name)
        if(name.length > 2){
            setIsActiveLocality(true)
        } else {
            setIsActiveLocality(false)
        }
    }
    function setLocalityAndName(locality){
        //todo chef profile city change to locality
        setCityName(locality.name)
    }

    return (
        <div className="profile">
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
                    </div>
                    <div className='profile__info-column'>
                        <div className='profile__info-element'>
                            <label className='profile__info-tag'>
                                Про мене
                            </label>
                            <textarea value={description} onChange={e => setDecription(e.target.value)}></textarea>
                        </div>
                    </div>
                    
                </div>
                <div className='profile__info-row'>
                    <div className='profile__info-column'>
                        <div className='profile__info-element'>
                            <label className='profile__info-tag'>
                                Місто 
                            </label>
                            <input type="text" className='profile__info-input' value={cityName} onChange={e => searchCity(e.target.value)}></input>
                            <div className='profile__locality-container'>
                                <LocalityList isActive={isActiveLocality} setIsActive={setIsActiveLocality} setLocality={setLocalityAndName} name={cityName}/>
                            </div> 
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
                        <div></div>
                    <div className='profile__info-element'>
                            <label className='profile__info-tag'>
                                Активність 
                            </label>
                            <select value={isActive} onChange={e => setIsActive(e.target.value)}>
                                <option value={true}>Активний</option>
                                <option value={false}>Не активний</option>
                            </select> 
                        </div>
                        
                    </div>
                </div>
                <button className='profile__submit-button' onClick={sendRegisterChef}>Зберегти зміни</button>
            </div>
        </div>
    )
}

export default CabinetMyProfile