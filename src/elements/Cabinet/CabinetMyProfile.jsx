import { useState } from 'react'
import defaultChefImage from '../../assets/registerLogo.png'
const CabinetMyProfile = () => {
    let profileData = 
        {
            id: 1,
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
    const [firstName, setFirstName] = useState(profileData.firstName)
    const [email, setEmail] = useState(profileData.email)
    const [phone, setPhone] = useState(profileData.phone)
    const [cityId, setCityId] = useState(profileData.city.id)
    const [index, setIndex] = useState(profileData.index)
    const [description, setDecription] = useState(profileData.description)
    const [address, setAddress] = useState(profileData.address)
    const [legalStatusId, setLegalStatusId] = useState(profileData.legalStatus.id)
    const [isActive, setIsActive] = useState(profileData.isActive)
    return (
        <div className="profile">
            <div className="profile__top">
                <div className="profile__user-image">
                    {profileData.imageUrl && <img src={profileData.imageUrl}></img>}
                    {!profileData.imageUrl && <img src={defaultChefImage}></img>}
                </div>
                <div className='profile__id'>#{profileData.id}</div>
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
                            <select value={cityId} onChange={e => setCityId(e.target.value)}>
                                {cityList.map(c => {
                                    return <option value={c.id}>{c.name}</option>
                                })}
                            </select> 
                        </div>
                        <div className='profile__info-element'>
                            <label className='profile__info-tag'>
                                Індекс
                            </label>
                            <input type="text" className='profile__info-input' value={phone} onChange={e => setPhone(e.target.value)}></input>
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
                <button className='profile__submit-button'>Зберегти зміни</button>
            </div>
        </div>
    )
}

export default CabinetMyProfile