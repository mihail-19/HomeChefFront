

import helpingCenterImage from '../assets/helpingCenterImage.png'
import instagramIcon from '../assets/instagramIcon.png'
import telegramIcon from '../assets/telegramIcon.png'
import mailIcon from '../assets/mailIcon.png'
import './footerPages.css'
import { useEffect } from 'react'

const HelpingCenter = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    return (
        <div className='helping-center'>
            <h1>Центр допомоги</h1>
            <div className='helping-center__image'>
                <img src={helpingCenterImage}></img>
            </div>
            <div className='helping-center__text'>
                <p>
                    У разі виникнення будь-яких питань по роботі із платформою або замовленням, 
                    завжди можна звернутися до нашого центру підтримки будь-яким доступним способом.
                </p>
                <p>
                    Ми завжди дамо відповідь на ті запитання, які вас турбують.
                    Також просимо звернути увагу на розділ “Часті запитання”, так як, можливо, ви зможете знайти відповідь на своє запитання саме в цьому розділі на головній сторінці
                </p>
                <p>
                    В особистому кабінеті Шефа та Клієнта також містяться матеріали, з якими можна ознайомитися для більш зручної роботи із платформою.
                </p>
            </div>
            <div className='helping-center__links'>
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
    )
}

export default HelpingCenter