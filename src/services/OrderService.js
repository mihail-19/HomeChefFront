import axios from 'axios'
import serverUrl from '../serverUrl'

async function addOrder(order){
    const url = serverUrl + '/orders'
    const res = axios.post(url, order, {withCredentials:true})
    return res
}

async function getChefOrders(){
    const url = serverUrl + '/chefs/my-orders'
    const res= axios.get(url, {withCredentials:true})
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