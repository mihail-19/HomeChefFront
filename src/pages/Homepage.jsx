
import {Link, useNavigate} from 'react-router-dom'

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
          <div className='home__second-screen-content'>
            <div className='home__second-screen-content-info'>
              <div className='home__second-screen-content-left'>
                <div className='home__second-screen-title'>
                  Про нас та наші цінності
                </div>
                <div className='home__second-screen-img'>
                  <img src={secondScreenImg}></img>
                </div>
              </div>
              <div className='home__second-screen-content-right'>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Feugiat habitasse eros tincidunt sagittis. 
                  Augue viverra pellentesque sed neque orci facilisis sodales. Non sit tristique nulla tortor duis morbi massa. Cras vestibulum lacus nullam dolor in lacus dictum nunc viverra.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Feugiat habitasse eros tincidunt sagittis. Augue viverra pellentesque sed neque orci facilisis sodales. 
                  Non sit tristique nulla tortor duis morbi massa. Cras vestibulum lacus nullam dolor in lacus dictum nunc viverra.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Feugiat habitasse eros tincidunt sagittis. 
                  1Augue viverra pellentesque sed neque orci facilisis sodales. Non sit tristique nulla tortor duis morbi massa. 
                </p>
              </div>
            
            </div>
            <Link to="/become-chef" className='home__button'>
              Стати Home Chef
            </Link>
          </div>

          <div className='home__second-screen_mobile'>
            <div className='home__second-screen-image-and-header'>
              <h2>Про нас та наші цінності</h2>
              <div className='home__second-screen-img_mobile'>
                  <img src={secondScreenImg}></img>
                </div>
            </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Feugiat habitasse eros tincidunt sagittis. 
                  Augue viverra pellentesque sed neque orci facilisis sodales. Non sit tristique nulla tortor duis morbi massa. Cras vestibulum lacus nullam dolor in lacus dictum nunc viverra.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Feugiat habitasse eros tincidunt sagittis. Augue viverra pellentesque sed neque orci facilisis sodales. 
                  Non sit tristique nulla tortor duis morbi massa. Cras vestibulum lacus nullam dolor in lacus dictum nunc viverra.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Feugiat habitasse eros tincidunt sagittis. 
                  1Augue viverra pellentesque sed neque orci facilisis sodales. Non sit tristique nulla tortor duis morbi massa. 
                </p>
                <Link to="/become-chef" className='home__button'>
                Стати Home Chef
               </Link>
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
        <ChefStories/>
      </div>
      
      
      <PopularChefs/>
      
      
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
                  <div className='home__client-security-list-text'>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.</div>
                </div>
                <div className='home__client-securiy-list-item'>
                  <div className='home__client-security-list-icon'></div>
                  <div className='home__client-security-list-text'>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.</div>
                </div>
                <div className='home__client-securiy-list-item'>
                  <div className='home__client-security-list-icon'></div>
                  <div className='home__client-security-list-text'>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.</div>
                </div>
                <div className='home__client-securiy-list-item'>
                  <div className='home__client-security-list-icon'></div>
                  <div className='home__client-security-list-text'>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.</div>
                </div>
                <div className='home__client-securiy-list-item'>
                  <div className='home__client-security-list-icon'></div>
                  <div className='home__client-security-list-text'>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.</div>
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
                <a href="https://telegram.org">
                  <img src={telegramIcon}></img>
                </a>
                <a href="mailto:homechef@gmail.com">
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
