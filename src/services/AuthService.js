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
async function forgetPassword(email){
    const url = serverUrl + '/forget-password/send-token'
    const data = new FormData()
    data.append('email', email)
    return axios.post(url, data)
}

async function restoreAccountGetUsername(token){
    const url = serverUrl + '/forget-password/change-password'
    let paramsArray = []
    paramsArray.push(['token', token])
    const params = new URLSearchParams(paramsArray)
    return axios.get(url, {params})
}

async function restoreAccountChangePassword(token, password){
    const url = serverUrl + '/forget-password/change-password'
    const data = new FormData()
    data.append('token', token)
    data.append('password', password)
    const res = axios.post(url, data)
    return res
}

export {register, login, logout, confirmRegistration, forgetPassword, restoreAccountGetUsername, restoreAccountChangePassword}