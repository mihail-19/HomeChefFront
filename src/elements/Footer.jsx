import { Link } from "react-router-dom"
import './Footer.css'
import facebookFooterIcon from '../assets/facebookFooterIcon.png'
import instagramFooterIcon from '../assets/instagramFooterIcon.png'
import telegramFooterIcon from '../assets/telegramFooterIcon.png'
import mailFooterIcon from '../assets/mailFooterIcon.png'
const Footer = ({showRegisterWinow, setShowRegisterWindow}) =>{
    return(
        <div className="footer">
            <div className="footer__top">
                <div className="footer__left">
                    <div className="footer__logo">
                        Home Chef
                    </div>
                    <div className="footer__social-links">
                        <a href="https://facebook.com">
                            <img src={facebookFooterIcon}></img>
                        </a>
                        <a href="https://instagram.com">
                            <img src={instagramFooterIcon}></img>
                        </a>
                        <a href="https://telegram.org">
                            <img src={telegramFooterIcon}></img>
                        </a>
                        <a href="mailto:homechef@gmail.com">
                            <img src={mailFooterIcon}></img>
                        </a>
                    </div>
                    
                </div>


                <nav className="footer__nav">
                    <div className="footer__nav-column">
                        <h3>Основне</h3>
                        <Link to="/about-us">Про нас</Link>
                        <Link to="/products-safety">Безпечність продуктів</Link>
                        <Link to="/certification">Пройти сертифікацію</Link>
                        <Link to="/helping-center">Центр допомоги</Link>
                    </div>
                    <div className="footer__nav-column">
                        <h3>Співпраця</h3>
                        <button onClick={() => setShowRegisterWindow(true)}>Cтати шефом</button>
                        <Link to="/how-we-work">Як ми працюємо</Link>
                    </div>
                </nav>
            </div>

            <div className="footer__bottom">
                <div className="footer__bottom-links">
                    <Link to="/privat-policy">Політика Конфіденційності</Link>
                    <Link to="/terms-of-use">Умови користування</Link>
                </div>
                <div className="footer__bottom-copyright">
                    © Korobky, Inc. 2024 | All rights raserved
                </div>
            </div>
        </div>
    )
}
export default Footer