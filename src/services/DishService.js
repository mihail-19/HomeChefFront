import axios from "axios"
import serverUrl from "../serverUrl"

const addDish = async (dish, imageFile) => {
    const url = serverUrl + "/dishes/add"
    const formData = new FormData()
    formData.append("dish", JSON.stringify(dish))
    formData.append("file", imageFile)
    const res = axios.post(url, formData, {
        withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data"
            }
    })
    return res
}

const removeDish = async (dishId) => {
    const url = serverUrl + "/dishes/" + dishId
    const res = axios.delete(url, {
        withCredentials: true
    })
    return res
}

const getAllDishes = async(pageNumber) => {
    const url = serverUrl + "/dishes"
    const params = new URLSearchParams([['pageNumber', pageNumber]])
    const res = axios.get(url, {params}, {withCredentials:true})
    return res
}

const getAllDishesWithFilters = async(pageNumber, categoryIds, tagIds, localityId, price) => {
    const url = serverUrl + "/dishes"
    let paramsArray = []
    paramsArray.push(['pageNumber', pageNumber])
    if(categoryIds){
        paramsArray.push(['categoryIds', categoryIds])
    }
    if(tagIds){
        paramsArray.push(['tagIds', tagIds])
    }
    if(localityId){
        paramsArray.push(['localityId', localityId])
    }
    if(price && price.length === 2){
        paramsArray.push(['price', price])
    }
    
    
    const params = new URLSearchParams(paramsArray)
    console.log(paramsArray)
    const res = axios.get(url, {params}, {withCredentials:true})
    return res
}

const getDish = async (id) => {
    const url = serverUrl + "/dishes/" + id
    const res = axios.get(url, {withCredentials:true})
    return res
}

const updateDish = async (id, dish, imageFile) => {
    const url = serverUrl + "/dishes/" + id
    const formData = new FormData()
    formData.append("dish", JSON.stringify(dish))
    formData.append("file", imageFile)
    const res = axios.post(url, formData, {
        withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data"
            }
    })
    return res
}

const getDishesForChef = async (chefId) => {
    const url = serverUrl + "/dishes/for-chef"
    const params = new URLSearchParams([['chefId', chefId]])
    const res = axios.get(url, {params}, {withCredentials:true})
    return res 
}

const getPriceRange = async (categoryIds, tagIds, localityId) => {
    const url = serverUrl + "/dishes/price-range"
    let paramsArray = []
    if(categoryIds){
        paramsArray.push(['categoryIds', categoryIds])
    }
    if(tagIds){
        paramsArray.push(['tagIds', tagIds])
    }
    if(localityId){
        paramsArray.push(['localityId', localityId])
    }
    
    const params = new URLSearchParams(paramsArray)
    const res = axios.get(url, {params}, {withCredentials:true})
    return res
}

export {addDish, removeDish, getAllDishes, getDish, updateDish, getDishesForChef, getAllDishesWithFilters, getPriceRange}