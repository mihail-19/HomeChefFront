import { useCallback, useEffect, useRef, useState } from 'react'
import defaultChefImage from '../../assets/registerLogo.png'
import { getPerson, updateImage, updatePersonByUser } from '../../services/PersonService'
import Loading from '../utility/Loading'
import Snackbar from '../utility/Snackbar'
import imagesUrl from '../../imagesUrl'
import LocalityList from '../LocalityList'
const CabinetMyProfile = ({person, sendGetPerson}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [image, setImage] = useState(undefined)
    const [firstName, setFirstName] = useState(person.firstName)
    const [email, setEmail] = useState(person.email)
    const [phone, setPhone] = useState(person.phone)
    const [isActiveLocality, setIsActiveLocality] = useState(false)
    const [localityName, setLocalityName] = useState('')
    const [locality, setLocality] = useState({})
    const snackbarRef = useRef(null) 
    

    useEffect(() => {
        if(person){
            setFirstName(person.firstName)
            setPhone(person.phone)
            setEmail(person.email)
            setLocality(person.locality)
            setLocalityName(person.locality ? person.locality.name : '')
        }
    }, [person])
    


    const localitySearchClickListener = useCallback((e) => {
        if(!document.getElementById("menu-localities").contains(e.target)){
            setIsActiveLocality(false)
            document.removeEventListener('click', localitySearchClickListener)
        }
    })
    function searchCity(name){
        setLocalityName(name)
        document.addEventListener('click', localitySearchClickListener)
        setIsActiveLocality(true)
    }
    function setLocalityAndName(locality){
        //todo chef profile city change to locality
        setLocality(locality)
        setLocalityName(locality.name)
    }  

    async function sendUpdateUser(){
        setIsLoading(true)
        const personNew = {
            firstName: firstName,
            phone: phone,
            email: email,
            localityId: locality.id
        }
        try{
            await updatePersonByUser(personNew)
            if(image){
                await updateImage(image)
            }
            snackbarRef.current.show("Дані оновлено", false)
        } catch (e){
            snackbarRef.current.show("Сталася помилка", true)
        } finally{
            setIsLoading(false)
        }
        sendGetPerson()
        
       
    }

    return (
        <div className='profile'>
             <Loading isActive={isLoading} setIsActive={setIsLoading}/>
             <Snackbar ref={snackbarRef}/>
             <div className="profile__top">
                <div className="profile__user-image">
                    {!image && 
                        <img src={person && person.imageUrl && person.imageUrl ? imagesUrl + person.imageUrl : defaultChefImage}></img>
                    }
                    {image && 
                        <img src={URL.createObjectURL(image)}></img>
                    }
                </div>
                <div className='profile__id'><b>{person?.username}</b></div>
            </div>
            <div className='profile__top-button-container'>
                <button className='profile__update-photo-button' onClick={() => document.getElementById('imageInput').click()} >Редагувати</button>
                <input id="imageInput" type="file"  onChange={e => setImage(e.target.files[0])} ></input>
            </div>
            <div className='profile__info'>
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
                        <input type="text" className='profile__info-input' value={localityName} onFocus={(e) => searchCity(e.target.value)} onChange={e => searchCity(e.target.value)}></input>
                        <div className='profile__locality-container'>
                            <LocalityList isActive={isActiveLocality} setIsActive={setIsActiveLocality} setLocality={setLocalityAndName} name={localityName}/>
                        </div> 
                    </div>
                    <button className='profile__submit-button' onClick={sendUpdateUser}>Зберегти зміни</button>
                </div>
            </div>
        </div>
    )

    
}

export default CabinetMyProfile