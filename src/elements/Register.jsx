import Header from './Header.jsx'
import './Register.css'
import registerLogo from '../assets/registerLogo.png'
import registerCloseIcon from '../assets/burgerCloseButton.png'
import {register} from '../services/AuthService.js'
import { useState, useRef } from 'react'
import Snackbar from './utility/Snackbar.jsx'
import ModalCenter from './utility/ModalCenter.jsx'
import Loading from './utility/Loading.jsx'
import serverUrl from '../serverUrl.js'
import axios from 'axios'
const Register = ({showRegisterWindow, setShowRegisterWindow}) =>{
    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const snackbarRef = useRef(null)

    async function sendRegister(){
        const isValidUsername = await checkUsername()
        if(isValidUsername && password === confirmPassword){
            setIsLoading(true)
            register(username, password, email)
                .then(res => {
                    console.log(res)
                    snackbarRef.current.show('Додано користувача', false)
                    setShowRegisterWindow(false)
                }).catch(err => {
                    snackbarRef.current.show('Помилка: ' + err.response.data, true, 5000)
                }).finally(() => {
                    setIsLoading(false)
                })
        }
    }

    async function checkUsername(){
        try{
            await sendCheckUsername()
            return true
        } catch(err){
            snackbarRef.current.show('Помилка: ' + err.response.data, true, 5000)
            return false
        }
    }
    async function sendCheckUsername(){
        const url = serverUrl + '/persons/check-username'
        const data = new FormData();
        data.append('username', username)
        const res = axios.post(url, data)
        return res
    }

    return (
        <ModalCenter isActive={showRegisterWindow} setIsActive={setShowRegisterWindow} content={windowContent()}/>
    )

    function windowContent(){
        return (
            <div className='register'>
                <Loading isActive={isLoading}/>
                <Snackbar ref={snackbarRef}/>
                <h2>Стань HomeChef<br/>разом із нами</h2>
                <div className='register__logo'>
                    <img src={registerLogo}></img>
                </div>
                    <div className='register__form'>
                        <div className='register__form-element'>
                            <label>Логін</label>
                            <div className='register__form-input'>
                                <input name='email' type='text' onChange={e => setUsername(e.target.value)}></input>
                                <div className='register__form-prompt'></div>
                            </div>
                        </div>
                        
                        <div className='register__form-element'>
                            <label>Створити пароль*</label>
                            <div className='register__form-input'>
                                <input name='password' type='password' placeholder='**********' onChange={e => setPassword(e.target.value)}></input>
                                <div className='register__form-prompt'>Пароль повинен бути надійним</div>
                            </div>
                        </div>
                        <div className='register__form-element'>
                            <label>Підтвердити пароль</label>
                            <div className='register__form-input'>
                                <input type='password' placeholder='**********' onChange={e => setConfirmPassword(e.target.value)}></input>
                            </div>
                        </div>
                        <div className='register__form-element'>
                            <label>Email*</label>
                            <div className='register__form-input'>
                                <input name='email' type='text' placeholder='voloshyna@gmail.com' onChange={e => setEmail(e.target.value)}></input>
                                <div className='register__form-prompt'>Email повинен бути справжнім</div>
                            </div>
                        </div>
                        <button className='register__submit-button' onClick={sendRegister}>Стати HomeChef</button>
                    </div>
            </div>
        )
    }
}

export default Register