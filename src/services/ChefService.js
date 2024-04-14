import axios from "axios"
const serverUrl = 'http://localhost:8080'
const getChef = async () => {
    const url = serverUrl + '/chefs/my-data'
    return axios.get(url, {
        withCredentials: true
    })
}
const registerChef = async (chef) =>{
    const url = serverUrl + '/chefs/register'
    let res = axios.post(url, chef, {
        withCredentials: true
    })
    return res
}
const updateChef = async(chef) => {
    const url = serverUrl + '/chefs/my-data'
    return axios.post(url, chef, {
        withCredentials: true
    })
}

export {getChef, registerChef, updateChef}