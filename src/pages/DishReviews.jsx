import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import {getDishReviews, addDishReview, answerDishReview} from '../services/DishService'
import ModalCenter from '../elements/utility/ModalCenter'
import ratingStartEmpty from '../assets/ratingStarEmpty.png'
import ratingStarFilled from '../assets/ratingStarFilled.png'
import './Dish.css'
import Rating from "../elements/utility/Rating"
const DishReviews = () => {
    const {id} = useParams()
    const [reviews, setReviews] = useState([])
    const [showAddReview, setShowAddReview] = useState(false)
    const [showAnswerReview, setShowAnswerReview] = useState(false)
    const [newReview, setNewReview] = useState('')
    const [answeredReview, setAnsweredReview] = useState('')
    const [reviewToAnswerId, setReviewToAnswerId] = useState(-1)
    const [rating, setRating] = useState(null)

    useEffect(() => {
        loadReviews(id)
    }, [])

    useEffect(() => {
        setRating(null)
        setNewReview('')
        setAnsweredReview('')
    }, [showAddReview, showAnswerReview])

    async function loadReviews(dishId){
        const {data} = await getDishReviews(dishId)
        setReviews(data)
    }

    async function addReview(){
        const res = await addDishReview(id, rating, newReview)
        setShowAddReview(false)
        loadReviews(id)
    }

    async function answerReview(reviewId){
        const res = await answerDishReview(id, reviewId, answeredReview)
        setShowAnswerReview(false)
        loadReviews(id)
    }

    function chooseReviewRatingImg(rating, position){
        if(rating < position){
            return <img src={ratingStartEmpty}></img>
        } else {
            return <img src={ratingStarFilled}></img>
        }
    }

    return (
        <div className="dish">
            <div className="dish__top-navigation">
                <Link to={'/HomeChefFront/dish/' + id} className="dish__navigation-button">Страва</Link>
                <Link to={'/HomeChefFront/dish/' + id + '/comments'} className="dish__navigation-button dish__navigation-button_active">Відгуки</Link>
            </div>
            <button className="dish__add-review-button" onClick={() => setShowAddReview(true)}>Залишити відгук</button>
            <ModalCenter isActive={showAddReview} setIsActive={setShowAddReview} content={addReviewWindow()}/>
            <ModalCenter isActive={showAnswerReview} setIsActive={setShowAnswerReview} content={answerReviewWindow()}/>
            <div className="dish__reviews">
                {reviews.map(r => {
                    
                return <div className="dish__review-container">
                        <div className="dish__review">
                        
                                <Rating rating={r.rating}/>
                                
                                <Message msg={r.message}/>
                                <div className="dish__review-controls">
                                    <button className="dish__review-answer-button" onClick={() => openAnswerReviewWindow(r.id)}>
                                        Відповісти
                                    </button>
                                </div>
                        </div>
                        <div className="dish__review-child-container">
                            {r.nestedMessages.map(rn => {
                                return <Message msg={rn}/>
                            })}
                        </div>
                    </div>
                })}
            </div>
        </div>
    )

    function openAnswerReviewWindow(reviewId){
        setReviewToAnswerId(reviewId)
        setShowAnswerReview(true)
    }

    function Message({msg}){
        const d = new Date(msg.date)
        function authorRole(){
            if(msg.authorRole === "ADMIN"){
                return <span className="dish__message-author-role dish__message-author-role_admin">{'[адмін]'}</span>
            } else if (msg.authorRole === "CHEF"){
                return <span className="dish__message-author-role dish__message-author-role_chef">{'[шеф]'}</span>
            } else if(msg.authorRole === "USER"){
                return <span className="dish__message-author-role dish__message-author-role_user">{'[покупець]'}</span>
            }
        }
        return (
            <div className="dish__review-message">
                <div className="dish__review-message-info">
                    <div className="dish__review-name">
                        {msg.author ? msg.author : 'Анонім'} {authorRole()}
                    </div>
                    <div className="dish__review-date">
                        {prettyPrintDate(d)}
                    </div>
                </div>
                {msg.text}
            </div>
        )
    }

    function addReviewWindow(){
        const [howerRating, setHowerRating] = useState(0)

        function chooseStarType(position){
            const valueToCompare = rating ? rating : howerRating
            
            if(valueToCompare < position){
                return <img src={ratingStartEmpty}></img>
            } else {
                return <img src={ratingStarFilled}></img>
            }
        }

        return (
            <div className="dish__add-review">
                <h2>Ваш відгук</h2>
                <div className="dish__choose-rating">
                    <div className="dish__choose-rating-star" onMouseEnter={() => setHowerRating(1)} onMouseLeave={() => setHowerRating(0)} onClick={() => chooseRating(1)}>
                        {chooseStarType(1)}
                    </div>
                    <div className="dish__choose-rating-star" onMouseEnter={() => setHowerRating(2)} onMouseLeave={() => setHowerRating(0)} onClick={() => chooseRating(2)}>
                        {chooseStarType(2)}
                    </div>
                    <div className="dish__choose-rating-star" onMouseEnter={() => setHowerRating(3)} onMouseLeave={() => setHowerRating(0)} onClick={() => chooseRating(3)}>
                        {chooseStarType(3)}
                    </div>
                    <div className="dish__choose-rating-star" onMouseEnter={() => setHowerRating(4)} onMouseLeave={() => setHowerRating(0)} onClick={() => chooseRating(4)}>
                        {chooseStarType(4)}
                    </div>
                    <div className="dish__choose-rating-star" onMouseEnter={() => setHowerRating(5)} onMouseLeave={() => setHowerRating(0)} onClick={() => chooseRating(5)}>
                        {chooseStarType(5)}
                    </div>

                </div>
                <textarea className="dish__add-rewiev-input" value={newReview} onChange={e => setNewReview(e.target.value)}>

                </textarea>
                <button className="dish__add-rewiev-submit" onClick={addReview}>Відправити</button>
            </div>
        )
    }

    function answerReviewWindow(){
        return (
            <div className="dish__add-review">
                <h2>Відповідь на відгук</h2>
                <textarea className="dish__add-rewiev-input" value={answeredReview} onChange={e => setAnsweredReview(e.target.value)}>

                </textarea>
                <button className="dish__add-rewiev-submit" onClick={() => answerReview(reviewToAnswerId)}>Відправити</button>
            </div>
        )
    }

    function prettyPrintDate(d){
        const date = new Date(d)
        const month = date.getMonth() + 1
        const monthTxt = month < 10 ? '0' + month : month
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        return day + '.' + monthTxt + '.' + date.getFullYear() + ' - ' + hour + ':' + minute
    }


    function chooseRating(value){
        setRating(value)
    }
}


export default DishReviews