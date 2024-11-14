import ratingStartEmpty from '../../assets/ratingStarEmpty.png'
import ratingStarFilled from '../../assets/ratingStarFilled1.png'
import './Rating.css'
const Rating = ({rating}) => {
    function chooseReviewRatingImg(rating, position){
        if(Math.round(rating) < position){
            return <img src={ratingStartEmpty}></img>
        } else {
            return <img src={ratingStarFilled}></img>
        }
    }
    return(
        <div className="rating">
            <div className="dish__review-rating-star">
                {chooseReviewRatingImg(rating, 1)}
            </div>
            <div className="dish__review-rating-star">
                {chooseReviewRatingImg(rating, 2)}
            </div>
            <div className="dish__review-rating-star">
                {chooseReviewRatingImg(rating, 3)}
            </div>
            <div className="dish__review-rating-star">
                {chooseReviewRatingImg(rating, 4)}
            </div>
            <div className="dish__review-rating-star">
                {chooseReviewRatingImg(rating, 5)}
            </div>
        </div>
    )
}

export default Rating