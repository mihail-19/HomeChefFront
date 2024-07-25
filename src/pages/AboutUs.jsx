import { Link } from "react-router-dom"


import topImage from '../assets/AboutUs/topImage.png'
import valueImage1 from '../assets/AboutUs/valueImage1.png'
import valueImage2 from '../assets/AboutUs/valueImage2.png'
import valueImage3 from '../assets/AboutUs/valueImage3.png'
import valueImage4 from '../assets/AboutUs/valueImage4.png'
import peopleImg1 from '../assets/AboutUs/peopleImg1.png'
import peopleImg2 from '../assets/AboutUs/peopleImg2.png'
import peopleImg3 from '../assets/AboutUs/peopleImg3.png'
import peopleImg4 from '../assets/AboutUs/peopleImg4.png'
import storyImgLeft from '../assets/AboutUs/storyImgLeft.png'
import storyImgMiddle from '../assets/AboutUs/storyImgMiddle.png'
import storyImgRight from '../assets/AboutUs/storyImgRight.png'

import './AboutUs.css'

const AboutUs = () => {


    return(
        <div className="about-us">
            
          
           
            <div className="about-us__top-container">
                <h1>Про нас</h1>
                <div className="about-us__top">
                    <div className="about-us__top-image">
                        <img src={topImage}></img>
                    </div>
                    <div className="about-us__top-text">
                        <p>
                            <b>Home Chef</b> - це затишне місце, де ми з любов'ю готуємо для вас найсмачніші та корисні страви прямо у себе вдома. Наша команда складається з професіоналів, 
                            які кожен день творять справжні кулінарні шедеври, використовуючи лише свіжі та натуральні інгредієнти.
                        </p>
                        <p>
                            Ми віримо, що різноманіття страв - запорука гарного настрою. Ми намагаємося створювати страви, які не лише смачні, а й корисні для вашого організму.
                        </p>
                        <p>
                            Наше меню різноманітне і насичене різними стравами - від класичних рецептів до авторських кулінарних витворів. Ми готові порадувати навіть найвибагливіших 
                            гурманів і підібрати страви під будь-який смак.
                        </p>
                        <p>
                            Ми цінуємо кожного, адже завдяки людям ми можемо постійно вдосконалюватися та робити щось неймовірне.
                        </p>
                        <p>
                            Приєднуйтеся до нас і дозвольте собі насолодитися смаком домашньої їжі, приготованої з любов'ю та турботою про ваше здоров'я!
                        </p>
                    </div>
                </div>
            </div>

            <h2>Наші цінності</h2>
            <div className="about-us__values">
                <div className="about-us__values-images">
                    <div className="about-us__values-image">
                        <img src={valueImage1}></img>
                    </div>
                    <div className="about-us__values-image about-us__hidden">
                        <img src={valueImage2}></img>
                    </div>
                    <div className="about-us__values-image">
                        <img src={valueImage3}></img>
                    </div>
                    <div className="about-us__values-image about-us__hidden">
                        <img src={valueImage4}></img>
                    </div>
                </div>
                <div className="about-us__values-text">
                    <p> 
                        Наша команда <b>Home Chef</b> - це об'єднання талановитих та пристрасних професіоналів, які діляться спільною любов'ю до кулінарного мистецтва. 
                        Кожен учасник нашої команди - це не лише висококваліфікований спеціаліст, а й людина з великим серцем, яка вкладає частинку своєї душі в 
                        кожну страву, яку ми готуємо.
                    </p>
                    <p>
                        У нас важливі цінності, а саме турбота про клієнтів, професіоналізм, творчий підхід до роботи, взаємоповага та співпраця. 
                        Ми прагнемо до постійного удосконалення і розвитку, щоб надавати найкращий сервіс і задовольняти потреби наших клієнтів.
                    </p>
                </div>
                <button className="about-us__join-button">
                    Стати Home Chef
                </button>
            </div>

            <div className="about-us__line"></div>




            <h2>Про людей</h2>
            <div className="about-us__people">
                <div className="about-us__people-images">
                    <div className="about-us__poeple-image">
                        <img src={peopleImg1}></img>
                    </div>
                    <div className="about-us__poeple-image">
                        <img src={peopleImg2}></img>
                    </div>
                    <div className="about-us__poeple-image">
                        <img src={peopleImg3}></img>
                    </div>
                    <div className="about-us__poeple-image">
                        <img src={peopleImg4}></img>
                    </div>
                </div>
                <div className="about-us__people-text">
                    <p>
                        Історію пишуть люди. Наша команда - це справжня родина, де кожен з них має свою роль, свою історію, 
                        свої переживання та важливе місце. Ми пишаємося своїми спільними досягненнями і завжди раді допомогти 
                        один одному. Для нас важливо не лише готувати смачну їжу, а й створювати атмосферу тепла, затишку та доброзичливості.
                    </p>
                    <p>
                        Щоденно кожен із нас зіштовхується з різного роду проблемами, емоціональними потрясіннями, але також 
                        доводить собі, що зможе перебороти все. Ми разом переживаємо радість, смуту, щастя та сльози розчарування. 
                        Рухаємось далі, пишемо нову сторінку історії, історії яка наповнена мріями, перемогами та світлим майбутнім.
                    </p>
                </div>
            </div>

            <div className="about-us__line"></div>



            <h2>Історія проєкту</h2>
            <div className="about-us__story-images">
                <div className="about-us__story-image about-us__story-image_left">
                    <img src={storyImgLeft}></img>
                </div>
                <div className="about-us__story-image about-us__story-image_middle">
                    <img src={storyImgMiddle}></img>
                </div>
                <div className="about-us__story-image about-us__story-image_right">
                    <img src={storyImgRight}></img>
                </div>
            </div>

            <div className="about-us__story-text">

                <p>
                    Нас надихають теплі спогади із дитинства. Коли ми були маленькими, то бабуся завжди 
                    готувала найсмачнішу їжу. Вона використовувала свій особливий рецепт, який передавався з покоління в покоління. 
                    Кожного разу, коли ми приходили до бабусі в гості, то нас зустрічав чудовий аромат якоїсь 
                    смачненької страви. Ці страви завжди нагадують нам про тепло і затишок дитинства.
                </p>
                <p>
                    Сьогодні ми переживаємо важкі часи, але ми розуміємо, що ці часи породжують сильних людей. 
                    Кожен із нас спроможний на щось більше, на щось, що буде відігравати важливу роль у житті. 
                    Разом ми спроможні відбудувати всі зруйновані мости у нашому житті, разом ми можемо повернутися у дитинство.
                </p>
                <p>
                    Ми вбачаємо світле майбутнє у тій справі, яка принесе користь всім. Для нас важливо щоб кожна 
                    людина отримувала задоволення від того, що вона робить. Чи то ти полюбляєшь готувати вдома для своєї 
                    родини або сусідів, чи то ти полюбляєш домашню їжу, але не дуже подобається готувати.
                </p>
                <p>
                    Нам здалося, що в якийсь момент кожен період часу обʼєднався в одну маленьку історію, яка обовʼязково буде мати продовження.
                </p>
                <p>
                    Так зʼявився <b>Home Chef</b>.
                </p>

                <Link to="/HomeChefFront" className="about-us__link">На головну</Link>
            </div>

            

        </div>
    )
}

export default AboutUs