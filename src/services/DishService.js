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

const getAllDishesWithFilters = async(pageNumber, filterParams) => {
    const url = serverUrl + "/dishes"
    let paramsArray = []
    paramsArray.push(['pageNumber', pageNumber])
    if(filterParams && filterParams.categories){
        paramsArray.push(['categoryIds', filterParams.categories])
    }
    if(filterParams && filterParams.tags){
        paramsArray.push(['tagIds', filterParams.tags])
    }
    if(filterParams && filterParams.city){
        paramsArray.push(['localityId', filterParams.city])
    }
    if(filterParams && filterParams.price && filterParams.price.length === 2){
        paramsArray.push(['price', filterParams.price])
    }
    if(filterParams && filterParams.sort && filterParams.sort !== 'popular'){
        paramsArray.push(['sort', filterParams.sort])
    }
    if(filterParams && filterParams.search){
        paramsArray.push(['search', filterParams.search])
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

const getDishReviews = async(dishId) => {
    const url = serverUrl + "/dishes/" + dishId + "/reviews"
    const res = axios.get(url, {withCredentials:true})
    return res
}

const addDishReview = async(dishId, rating, txt) => {
    const url = serverUrl + "/dishes/" + dishId + "/add-review"
    const formData = new FormData()
    
    formData.append("rating", rating)
    formData.append("txt", txt)
    const res = axios.post(url, formData, {withCredentials:true})
    return res
}

const answerDishReview = async(dishId, reviewId, txt) => {
    const url = serverUrl + "/dishes/" + dishId + "/answer-review"
    const formData = new FormData()
    
    formData.append("reviewId", reviewId)
    formData.append("text", txt)
    const res = axios.post(url, formData, {withCredentials:true})
    return res
}

export {addDish, removeDish, getAllDishes, getDish, updateDish, getDishesForChef, getAllDishesWithFilters, getPriceRange, getDishReviews, addDishReview, answerDishReview}