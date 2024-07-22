import rankingIcon from '../assets/rankingIcon.png'
import imagesUrl from '../imagesUrl'
import defaultDishImg from '../assets/defaultDish.jpg'
import { Link } from 'react-router-dom'
import './DishCard.css'
import Rating from './utility/Rating'
const DishCard = ({dish, sendAddToCart}) => {
    


    return (
        <div className="dish-card__dish">
            <div className='dish-card__rating'>
            </div>
            <div className="dish-card__chef-info">
                <div className="dish-card__chef-img">
                    <img src={imagesUrl + dish.chef.imageURL}></img>
                </div>
                <div className="dish-card__chef-rating">
                    <span><img src={rankingIcon}></img></span> {dish.chef.ranking ? dish.chef.ranking.rank + '(' + dish.chef.ranking.voters + ')' : "0/0"}
                </div>
            </div>
            <Link to={"/HomeChefFront/dish/" + dish.id} className="dish-card__dish-img">
                <img src={dish.imageURL ? imagesUrl + dish.imageURL : defaultDishImg}></img>
            </Link>
            <div className="dish-card__dish-info">
                <div className="dish-card__dish-chef-name">Шеф {dish.chef.firstName}</div>
                <div className="dish-card__dish-locality"> {dish.chef.locality?.name}</div>
                <div className="dish-card__dish-chef-name">{dish.price} грн</div>
                <div className="dish-card__dish-name">{dish.name}</div>
                <div className="dish-card__dish-description">{dish.description}</div>
                <div className="dish-card__dish-tags">
                    {dish.dishTags?.map(tag => {
                        return <div className="dish__dish-tag">{tag.name}</div>
                    })}
                </div>
                <div className="dish-card__dish-buttons">
                    <button onClick={() => sendAddToCart(dish)}>Додати у кошик</button>
                    <Link to={"/HomeChefFront/chefs/" + dish.chef.id + "/dishes"}>Інші страви шефа</Link>
                </div>
            </div>
        </div>
    )
}

export default DishCard