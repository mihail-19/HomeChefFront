import { useState } from "react"
import './ForgetPassword.css'
import { forgetPassword } from "../services/AuthService"
const ForgetPassword = () => {
    const [email, setEmail] = useState('')
    
    const sendRecoverPassword = async () => {
        try{
            await forgetPassword(email)
        } catch(error){
            console.log(error)
        }
    }
    return (
        <div className="forget-password">
            <h1>Забули пароль?</h1>
            <div className="forget-password__info">
                Для того, що відновити доступ до аккаутну, введіть у формі на цій сторінці адресу своєї електронної пошти.
                Після цього, на Вашу адресу буде надіслано повідомлення із посиланням для відновлення доступу до аккаунту.
            </div>
            <div className="forget-password__form">
                <label>Email</label>
                <input type="text" onChange={e => setEmail(e.target.value)}></input>    
                <button onClick={sendRecoverPassword}>Відправити</button>
            </div>
        </div>
    )
}

export default ForgetPassword