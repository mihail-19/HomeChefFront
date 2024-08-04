import axios from "axios"

import serverUrl from "../serverUrl"
const  getPerson = async () =>{
    const url = serverUrl + '/person/data'
    const res = axios.get(url, {
        withCredentials: true
    })
    return res
}
const updateImage = async (image) => {
    const url = serverUrl + '/person/add-image'
    const formData = new FormData()
    formData.append("file", image)
    const res = axios.post(url, formData, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return res
}

const updatePersonByUser = async (person) => {
    const url = serverUrl + '/person/user-update'
    const res = axios.post(url, person, {withCredentials: true})
    return res
}

const previousDishes = async () => {
    const url = serverUrl + '/person/dish-story'
    const res = axios.get(url, {withCredentials:true})
    return res

}

export {getPerson, updateImage, updatePersonByUser, previousDishes}