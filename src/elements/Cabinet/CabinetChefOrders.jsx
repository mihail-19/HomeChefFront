import { useEffect, useState } from "react"
import { getChefOrders } from "../../services/OrderService"
import Loading from "../utility/Loading"
import OrdersTable from "./OrdersTable"
import { Link, useNavigate, useParams } from "react-router-dom"
import Pages from "../utility/Pages"
const CabinetChefOrders = ({person, sendGetPerson}) => {
    const [loading, setLoading] = useState(true)
    const [windowNumber, setWindowNumber] = useState(1)
    const [orders, setOrders] = useState([])
    const [newOrdersNum, setNewOrdersNum] = useState(0)
    const [paramsParsed, setParamsParsed] = useState(null)
    const [totalPages, setTotalPages] = useState(0)
    const [totalOrders, setTotalOrders] = useState(0)
    const {params} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        parseParams()
    }, [])
    useEffect(() => {
        parseParams()
    }, [params])
    // useEffect(() => {
    //     setNewOrdersNum(orders.filter(o => o.state === "NEW").length)
    // }, [orders])


    async function loadOrders(paramsParsed){
        if(!paramsParsed){
            return
        }
        setLoading(true)
        const pageNumber = paramsParsed && paramsParsed.page ? paramsParsed.page-1 : 0
        let type = paramsParsed.type
       
        const {data} = await getChefOrders(pageNumber, type)
        if(person && person.hasOrderNotification){
            sendGetPerson()
        }
        setOrders(data.content)
        setTotalPages(data.totalPages)
        setTotalOrders(data.totalElements)
        setLoading(false)
    }

    function sendLoadOrders(){
        loadOrders(paramsParsed)
    }



    function parseParams(){
        let pParsed = parse(params)
        const stringified = stringify(pParsed)
        if(stringified !== params){
            navigate('/cabinet/chef-orders/' + stringified)
        }
        
        setParamsParsed(pParsed)
        loadOrders(pParsed)
    }
    function buildLinkToPage(page){
        const paramsCopy = {...paramsParsed}
        paramsCopy.page = page
        return '/cabinet/chef-orders/' + stringify(paramsCopy)
    }

    return (
        <div className="chef-orders">
            <Loading isActive={loading} seIsActive={setLoading}/>
            <TopMenu/>
            <div className="chef-orders__orders-list">
                <OrdersTable orders={orders} loadOrders={sendLoadOrders} setLoading={setLoading}/>
            </div>
            <Pages currentPage={paramsParsed && paramsParsed.page ? paramsParsed.page : 1} totalPages={totalPages} buildLinkToPage={buildLinkToPage}/>
        </div>
    )

    function TopMenu(){
        return (
            <div className="chef-orders__menu">
                <Link to="/cabinet/chef-orders/type=all"  className={paramsParsed?.type === 'all' ? "chef-orders__menu-element chef-orders__menu-element_all" : "chef-orders__menu-element"}>
                    Всі
                    {paramsParsed?.type === 'all' &&
                        <div className="chef-orders__menu-count chef-orders__menu-count_all">{totalOrders}</div>
                    }
                </Link>
                <Link to="/cabinet/chef-orders/type=new"  className={!paramsParsed || !paramsParsed.type || paramsParsed.type === 'new' ? "chef-orders__menu-element chef-orders__menu-element_new" : "chef-orders__menu-element"}>
                    В очікуванні
                    {!paramsParsed || !paramsParsed.type || paramsParsed.type === 'new' &&
                        <div className="chef-orders__menu-count chef-orders__menu-count_new">{totalOrders}</div>
                    }
                </Link>
                <Link to="/cabinet/chef-orders/type=in-progress"  className={paramsParsed?.type === 'in-progress'? "chef-orders__menu-element chef-orders__menu-element_in-progres" : "chef-orders__menu-element"}>
                    В роботі
                    {paramsParsed?.type === 'in-progress' &&
                        <div className="chef-orders__menu-count chef-orders__menu-count_in-progress">{totalOrders}</div>
                    }
                </Link>
                <Link to="/cabinet/chef-orders/type=finished" className={paramsParsed?.type === 'finished' ? "chef-orders__menu-element chef-orders__menu-element_finished" : "chef-orders__menu-element"}>
                    Завершені
                    {paramsParsed?.type === 'finished' &&
                        <div className="chef-orders__menu-count chef-orders__menu-count_finished">{totalOrders}</div>
                    }
                </Link>
            </div>
        )
    }

   
    

}


//pase params



function parse(paramsString){
    if(!paramsString || paramsString.length === 0){
        return undefined
    }
    const paramsSplitted = paramsString.split(';')
    const paramsObject = {}
    paramsSplitted.forEach(element => {
        const param = element.split('=')
        if(param.length > 1){
            if(param[0] === 'page'){
                paramsObject.page = parseInt(param[1])
            }  else if(param[0] === 'type'){
                if(param[1] === 'all'){
                    paramsObject.type = 'all'
                } else if(param[1] === 'new'){
                    paramsObject.type = 'new'
                } else if(param[1] === 'in-progress'){
                    paramsObject.type = 'in-progress'
                } else if(param[1] === 'finished'){
                    paramsObject.type = 'finished'
                } else {
                    paramsObject.type = 'new'
                }
            }
            
        }
    });
    return Object.keys(paramsObject).length > 0 ? paramsObject : undefined
}

function multipleParamsToArray(str){
    const splittedTags = str.split(',')
    const arr = []
    for(let i = 0; i<splittedTags.length;i++){
        const intValue = parseInt(splittedTags[i])
        if(!isNaN(intValue) && isFinite(intValue) && !arr.includes(intValue)){
            arr.push(intValue)
        }
    }    
    return arr
}

function stringify(params){
    if(!params){
        return ''
    }
    let res = ''
    if(params.page && params.page > 1){
        if(res.length > 0){
            res += ';'
        }
        res += 'page=' + params.page
    }
            
    if(params.type){
        if(res.length > 0){
            res += ';'
        }
        res += 'type=' + params.type
    }
    return res
}

export default CabinetChefOrders