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

const getAllDishes = async() => {
    const url = serverUrl + "/dishes"
    const res = axios.get(url, {withCredentials:true})
    return res
}

const getDish = async (id) => {
    const url = serverUrl + "/dishes/" + id
    const res = axios.get(url, {withCredentials:true})
    return res
}

const updateDish = async (dish) => {
    const url = serverUrl + "/dishes/" + dish.id
    const res = axios.post(url, dish, {withCredentials:true})
    return res
}

export {addDish, removeDish, getAllDishes, getDish, updateDish}