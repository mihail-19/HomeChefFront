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

const getAllDishesWithFilters = async(pageNumber, categoryIds, tagIds) => {
    const url = serverUrl + "/dishes"
    let paramsArray
    if(!categoryIds && !tagIds){
        paramsArray = [['pageNumber', pageNumber]]
    } else if (categoryIds && tagIds){
        paramsArray = [['pageNumber', pageNumber], ['categoryIds', categoryIds], ['tagIds', tagIds]]
    } else if (categoryIds){
        paramsArray = [['pageNumber', pageNumber], ['categoryIds', categoryIds]]
    } else if (tagIds){
        paramsArray = [['pageNumber', pageNumber], ['tagIds', tagIds]]
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

export {addDish, removeDish, getAllDishes, getDish, updateDish, getDishesForChef, getAllDishesWithFilters}