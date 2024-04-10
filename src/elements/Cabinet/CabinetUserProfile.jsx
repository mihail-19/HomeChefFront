import { useEffect, useState } from 'react'
import defaultChefImage from '../../assets/registerLogo.png'
import { getPerson } from '../../services/PersonService'
const CabinetMyProfile = ({person}) => {
    let cityList = 
        [
            {id:1, name:"Київ"},
            {id:2, name:"Харків"}
        ]
    const [firstName, setFirstName] = useState(person.firstName)
    const [email, setEmail] = useState(person.email)
    const [isActiveCity, setIsActiveCity] = useState(person.city ? true : false)
    const [cityId, setCityId] = useState(person.city ? person.city.id : null)
    return (
        <div className="profile">
            <div className="profile__top">
                <div className="profile__user-image">
                    {person.imageUrl && <img src={person.imageUrl}></img>}
                    {!person.imageUrl && <img src={defaultChefImage}></img>}
                </div>
                <div className='profile__id'>{person.username} #{person.id}</div>
            </div>
            <div className='profile__top-button-container'>
                <button className='profile__update-photo-button'>Редагувати</button>
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
                    </div>
                    
                    
                </div>
                <div className='profile__info-row'>
                    <div className='profile__info-column'>
                        <div className='profile__info-element'>
                            <label className='profile__info-tag'>
                               <input type="checkbox" checked={isActiveCity} onChange={() => setIsActiveCity(!isActiveCity)}></input> Місто 
                            </label>
                            {isActiveCity &&
                                <select value={cityId} onChange={e => setCityId(e.target.value)}>
                                    {cityList.map(c => {
                                        return <option value={c.id}>{c.name}</option>
                                    })}
                                </select> 
                            }
                        </div>
                    </div>
                </div>
                <button className='profile__submit-button'>Зберегти зміни</button>
            </div>
        </div>
    )
}

export default CabinetMyProfile