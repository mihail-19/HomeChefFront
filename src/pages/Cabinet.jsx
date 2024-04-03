import { Link } from 'react-router-dom'
import './Cabinet.css'
import Header from '../elements/Header.jsx'
import CabinetMyProfile from '../elements/Cabinet/CabinetMyProfile.jsx'
import { useState } from 'react'
const Cabinet = () => {
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
        if(showFlags[0]){
            return <></>
        } else if (showFlags[1]){
            return <CabinetMyProfile/>
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
    return(
        <>
            <Header/>
            <div className='cabinet__container'>
                <div className='cabinet__menu-container'>
                    <nav className='cabinet__menu'>
                        <ul>
                            <li><button className={showFlags[0] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(0)}>Мої замовлення</button></li>
                            <li><button className={showFlags[1] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(1)}>Мій профіль</button></li>
                            <li><button className={showFlags[2] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(2)}>Моє меню</button></li>
                            <li><button className={showFlags[3] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(3)}>Мої відгуки</button></li>
                            <li><button className={showFlags[4] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(4)}>Корисне</button></li>
                            <li><button className={showFlags[5] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(5)}>Тарифний план</button></li>
                            <li><button className='cabinet__exit-button'>Вийти</button></li>
                        </ul>
                    </nav>
                </div>
                <div className='cabinet__content'>
                    {selectShowWindow()}
                </div>
            </div>
        </>
    )
}

export default Cabinet