import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import citiesOfBuisiness from '../services/citiesOfBuisiness'
import cityArrow from '../assets/headerCityArrow.png'
import cart from '../assets/cart.png'
import burgerMenuIcon from '../assets/burgerMenuIcon.png'
const Header = ()=>{
    const [city, setCity] = useState("Місто")
    const [showCities, setShowCities] = useState(false)
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
                                {showCities &&
                                    <div className='header__city-list'>
                                    {citiesOfBuisiness().map(c => 
                                        <div className='header__city-list-item' onClick={() => chooseCity(c)}>{c}</div>                                        
                                    )}
                                    </div>    
                                }
                                <div className='header__city-arrow'>
                                    <img src={cityArrow}></img>
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
                <div className='header__burger-menu'>
                    <img src={burgerMenuIcon}></img>
                </div>
                <div className='header__auth'>
                    <Link to='/login' className='header__signin-button'>Увійти</Link>
                    <Link to='/register' className='header__register-button'>Реєстрація</Link>
                </div>
        </div>
    )
}
export default Header