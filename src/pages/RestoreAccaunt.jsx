import { Link, useNavigate, useParams } from "react-router-dom"
import './ForgetPassword.css'
import { useEffect, useState } from "react"
import { restoreAccountChangePassword, restoreAccountGetUsername } from "../services/AuthService"

const RestoreAccount = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [pwdErrMsg, setPwdErrMsg] = useState('')
    const [confirmPwdErrMsg, setConfirmPwdErrMsg] = useState('')
    const [isReady, setIsReady] = useState(false)
    const [afterSuccess, setAfterSuccess] = useState(null)
    const {params} = useParams()
    console.log(params)
    useEffect(() => {
        if(params){
            sendGetUsername()
        }
    },[])

    useEffect(() => {
        if(params){
            sendGetUsername()
        }
    }, [params])


    useEffect(() => {
        checkIsReady()
    }, [password, confirmPassword])


    //on page open get username
    const sendGetUsername = async () => {
        const {data} = await restoreAccountGetUsername(params)
        setUsername(data)
    }

    //send data
    const sendChangePassword = async () => {
        if(!isReady){
            return
        }
        try{
            await restoreAccountChangePassword(params, password)
            setAfterSuccess(true)
        } catch(error){
            console.log(error)
        }
    }


    //validation 
    function checkIsReady(){
        
        if(checkPassword(password) && checkPasswordConfirm(confirmPassword)){
            setIsReady(true)
        } else {
            setIsReady(false)
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
    function onChangePwd(value){
        checkPassword(value)
        setPassword(value)
        
    }
    function onChangePwdConfirm(value){
        checkPasswordConfirm(value)
        setConfirmPassword(value)
        
    }




    //html
    return (
        <div className="forget-password">
            {username &&
                <h1>Відновлення акаунту</h1>
            }
            {!username &&
                <div className="forget-password__info">
                   Сторінка недоступна    
                </div>
            }
            {username && !afterSuccess &&
            <div className="forget-password__info">
                Для відновлення доступу до акаунту <b>{username}</b> створіть новий пароль у формі на цій сторінці 
            </div>
            }
             {username && !afterSuccess &&
            <div className="forget-password__form">
                <label>Пароль</label>
                <input type="password" onChange={e => onChangePwd(e.target.value)}></input>   
                <div className="forget-password__error">{pwdErrMsg}</div>
                <label>Підтвердіть пароль</label>
                <input type="password" onChange={e => onChangePwdConfirm(e.target.value)}></input>    
                <div className="forget-password__error">{confirmPwdErrMsg}</div>
                <button onClick={sendChangePassword} className={!isReady ? 'forget-password__buton-not-ready' : ''}>Відправити</button>
            </div>
            }
            {afterSuccess &&
                <div className="forget-password__info">
                    Пароль успішно змінено, ви можете використовувати його для входу в акаунт.
                    <Link to="/">Перейти на головну сторінку</Link>
                </div>
            }
    
        </div>
    )
}

export default RestoreAccount