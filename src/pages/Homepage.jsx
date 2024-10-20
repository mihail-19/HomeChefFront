
import {Link, useNavigate} from 'react-router-dom'
import { TELEGRAM, EMAIL } from '../constants'
import '../App.css'

import sloganMenuImg from '../assets/sloganMenuImg.png'
import sloganEatImg from '../assets/sloganEatImg.png'
import sloganPayImg from '../assets/sloganPayImg.png'
import sloganGetImg from '../assets/sloganGetImg.png'
import secondScreenImg from '../assets/secondScreenImg.jpg'
import thirdScreenList1Img from '../assets/thirdScreenList1Img.png'
import thirdScreenList2Img from '../assets/thirdScreenList2Img.png'
import thirdScreenList3Img from '../assets/thirdScreenList3Img.png'
import securityLogo from '../assets/securityLogo.png'
import securityImg from '../assets/securityImg.png'
import facebookIcon from '../assets/facebookIcon.png'
import instagramIcon from '../assets/instagramIcon.png'
import telegramIcon from '../assets/telegramIcon.png'
import mailIcon from '../assets/mailIcon.png'

import korysnyStravy from '../assets/korysnyStravy.png'
import smachnyStravy from '../assets/smachnyStravy.png'
import solodkyStravy from '../assets/solodkyStravy.png'
import domashnyStravy from '../assets/domashnyStravy.png'

import Header from '../elements/Header'
import ChefStories from '../elements/ChefStories'
import PopularChefs from '../elements/PopularChefs'
import AnswersFAQ from '../elements/AnswersFAQ'
import Footer from '../elements/Footer'

