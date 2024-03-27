import axios from "axios"
const serverUrl = 'http://localhost:8080'
function register(firstName, lastName, email, password){
    console.log('register user')
    console.log(firstName + ': ' + lastName + ": " + email + "; " + password)
    const url = serverUrl + '/register'
    const formData = new FormData()
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('username', email)
    formData.append('password', password)
    let res = axios.post(url, formData)
    return res
}
function login(username, password){
    const url = serverUrl + '/login'
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    let res = axios.post(url, formData, {
        withCredentials: true
    })
    return res
}
function logout(){
    const url = serverUrl + '/logout'
    return axios.get(url, {
        withCredentials: true
    })
}

export {register, login, logout}