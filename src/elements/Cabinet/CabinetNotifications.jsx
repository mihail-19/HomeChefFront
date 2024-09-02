

import { useEffect, useState } from 'react'
import {getNotifications, readNotification} from '../../services/NotificationService'
import { useParams } from 'react-router-dom'
import Pages from '../utility/Pages'
import { parse, stringify } from '../../services/DishParamService'
import ModalCenter from '../utility/ModalCenter'
import { getPerson } from '../../services/PersonService'
import prettyPrintDate from '../utility/prettyPrintDate'
const CabinetNotifications = ({person, setPerson}) => {

    const [notifications, setNotifications] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [paramsParsed, setParamsParsed] = useState(null)
    const [showNotification, setShowNotification] = useState(false)
    const [notificationToShow, setNotificationToShow] = useState(null)
    const {params} = useParams()


    useEffect(() => {
        parseParams()
        if(person && person.hasNotifications){
            loadPerson()
        }
    }, [])
    useEffect(() => {
        parseParams()
    }, [params])
    useEffect(() => {
        if(person && person.hasNotifications){
            parseParams()
        }
    }, [person])
    // useEffect(() => {
    //     if(paramsParsed){
    //         loadNotifications()
    //     }
    // }, [paramsParsed])
    async function loadPerson(){
        try{
            const {data} = await getPerson()
            setPerson(data)
          } catch (error){
            console.log(error)
          }
    }
    function parseParams(){
        let pParsed = parse(params)
        console.log(pParsed)
        setParamsParsed(pParsed)
        loadNotifications(pParsed)

    }

    async function loadNotifications(paramsParsed){
        const pageNumber = paramsParsed && paramsParsed.page ? paramsParsed.page-1 : 0
        const {data} = await getNotifications(pageNumber)
        if(data.totalPages !== totalPages){
            setTotalPages(data.totalPages)
        }
        setNotifications(data.content)
    }

    function buildLinkToPage(page){
        const paramsCopy = {...params}
        paramsCopy.page = page
        return '/cabinet/notifications/' + stringify(paramsCopy)
    }

    function openNotification(notification){
        setNotificationToShow(notification)
        setShowNotification(true)
        sendConfirmNotification(notification)
    }

    async function sendConfirmNotification(notification){
        await readNotification(notification.id)
        loadNotifications(paramsParsed)
    }
    return (
        <div style={{fontFamily:'Monserrat'}}>
            <ModalCenter isActive={showNotification} setIsActive={setShowNotification} content={notificationWindow()}/>
            <h1>Повідомлення</h1>
            {notifications.map(n => {
                return <div onClick={() => openNotification(n)} style={{cursor: 'pointer', borderBottom: '1px solid gray', width:'80%', fontWeight: n.isRead ? '300': '500', fontSize:'20px', padding:'10px 0 0 0', display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <div>{n.title}</div> <div style={{fontSize:'0.7em'}}>{prettyPrintDate(n.date)}</div>
                    </div>
            })}
            <Pages currentPage={paramsParsed && paramsParsed.page ? paramsParsed.page : 1} totalPages={totalPages} buildLinkToPage={buildLinkToPage}/>
        </div>
    )

    function notificationWindow(){
        return <div style={{width:'90vw'}}>
            <div style={{borderBottom:'1px solid gray'}}>{notificationToShow ? prettyPrintDate(notificationToShow.date) : null}</div>
            <h2>{notificationToShow?.title}</h2>
            <div>{notificationToShow?.text}</div>
        </div>
    }
}

export default CabinetNotifications