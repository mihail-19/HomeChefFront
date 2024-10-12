import React, { useCallback, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import Register from './Register.jsx'
import ActiveLocalityList from './ActiveLocalityList.jsx'
import Auth from './Auth.jsx'
import './Header.css'
import citiesOfBuisiness from '../services/citiesOfBuisiness'
import cityArrow from '../assets/headerCityArrow.png'
import cartImg from '../assets/cart.png'
import burgerMenuIcon from '../assets/burgerMenuIcon.png'
import burgerCloseButton from '../assets/burgerCloseButton.png'
import facebookIcon from '../assets/facebookIcon.png'
import instagramIcon from '../assets/instagramIcon.png'
import telegramIcon from '../assets/telegramIcon.png'
import mailIcon from '../assets/mailIcon.png'
import userMenuIcon from '../assets/user.png'
import homeChefLogo from '../assets/HomeChefLogo.png'
import imageUrl from '../imagesUrl.js'
import {logout} from '../services/AuthService.js'
const Header = ({isAuth, setIsAuth, person, setPerson, cart, locality, setLocality, showRegisterWindow, setShowRegisterWindow, notification})=>{
    const [city, setCity] = useState(localStorage.getItem('locality') ? JSON.parse(localStorage.getItem('locality')).name : "Місто")
    const [showCities, setShowCities] = useState(false)
    const [showBurger, setShowBurger] = useState(false)
    //const [showRegisterWindow, setShowRegisterWindow] = useState(false)
    const [showAuthWindow, setShowAuthWindow] = useState(false)
    function switchShowBurger(){
        //disable scroll whie burger menu flag changes. Value is opposite to current
        if(!showBurger){
            document.documentElement.style.setProperty('overflow', 'hidden')
        } else {
            document.documentElement.style.setProperty('overflow', 'auto')
        }
        setShowBurger(!showBurger)
    }

    useEffect(() => {
        console.log(showCities)
        if(showCities){
            window.addEventListener("click", closeCityListener)
        } else {
            window.removeEventListener("click", closeCityListener)
        }
    }, [showCities])

    const closeCityListener = useCallback((e) => {
        console.log('click')
         if(!document.getElementById("header-city")?.contains(e.target) && !document.getElementById("header-city-burger")?.contains(e.target)){
             setShowCities(false)
         }
    }, [])

    function switchShowCities(){
        console.log(showCities)
        setShowCities(!showCities)
    }
    function chooseCity(locality){
        if(locality){
            localStorage.setItem('locality', JSON.stringify(locality))
            setCity(locality.name)
            setShowCities(false)
            setLocality(locality)
        } else {
            setCity("Місто")
            setShowCities(false)
            setLocality(undefined)
            localStorage.removeItem('locality')
        }
    }
    function switchShowRegisterWindow(){
        setShowRegisterWindow(!showRegisterWindow)
    }
    function switchShowAuthWindow(){
        setShowAuthWindow(!showAuthWindow)
    }
    function sendLogout(){
        
        logout().then(res => {
            console.log('logout')
            localStorage.setItem('isAuth', 'false')
            localStorage.clear()
            setCity('Місто')
            setIsAuth(false)
            setPerson(null)
        })
    }




    function closeBurger(){
        setTimeout(() => {
            setShowBurger(false)
        }, 100)
    }



    return (
        <div className='header'>
                <Link to="/" className='header__logo'>
                    <img src={homeChefLogo}></img>
                </Link>
                
                <nav className='header__nav'>
                    <ul className='header__menu'>
                        <li className='header__menu-item'>
                            <Link to='/chefs-map' className='header__menu-link'>Наші шефи</Link>
                        </li>
                        <li className='header__menu-item'>
                            <Link to='/dishes' className='header__menu-link header__menu-link_catalog'>Страви</Link>
                        </li>
                        <li className='header__menu-item'>
                            <Link to='/about-us' className='header__menu-link'>Про нас</Link>
                        </li>
                        
                        <li className='header__menu-item'>
                           {!showBurger && 
                                <div id="header-city" className='header__menu-link header__city-button' onClick={switchShowCities}>
                                    <div className='header__city'>{city}</div>
                                        <ActiveLocalityList isActive={showCities} setIsActive={setShowCities} locality={locality} setLocality={chooseCity}/>   
                                    <div className='header__city-arrow'>
                                        <img className={ showCities && 'header__rotated'} src={cityArrow}></img>
                                    </div>
                                    
                                </div>
                            }
                        </li>
                        <li className='header__cart-container'>
                            {cart && cart.cartProducts && cart.cartProducts.length > 0 &&
                                <div className='header__cart-number'>{cart.cartProducts.length}</div>
                            }
                            <Link to="/cart" className='header__cart'>
                                <img src={cartImg}></img>
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className='header__burger-menu-icon' onClick={switchShowBurger}>
                    <img src={burgerMenuIcon}></img>
                </div>
                {!isAuth &&
                    <div className='header__auth'>
                        
                            <button to='/login' className='header__signin-button' onClick={switchShowAuthWindow}>Увійти</button>
                            <button to='/register' className='header__register-button' onClick={switchShowRegisterWindow}>Реєстрація</button>
                    </div>
                }
                {isAuth &&
                    <div className='header__auth'>
                        <UserMenu/>
                    </div>
                }
                {showBurger && <div className='burger__shadow-in-burger-menu' onClick={switchShowBurger}></div>}
                {showBurger &&
                
                    <div className='header__burger-menu'>
                        
                        <div className='header__burger-menu-top'>
                            <div className='header__burger-menu-logo'>
                                Home<br/>Chef
                            </div>
                            <div className='header__burger-menu-close-button' onClick={switchShowBurger}>
                                <img src={burgerCloseButton}></img>
                            </div>
                        </div>
                        {!isAuth &&
                            <div className='header__burger-menu-auth'>
                                <button className='header__burger-menu-signin' onClick={switchShowAuthWindow}>Вхід</button>
                                <button className='header__burger-menu-register' onClick={switchShowRegisterWindow}>Реєстрація</button>
                            </div>
                        }
                        {isAuth &&
                            <div className='header__burger-menu-auth'>
                                {person.username}
                                <button to='/register' className='header__logout-button' onClick={sendLogout}>Вийти</button>
                            </div>
                            
                        }
                        <nav className='header__burger-menu-nav'>
                            <ul>
                                <li>
                                    <Link onClick={closeBurger} to="/cart" className='header__cart'>
                                        <img src={cartImg}></img>
                                    </Link>
                                </li>
                                
                                <li className='header__burger-menu-nav-item'>
                                    <Link to='/dishes' className='header__burger-menu-link header__burger-menu-link_catalog'>Страви</Link>
                                </li>
                                {isAuth &&
                                    <li className='header__burger-menu-nav-item'>
                                        <Link onClick={closeBurger} to='/cabinet' className='header__burger-menu-link'>Кабінет</Link>
                                    </li>
                                }
                                <li className='header__burger-menu-nav-item header__burger-menu-cities' onClick={switchShowCities}>
                                   
                                    {showBurger &&
                                       <div id="header-city-burger" className='header__menu-link header__city-button' onClick={switchShowCities}>
                                        <div className='header__burger-menu-link'>{city}</div>
                                            <ActiveLocalityList isActive={showCities} setIsActive={setShowCities} locality={locality} setLocality={chooseCity}/>   
                                        <div className='header__city-arrow'>
                                            <img className={ showCities && 'header__rotated'} src={cityArrow}></img>
                                        </div>
                                       
                                        </div>
                                    }
                                    
                                </li>
                                
                                <li className='header__burger-menu-nav-item'>
                                    <Link onClick={closeBurger} to='/about-us' className='header__burger-menu-link'>Про нас</Link>
                                </li>
                                <li className='header__burger-menu-nav-item'>
                                    <Link onClick={closeBurger} to='/chefs-map' className='header__burger-menu-link'>Наші шефи</Link>
                                </li>
                                <li className='header__burger-menu-nav-item'>
                                    {!isAuth &&
                                        <button onClick={() => {closeBurger(); setShowRegisterWindow(true)}} className='header__burger-menu-link'>Cтати шефом</button>
                                    }
                                    {isAuth && 
                                        <Link onClick={closeBurger} to='/cabinet/become-chef' className='header__burger-menu-link'>Стати шефом</Link>
                                    }
                                </li>
                                
                                <div className='header__burger-menu-socila-media-links'>
                                    <a href="https://facebook.com">
                                        <img src={facebookIcon}></img>
                                    </a>
                                    <a href="https://instagram.com">
                                        <img src={instagramIcon}></img>
                                    </a>
                                    <a href="https://telegram.org">
                                        <img src={telegramIcon}></img>
                                    </a>
                                    <a href="mailto:homechef@gmail.com">
                                        <img src={mailIcon}></img>
                                    </a>
                                </div>
                             

                            </ul>
                        </nav>
                    </div>
                }
                {showRegisterWindow && <Register showRegisterWindow={showRegisterWindow} setShowRegisterWindow={setShowRegisterWindow} />}
                {showAuthWindow && <Auth showAuthWindow={showAuthWindow} setShowAuthWindow={setShowAuthWindow} setIsAuth={setIsAuth} setPerson={setPerson}/>}
        </div>
        
    )



    function UserMenu(){
        const [showUserMenu, setShowUserMenu] = useState(false)
        useEffect(() => {
            if(showUserMenu){
                window.addEventListener("click", closeUserMenuListener)
            } else {
                window.removeEventListener("click", closeUserMenuListener)
            }
        }, [showUserMenu])
        

        const closeUserMenuListener = useCallback((e) => {
            if(!document.getElementById("header-user-menu").contains(e.target)){
                setShowUserMenu(false)
            }
        }, [])

        return(
            <div id="header-user-menu" className='header__user-menu-icon' onClick={() => {if(!showUserMenu) setShowUserMenu(true)}}>
                {person && (person.hasMessageNotification || person.hasOrderNotification) &&
                    <div style={{position:'absolute', left:'-5px', top  :'0',width:'10px', height:'10px', borderRadius:'50%', backgroundColor:'green'}}></div>
                }
                <img src={person.imageUrl ? imageUrl + person.imageUrl : userMenuIcon}></img>
                    <div className={showUserMenu ? 'header__user-menu header__user-menu_active' : 'header__user-menu'}>
                        <div className='header__user-menu-top' >
                            <img src={burgerCloseButton} onClick={() => setShowUserMenu(false)}></img>
                        </div>
                        <div className='header__user-menu-username'>{person && person.username}</div>
                        <div className='header__user-menu-nav'>
                            <Link to="/cabinet" onClick={() => setShowUserMenu(false)}>Кабінет</Link>
                            
                        </div>  
                        <button to='/register' className='header__logout-button' onClick={sendLogout}>Вийти</button>
                    </div>
                
            </div>
            
        )
    }
}



export default Header