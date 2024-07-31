import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { getDishReviews } from "../../services/DishService"
import Rating from "../utility/Rating"
import './CabinetReviews.css'

const CabinetReviews = () => {
    const context = useOutletContext()
    const [dishes, setDishes] = useState([])
    const [selectedDishId, setSelectedDishId] = useState(0)
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        if(context && context.chef && context.chef.dishes){
            setDishes(context.chef.dishes)
            if(context.chef.dishes.length > 0 && selectedDishId === 0){
                loadReviews(context.chef.dishes[0].id)
            }
        }
    }, [context])

    async function loadReviews(dishId){
        setSelectedDishId(dishId)
        const {data} = await getDishReviews(dishId)
        setReviews(data)

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
    return(
        <div className="cabinet-reviews">
            <div className="cabinet-reviews__menu">
                <div className="cabinet-reviews__menu-element">
                    <label>Назва страви</label>
                    <select className="cabinet-reviews__select" value={selectedDishId} onChange={e => loadReviews(e.target.value)}>
                        {dishes.map(dish => {
                        return <option value={dish.id}>{dish.name}</option>
                        })}
                    </select>   
                </div>
            </div>
            <div className="cabiet-reviews__reviews">
                {reviews.map(review => {
                    return <div className="cabinet-reviews__review">
                                <div className="cabinet-reviews__review-info">
                                    <div className="cabinet-reviews__author">{review.message.author ? review.message.author : 'Анонім'}</div>
                                    <div className="cabinet-reviews__date">{prettyPrintDate(new Date(review.message.date))}</div>
                                </div>
                                <div className="cabinet-reviews__text">
                                    {review.message.text}
                                </div>
                                <div className="cabinet-reviews__rating">
                                    <Rating rating={review.rating}/>
                                </div>
                        </div>
                })}
            </div>
        </div>
    )
}

export default CabinetReviews