import Header from './Header.jsx'
import './Register.css'
import registerLogo from '../assets/registerLogo.png'
import registerCloseIcon from '../assets/burgerCloseButton.png'
import {register} from '../services/AuthService.js'
import { useState, useRef, useEffect } from 'react'
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
    const [loginErrMsg, setLoginErrMsg] = useState(null)
    const [pwdErrMsg, setPwdErrMsg] = useState(null)
    const [confirmPwdErrMsg, setConfirmPwdErrMsg] = useState(null)
    const [emailErrMsg, setEmailErrMsg] = useState(null)
    const [isReady, setIsReady] = useState(false)
    const snackbarRef = useRef(null)


    useEffect(() => {
        checkIsReady()
    },[username, email, password, confirmPassword])

    async function sendRegister(event){
        event.preventDefault()
        if(isReady){
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

   
    async function sendCheckUsername(){
        const url = serverUrl + '/persons/check-username'
        const data = new FormData();
        data.append('username', username)
        const res = axios.post(url, data)
        return res
    }

    async function checkIsFreeUsername(){
        let res = false
        try{
            await sendCheckUsername()
            setLoginErrMsg(null)
            res = true
        } catch(err){
            setLoginErrMsg('Ім\'я заяняте')
            res = false
        } finally{
            return res
        }
    }
    function checkLogin(value){
        if(value.length < 3){
            setLoginErrMsg('Логін має бути більше 2-х символів')
            return false
        } else {
            setLoginErrMsg(null)
            return true
        }
    }

    function onBlurLogin(value){
        if(checkLogin(value)){
            checkIsFreeUsername()
        }
    }

    function checkPassword(value){
        if(value.length < 4){
            setPwdErrMsg('Пароль занадто короткий')
            return false
        }
        setPwdErrMsg(null)
        return true
    }
    function checkPasswordConfirm(value){
        if(value != password){
            setConfirmPwdErrMsg('Пароль не співпадає')
            return false
        } 
        setConfirmPwdErrMsg(null)
        return true
    }
    function checkEmail(value){
        if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)){
            setEmailErrMsg(null)
            return true
        } else {
            setEmailErrMsg('Некоректний email')
            return false
        }
    }

    function checkIsReady(){
        if(checkLogin(username) && checkPassword(password) && checkPasswordConfirm(confirmPassword) && checkEmail(email) ){
            checkIsFreeUsername().then(r => setIsReady(r))
        } else {
            setIsReady(false)
        }
    }

    function onChangePwd(value){
        checkPassword(value)
        setPassword(value)
        
    }
    function onChangeConfirmPwd(value){
        checkPasswordConfirm(value)
        setConfirmPassword(value)
        
    }
    
    function onChangeEmail(value){
        checkEmail(value)
        setEmail(value)
        
    }

    const errMsgStyle = {
        fontSize: '12px',
        color: 'red',
        height: '14px'
    }
    const passiveBtnSyle = {
        cursor: 'not-allowed',
        backgroundColor: '#627972'
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
                        <form onSubmit={event => sendRegister(event)}>
                            <div className='register__form-element'>
                                <label>Логін</label>
                                <div className='register__form-input'>
                                    <input name='email' type='text' onBlur={e => onBlurLogin(e.target.value)} onChange={e => setUsername(e.target.value)}></input>
                                    <div className='register__form-prompt'></div>
                                </div>
                                <div style={errMsgStyle}>{loginErrMsg}</div>
                            </div>
                            
                            <div className='register__form-element'>
                                <label>Створити пароль*</label>
                                <div className='register__form-input'>
                                    <input name='password' type='password' placeholder='**********' onChange={e => onChangePwd(e.target.value)}></input>
                                    <div className='register__form-prompt'>Пароль повинен бути надійним</div>
                                </div>
                                <div style={errMsgStyle}>{pwdErrMsg}</div>
                            </div>
                            <div className='register__form-element'>
                                <label>Підтвердити пароль</label>
                                <div className='register__form-input'>
                                    <input type='password' placeholder='**********' onChange={e => onChangeConfirmPwd(e.target.value)}></input>
                                </div>
                                <div style={errMsgStyle}>{confirmPwdErrMsg}</div>
                            </div>
                            <div className='register__form-element'>
                                <label>Email*</label>
                                <div className='register__form-input'>
                                    <input name='email' type='text' placeholder='voloshyna@gmail.com' onChange={e => onChangeEmail(e.target.value)}></input>
                                    <div className='register__form-prompt'>Email повинен бути справжнім</div>
                                </div>
                                <div style={errMsgStyle}>{emailErrMsg}</div>
                            </div>
                            <button className='register__submit-button' style={ !isReady ? passiveBtnSyle : {}} type="submit">Стати HomeChef</button>
                        </form>
                    </div>
            </div>
        )
    }
}

export default Register