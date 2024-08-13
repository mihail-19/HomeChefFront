import { useState } from "react"
import './AnswersFAQ.css'
import faqArrow from '../assets/faqArrow.png'
const AnswersFAQ = () => {
    const [showFlags, setShowFlags] = useState([false,false,false,false,false,false,false])
    function showOrHide(index){
         console.log(showFlags[0])
         const tempFlags = [...showFlags]
         tempFlags[index] = !tempFlags[index]
         console.log(tempFlags)
        setShowFlags(tempFlags)

    }
    
    return (
        <div className="answers-faq">
            <h2>Відповіді на часті запитання</h2>
            <div className="answers-faq__items">
                <div className="answers-faq__item">
                    <div className="answers-faq__itme-top" onClick={() => showOrHide(0)}>
                        <div className="answers-faq__question-text">
                            Який термін придатності страв?
                        </div>
                        <div className="answers-faq__arrow">
                            <img src={faqArrow} className={showFlags[0] && "answers-faq__rotated"}></img>
                        </div>
                    </div>
                    {showFlags[0] && 
                        <div className="answers-faq__answer">
                            Термін придатності страв є загальноприйнятним відповідно до категорії страви. 
                            В цілому всі страви рекомендовано вживати протягом 24 годин, якщо відсутня будь-яка інформація від Шефа.
                        </div>}
                </div>
                <div className="answers-faq__item">
                    <div className="answers-faq__itme-top" onClick={() => showOrHide(1)}>
                        <div className="answers-faq__question-text">
                            Чи готові до вживання страви?
                        </div>
                        <div className="answers-faq__arrow">
                            <img src={faqArrow} className={showFlags[1] && "answers-faq__rotated"}></img>
                        </div>
                    </div>
                    {showFlags[1] && <div className="answers-faq__answer">Всі страви готові до вживання, окрім тих, які є напівффабрикатами та потребують від вас додаткових дій до повної готовності</div>}
                </div>
                <div className="answers-faq__item">
                    <div className="answers-faq__itme-top" onClick={() => showOrHide(2)}>
                        <div className="answers-faq__question-text">
                            Які території ви обслуговуєте?
                        </div>
                        <div className="answers-faq__arrow">
                            <img src={faqArrow} className={showFlags[2] && "answers-faq__rotated"}></img>
                        </div>
                    </div>
                    {showFlags[2] && <div className="answers-faq__answer">Платформа працює по всій території України. Якщо у вашому населеному пункті є Шеф, то ви це обовʼязково побачите.</div>}
                </div>
                <div className="answers-faq__item">
                    <div className="answers-faq__itme-top" onClick={() => showOrHide(3)}>
                        <div className="answers-faq__question-text">
                            Чи є плата за доставку?
                        </div>
                        <div className="answers-faq__arrow">
                            <img src={faqArrow} className={showFlags[3] && "answers-faq__rotated"}></img>
                        </div>
                    </div>
                    {showFlags[3] && <div className="answers-faq__answer">На першому етапі плата за доставку прораховується окремо Шефом відповідно до тарифів існуючих служб доставки. 
                        В подальшому ми плануємо впровадити власну службу доставки або працювати за партнерською програмою.</div>}
                </div>
                <div className="answers-faq__item">
                    <div className="answers-faq__itme-top" onClick={() => showOrHide(4)}>
                        <div className="answers-faq__question-text">
                            Що станеться, якщо мене не буде вдома під час доставки?
                        </div>
                        <div className="answers-faq__arrow">
                            <img src={faqArrow} className={showFlags[4] && "answers-faq__rotated"}></img>
                        </div>
                    </div>
                    {showFlags[4] && <div className="answers-faq__answer">В такому випадку ви можите залишити коментар до свого замовлення при спілкуванні з Шефом, де дасте інструкції щодо поводження із замовленням. 
                        У разі відсутності будь-яких коментарів, Шеф не несе відповідальність за неотримання замовлення клієнтом.</div>}
                </div>
                <div className="answers-faq__item">
                    <div className="answers-faq__itme-top" onClick={() => showOrHide(5)}>
                        <div className="answers-faq__question-text">
                            Як я можу відстежити свою доставку?
                        </div>
                        <div className="answers-faq__arrow">
                            <img src={faqArrow} className={showFlags[5] && "answers-faq__rotated"}></img>
                        </div>
                    </div>
                    {showFlags[5] && <div className="answers-faq__answer">В особистому кабінеті ви будете бачити статус свого замовлення. Додаткові інструкції ви отримаєте від служби доставки або від Шефа.</div>}
                </div>
                <div className="answers-faq__item">
                    <div className="answers-faq__itme-top" onClick={() => showOrHide(6)}>
                        <div className="answers-faq__question-text">                            
                            Чи можу я скасувати замовлення?
                        </div>
                        <div className="answers-faq__arrow">
                            <img src={faqArrow} className={showFlags[6] && "answers-faq__rotated"}></img>
                        </div>
                    </div>
                    {showFlags[6] && <div className="answers-faq__answer">Замовлення можна скасувати до моменту оплати такого замовлення. В іншому випадку Шеф може залишити собі кошти у розмірі 
                        не більше 50% від вартості замовлення. Таким чином Шеф убезпечить себе від шахрайських дій з боку недобросовісних клієнтів.</div>}
                </div>
            </div>
            
        </div>
    )
}

export default AnswersFAQ