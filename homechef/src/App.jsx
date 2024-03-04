
import {Link} from 'react-router-dom'
import './App.css'
import Header from './elements/Header'
import sloganMenuImg from './assets/sloganMenuImg.png'
import sloganEatImg from './assets/sloganEatImg.png'
import sloganPayImg from './assets/sloganPayImg.png'
import sloganGetImg from './assets/sloganGetImg.png'
import secondScreenImg from './assets/secondScreenImg.jpg'
function App() {
  
  return (
    <>
      <Header/>
      <div className='home__main-screen' >
        <div className='home__main-screen-content' >
          <div className='home__main-screen-text'>
            Те, що зроблено з любовʼю
          </div>
          <div className='home__search'>
            <input type="text" value='Ваш індекс або адреса'></input>
            <button className='home__search-button'>Знайти</button>
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
                  Augue viverra pellentesque sed neque orci facilisis sodales. Non sit tristique nulla tortor duis morbi massa. 
                </p>
              </div>
            
          </div>
          <Link to="/become-chef" className='become-chef-button'>
            Стати Home Chef
          </Link>
          </div>
      </div>
      
    </>
  )
}

export default App
