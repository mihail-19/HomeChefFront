import { useState } from "react"
import { Link } from "react-router-dom"
import rankingIcon from '../assets/rankingIcon.png'
import chefMary from '../assets/stabs/chefMary.png'
import chefEvgen from '../assets/stabs/chefStabImg3.png'
import chefSvitlana from '../assets/stabs/chefStabImg2.png'
import dish1 from '../assets/stabs/dish1.png'
import dish2 from '../assets/stabs/dish2.png'
import dish3 from '../assets/stabs/dish3.png'
import dish4 from '../assets/stabs/dish4.png'
const PopularChefs = () => {
    const defaultPopularChefs = [
        {
            id: 1,
            name: "Євген",
            imgUrl: chefEvgen,
            kitchenTypes: ["українська", "європейська"],
            description: "Lorem ipsum dolor sit amet consectetur. Arcu ornare nisl ut pharetra volutpat. Lorem ipsum dolor sit amet consectetur. ",
            ranking: {
                rank: 4.8,
                voters: 1425
            },
            dishes: [
                {
                    id:1,
                    imgUrl: dish1,
                    name: "салат веселий",
                    type: "salad",
                    desription: "Lorem ipsum dolor sit amet consectetur. Arcu ornare nisl ut pharetra volutpat. Lorem ipsum dolor sit amet consectetur. ",
                    price: 120,
                    weight: 300
                },
                {
                    id:2,
                    imgUrl: dish2,
                    name: "сткейк",
                    type: "meet",
                    desription: "Lorem ipsum dolor sit amet consectetur. Arcu ornare nisl ut pharetra volutpat. Lorem ipsum dolor sit amet consectetur. ",
                    price: 250,
                    weight: 200
                },
                {
                    id:3,
                    imgUrl: dish3,
                    name: "тістечко",
                    type: "dessert",
                    desription: "Lorem ipsum dolor sit amet consectetur. Arcu ornare nisl ut pharetra volutpat. Lorem ipsum dolor sit amet consectetur. ",
                    price: 180,
                    weight: 150
                },
                {
                    id:4,
                    imgUrl: dish4,
                    name: "паштет курячий",
                    type: "pate",
                    desription: "Lorem ipsum dolor sit amet consectetur. Arcu ornare nisl ut pharetra volutpat. Lorem ipsum dolor sit amet consectetur. ",
                    price: 190,
                    weight: 180
                }


            ]

        },
        {
            id: 2,
            name: "Марія",
            imgUrl: chefMary,
            kitchenTypes: ["українська", "європейська"],
            description: "Arcu ornare nisl ut pharetra volutpat. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.  ",
            ranking: {
                rank: 4.7,
                voters: 1600
            },
            dishes: [
                {
                    id:1,
                    imgUrl: dish1,
                    name: "салат веселий",
                    type: "salad",
                    desription: "Lorem ipsum dolor sit amet consectetur. Arcu ornare nisl ut pharetra volutpat. Lorem ipsum dolor sit amet consectetur. ",
                    price: 120,
                    weight: 300
                },
                {
                    id:2,
                    imgUrl: dish2,
                    name: "сткейк",
                    type: "meet",
                    desription: "Lorem ipsum dolor sit amet consectetur. Arcu ornare nisl ut pharetra volutpat. Lorem ipsum dolor sit amet consectetur. ",
                    price: 250,
                    weight: 200
                },
                {
                    id:3,
                    imgUrl: dish3,
                    name: "тістечко",
                    type: "dessert",
                    desription: "Lorem ipsum dolor sit amet consectetur. Arcu ornare nisl ut pharetra volutpat. Lorem ipsum dolor sit amet consectetur. ",
                    price: 180,
                    weight: 150
                },
                {
                    id:4,
                    imgUrl: dish4,
                    name: "паштет курячий",
                    type: "pate",
                    desription: "Lorem ipsum dolor sit amet consectetur. Arcu ornare nisl ut pharetra volutpat. Lorem ipsum dolor sit amet consectetur. ",
                    price: 190,
                    weight: 180
                }
            ]

        },
        {
            id: 3,
            name: "Світлана",
            imgUrl: chefSvitlana,
            kitchenTypes: ["українська", "азіатська"],
            description: "Arcu ornare nisl ut pharetra volutpat. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.  ",
            ranking: {
                rank: 4.9,
                voters: 948
            },
            dishes: [
                {
                    id:1,
                    imgUrl: dish1,
                    name: "салат веселий",
                    type: "salad",
                    desription: "Lorem ipsum dolor sit amet consectetur. Arcu ornare nisl ut pharetra volutpat. Lorem ipsum dolor sit amet consectetur. ",
                    price: 120,
                    weight: 300
                },
                {
                    id:2,
                    imgUrl: dish2,
                    name: "сткейк",
                    type: "meet",
                    desription: "Lorem ipsum dolor sit amet consectetur. Arcu ornare nisl ut pharetra volutpat. Lorem ipsum dolor sit amet consectetur. ",
                    price: 250,
                    weight: 200
                },
                {
                    id:3,
                    imgUrl: dish3,
                    name: "тістечко",
                    type: "dessert",
                    desription: "Lorem ipsum dolor sit amet consectetur. Arcu ornare nisl ut pharetra volutpat. Lorem ipsum dolor sit amet consectetur. ",
                    price: 180,
                    weight: 150
                },
                {
                    id:4,
                    imgUrl: dish4,
                    name: "паштет курячий",
                    type: "pate",
                    desription: "Lorem ipsum dolor sit amet consectetur. Arcu ornare nisl ut pharetra volutpat. Lorem ipsum dolor sit amet consectetur. ",
                    price: 190,
                    weight: 180
                }
            ]

        }
    ]
    const [popularChefs, setPopularChefs] = useState(defaultPopularChefs)
    const indexes = []
    for(let i = 0; i<=popularChefs.length-1;i++){
        if(i<popularChefs.length-1){
            indexes.push({start: i, end: i+2})
        } else {
            indexes.push({start: i, end: i+1})
        }
    }
    console.log(indexes)
    const [index, setIndex] = useState(0)
    function switchPage(ind){
        setIndex(ind)
    }
    function calcRankVoters(voters){
        if(voters > 999){
            return "(" + (voters/1000).toFixed(1) + "k)"
        } else{
            return "(" + voters + ")"
        }
    }
    return (
        <div className="popular-chefs">
            <h2>Популярні Шефи</h2>
            <div className="popular-chefs__slider">
                <div className="popular-chefs__items">
                    {popularChefs.slice(indexes[index].start, indexes[index].end).map(popularChef => 
                        <div className="popular-chefs__item">

                            <div className="popular-chefs__header">
                                <div className="popular-chefs__chef-photo">
                                    <img src={popularChef.imgUrl}></img>
                                </div>
                                <div className="popular-chef__chef-info">
                                    <h4>Шеф {popularChef.name}</h4>
                                    <p><b>Кухня: </b> {popularChef.kitchenTypes[0]}, {popularChef.kitchenTypes[1]}</p>
                                    <Link to="/abc" className="popular-chef__chef-button">Замовити</Link>
                                </div>
                                <div className="popular-chef__chef-description">
                                    {popularChef.description}
                                </div>
                            </div>
                            
                            <div className="popular-chef__ranking">
                                <div className="popular-chef__ranking-icon">
                                    <img src={rankingIcon}></img>
                                </div>
                                <div className="popular-chef__ranking-value">
                                    {popularChef.ranking.rank} {calcRankVoters(popularChef.ranking.voters)}
                                </div>
                            </div>

                            <div className="popular-chef__dishes">
                                {popularChef.dishes.map(dish => 
                                    <div className="popular-chef__dish">
                                        <div className="popular-chef__dish-img-container">
                                            <div className="popular-chef__dish-img">
                                                <img src={dish.imgUrl}></img>
                                            </div>
                                        </div>
                                        <div className="popular-chef__dish-info">
                                            <h5>{dish.name}</h5>
                                            <div className="popular-chef__dish-menu">
                                                <div className="popular-chef__dish-description">
                                                    {dish.desription}
                                                </div>
                                                <div className="popular-chef__dish-buttons">
                                                    <button className="popular-chef__dish-button popular-chef__dish-button_details">
                                                        Детальніше
                                                    </button>
                                                    <button className="popular-chef__dish-button popular-chef__dish-button_buy">
                                                        Замовити
                                                    </button>
                                                    <button className="popular-chef__dish-button popular-chef__dish-button_buy">
                                                        До корзини
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div className="popular-chef__scroll-buttons">
                    {indexes.map((ind,i) =>{
                       if(i == index) 
                            return (<button className="popular-chef__scroll-button popular-chef__scroll-button_active" ></button>)
                        else
                            return (<button className="popular-chef__scroll-button" onClick={e => switchPage(i)}></button>)
                    })}
                </div>
            </div>
        </div>
    )
}

export default PopularChefs