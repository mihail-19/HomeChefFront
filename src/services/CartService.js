import axios from "axios";
import serverUrl from "../serverUrl";

async function getCart(){
    const url = serverUrl + "/cart/my-cart"
    const res = axios.get(url, {withCredentials: true})
    return res
}

async function addDishToCart(dish){
    const url = serverUrl + "/cart/add-dish"
    const res = axios.post(url, dish, {withCredentials: true})
    return res
}
async function decreaseDishNumber(dish){
    const url = serverUrl + "/cart/decrease-number"
    const res = axios.post(url, dish, {withCredentials:true})
    return res
}

async function removeDish(dish){
    const url = serverUrl + "/cart/remove-dish"
    const res = axios.post(url, dish, {withCredentials:true})
    return res
}

export {getCart, addDishToCart, decreaseDishNumber, removeDish}