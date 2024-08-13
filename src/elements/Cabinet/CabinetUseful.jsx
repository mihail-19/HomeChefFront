import { Link } from "react-router-dom"

import faqArrow from '../../assets/faqArrow.png'
import telegramIcon from '../../assets/telegramIcon.png'
import mailIcon from '../../assets/mailIcon.png'

import serverUrl from "../../serverUrl"
import { useState } from "react"
import axios from "axios"
const downloadUrl = serverUrl + '/common-data/files/chef-info'


const CabinetUseful = () => {
    const [showFlags, setShowFlags] = useState([false,false,false])
    function showOrHide(index){
         const tempFlags = [...showFlags]
         tempFlags[index] = !tempFlags[index]
        setShowFlags(tempFlags)
    }

    const fileDownload = async () => {
        const resp = await axios.get(downloadUrl, {responseType: 'blob', withCredentials: true, referrerPolicy: "unsafe-url" })
        const blob = new Blob([resp.data])
        const bloburl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = bloburl
        link.download = 'chefUsefull.pdf'
        link.click()
    }


    return(
        <div className="cabinet-useful">
            <h1>Тут ви знайдете рекомендації по роботі із платформою</h1>
            <Answers />
            <Link to={downloadUrl} className="cabinet-useful__link">Додаткові матеріали</Link>
            <div className="cabinet-useful__social-links">
                <a href="https://telegram.org">
                  <img src={telegramIcon}></img>
                </a>
                <a href="mailto:homechef@gmail.com">
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
                            Що відображається у користувачів при пошуку страви?
                        </div>
                        <div className="cabinet-useful__arrow">
                            <img src={faqArrow} className={showFlags[0] && "cabinet-useful__rotated"}></img>
                        </div>
                    </div>
                    {showFlags[0] && <div className="cabinet-useful__answer">Поки не скисне</div>}
                </div>
                <div className="cabinet-useful__item">
                    <div className="cabinet-useful__itme-top" onClick={() => showOrHide(1)}>
                        <div className="cabinet-useful__question-text">
                            Коли зʼявляється можливість додавати рецепти?
                        </div>
                        <div className="cabinet-useful__arrow">
                            <img src={faqArrow} className={showFlags[1] && "cabinet-useful__rotated"}></img>
                        </div>
                    </div>
                    {showFlags[1] && <div className="cabinet-useful__answer">Поки не скисне</div>}
                </div>
                <div className="cabinet-useful__item">
                    <div className="cabinet-useful__itme-top" onClick={() => showOrHide(2)}>
                        <div className="cabinet-useful__question-text">
                            Як формувати вартість страви?
                        </div>
                        <div className="cabinet-useful__arrow">
                            <img src={faqArrow} className={showFlags[2] && "cabinet-useful__rotated"}></img>
                        </div>
                    </div>
                    {showFlags[2] && <div className="cabinet-useful__answer">Поки не скисне</div>}
                </div>
            </div>
        )
    }
}

export default CabinetUseful