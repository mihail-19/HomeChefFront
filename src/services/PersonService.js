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

const getAllUsers = async () => {
    const url = serverUrl + '/moderation/users'
    const params = new URLSearchParams([['pageNumber', 0]])
    const res = axios.get(url, {params}, {withCredentials:true})
    return res
}

const banUser = async (userId) => {
    const url = serverUrl + '/moderation/users/' + userId + '/ban'
    const res = axios.post(url, {withCredentials:true})
    return res
}

const unbanUser = async (userId) => {
    const url = serverUrl + '/moderation/users/' + userId + '/unban'
    const res = axios.post(url, {withCredentials:true})
    return res
}

const deleteUser = async (userId) => {
    const url = serverUrl + '/moderation/users/' + userId + '/delete'
    const res = axios.delete(url, {withCredentials:true})
    return res
}


export {getPerson, updateImage, updatePersonByUser, previousDishes, getAllUsers, banUser, unbanUser, deleteUser}