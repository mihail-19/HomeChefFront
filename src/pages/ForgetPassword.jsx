import { useRef, useState } from "react"
import './ForgetPassword.css'
import { forgetPassword } from "../services/AuthService"
import Loading from "../elements/utility/Loading"
import Snackbar from "../elements/utility/Snackbar"
const ForgetPassword = () => {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const snackbarRef = useRef(null)
    
    const sendRecoverPassword = async () => {
        setIsLoading(true)
        try{
            await forgetPassword(email)
            snackbarRef.current.show('відправлено на email', false, 4000)
        } catch(error){
            snackbarRef.current.show('виникла помилка', true, 4000)
            console.log(error)
        } finally{
            setIsLoading(false)
        }
    }
    return (
        <div className="forget-password">
            <Loading isActive={isLoading} seIsActive={setIsLoading}/>
            <Snackbar ref={snackbarRef}/>
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