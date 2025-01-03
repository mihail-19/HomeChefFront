import { Link } from "react-router-dom"

import faqArrow from '../../assets/faqArrow.png'
import telegramIcon from '../../assets/telegramIcon.png'
import mailIcon from '../../assets/mailIcon.png'

import serverUrl from "../../serverUrl"
import { useState } from "react"
import axios from "axios"
import { EMAIL, TELEGRAM } from "../../constants"
const downloadUrl = serverUrl + '/common-data/files/user-info'


const CabinetUsefulForUser = () => {
    const [showFlags, setShowFlags] = useState([false,false,false])
    function showOrHide(index){
         const tempFlags = [...showFlags]
         tempFlags[index] = !tempFlags[index]
        setShowFlags(tempFlags)
    }



    return(
        <div className="cabinet-useful">
            <h1>Тут ви знайдете рекомендації по роботі із платформою</h1>
            <Answers />
            <a href={downloadUrl} className="cabinet-useful__link cabinet-useful__link_user" download>Додаткові матеріали</a>
            <div className="cabinet-useful__social-links">
                <a href={TELEGRAM}>
                  <img src={telegramIcon}></img>
                </a>
                <a href={EMAIL}>
                  <img src={mailIcon}></img>
                </a>
            </div>
        </div>
    )


    


    function Answers(){
        return (
            <div className="cabinet-useful__items">
                <div className="cabinet-useful__item">
                    <div className="cabinet-useful__itme-top" onClick={() => showOrHide(0)}>
                        <div className="cabinet-useful__question-text">
                            Як відстежувати замовлення?
                        </div>
                        <div className="cabinet-useful__arrow">
                            <img src={faqArrow} className={showFlags[0] && "cabinet-useful__rotated"}></img>
                        </div>
                    </div>
                    {showFlags[0] && <div className="cabinet-useful__answer">Ви можете відстежувати статус свого замовлення в особистому кабінеті в розділі "Статус замовлень".</div>}
                </div>
                <div className="cabinet-useful__item">
                    <div className="cabinet-useful__itme-top" onClick={() => showOrHide(1)}>
                        <div className="cabinet-useful__question-text">
                            Що гарантує якість мого замовлення?
                        </div>
                        <div className="cabinet-useful__arrow">
                            <img src={faqArrow} className={showFlags[1] && "cabinet-useful__rotated"}></img>
                        </div>
                    </div>
                    {showFlags[1] && <div className="cabinet-useful__answer">Кожен шеф ознайомлений із правилами взаємодії із платформою та наслідками неякісного або неналежного 
                        виконання покладених на нього обовʼязків. Команда проєкту постійно відслідковує підозрілі сторінки та видаляє їх. Кожен шеф в особистому кабінеті 
                        має додаткову інформацію щодо поводження із харчовими продуктами. Один із головних чинників - це репутація Шефа, яка може постраждати від неякісно 
                        виконаного замовлення.</div>}
                </div>
                <div className="cabinet-useful__item">
                    <div className="cabinet-useful__itme-top" onClick={() => showOrHide(2)}>
                        <div className="cabinet-useful__question-text">
                            Чи можу я робити замовлення, якщо знаходжусь в іншому місті?
                        </div>
                        <div className="cabinet-useful__arrow">
                            <img src={faqArrow} className={showFlags[2] && "cabinet-useful__rotated"}></img>
                        </div>
                    </div>
                    {showFlags[2] && <div className="cabinet-useful__answer">Замовлення необхідно робити за місцем знаходження, адже 
                        система попередить про невідповідність місцязнаходження Шефа та користувача.</div>}
                </div>
            </div>
        )
    }
}

export default CabinetUsefulForUser