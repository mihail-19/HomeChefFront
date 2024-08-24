import axios from "axios";
import serverUrl from "../serverUrl";

async function getCart(){
    const url = serverUrl + "/cart/my-cart"
    const res = axios.get(url, {withCredentials: true})
    return res
}

async function addDishToCart(dish){
    const url = serverUrl + "/cart/add-dish"
    const formData = new FormData()
    formData.append('dishId', dish.id)
    const res = axios.post(url, formData, {withCredentials: true})
    return res
}
async function decreaseDishNumber(dish){
    const url = serverUrl + "/cart/decrease-number"
    const formData = new FormData()
    formData.append('dishId', dish.id)
    const res = axios.post(url, formData, {withCredentials:true})
    return res
}

async function removeDish(dish){
    const url = serverUrl + "/cart/remove-dish"
    const formData = new FormData()
    formData.append('dishId', dish.id)
    const res = axios.post(url, formData, {withCredentials:true})
    return res
}

async function removeAllFromCart(){
    const url = serverUrl + "/cart/my-cart"
    const res = axios.delete(url, {withCredentials:true})
    return res
}


function isDishLocalityValidToUser(dish, userLocality){
    const dishLocality = dish.chef.locality
    //Should be removed in pord - chef should always have a locality
    if(!dishLocality){
        return true
    }

    if(userLocality){
        console.log('user locality: ' + userLocality.name)
        if(userLocality.id !== dishLocality.id){
            console.log('user locality is not equal dish locality')
            return false
        }
    } else {
        console.log('no user locality')
        return false
    }
    return true
}

function isDishLocalityValidCartLocalities(dish, cart){
    const dishLocality = dish.chef.locality
    //Should be removed in pord - chef should always have a locality
    if(!dishLocality){
        return true
    }

    
    if(!cart){
        console.log('no cart')
        return true
    }
    console.log(cart)
    for(let i = 0; i < cart.cartProducts.length; i++){
        let product = cart.cartProducts[i]
        if(product.dish.chef.locality.id !== dishLocality.id){
            return false
        }
    }
    
    return true
}

export {getCart, addDishToCart, decreaseDishNumber, removeDish, removeAllFromCart, isDishLocalityValidToUser, isDishLocalityValidCartLocalities}