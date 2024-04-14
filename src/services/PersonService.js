import axios from "axios"

const serverUrl = 'http://localhost:8080'
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

export {getPerson, updateImage}