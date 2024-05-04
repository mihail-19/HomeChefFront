import { useEffect, useState } from "react"
import serverUrl from "../serverUrl"
import axios from "axios"
import './LocalityList.css'
const LocalityList = ({isActive, setIsActive, setLocality, name}) => {
    const [localities, setLocalities] = useState([])
    useEffect(() =>{
        if(isActive){
            searchLocality(name)
        }
    }, [name])
    async function searchLocality(name){
        const url = serverUrl + '/locality/search'
        const params = new URLSearchParams([['namePart', name]])
        const {data} = await axios.get(url, {params}, {withCredentials:true})
        setLocalities(data.sort((a, b) => {
            if(a.type === 'місто' && b.type !== 'місто'){
                return -1
            } else if (b.type === 'місто' && a.type !== 'місто'){
                return 1
            }
            return 0
        }))
    }
    
    function choseLocality(locality){
        console.log('setting locality')
        setLocality(locality)
        setLocalities([])
        setIsActive(false)
    }


    return (
        <div className={isActive ? "locality-list locality-list_active" : "locality-list"}>
            {localities.map(locality => {
                return (
                    <button onClick={() => choseLocality(locality)}>{localityPretyPrint(locality)}</button>
                )
            })}
        </div>
    )

    function localityPretyPrint(locality){
        let type = ''
        if(locality.type === 'село'){
            type = 'с.'
        } else if(locality.type === 'місто'){
            type = 'м.'
        } else if(locality.type === 'селище'){
            type = 'сел.'
        }
        const region = locality.region && locality.region.length > 0 ? ', обл: ' + locality.region : ''
        return type + locality.name + region
    }
}

export default LocalityList