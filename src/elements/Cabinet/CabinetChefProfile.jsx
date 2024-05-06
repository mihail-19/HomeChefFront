import { useEffect, useRef, useState } from 'react'
import defaultChefImage from '../../assets/registerLogo.png'
import { getChef, updateChef } from '../../services/ChefService'
import { useOutletContext } from 'react-router-dom'
import { updateImage } from '../../services/PersonService'
import Snackbar from '../utility/Snackbar'
import Loading from '../utility/Loading'
import serverUrl from '../../serverUrl'
import imagesUrl from '../../imagesUrl'
import LocalityList from '../LocalityList'
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
    const [imageUrl, setImageUrl] = useState(defaultChefImage)
    const [locality, setLocality] = useState({})
    const [localityName, setLocalityName] = useState('')
    const [isActiveLocality, setIsActiveLocality] = useState(false)
    const snackbarRef = useRef(null)

    const context = useOutletContext()
    useEffect(() =>{
        console.log('use effect')
        if(context && context.chef && context.chef.person){
            setFirstName(context.chef.person.firstName)
            setEmail(context.chef.person.email)
            setPhone(context.chef.phone)
            setDescription(context.chef.description)
            setAddress(context.chef.address)
            setLegalStatusId(0)
            setIsActive(context.chef.isActive)
            setImageUrl(imagesUrl + context.chef.person.imageURL)
            setIsLoading(false)
            setLocality(context.chef.person.locality)
            console.log(context.chef.person.locality)
            setLocalityName(context.chef.person.locality ? context.chef.person.locality.name : '')
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
     if(!context.chef || !context.chef.person){
         return <div>loading...</div>
     }
   
     async function saveChef(){
        const chef = {
            firstName: firstName,
            phone: phone,
            description: description,
            address: address,
            isActive: isActive,
            person: {
                firstName: firstName,
                email: email,
                locality: locality
            }            
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
            snackbarRef.current.show('Сталася помилка', true)
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
        if(name.length > 1){
            setIsActiveLocality(true)
        } else {
            setIsActiveLocality(false)
        }
    }
    return (
        <div className="profile">
            <Loading isActive={isLoading} setIsActive={setIsLoading}/>
            <Snackbar ref={snackbarRef}/>
            <div className="profile__top">
                <div className="profile__user-image">
                    {!image && 
                        <img src={imageUrl}></img>
                    }
                    {image && 
                        <img src={URL.createObjectURL(image)}></img>
                    }
                </div>
                <div className='profile__id'>{context.chef.person.username} #{context.chef.id}</div>
            </div>
            <div className='profile__top-button-container'>
                <button className='profile__update-photo-button' onClick={() => document.getElementById('imageInput').click()} >Редагувати</button>
                <input id="imageInput" type="file"  onChange={e => setImage(e.target.files[0])} ></input>
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
                            <textarea value={description} onChange={e => setDescription(e.target.value)}></textarea>
                        </div>
                    </div>
                    
                </div>
                <div className='profile__info-row'>
                    <div className='profile__info-column'>
                        <div className='profile__info-element'>
                            <label className='profile__info-tag'>
                                Місто 
                            </label>
                            <input type="text" className='profile__info-input' value={localityName} onChange={e => searchCity(e.target.value)}></input>
                            <div className='profile__locality-container'>
                                <LocalityList isActive={isActiveLocality} setIsActive={setIsActiveLocality} setLocality={setLocalityAndName} name={localityName}/>
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
                <button className='profile__submit-button' onClick={saveChef}>Зберегти зміни</button>
            </div>
        </div>
    
    )
   
}

export default CabinetMyProfile