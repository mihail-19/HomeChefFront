//data service - city, dish category, kitchen type, tags etc.
import axios from "axios"
import serverUrl from "../serverUrl"


const getCities = async () =>{
    const url = serverUrl + "/common-data/cities"
    const res = axios.get(url)
    return res
}

const addCity = async (cityName) =>{
    const url = serverUrl + "/common-data/cities"
    const city = {
        name: cityName
    }
    const res = axios.post(url, city, {
        withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    return res
}

const updateCities = async () => {
    const url = serverUrl + '/locality/update'
    const res = axios.get(url)
    return res
}

const removeCity = async (cityId) =>{
    const url = serverUrl + "/common-data/cities/" + cityId
    const res = axios.delete(url, {
        withCredentials: true
    })
    return res
}



const getDishCategories = async () =>{
    const url  = serverUrl + "/common-data/dish-categories"
    const res = axios.get(url)
    return res
}

const addDishCategory = async (categoryName) =>{
    const url = serverUrl + "/common-data/dish-categories"
    const category = {
        name: categoryName
    }
    const res = axios.post(url, category, {
        withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    return res
}

const removeDishCategory = async (id) => {
    const url = serverUrl + "/common-data/dish-categories/" + id
    const res = axios.delete(url, {
        withCredentials: true
    })
    return res
}


const getTags = async () => {
    const url  = serverUrl + "/common-data/tags"
    const res = axios.get(url)
    return res
}

const addTag = async (tagName) => {
    const url = serverUrl + "/common-data/tags"
    const tag = {
        name: tagName
    }
    const res = axios.post(url, tag, {
        withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    return res
}

const removeTag = async (id) => {
    const url = serverUrl + "/common-data/tags/" + id
    const res = axios.delete(url, {
        withCredentials: true
    })
    return res
}

const addKitchenType = async (name) =>{
    const url = serverUrl + '/common-data/kitchen-type'
    const data = {
        name: name
    }
    const res = axios.post(url, data, {withCredentials:true})
    return res

}
const getKitchenTypes = async () => {
    const url = serverUrl + '/common-data/kitchen-type'
    const res = axios.get(url, {withCredentials: true})
    return res
}

const deleteKitchenType = async (id) => {
    const url = serverUrl + '/common-data/kitchen-type/' + id
    const res = axios.delete(url, {withCredentials: true})
    return res
}
const getKitchenType = async (id) => {
    const url = serverUrl + '/common-data/kitchen-type/' + id
    const res = axios.get(url, {withCredentials: true})
    return res
}

const updateDishCategory = async (id, name) => {
    const url = serverUrl + '/common-data/dish-categories/' + id
    const data = {
        id: id,
        name: name
    }
    const res = axios.post(url, data, {withCredentials:true})
    return res
}
const updateTag = async (id, name) => {
    const url = serverUrl + '/common-data/tags/' + id
    const data = {
        id: id,
        name: name
    }
    const res = axios.post(url, data, {withCredentials:true})
    return res
}
const updateKitchenType = async (id, name) => {
    const url = serverUrl + '/common-data/kitchen-type/' + id
    const data = {
        id: id,
        name: name
    }
    const res = axios.post(url, data, {withCredentials:true})
    return res
}

export {updateCities, getCities, removeCity, getDishCategories, addDishCategory, removeDishCategory, addTag, 
    getTags, removeTag, addKitchenType, getKitchenTypes, deleteKitchenType, getKitchenType, updateDishCategory, updateTag, updateKitchenType}