import Header from './Header.jsx'
import './Register.css'
import registerLogo from '../assets/registerLogo.png'
import registerCloseIcon from '../assets/burgerCloseButton.png'
import {register, login} from '../services/AuthService.js'
import {getPerson} from '../services/PersonService.js'
import { useState } from 'react'
import ModalCenter from './utility/ModalCenter.jsx'
import { Link } from 'react-router-dom'
const Register = ({showAuthWindow, setShowAuthWindow, setIsAuth, setPerson}) =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isFailed, setIsFailed] = useState(false)
    async function sendLogin(event){
        event.preventDefault()
        try{
            const {data} = await login(email, password)
            setIsFailed(false)
            console.log('auth sucess')
            await sendGetPerson()
        }
        catch(error) {
            setIsFailed(true)
            setIsAuth(false)
            localStorage.setItem('isAuth', 'false')
            console.log('login error')
        }
        
    }
    async function sendGetPerson(){
        try{
            const {data} = await getPerson()
            console.log(data)
            setIsAuth(true)
            setPerson(data)
            localStorage.setItem('isAuth', 'true')
            setShowAuthWindow(false)
               
        } catch (error){
            setIsFailed(true)
            setIsAuth(false)
            localStorage.setItem('isAuth', 'false')
            console.log('error while getting person')
        }
    }

    return(
        <ModalCenter isActive={showAuthWindow} setIsActive={setShowAuthWindow} content={windowContent()}/>
    )

    function windowContent(){
        return (
            <div className='register'>
                <h2>Увійти</h2>
                <div className='register__logo'>
                    <img src={registerLogo}></img>
                </div>
                    <div className='register__form'>
                        <form onSubmit={event => sendLogin(event)}>
                        <div className='register__form-element'>
                            <label>Логін</label>
                            <div className='register__form-input'>
                                <input name='email' type='text' onChange={e => setEmail(e.target.value)}></input>
                            </div>
                        </div>
                        <div className='register__form-element'>
                            <label>Пароль</label>
                            <div className='register__form-input'>
                                <input name='password' type='password' placeholder='**********' onChange={e => setPassword(e.target.value)}></input>
                            </div>
                        </div>
                        {isFailed &&
                            <div className='register__form-element'>
                                <div className='register__error'>Невірний логін або пароль</div>
                            </div>
                        }
                         <div className='register__form-element'>
                            <Link className='register__forget-password-link' to="/forget-password" onClick={() => {document.documentElement.style.setProperty('overflow', 'auto');setShowAuthWindow(false)}}>Забули пароль?</Link>
                         </div>
                        
                        <button className='register__submit-button' type="submit">Увійти</button>
                        </form>
                    </div>
            </div>
        )
    }
}

export default Register