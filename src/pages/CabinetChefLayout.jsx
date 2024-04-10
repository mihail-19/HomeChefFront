import { Link, Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import './Cabinet.css'
import { getChef } from "../services/ChefService"
const CabinetChefLayout = ({person, setPerson, chef, setChef}) => {
    
    const [showFlags, setShowFlags] = useState([false, true, false, false, false, false])
    function links(){
        if(!person || !person.authorities){
            return <></>
        }
        let authorities = person.authorities

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
        if(isChef){
            return <ul>
                <li><Link to="/cabinet/chef-orders" className={showFlags[0] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(0)}>Мої замовлення</Link></li>
                <li><Link to="chef-profile" className={showFlags[1] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(1)}>Мій профіль</Link></li>
                <li><Link to="cabinet/chef-menu" className={showFlags[2] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(2)}>Моє меню</Link></li>
                <li><Link to="/cabinet/reviews" className={showFlags[3] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(3)}>Мої відгуки</Link></li>
                <li><Link to="/cabinet/usefull" className={showFlags[4] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(4)}>Корисне</Link></li>
                <li><Link to="/cabinet/tarif-policy" className={showFlags[5] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(5)}>Тарифний план</Link></li>
                <li><Link className='cabinet__exit-Link'>Вийти</Link></li>
            </ul>
        } else if (isUser){
            return <ul>
                    <li><Link to="/cabinet/client-orders" className={showFlags[0] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(0)}>Мої замовлення</Link></li>
                    <li><Link to="/cabinet/client-profile" className={showFlags[1] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(1)}>Мій профіль</Link></li>
                    <li><Link to="/cabinet/client-orders-state" className={showFlags[2] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(2)}>Статус замовлень</Link></li>
                    <li><Link to="/cabinet/cart" className={showFlags[3] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(3)}>Кошик</Link></li>
                    <li><Link to="/cabinet/wishes" className={showFlags[4] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(4)}>Мої бажання</Link></li>
                    <li><Link to="become-chef" className={showFlags[5] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(5)}>Стати шефом</Link></li>
                    <li><Link className='cabinet__exit-Link'>Вийти</Link></li>
                </ul>
        } else {
            return <></>
        }
    }

    return <>
            <div className='cabinet__container'>
                <div className='cabinet__menu-container'>
                    <nav className='cabinet__menu'>
                        {links()}
                    </nav>
                </div>
                <div className='cabinet__content'>
                    <Outlet/>
                </div>
            </div>
    </>
}

export default CabinetChefLayout