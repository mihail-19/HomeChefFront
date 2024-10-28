import { Link } from "react-router-dom"

import faqArrow from '../../assets/faqArrow.png'
import telegramIcon from '../../assets/telegramIcon.png'
import mailIcon from '../../assets/mailIcon.png'

import serverUrl from "../../serverUrl"
import { useState } from "react"
import axios from "axios"
const downloadUrl = serverUrl + '/common-data/files/chef-info'


const CabinetUseful = () => {
    const [showFlags, setShowFlags] = useState([false,false,false, false])
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
                    {showFlags[0] && <div className="cabinet-useful__answer">
                        При пошуку страви користувач буде бачити або повний перелік страв від всіх Шефів,
                        або конкретні страви за запитом, наприклад “Борщ”. Страви відображаються у вигляді 
                        картки із фото страви, найменуванням, ціною, описом, вагою (все те, що ви заповнюєти при 
                        додаванні страви до меню).

                    </div>}
                </div>

                <div className="cabinet-useful__item">
                    <div className="cabinet-useful__itme-top" onClick={() => showOrHide(1)}>
                        <div className="cabinet-useful__question-text">
                            Як зробити якісне фото, яке підійде до картки товару?
                        </div>
                        <div className="cabinet-useful__arrow">
                            <img src={faqArrow} className={showFlags[0] && "cabinet-useful__rotated"}></img>
                        </div>
                    </div>
                    {showFlags[1] && <div className="cabinet-useful__answer">
                        Для того, щоб картка товару виглядала естетично та фото страви не обрізалося, не розтягувалося,
                        необхідно робити горизонтальну зйомку страви. Також важливо завжди використовувати однаковий 
                        фон для страв, адже таким чином ваша сторінка із стравами буде виглядати гармонічно та естетично.

                    </div>}
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
                    {showFlags[2] && <div className="cabinet-useful__answer">Вартість страви формується із фактичних витрат на приготування із врахуванням використаної електроенергії, інших енергетичних ресурсів, а також собівартості продуктів харчування та кількості витрачених інгрідієнтів 
                        на приготування тієї чи іншої страви. Ні в якому разі не можна формувати вартість однієї страви при витратах 
                        по харчових продуктах на декілька страв. При отриманій чистій собівартості страви, ви закладуєте вартість своєї роботи та таким чином отримуєте вартість
                        готової страви.
                        <br/>
                        <b>Важливо!</b>
                        <br/>
                        Відсоток надбавки за свою роботу може коливатися від 30% до 200% від чистої вартості готової страви (без
                        урахування витраченого часу на приготування).
                    </div>}
                </div>

                <div className="cabinet-useful__item">
                    <div className="cabinet-useful__itme-top" onClick={() => showOrHide(3)}>
                        <div className="cabinet-useful__question-text">
                        Як переключитися на кабінет клієнта?

                        </div>
                        <div className="cabinet-useful__arrow">
                            <img src={faqArrow} className={showFlags[2] && "cabinet-useful__rotated"}></img>
                        </div>
                    </div>
                    {showFlags[3] && <div className="cabinet-useful__answer">Кожен клієнт, який став “Шефом” не може повернутися до першочергових налаштувань свого облікового запису.
                        Для того щоб перейти у статус “Клієнта”, необхідно реєструвати новий обліковий запис.
                    </div>}
                </div>

            </div>
        )
    }
}

export default CabinetUseful