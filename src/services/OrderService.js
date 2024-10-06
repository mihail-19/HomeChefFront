import axios from 'axios'
import serverUrl from '../serverUrl'

const orderPerPage = 10

async function addOrder(order){
    const url = serverUrl + '/orders'
    const res = axios.post(url, order, {withCredentials:true})
    return res
}


async function getChefOrders(pageNumber, type){
    const url = serverUrl + '/orders/for-chef'
    let paramsArray = []
    paramsArray.push(['pageNumber', pageNumber])
    paramsArray.push(['pageSize', orderPerPage])
    paramsArray.push(['type', type])
    const params = new URLSearchParams(paramsArray)
    const res = axios.get(url, {params, withCredentials:true})
    return res
}


async function promoteOrder(order){
    const url = serverUrl + '/orders/' + order.id + '/promote'
    const res = axios.put(url,{}, {withCredentials:true})
    return res
}


async function getUserOrders(){
    const url = serverUrl + '/orders/for-customer'
    const res = axios.get(url, {withCredentials:true})
    return res
}

export {addOrder, getChefOrders, promoteOrder, getUserOrders}