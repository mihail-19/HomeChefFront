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

const addDishCategory = async (category) =>{

}

const removeDishCategory = async (category) => {

}


const getTags = async () => {

}

const addTag = async (tag) => {

}

const removeTag = async (tag) => {

}



export {addCity, getCities, removeCity, getDishCategories, addDishCategory, removeDishCategory, addTag, getTags, removeTag}