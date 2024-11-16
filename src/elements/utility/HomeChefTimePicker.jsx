import { useEffect, useState } from "react"
import 'react-calendar/dist/Calendar.css';
import './HomeChefCalendar.css'
import calendarIcon from '../../assets/timePicker.svg'

const HomeChefTimePicker = ({date, setDate}) => {
    const [isActive, setIsActive] = useState(false)
    const [hour, setHour] = useState(date.getHours())
    const [minute, setMinute] = useState(date.getMinutes())

    

    function handleHour(text){
        let val = Number.parseInt(text)
        if(val && val > -1 && val < 24){
            setHour(val)
            date.setHours(val)
        } else {
            document.getElementById("timepicker_minute").focus()
        }
    }
    function handleMinute(text){
        let val = Number.parseInt(text)
        if(val && val > -1 && val < 60){
            setMinute(val)
            date.setMinutes(val)
        } 
    }

    function switchShowCalendar(){
        console.log('switch' + isActive)
       
        setIsActive(!isActive)
        document.addEventListener("click", closeClickListener)
        
    }
   
    function closeClickListener(e){
        if (!document.getElementById('calendar').contains(e.target)){
            console.log(e.target.id)
            setIsActive(false)
            document.removeEventListener("click", closeClickListener)
          } 
       
    }
    return (
        <div className="hc-timepicker">
            <div className='hc-calendar__input'>
                <div>
                    <input type="text" className='hc-calendar__day-input' value={hour} onFocus={e => e.target.select()}  onChange={e => handleHour(e.target.value) }></input>
                    :
                    <input id="timepicker_minute" type="text" className='hc-calendar__day-input' value={minute} onFocus={e => e.target.select()} onChange={e => handleMinute(e.target.value)}></input>
                </div>
                
            </div>
            {isActive &&
                <div id="calendar" className="hc-picker__container">
                    {picker()}
                </div>
            }
        </div>
    )

    function processPickerHour(h){
        if(h < 10){
            h = '0' + h
        }
        setHour(h)
        date.setHours(h)
    }
    function processPickerMinutes(m){
        if(m < 10){
            m = '0' + m
        }
        setMinute(m)
        date.setMinutes(m)
    }


    function picker(){
        const hours = []
        for(let i = 0; i < 24; i++){
            hours.push(i)
        }
        const minutes = []
        for(let i = 0; i<60; i++){
            minutes.push(i)
        }
        return(
            <div className="hc-timepicker__picker">
                <div className="hc-timepicker__list">
                    Години
                    {hours.map(h => {
                        return <div className="hc-timepicker__picker-element" onClick={() => processPickerHour(h)}>{h < 10 ? '0' + h : h}</div>
                        }) 
                    }
                </div>
                <div className="hc-timepicker__list">
                    Хвилини
                    {minutes.map(m => {
                        return <div className="hc-timepicker__picker-element" onClick={() => processPickerMinutes(m)}>{m < 10 ? '0' + m : m}</div>
                        }) 
                    }
                </div>
            </div>
        )
    }
}

export default HomeChefTimePicker