import { useEffect, useState } from 'react'
import { getPerson } from '../services/PersonService'
function Homepage() {
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()

  function searchDish(){
    const url = '/HomeChefFront/dishes/search=' + searchValue
    navigate(url)
  }
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  
  return (
    <>
      <div className='home__main-screen' >
        <div className='home__main-screen-content' >
          <div className='home__main-screen-text'>
            Те, що зроблено з любовʼю
          </div>
          <div className='home__search'>
            <input type="text" placeholder='Знайти страву' value={searchValue} onChange={e => setSearchValue(e.target.value)}></input>
            <button className='home__search-button' onClick={searchDish}>Знайти</button>
          </div>
        </div>
      </div>

      <div className='product-slogan'>
        <div className='product-slogan__inner'>
          <div className='product-slogan__item'>
            <div className='product-slogan__image'>
              <img src={sloganMenuImg}></img>
            </div>
            <div className='product-slogan__text'>
              Обери
            </div>
          </div>
          <div className='product-slogan__item'>
            <div className='product-slogan__image'>
              <img src={sloganPayImg}></img>
            </div>
            <div className='product-slogan__text'>
              Сплати
            </div>
          </div>
          <div className='product-slogan__item'>
            <div className='product-slogan__image'>
              <img src={sloganGetImg}></img>
            </div>
            <div className='product-slogan__text'>
              Отримай
            </div>
          </div>
          <div className='product-slogan__item'>
            <div className='product-slogan__image'>
              <img src={sloganEatImg}></img>
            </div>
            <div className='product-slogan__text'>
              З'їж
            </div>
          </div>
        </div>
      </div>

    




      <div className='home__content-screen'>
        <div className='home__third-screen'>
          <div className='home__third-screen-content'>
            <div className='home__third-screen-upper'>
              <h2>Домашні страви, приготовлені талановитими місцевими кухарями</h2>
              <div className='home__third-screen-text-wrapper'>
                <div className='home__third-screen-text'>
                  Відкрийте для себе якісні автентичні страви – від місцевих 
                  перевірених шеф-кухарів прямо до вас.
                </div>
              </div>
              <div className='home__third-screen-button-wrapper'>
                <Link to="/dishes" className='home__button'>Замовити</Link>
              </div>
            </div>
          </div>

        <div className='home__third-screen-list'>
            <div className='home__third-screen-list-item'>
              <div className='home__thrd-screen-list-image'>
                <img src={thirdScreenList1Img}></img>
              </div>
              <div className='home__third-screen-list-text'>
                Домашнє виробництво зі свіжих якісних інгредієнтів, 
                страви не виробляються масово та не заморожуються.
              </div>
            </div>
            <div className='home__third-screen-list-item'>
              <div className='home__thrd-screen-list-image'>
                <img src={thirdScreenList2Img}></img>
              </div>
              <div className='home__third-screen-list-text'>
                Відкрийте для себе 1000 поживних домашніх страв, страв, 
                які відрізняють домашню кухню від усього іншого.
              </div>
            </div>
            <div className='home__third-screen-list-item'>
              <div className='home__thrd-screen-list-image'>
                <img src={thirdScreenList3Img}></img>
              </div>
              <div className='home__third-screen-list-text'>
                Відкрийте для себе 1000 поживних домашніх страв, страв, 
                які відрізняють домашню кухню від усього іншого.
              </div>
            </div>

        </div>
       </div>
      </div>


      <div className='home__content-screen'>
        <div className='home__dishes-screen'>
          <h2>Які страви чекають на вас?</h2>
          <div className='home__dishes-container'>
            <div className='home__dish-card'>
              <div className='home__dish-image'>
                <img src={korysnyStravy}></img>
              </div>
              <div className='home__dish-text'>
                Корисні
              </div>
            </div>
            <div className='home__dish-card'>
              <div className='home__dish-image'>
                <img src={smachnyStravy}></img>
              </div>
              <div className='home__dish-text'>
                Смачні
              </div>
            </div>
            <div className='home__dish-card'>
              <div className='home__dish-image'>
                <img src={solodkyStravy}></img>
              </div>
              <div className='home__dish-text'>
                Солодкі
              </div>
            </div>
            <div className='home__dish-card'>
              <div className='home__dish-image'>
                <img src={domashnyStravy}></img>
              </div>
              <div className='home__dish-text'>
                Домашні
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className='home__content-screen'>
        <ChefStories/>
      </div>
      
      
      
      
      
      <div className='home__content-screen'>
        <div className='home__client-security'>
          <h2>Ми дбаємо про безпеку клієнтів</h2>
          <div className='home__client-security-logo'>
            <img src={securityLogo}></img>
          </div>
          <div className='home__client-sevurity-content'>
            <div className='home__client-security-image'>
              <img src={securityImg}></img>
            </div>
            <div className='home__clients-security-right'>
              <div className='home__client-security-list'>
                <div className='home__client-securiy-list-item'>
                  <div className='home__client-security-list-icon'></div>
                  <div className='home__client-security-list-text'>Ми надаємо майбутнім шефам всю необхідну інформацію щодо поводження із продуктами.</div>
                </div>
                <div className='home__client-securiy-list-item'>
                  <div className='home__client-security-list-icon'></div>
                  <div className='home__client-security-list-text'>Наші шефи зобовʼязані проходити сертифікаційний курс поводження із харчовими продуктами</div>
                </div>
                <div className='home__client-securiy-list-item'>
                  <div className='home__client-security-list-icon'></div>
                  <div className='home__client-security-list-text'>Ми завжди підтримуємо звʼязок із нашими шефами і допомагаємо практичними порадами.</div>
                </div>
                <div className='home__client-securiy-list-item'>
                  <div className='home__client-security-list-icon'></div>
                  <div className='home__client-security-list-text'>Продукти харчування повинні доставлятися охолодженими для довшого зберігання.</div>
                </div>
                <div className='home__client-securiy-list-item'>
                  <div className='home__client-security-list-icon'></div>
                  <div className='home__client-security-list-text'>Кожен шеф несе особисту відповідальність за якість своїх страв.</div>
                </div>
              </div>
              <div className='home__client-security-info'>
                Ми зацікавлені у тому, щоб ви отримували якісну послугу 
                із якісних продуктів харчування 
                від людини, яка усвідомлює, що та як вона робить.
              </div>
              <div className='home__client-security-connect'>
                Ви завжди можете із нами звʼязатися
              </div>
              <div className='home__client-security-links'>
                <a href="https://facebook.com">
                  <img src={facebookIcon}></img>
                </a>
                <a href="https://instagram.com">
                  <img src={instagramIcon}></img>
                </a>
                <a href={TELEGRAM}>
                  <img src={telegramIcon}></img>
                </a>
                <a href={"mailto:" + EMAIL}>
                  <img src={mailIcon}></img>
                </a>
            </div>
        </div>
            </div>
          </div>
          
      </div>



      <div className='home__content-screen'>
        <AnswersFAQ/>
      </div>
    
    
    </>
    
  )
}

export default Homepage
