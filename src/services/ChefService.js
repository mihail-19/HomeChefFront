import axios from "axios"
import serverUrl from "../serverUrl"
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

const getAllChefs = async(pageNumber) => {
    const url = serverUrl + '/chefs'
    let paramsArray = []
    if(pageNumber){
        paramsArray.push(['pageNumber', pageNumber])
    } else [
        paramsArray.push(['pageNumber', 0])
    ]
    const params = new URLSearchParams(paramsArray)
    const res = axios.get(url, {params}, {withCredentials:true})
    return res
}

export {getChef, registerChef, updateChef, getAllChefs}