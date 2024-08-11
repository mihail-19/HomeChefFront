import axios from "axios"
import serverUrl from "../serverUrl"

const getChefStory = async (id) => {
    const url = serverUrl + '/chef-story/for-chef'
    const params = new URLSearchParams([['chefId', id]])
    const res = axios.get(url, {params}, {withCredentials:true})
    return res
}
const addChefStory = async (story) => {
    const url = serverUrl + '/chef-story'
    const res = axios.post(url, story, {withCredentials:true})
    return res
}
const getStories = async () => {
    const url = serverUrl + '/chef-story'
    const res = axios.get(url, {withCredentials:true})
    return res
}
const removeChefStory = async (storyId) => {
    const url = serverUrl + '/chef-story/' + storyId
    const res = axios.delete(url, {withCredentials:true})
}

export {getChefStory, addChefStory, getStories, removeChefStory}