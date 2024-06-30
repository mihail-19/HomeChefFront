
import { useState } from "react"
import { getAllChefs } from "../services/ChefService"
import { useEffect } from "react"
import imagesUrl from "../imagesUrl"
import rankingIcon from "../assets/rankingIcon.png"
import defaultChefIcon from "../assets/defaultChefIcon.png"
import './Chefs.css'
import { Link, useParams } from "react-router-dom"
import { parse, stringify } from "../services/DishParamService"
import Pages from "../elements/utility/Pages"
const Chefs = () => {
    const [chefs, setChefs] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [paramsParsed, setParamsParsed] = useState({})
    const {params} = useParams()

    useEffect(() => {
        parseParams(params)
    }, [])
    
    useEffect(() => {
        parseParams(params)
    }, [params])

    function parseParams(params){
        let pParsed = parse(params)
        if(pParsed && stringify(pParsed) !== params){
            console.log(pParsed)
            console.log(stringify(pParsed))
            console.log(params)
            navigate('/HomeChefFront/chefs/' + stringify(pParsed))
        } else {
            console.log(pParsed)
            setParamsParsed(pParsed)
            loadChefs(pParsed)
        }
    }


    async function loadChefs(paramsParsed){
        const pageNumber = paramsParsed && paramsParsed.page ? paramsParsed.page-1 : 0
        console.log('page n ' + pageNumber)
        const {data} = await getAllChefs(pageNumber)
        if(data.totalPages !== totalPages){
            setTotalPages(data.totalPages)
        }
        setChefs(data.content)
    } 
    
    function buildLinkToPage(page){
        const paramsCopy = {...params}
        paramsCopy.page = page
        return '/HomeChefFront/chefs/' + stringify(paramsCopy)
    }

    return(
        <div className="chefs">
            <h1>Наші шефи</h1>
            <div className="chefs__top"></div>
            <div className="chefs__chef-list">
                {chefs.map(chef => {
                    return (
                        <Link to={"/HomeChefFront/chef/" + chef.id} className="chefs__chef">
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
                            
                        </Link>
                    )
                })}
            </div>
            <Pages currentPage={paramsParsed && paramsParsed.page ? paramsParsed.page : 1} totalPages={totalPages} buildLinkToPage={buildLinkToPage}/>
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