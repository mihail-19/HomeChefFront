import Header from './Header.jsx'
import './Register.css'
import registerLogo from '../assets/registerLogo.png'
import registerCloseIcon from '../assets/burgerCloseButton.png'
import {register, login} from '../services/AuthService.js'
import {getPerson} from '../services/PersonService.js'
import { useState } from 'react'
const Register = ({setShowAuthWindow, setIsAuth}) =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isFailed, setIsFailed] = useState(false)
    function sendLogin(){
        login(email, password)
            .then(res =>{
                console.log(res.status)
                if(res.status == 200){
                    setIsFailed(false)
                    console.log('auth sucess')
                    getPerson().then(resPerson =>{

                     console.log(resPerson.data)
                     localStorage.setItem('firstname', resPerson.data.firstName)
                     localStorage.setItem('isLogged', true)
                     setIsAuth(true)
                    })
                } else {
                    setIsFailed(true)
                }
            })
            .catch(d => setIsFailed(true))
    }
    return (
        <div className='register'>
            <div className='register__top'>
                <button className='register__close-button' onClick={() => setShowAuthWindow(false)}>
                    <img src={registerCloseIcon}></img>
                </button>
            </div>
            <h2>Увійти</h2>
            <div className='register__logo'>
                <img src={registerLogo}></img>
            </div>
                <div className='register__form'>
                    
                    <div className='register__form-element'>
                        <label>Email*</label>
                        <div className='register__form-input'>
                            <input name='email' type='text' placeholder='voloshyna@gmail.com' onChange={e => setEmail(e.target.value)}></input>
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
                    <button className='register__submit-button' onClick={sendLogin}>Увійти</button>
                </div>
        </div>
    )
}

export default Register