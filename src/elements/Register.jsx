import Header from './Header.jsx'
import './Register.css'
import registerLogo from '../assets/registerLogo.png'
import registerCloseIcon from '../assets/burgerCloseButton.png'
import {register} from '../services/AuthService.js'
import { useState } from 'react'
const Register = ({setShowRegisterWindow}) =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    function sendRegister(){
        if(password === confirmPassword)
            register(email, password)
                .then(res => {
                    console.log(res)
                    setShowRegisterWindow(false)
                })
    }
    return (
        <div className='register'>
            <div className='register__top'>
                <button className='register__close-button' onClick={() => setShowRegisterWindow(false)}>
                    <img src={registerCloseIcon}></img>
                </button>
            </div>
            <h2>Стань HomeChef<br/>разом із нами</h2>
            <div className='register__logo'>
                <img src={registerLogo}></img>
            </div>
                <div className='register__form'>
                    
                    <div className='register__form-element'>
                        <label>Email*</label>
                        <div className='register__form-input'>
                            <input name='email' type='text' placeholder='voloshyna@gmail.com' onChange={e => setEmail(e.target.value)}></input>
                            <div className='register__form-prompt'>Email повинен бути справжнім</div>
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
                    <button className='register__submit-button' onClick={sendRegister}>Стати HomeChef</button>
                </div>
        </div>
    )
}

export default Register