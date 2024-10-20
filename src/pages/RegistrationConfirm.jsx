import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { confirmRegistration } from "../services/AuthService"
import congratulationsImage from '../assets/congratulationsImage.png'

const RegistrationConfirm = () => {
    const {uuid} = useParams()
    console.log(uuid)
    const [stateIndicator, setStateIndicator] = useState('loading')
    useEffect(() => {
        if(uuid){
            sendConfirmRegistration(uuid)
        }
    }, [])
    useEffect(() => {
        if(uuid){
            sendConfirmRegistration(uuid)
        }
    }, [uuid])
    async function sendConfirmRegistration(id){
        try{
            await confirmRegistration(id)
            setStateIndicator('ok')
        } catch(e){
            setStateIndicator('error')
        }
    }
    return (
        <div style={{fontFamily:'Montserrat', margin:'0 auto'}}>
            {stateIndicator === 'loading' &&
                 <h1 style={{textAlign:'center', fontSize:'32px'}}>Завантажуємо дані...</h1>
            }
            {stateIndicator === 'ok' &&
                <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
                    <h1 style={{textAlign:'center', fontSize:'32px'}}>Реєстрацію акаунту підтверджено. Вітаємо Вас у команді Homechef!</h1>
                        <img src={congratulationsImage}></img>
                </div>
            }

            {stateIndicator === 'error' &&
                <h3 style={{textAlign:'center'}}>Щось пішло не так</h3>
            }
            
        </div>
    )
}

export default RegistrationConfirm