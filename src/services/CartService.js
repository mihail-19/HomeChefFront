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

async function removeAllFromCart(){
    const url = serverUrl + "/cart/my-cart"
    const res = axios.delete(url, {withCredentials:true})
    return res
}

function isValidDishLocality(dish, cart, userLocality){
    const dishLocality = dish.chef.person.dishLocality
    //Should be removed in pord - chef should always have a locality
    if(!dishLocality){
        return true
    }

    if(userLocality){
        if(userLocality.name !== dishLocality){
            return false
        }
    }
    if(!cart){
        return true
    }
    cart.products.forEach(product => {
        if(product.dish.chef.locality != dishLocality){
            return false
        }
    })
    return true
}

export {getCart, addDishToCart, decreaseDishNumber, removeDish, removeAllFromCart, isValidDishLocality}