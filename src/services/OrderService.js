import axios from 'axios'
import serverUrl from '../serverUrl'

async function addOrder(order){
    const url = serverUrl + '/orders'
    const res = axios.post(url, order, {withCredentials:true})
    return res
}

export {addOrder}