import { Link, Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import './Cabinet.css'
import { getChef } from "../services/ChefService"
const CabinetChefLayout = ({person, setPerson, isAuth}) => {
    
    useEffect(() => {
        console.log('cabinet chef layout')
        if(isAuth && hasAuthority('chef')){
            console.log('try load chef')
            loadChef()
        } else {
            setChef({})
        }
    }, [person])
    async function loadChef(){
            console.log('load chef')
            try{
                const {data} = await getChef()
                console.log(data)
                setChef(data)
            } catch (error){
                console.error('error loading chef')
            }
    }
    function hasAuthority(authority){
        if(!person || !person.authorities){
            return false
        }
        const hasAuth = person.authorities.find(a => a.authority === authority) !== undefined
        console.log('has auth {' + authority + '} ? ' + hasAuth)
        return hasAuth
    }
    const [showFlags, setShowFlags] = useState([false, true, false, false, false, false])
    const [chef, setChef] = useState({})
    const navigate = useNavigate();
    function links(){




        if(!person || !person.authorities){
            return <></>
        }

        let authorities = person.authorities

        let isUser = hasAuthority('user')
        let isChef = hasAuthority('chef')
        let isAdmin = hasAuthority('admin')
        
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
                <li><Link to="chef-orders" className={showFlags[0] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(0)}>Мої замовлення</Link></li>
                <li><Link to="chef-profile" className={showFlags[1] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(1)}>Мій профіль</Link></li>
                <li><Link to="chef-menu" className={showFlags[2] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(2)}>Моє меню</Link></li>
                <li><Link to="reviews" className={showFlags[3] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(3)}>Мої відгуки</Link></li>
                <li><Link to="usefull" className={showFlags[4] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(4)}>Корисне</Link></li>
                <li><Link to="tarif" className={showFlags[5] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(5)}>Тарифний план</Link></li>
                <li><Link className='cabinet__exit-Link'>Вийти</Link></li>
            </ul>
        }else if(isAdmin){
            return <ul>
                <li><Link to="admin-settings" className={showFlags[0] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(0)}>Налаштування</Link></li>
                <li><Link to="admin-data" className={showFlags[1] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(1)}>Внести дані</Link></li>
                <li><Link to="/cabinet/client-orders-state" className={showFlags[2] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(2)}>Статус замовлень</Link></li>
                <li><Link to="/cabinet/cart" className={showFlags[3] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(3)}>Кошик</Link></li>
                <li><Link to="/cabinet/wishes" className={showFlags[4] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(4)}>Мої бажання</Link></li>
                <li><Link to="become-chef" className={showFlags[5] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(5)}>Стати шефом</Link></li>
                <li><Link className='cabinet__exit-Link'>Вийти</Link></li>
            </ul>
        } else if (isUser){
            return <ul>
                    <li><Link to="previous-dishes" className={showFlags[0] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(0)}>Історія замовлень</Link></li>
                    <li><Link to="user-profile" className={showFlags[1] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(1)}>Мій профіль</Link></li>
                    <li><Link to="user-orders" className={showFlags[2] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(2)}>Статус замовлень</Link></li>
                    <li><Link to="/cabinet/cart" className={showFlags[3] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(3)}>Кошик</Link></li>
                    <li><Link to="/cabinet/wishes" className={showFlags[4] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(4)}>Мої бажання</Link></li>
                    <li><Link to="become-chef" className={showFlags[5] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(5)}>Стати шефом</Link></li>
                    <li><Link className='cabinet__exit-Link'>Вийти</Link></li>
                </ul>
        }  else {
            return <></>
        }
    }

    if(!isAuth){
        
        navigate("/HomeChefFront")
    }

    function menuStyleClass(){
        if(hasAuthority('chef') || hasAuthority('admin')){
            return 'cabinet__menu_chef'
        } else if (hasAuthority('user')){
            return 'cabinet__menu_user'
        }
    }

    return <>
            <div className='cabinet__container'>
                <div className='cabinet__menu-container'>
                    <nav className={'cabinet__menu ' + menuStyleClass()} >
                        {links()}
                    </nav>
                </div>
                <div className='cabinet__content'>
                    <Outlet context={{chef, loadChef}}/>
                </div>
            </div>
    </>
}

export default CabinetChefLayout