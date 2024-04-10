import { Link } from 'react-router-dom'
import './Cabinet.css'
import Header from '../elements/Header.jsx'
import CabinetChefProfile from '../elements/Cabinet/CabinetChefProfile.jsx'
import CabinetUeserProfile from '../elements/Cabinet/CabinetUserProfile.jsx'
import CabinetBecomeChef from '../elements/Cabinet/CabinetBecomeChef.jsx'
import { useEffect, useState } from 'react'
import { getPerson } from '../services/PersonService.js'
import { getChef } from '../services/ChefService.js'

import axios from "axios"
const Cabinet = ({person, setPerson}) => {
    useEffect(() => {
        sendGetChef()        
    }, [person])
    async function sendGetChef(){
        
        console.log('send get chef')
        console.log(person)
        if(getUserRole(person) === 'chef'){
            const {data} = await getChef()
            setChef(data)
            console.log('retrieved chef')
        }
    }
    const [chef, setChef] = useState({})
    const [showFlags, setShowFlags] = useState([false, true, false, false, false, false])
    function switchShowWindow(index){
        const newArr = []
        for(let i = 0; i<6; i++){
            if(i === index){
                newArr.push(true)
            } else {
                newArr.push(false)
            }
        }
        setShowFlags(newArr)
    }
    function selectShowWindow(){
        let userRole = getUserRole(person)
        if(userRole === 'chef'){
            return selectWindowChef()
        } else if (userRole === 'user'){
            return selectWindowUser()
        } else {
            return <div>Кабінет доступний лише для авторізованих користувачів</div>
        }
    }

    function selectWindowChef(){
        if(showFlags[0]){
            return <></>
        } else if (showFlags[1]){
            return <CabinetChefProfile chef={chef} setChef={setChef}/>
        } else if(showFlags[2]){
            return <></>
        } else if (showFlags[3]){
            return <></>
        } else if (showFlags[4]){
            return <></>
        } else if (showFlags[5]){
            return <></>
        }
    }
    function selectWindowUser(){
        if(showFlags[0]){
            return <></>
        } else if (showFlags[1]){
            return <CabinetUeserProfile person={person}/>
        } else if(showFlags[2]){
            return <></>
        } else if (showFlags[3]){
            return <></>
        } else if (showFlags[4]){
            return <></>
        } else if (showFlags[5]){
            return <CabinetBecomeChef person={person} setPerson={setPerson}/>
        }
    }

    return(
        <>
            <div className='cabinet__container'>
                <div className='cabinet__menu-container'>
                    <nav className='cabinet__menu'>
                        {selectMenuType()}
                    </nav>
                </div>
                <div className='cabinet__content'>
                    {selectShowWindow()}
                </div>
            </div>
        </>
    )
    function selectMenuType(){
        let userRole = getUserRole(person)
        if(userRole === 'chef'){
            return chefMenu()
        } else if (userRole === 'user'){
            return userMenu()
        } else {
            return <div>Кабінет доступний лише для авторізованих користувачів</div>
        }
    }

    function getUserRole(p){
        if(!p || !p.authorities){
            return null
        }
        let authorities = p.authorities

        let isUser = false
        let isChef = false
        for(let i = 0; i<authorities.length; i++){
            if(authorities[i].authority === 'user'){
                isUser = true
            }
            if(authorities[i].authority === 'chef'){
                isChef = true
            }
        }
        if(isChef){
            return 'chef'
        } else if (isUser){
            return 'user'
        } else {
            return null
        }
    }

    function chefMenu(){
        return (<ul>
            <li><button className={showFlags[0] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(0)}>Мої замовлення</button></li>
            <li><button className={showFlags[1] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(1)}>Мій профіль</button></li>
            <li><button className={showFlags[2] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(2)}>Моє меню</button></li>
            <li><button className={showFlags[3] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(3)}>Мої відгуки</button></li>
            <li><button className={showFlags[4] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(4)}>Корисне</button></li>
            <li><button className={showFlags[5] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(5)}>Тарифний план</button></li>
            <li><button className='cabinet__exit-button'>Вийти</button></li>
        </ul>)
    }
    function userMenu(){
        return( <ul>
            <li><button className={showFlags[0] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(0)}>Мої замовлення</button></li>
            <li><button className={showFlags[1] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(1)}>Мій профіль</button></li>
            <li><button className={showFlags[2] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(2)}>Статус замовлень</button></li>
            <li><button className={showFlags[3] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(3)}>Кошик</button></li>
            <li><button className={showFlags[4] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(4)}>Мої бажання</button></li>
            <li><button className={showFlags[5] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(5)}>Стати шефом</button></li>
            <li><button className='cabinet__exit-button'>Вийти</button></li>
        </ul>)
    }
}

export default Cabinet