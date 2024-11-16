import { Link } from "react-router-dom"
import './Footer.css'
import facebookFooterIcon from '../assets/facebookFooterIcon.png'
import instagramFooterIcon from '../assets/instagramFooterIcon.png'
import telegramFooterIcon from '../assets/telegramFooterIcon.png'
import mailFooterIcon from '../assets/mailFooterIcon.png'
import { EMAIL, INSTAGRAM, TELEGRAM } from "../constants"
const Footer = ({showRegisterWinow, setShowRegisterWindow, isAuth}) =>{

    function becomeChefButton(){
        if(!isAuth){
            return <button onClick={() => setShowRegisterWindow(true)}>Cтати шефом</button>
        } else {
            return <Link to='/cabinet/become-chef'>Стати шефом</Link>
        }
    }

    return(
        <div className="footer">
            <div className="footer__top">
                <div className="footer__left">
                    <Link to="/" className="footer__logo">
                        Home Chef
                    </Link>
                    <div className="footer__left-bottom">

                       
                        <div className="footer__social-links">
                            <a href={INSTAGRAM}>
                                <img src={instagramFooterIcon}></img>
                            </a>
                            <a href={TELEGRAM}>
                                <img src={telegramFooterIcon}></img>
                            </a>
                            <a href={'mailto:' + EMAIL}>
                                <img src={mailFooterIcon}></img>
                            </a>
                        </div>
                        <div className="footer__bottom">
                            <div className="footer__bottom-links">
                                <Link to="/privat-policy">Політика Конфіденційності</Link>
                                <Link to="/terms-of-use">Умови користування</Link>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div className="footer__right">
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
                        {becomeChefButton()}
                        <Link to="/how-we-work">Як ми працюємо</Link>
                    </div>
                </nav>
                <div className="footer__bottom-copyright">
                    © Home Chef, 2024 | All rights raserved
                </div>
                </div>
            </div>

            
        </div>
    )
}
export default Footer