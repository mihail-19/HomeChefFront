import axios from "axios"
import serverUrl from "../serverUrl"
function register(username, password, email){
    console.log('register user')
    const url = serverUrl + '/register'
    const user = {
        username: username,
        password: password,
        email: email
    }
    let res = axios.post(url, user)
    return res
}
async function login(username, password){
    const url = serverUrl + '/login'
    const data = {
        username:username,
        password:password
    }
    let res = axios.post(url, data, {withCredentials:true})
    return res
}
function logout(){
    const url = serverUrl + '/logout'
    return axios.post(url, {}, {
        withCredentials: true
    })
}

async function confirmRegistration(uuid){
    const url = serverUrl + '/register/confirm/' + uuid
    return axios.get(url) 
}

export {register, login, logout, confirmRegistration}