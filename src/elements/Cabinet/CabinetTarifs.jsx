import serverUrl from "../../serverUrl"
import okImg from '../../assets/okTarifImg.png'


const CabinetTarifs = () => {
    return (
        <div className="cabinet-tarifs">
            <h1>Ваш тарифний план</h1>
            <div className="cabinet-tarifs__main">
                <div className="cabinet-tarifs__curret-tarif">
                    <div className="cabinet-tarifs__tarif-row">
                        Розміщення страв <span><img src={okImg}></img></span>
                    </div>
                    <div className="cabinet-tarifs__tarif-row">
                        Особистий кабінет <span><img src={okImg}></img></span>
                    </div>
                    <div className="cabinet-tarifs__tarif-row">
                       Просування а рахунок платформи <span><img src={okImg}></img></span>
                    </div>
                    <div className="cabinet-tarifs__tarif-row">
                        ВІдстеження замовлень <span><img src={okImg}></img></span>
                    </div>
                    <div className="cabinet-tarifs__tarif-row">
                        Підтримка з боку платформи <span><img src={okImg}></img></span>
                    </div>
                    <div className="cabinet-tarifs__tarif-row">
                       Збільшення клієнтської бази <span><img src={okImg}></img></span>
                    </div>
                    <div className="cabinet-tarifs__tarif-row">
                       Практичні поради щодо розвитку <span><img src={okImg}></img></span>
                    </div>

                    <div className=" cabinet-tarifs__discount">
                        <span className="cabinet-tarifs__discounted-price">2000₴</span>
                        Пільговий період 60 днів
                    </div>
                </div>
                <div className="cabinet-tarifs__buy">
                    <h2>Вартість послуг</h2>
                    <p>
                    Після закінчення пільгового періоду Вам необхідно буде сплатити за користування платформою
                     у розмірі 1000₴ за кожні наступні 30 днів. Якщо Ви не бажаєте продовжувати користуватися 
                     платформою, можна не сплачувати за користування, тоді ваша сторінка не буде відображатися 
                     користувачам і буде видалена.
                    </p>

                    <form action={serverUrl + '/chefs/pay'} method="POST">
                        <div className="cabinet-tarifs__form-row">
                            <div className="cabinet-tarifs__form-field_card">
                                <label>Номер картки</label>
                                <input type="text" name="card" className="cabinet-tarifs__card"></input>
                            </div>
                        </div>
                        <div className="cabinet-tarifs__form-row">
                            <div className="cabinet-tarifs__form-field">
                                <label>Термін дії</label>
                                <input type="text" name="term" className="cabinet-tarifs__card-data"></input>
                            </div>
                            <div className="cabinet-tarifs__form-field">
                                <label>Код</label>
                                <input type="text" name="cvv" className="cabinet-tarifs__card-data"></input>
                            </div>
                        </div>
                        <div className="cabinet-tarifs__form-row">
                            <div className="cabinet-tarifs__form-field">
                                <label>Сума</label>
                                <input type="text" name="sum" className="cabinet-tarifs__sum"></input>
                            </div>
                        </div>
                        <input type="submit" className="cabinet-tarifs__submit-button" value='Сплатити'></input>
                    </form>

                </div>
            </div>


            <div className="cabinet-tarifs__info">
                Баланс: 0₴
            </div>
            <div className="cabinet-tarifs__info">
                Пільгових днів: 60
            </div>
        </div>
    )
}

export default CabinetTarifs