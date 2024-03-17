import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import './Header.css'
import citiesOfBuisiness from '../services/citiesOfBuisiness'
import cityArrow from '../assets/headerCityArrow.png'
import cart from '../assets/cart.png'
import burgerMenuIcon from '../assets/burgerMenuIcon.png'
import burgerCloseButton from '../assets/burgerCloseButton.png'
import facebookIcon from '../assets/facebookIcon.png'
import instagramIcon from '../assets/instagramIcon.png'
import telegramIcon from '../assets/telegramIcon.png'
import mailIcon from '../assets/mailIcon.png'
const Header = ()=>{
    const [city, setCity] = useState("Місто")
    const [showCities, setShowCities] = useState(false)
    const [showBurger, setShowBurger] = useState(false)
    function switchShowBurger(){
        //disable scroll whie burger menu flag changes. Value is opposite to current
        if(!showBurger){
            document.documentElement.style.setProperty('overflow', 'hidden')
        } else {
            document.documentElement.style.setProperty('overflow', 'auto')
        }
        setShowBurger(!showBurger)
    }
    function switchShowCities(){
        setShowCities(!showCities)
    }
    function chooseCity(c){
        setCity(c)
        setShowCities(false)
    }
    return (
        <div className='header'>
                <div className='header__logo'>Home<br/> Chef</div>
                <div className='header__search'>
                    <input type="text" placeholder='Знайти за назвою страви'></input>
                    <button className='header__search-button'>Знайти</button>
                </div>
                <nav className='header__nav'>
                    <ul className='header__menu'>
                        <li className='header__menu-item'>
                            <Link to='/dishes' className='header__menu-link header__menu-link_catalog'>Страви</Link>
                        </li>
                        <li className='header__menu-item'>
                            <Link to='/about-us' className='header__menu-link'>Про нас</Link>
                        </li>
                        
                        <li className='header__menu-item'>
                            <div className='header__menu-link header__city-button' onClick={switchShowCities}>
                                <div className='header__city'>{city}</div>
                                {(showCities && !showBurger) &&
                                    <div className='header__city-list'>
                                    {citiesOfBuisiness().map(c => 
                                        <div className='header__city-list-item' onClick={() => chooseCity(c)}>{c}</div>                                        
                                    )}
                                    </div>    
                                }
                                <div className='header__city-arrow'>
                                    <img className={ showCities && 'header__rotated'} src={cityArrow}></img>
                                </div>
                               
                            </div>
                        </li>
                        <li>
                            <Link to="/cart" className='header__cart'>
                                <img src={cart}></img>
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className='header__burger-menu-icon' onClick={switchShowBurger}>
                    <img src={burgerMenuIcon}></img>
                </div>
                
                <div className='header__auth'>
                    <Link to='/login' className='header__signin-button'>Увійти</Link>
                    <Link to='/register' className='header__register-button'>Реєстрація</Link>
                </div>
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
                        <div className='header__burger-menu-auth'>
                            <Link to='/login' className='header__burger-menu-signin'>Вхід</Link>
                            <Link to='/register' className='header__burger-menu-register'>Реєстрація</Link>
                        </div>
                        <nav className='header__burger-menu-nav'>
                            <ul>
                                <li>
                                    <Link to="/cart" className='header__cart'>
                                        <img src={cart}></img>
                                    </Link>
                                </li>
                                <li className='header__burger-menu-nav-item'>
                                    <Link to='/dishes' className='header__burger-menu-link header__burger-menu-link_catalog'>Страви</Link>
                                </li>
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
        </div>
    )
}
export default Header