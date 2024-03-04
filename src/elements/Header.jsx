import React from 'react'
import {Link} from 'react-router-dom'
const Header = ()=>{
    return (
        <div className='header'>
            <div className='header__container'>
                <div className='header__logo'>Hoome Chef</div>
                <div className='header__search'>
                    <input type="text" value='Знайти за назвою страви'></input>
                    <button className='header__search-button'>Знайти</button>
                </div>
                <nav className='header__nav'>
                    <ul className='header__menu'>
                        <li className='header__menu-item'>
                            <Link to='/dishes' className='header__menu-link header__menu-link_catalog'>Страви</Link>
                        </li>
                        
                        <li className='header__menu-item'>
                            <Link to='/dishes' className='header__menu-link'>Шефи на мапі</Link>
                        </li>
                        <li className='header__menu-item'>
                            <Link to='/dishes' className='header__menu-link'>Наші шефи</Link>
                        </li>
                    </ul>
                </nav>
                <div className='header__auth'>
                    <Link to='/login' className='header__signin-button'>Увійти</Link>
                    <Link to='/register' className='header__register-button'>Реєстрація</Link>
                </div>
            </div>
        </div>
    )
}
export default Header