import axios from "axios"
const serverUrl = 'https://localhost:8080'
function register(firstName, lastName, email, password){
    console.log('register user')
    const url = serverUrl + '/register'
    const formData = new FormData()
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('email', email)
    formData.append('password', password)
    let res = axios.post(url, formData)
    return res
}

export {register}