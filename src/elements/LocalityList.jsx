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
    }, [name, isActive])
    
    async function searchLocality(name){
        const url = serverUrl + '/locality/search'
        const params = new URLSearchParams([['namePart', name]])
        const {data} = await axios.get(url, {params}, {withCredentials:true})
        setLocalities(sortLocalities(data, name))
    }

    function sortLocalities(localities, name){
        const sorted = localities.sort((a, b) => {
            //city is bigger then country
            if(a.type === 'місто' && b.type !== 'місто'){
                return -1
            } else if (b.type === 'місто' && a.type !== 'місто'){
                return 1
            }
            //Both are cities
            if(a.type === 'місто' && b.type === 'місто'){
                //Kyiv is a biggest city
                if(a.name.toLowerCase() === 'київ'){
                    return -1
                } else if (b.name.toLowerCase() === 'київ'){
                    return 1
                }
                if(a.region.startsWith(a.name) && !b.region.startsWith(b.name)){
                    return -1
                } else if (b.region.startsWith(a.name) && !a.region.startsWith(b.name)){
                    return 1
                }

            }
            return 0
        })
        if(name.length < 3){
            return sorted.slice(0, 20)
        } else{
            return sorted
        }
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
        if(locality.type.toLowerCase() === 'село'){
            type = 'с. '
        } else if(locality.type.toLowerCase() === 'місто'){
            type = 'м.'
        } else if(locality.type.toLowerCase() === 'селище'){
            type = 'сел. '
        }
        const region = locality.region && locality.region.length > 0 ? ', обл: ' + locality.region : ''
        return type + locality.name + region
    }
}

export default LocalityList