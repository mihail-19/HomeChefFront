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
const Header = ({isAuth, setIsAuth, person, setPerson, cart, locality, setLocality, showRegisterWindow, setShowRegisterWindow})=>{
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
        if(showCities){
            window.addEventListener("click", closeCityListener)
        } else {
            window.removeEventListener("click", closeCityListener)
        }
    }, [showCities])

    const closeCityListener = useCallback((e) => {
         if(!document.getElementById("header-city").contains(e.target)){
             setShowCities(false)
         }
    }, [])

    function switchShowCities(){
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
    return (
        <div className='header'>
                <Link to="/HomeChefFront" className='header__logo'>
                    <img src={homeChefLogo}></img>
                </Link>
                
                <nav className='header__nav'>
                    <ul className='header__menu'>
                        <li className='header__menu-item'>
                            <Link to='/HomeChefFront/chefs-map' className='header__menu-link'>Наші шефи</Link>
                        </li>
                        <li className='header__menu-item'>
                            <Link to='/HomeChefFront/dishes' className='header__menu-link header__menu-link_catalog'>Страви</Link>
                        </li>
                        <li className='header__menu-item'>
                            <Link to='/HomeChefFront/about-us' className='header__menu-link'>Про нас</Link>
                        </li>
                        
                        <li className='header__menu-item'>
                            <div id="header-city" className='header__menu-link header__city-button' onClick={switchShowCities}>
                                <div className='header__city'>{city}</div>
                                    <ActiveLocalityList isActive={showCities} setIsActive={setShowCities} locality={locality} setLocality={chooseCity}/>   
                                <div className='header__city-arrow'>
                                    <img className={ showCities && 'header__rotated'} src={cityArrow}></img>
                                </div>
                               
                            </div>
                        </li>
                        <li className='header__cart-container'>
                            {cart && cart.cartProducts && cart.cartProducts.length > 0 &&
                                <div className='header__cart-number'>{cart.cartProducts.length}</div>
                            }
                            <Link to="/HomeChefFront/cart" className='header__cart'>
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
                                    <Link to="/HomeChefFront/cart" className='header__cart'>
                                        <img src={cartImg}></img>
                                    </Link>
                                </li>
                                
                                <li className='header__burger-menu-nav-item'>
                                    <Link to='/dishes' className='header__burger-menu-link header__burger-menu-link_catalog'>Страви</Link>
                                </li>
                                {isAuth &&
                                    <li className='header__burger-menu-nav-item'>
                                        <Link to='/HomeChefFront/cabinet' className='header__burger-menu-link'>Кабінет</Link>
                                    </li>
                                }
                                <li className='header__burger-menu-nav-item header__burger-menu-cities' onClick={switchShowCities}>
                                    <div >{city}</div>
                                    <div >
                                        <img className={ showCities && 'header__rotated'} src={cityArrow}></img>
                                    </div>
                                    {showCities && showBurger &&
                                        <div className='header__burger-menu-city-list'>
                                        {citiesOfBuisiness().map(c => 
                                            <div className='header__burger-menu-city-list-item' onClick={() => chooseCity(c)}>{c}</div>                                        
                                        )}
                                        </div>    
                                    }
                                    
                                </li>
                                
                                <li className='header__burger-menu-nav-item'>
                                    <Link to='/about-us' className='header__burger-menu-link'>Про нас</Link>
                                </li>
                                <li className='header__burger-menu-nav-item'>
                                    <Link to='/chefs' className='header__burger-menu-link'>Наші шефи</Link>
                                </li>
                                <li className='header__burger-menu-nav-item'>
                                    <Link to='/become-chef' className='header__burger-menu-link'>Cтати шефом</Link>
                                </li>
                                <li className='header__burger-menu-nav-item'>
                                    <Link to='/food-delivery' className='header__burger-menu-link'>Доставка їжі</Link>
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
                {person && person.hasNotifications &&
                    <div style={{position:'absolute', left:'-5px', top  :'0',width:'10px', height:'10px', borderRadius:'50%', backgroundColor:'green'}}></div>
                }
                <img src={person.imageUrl ? imageUrl + person.imageUrl : userMenuIcon}></img>
                    <div className={showUserMenu ? 'header__user-menu header__user-menu_active' : 'header__user-menu'}>
                        <div className='header__user-menu-top' >
                            <img src={burgerCloseButton} onClick={() => setShowUserMenu(false)}></img>
                        </div>
                        <div className='header__user-menu-username'>{person && person.username}</div>
                        <div className='header__user-menu-nav'>
                            <Link to="/HomeChefFront/cabinet" onClick={() => setShowUserMenu(false)}>Кабінет</Link>
                            
                        </div>  
                        <button to='/register' className='header__logout-button' onClick={sendLogout}>Вийти</button>
                    </div>
                
            </div>
            
        )
    }
}



export default Header