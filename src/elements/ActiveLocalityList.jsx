import { useCallback, useEffect, useState } from "react"
import serverUrl from "../serverUrl"
import removeIcon from '../assets/burgerCloseButton.png'
import axios from "axios"
import './LocalityList.css'
const ActiveLocalityList = ({isActive, setIsActive, locality, setLocality}) => {
    const [localities, setLocalities] = useState([])
    const [name, setName] = useState('')
    
    useEffect(() =>{
        if(isActive){
            searchLocality()
        } 
    }, [isActive])

    async function searchLocality(){
        console.log('loading')
        const url = serverUrl + '/common-data/active-localities/with-dishes'
        const {data} = await axios.get(url, {withCredentials:true})
        setLocalities(data.sort((a, b) => {
            if(a.type === 'місто' && b.type !== 'місто'){
                return -1
            } else if (b.type === 'місто' && a.type !== 'місто'){
                return 1
            }
            return 0
        }))
    }
    
    function choseLocality(activeLocality){
        setLocality(activeLocality.locality)
        setLocalities([])
        setIsActive(false)
    }
    function removeLocality(){
        setLocality(null)
        setLocalities([])
    }

    //const currentLocality = JSON.parse(localStorage.getItem('locality'))
    if(!locality){
        return (
            <div id="active-locality" className={isActive ? "active-locality locality-list_active" : "active-locality"} onClick={e => e.stopPropagation()}>
                <label>Населений пункт</label>
               {/*
               <input type="text" value={name} onChange={e => setName(e.target.value)}></input>
               */}
                
                <div className="active-locality__list">
                    {localities.map(activeLocality => {
                        return (
                            <button onClick={() => choseLocality(activeLocality)}>{localityPretyPrint(activeLocality)}</button>
                        )
                    })}
                </div>
            </div>
            
        )
    } else{
        return (
            <div className={isActive ? "active-locality locality-list_active" : "active-locality"} onClick={e => e.stopPropagation()}>
                <div className="active-locality__current-locality" >
                    <div className="active-locality__current-locality-name">{locality.name}</div>
                    <button className="active-loclity__remove-current" onClick={removeLocality}><img src={removeIcon} about="скинути населений пункт" alt="скинути населений пункт"></img></button>
                </div>
                
            </div>
            
        )
    }

    function localityPretyPrint(activeLocality){
        const loc = activeLocality.locality
        let type = ''
        if(loc.type.toLowerCase() === 'село'){
            type = 'с. '
        } else if(loc.type.toLowerCase() === 'місто'){
            type = 'м.'
        } else if(loc.type.toLowerCase() === 'селище'){
            type = 'сел. '
        }
        const region = loc.region && loc.region.length > 0 ? ', обл: ' + loc.region : ''
        const activityInfo = ' (Шефів: ' + activeLocality.chefNumber + ', блюд: ' + activeLocality.dishNumber + ')'
        return type + loc.name + region + activityInfo
    }
}

export default ActiveLocalityList