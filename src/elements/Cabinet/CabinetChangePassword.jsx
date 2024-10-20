import { useState } from "react"
import { Link } from "react-router-dom"
import { changePassword } from "../../services/PersonService"



const CabinetChangePassword = () => {

    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)


    function startChangePassword(){
        setIsSubmitted(true)
    }
    async function sendChangePassword(){
        if(newPassword !== confirmPassword){
            return
        }
        await changePassword(newPassword)
    }

    if(!isSubmitted){
        return (
            
            <div>
            <div className='profile__info-element'>
                    <label className='profile__info-tag'>
                        Новий пароль
                    </label>
                    <input type="password" className='profile__info-input' value={newPassword} onChange={e => setNewPassword(e.target.value)}></input>
                </div>
                <div className='profile__info-element'>
                    <label className='profile__info-tag'>
                        Підтвердіть новий пароль
                    </label>
                    <input type="password" className='profile__info-input' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}></input>
                </div>
                <button className='profile__submit-button' onClick={startChangePassword}>Змінити пароль</button>
            </div>
        )
    } else {
        return (
            
            <div>
            <div className='profile__info-element'>
                    <label className='profile__info-tag'>
                       Для підтвердження зміни пароля введіть діючий пароль
                    </label>
                    <input type="password" className='profile__info-input' value={oldPassword} onChange={e => setOldPassword(e.target.value)}></input>
                </div>
                
                <button className='profile__submit-button' onClick={sendChangePassword}>Змінити пароль</button>
            </div>
        )
    }



}

export default CabinetChangePassword