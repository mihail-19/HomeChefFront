import axios from "axios"
import serverUrl from "../serverUrl"

const notificationPageSize = 2

const getNotifications = async (pageNumber) => {
    const url = serverUrl + '/notifications/my'
    let paramsArray = [['pageNumber', pageNumber], ['pageSize', notificationPageSize]]
    const params = new URLSearchParams(paramsArray)
    const res = axios.get(url, {params, withCredentials: true})
    return res
}

const addNotification = async (title, text, recipientId) => {
    const notification = {
        title: title,
        text: text,
        recipientId: recipientId
    }
    const url = serverUrl + '/notifications'
    const res = axios.post(url, notification, {withCredentials: true})
    return res
}

const readNotification = async (notificationId) => {
    const url = serverUrl + '/notifications/' + notificationId + '/read'
    const res = axios.patch(url,{}, {withCredentials: true})
    return res
}

export {getNotifications, addNotification, readNotification}