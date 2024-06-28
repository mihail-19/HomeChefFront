
import { useState } from "react"
import { getAllChefs } from "../services/ChefService"
import { useEffect } from "react"
import imagesUrl from "../imagesUrl"
import rankingIcon from "../assets/rankingIcon.png"
import defaultChefIcon from "../assets/defaultChefIcon.png"
import './Chefs.css'
const Chefs = () => {
    const [chefs, setChefs] = useState([])
    useEffect(() => {
        loadChefs()
    }, [])

    async function loadChefs(){
        const {data} = await getAllChefs()
        setChefs(data.content)
    }

    return(
        <div className="chefs">
            <h1>Наші шефи</h1>
            <div className="chefs__top"></div>
            <div className="chefs__chef-list">
                {chefs.map(chef => {
                    return (
                        <div className="chefs__chef">
                            <div className="chefs__chef-img">
                                <img src={chef.imageURL ? imagesUrl + chef.imageURL : defaultChefIcon}></img>
                            </div>
                            <div className="chefs__info">
                                <div className="chefs__chef-name"><b>{'[' + chef.username + ']'}</b> Шеф {chef.firstName}</div>
                                <div className="chefs__chef-info-row">Локація: {chef.locality?.name}</div>
                                <div className="chefs__chef-rating">
                                    <span><img src={rankingIcon}></img></span>
                                    {buildRank(chef.ranking)}
                                </div>
                                <div className="chefs__chef-info-row">К-ть блюд: {chef.dishNumber}</div>
                                <div className="chefs__chef-description">{chef.description}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )

    function buildRank(ranking){
        if(!ranking){
            return '0/0'
        }
        let voters = ranking.voters
        if(voters > 999){
            voters = voters/1000 + 'k'
        }
        return ranking.rank + '/' + voters
    }
}

export default Chefs