import axios from "axios"
const serverUrl = 'http://localhost:8080'
function register(email, password){
    console.log('register user')
    const url = serverUrl + '/register'
    const formData = new FormData()
    formData.append('username', email)
    formData.append('password', password)
    let res = axios.post(url, formData)
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

export {register, login, logout}