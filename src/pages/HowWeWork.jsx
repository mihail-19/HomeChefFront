
import { useEffect } from 'react'
import howWeWorkImage from '../assets/howWeWorkImage.png'
import './footerPages.css'

const HowWeWork = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    return(
        <div className='how-works'>
            <h1>Як ми працюємо</h1>
            <div className='how-works__image'>
                <img src={howWeWorkImage}></img>
            </div>
            <div className='how-works__text'>
                <p>
                    На справді все дуже просто.
                    Ми маємо дві ролі, а саме “Шеф” та “Клієнт”, які взаємодіють між собою шляхом виставленням срави на продаж “Шефом” та купівлею такої страви “Клієнтом”.
                </p>
                <p>
                    Кожен із користувачів має свій особистий кабінет для більш 
                    зручної взаємодії з платформою. Шефи створюють та розміщують свої авторські страви, контролюють отримані замовлення.
                    Клієнти здійснюють пошук страв на мапі, за назвою, за регіоном. Мають можливість фільтрувати своє замовлення, 
                    відслідковувати статус замовленних страв, залишати відгуки шефам, від яких було отримано замовлення
                </p>
                <p>
                    Загалом все дуже просто та цікаво, просто дій.
                </p>
            </div>
        </div>
    )
}

export default HowWeWork