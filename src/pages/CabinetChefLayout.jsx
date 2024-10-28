import { Link, Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import './Cabinet.css'
import burgerCloseButton from '../assets/burgerCloseButton.png'
import { getChef } from "../services/ChefService"
import { hasAuthority, isChef } from "../services/Authorities"
const CabinetChefLayout = ({person, setPerson, isAuth}) => {
    const [showMenu, setShowMenu] = useState(false)
    useEffect(() => {
        console.log('cabinet chef layout')
        if(isAuth && hasAuthority('chef', person)){
            console.log('try load chef')
            loadChef()
        } else {
            setChef({})
        }
    }, [person])

    useEffect(() => {
        if(showMenu){
            document.body.style.overflowY = 'hidden'
        } else {
            document.body.style.overflowY = 'scroll'
        }
    }, [showMenu])

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
    
    const [showFlags, setShowFlags] = useState([false, true, false, false, false, false])
    const [chef, setChef] = useState({})
    const navigate = useNavigate();
    function links(){




        if(!person || !person.authorities){
            return <></>
        }

        let authorities = person.authorities

        let isUser = hasAuthority('user', person)
        let isChef = hasAuthority('chef', person)
        let isAdmin = hasAuthority('admin', person)
        
        function switchShowWindow(index){
            setShowMenu(false)
            const newArr = []
            for(let i = 0; i<7; i++){
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
                <li style={{position:'relative'}}><Link to="notifications" className={showFlags[0] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(0)}>Повідомлення</Link>
                        {person && person.hasMessageNotification &&
                        <div style={{position:'absolute', right:'25%', top  :'10px',width:'10px', height:'10px', borderRadius:'50%', backgroundColor:'green'}}></div>
                    }
                </li>
                <li style={{position:'relative'}}><Link to="chef-orders/type=new" className={showFlags[1] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(1)}>Мої замовлення</Link>
                    {person && person.hasOrderNotification &&
                            <div style={{position:'absolute', right:'25%', top  :'10px',width:'10px', height:'10px', borderRadius:'50%', backgroundColor:'green'}}></div>
                        }
                </li>
                <li><Link to="chef-profile" className={showFlags[2] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(2)}>Мій профіль</Link></li>
                <li><Link to="chef-menu" className={showFlags[3] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(3)}>Моє меню</Link></li>
                <li><Link to="reviews" className={showFlags[4] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(4)}>Мої відгуки</Link></li>
                <li><Link to="chef-story" className={showFlags[5] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(5)}>Моя історія</Link></li>
                <li><Link to="chef-usefull" className={showFlags[6] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(6)}>Корисне</Link></li>
                <li><Link to="tarif" className={showFlags[7] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(7)}>Тарифний план</Link></li>
                <li><Link className='cabinet__exit-Link'>Вийти</Link></li>
            </ul>
        }else if(isAdmin){
            return <ul>
                <li><Link to="admin-settings" className={showFlags[0] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(0)}>Налаштування</Link></li>
                <li><Link to="admin-data" className={showFlags[1] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(1)}>Внести дані</Link></li>
                <li><Link to="users-list" className={showFlags[2] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(2)}>Користувачі</Link></li>
                
                <li><Link className='cabinet__exit-Link'>Вийти</Link></li>
            </ul>
        } else if (isUser){
            return <ul>
                    <li style={{position:'relative'}}><Link to="notifications" className={showFlags[0] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(0)}>Повідомлення</Link>
                        {person && person.hasNotifications &&
                        <div style={{position:'absolute', right:'25%', top  :'10px',width:'10px', height:'10px', borderRadius:'50%', backgroundColor:'green'}}></div>
                    }
                    </li>
                    <li><Link to="previous-dishes" className={showFlags[1] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(1)}>Історія замовлень</Link></li>
                    <li><Link to="user-profile" className={showFlags[2] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(2)}>Мій профіль</Link></li>
                    <li><Link to="user-orders" className={showFlags[3] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(3)}>Статус замовлень</Link></li>
                    <li><Link to="become-chef" className={showFlags[4] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(4)}>Стати шефом</Link></li>
                    <li><Link to="usefull" className={showFlags[5] ? 'cabinet__menu-active-button' : undefined} onClick={() => switchShowWindow(5)}>Корисне</Link></li>
                    <li><Link className='cabinet__exit-Link'>Вийти</Link></li>
                </ul>
        }  else {
            return <></>
        }
    }

    if(!isAuth){
        
        navigate("/")
    }

    function menuStyleClass(){
        if(hasAuthority('chef', person) || hasAuthority('admin', person)){
            return 'cabinet__menu_chef'
        } else if (hasAuthority('user', person)){
            return 'cabinet__menu_user'
        }
    }

    return <>
            <div className='cabinet__container'>
                <div style={
                    {
                        position: "absolute", 
                        left: "0", 
                        top: "0", 
                        backgroundColor: "black", 
                        width: "100vw", 
                        height: "100vh", 
                        opacity: "0.3",
                        zIndex: "10",
                        display: showMenu ? "block" : "none"

                    }} onClick={() => setShowMenu(false)}>

                </div>
                {!showMenu && 
                    <button className={!isChef(person) ? "cabinet__menu-button cabinet__menu-button_user" : "cabinet__menu-button cabinet__menu_chef"} onClick={() => setShowMenu(true)}>Меню</button>
                }
                <div className='cabinet__menu-container'>
                
                    <nav className={showMenu ? 'cabinet__menu cabinet_active ' + menuStyleClass() : 'cabinet__menu ' + menuStyleClass()} >
                        {showMenu &&
                            <div className="cabinet__mobile-menu-top">
                                <button onClick={() => setShowMenu(false)}>
                                    <img src={burgerCloseButton}></img>
                                </button>
                            </div>
                        }
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