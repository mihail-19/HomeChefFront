
import { useEffect, useState } from 'react'

import arrow from '../../assets/headerCityArrow.png'
import selectedIcon from '../../assets/checkboxSelectedBlack.png'
const SelectMultiple = ({name, variants, setSelectedVariants}) => {

    const [show, setShow] = useState(false)
    const [elements, setElements] = useState([])

    useEffect(() => {
        if(variants){
            setElements(variants.map(v => {
                return {isSelected: false, id: v.id, name: v.name }
            }))
        }
    }, [])
    useEffect(() => {
        if(variants){
            setElements(variants.map(v => {
                return {isSelected: false, id: v.id, name: v.name }
            }))
        }
    }, [variants])

    const arrowStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    }
    const arrowStyleActive = {
        width: '100%',
        height: '100%',
        objectFit: 'cover', 
        transform: 'rotate(-90deg)'
    }
    const selectStyle = {
        height: '20px', 
        backgroundColor:'white', 
        display: 'flex', 
        alignItems:'center', 
        justifyContent: 'space-between',
        border: '1px solid gray',
        borderRadius: '10px',
        padding: '10px'
    }

    function changeVariant(variant){
        const cpy = JSON.parse(JSON.stringify(elements))
        const v = cpy.filter(c => c.id === variant.id)[0]
        v.isSelected = !v.isSelected
        setElements(cpy)
        setSelectedVariants(cpy.filter(e => e.isSelected === true).map(e => {
         return {id:e.id, name:e.name}
        }))
        
    }
    function getImgForChosenVariant(element){
        if(element.isSelected){
            return  <div style={{width: '16px', height: '16px', border: '1px solid gray', backgroundColor:'#66b366', display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <img src={selectedIcon} style={{width: '100%', height: '100%', objectFit: 'cover'}}></img>
                    </div>
        } else {
            return <div style={{width: '16px', height: '16px', border: '1px solid gray'}}>
                     </div>
        }
    }
   
    return (
        <div style={{position:'relative'}}>
            <div style={selectStyle} onClick={() => setShow(!show)}>
                <div>{name}</div>
                <div style={{width: '10px', height: '10px', display: 'flex', justifyContent:'center', alignItems: 'center'}}>
                    <img src={arrow} style={show ? arrowStyleActive : arrowStyle}></img>
                </div>
            </div>
            {show && <div style={{position:'absolute', left: '0', right: '0', backgroundColor: 'white', padding: '5px', border: '1px solid gray', zIndex:'30'}}>
                {elements.map(v => {
                    return <div onClick={() => changeVariant(v)} style={{display: 'flex', alignItems:'center', cursor: 'pointer', marginBottom: '5px'}}>
                        {getImgForChosenVariant(v)}
                        <div style={{marginLeft:'5px'}}>{v.name}</div>
                    </div>
                })}
            </div>
            }
        </div>
    )
}

export default SelectMultiple