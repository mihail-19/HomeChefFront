import axios from "axios"

const serverUrl = 'http://localhost:8080'
const  getPerson = async () =>{
    const url = serverUrl + '/person/data'
    const res = axios.get(url, {
        withCredentials: true
    })
    return res
}

export {getPerson}