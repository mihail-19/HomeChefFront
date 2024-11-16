import { useCallback, useEffect, useState } from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './HomeChefCalendar.css'
import calendarIcon from '../../assets/calendarIcon.svg'
const HomeChefCalendar = ({date, setDate}) => {
    const [day, setDay] = useState(date.getDate() > 9 ? date.getDate() : '0' + date.getDate())
    const [month, setMonth] = useState(date.getMonth()+1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth()+1))
    const [year, setYear] = useState(date.getFullYear())
    const [showCalendar, setShowCalendar] = useState(false)
    useEffect(() => {
        setDay(date.getDate() > 9 ? date.getDate() : '0' + date.getDate())
        setMonth(date.getMonth()+1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth()+1))
        setYear(date.getFullYear())
    }, [date])
    useEffect(() => {
        console.log(showCalendar)
        if(showCalendar){
            document.getElementById('order')?.addEventListener("click", closeClickListener)
        } else {
            document.getElementById('order')?.removeEventListener("click", closeClickListener)
        }
    }, [showCalendar])
    const closeClickListener = useCallback((e) => {
        if(!document.getElementById("calendar").contains(e.target)){
            setShowCalendar(false)
        }
    }, [])
    function beforeSetDay(text){
        
        let val = Number.parseInt(text)
        if(val && text.length < 3){
            setDay(text)
        }
    }
    function handleDay(){
        let val = Number.parseInt(day)
        if(val < 1){
            val = 1
        }
        if(val > 31){
            val = 31
        }
        if(val < 9){
            val = '0' + val
        }
        setDay(val)
        date.setDate(val)
        
    }
    function handleMonth(){
        let val = Number.parseInt(month)
        if(val < 1){
            val = 1
        }
        if(val > 12){
            val = 12
        }
        if(val < 9){
            val = '0' + val
        }
        setMonth(val)
        date.setMonth(val - 1)
        console.log(date)
    }
    function handleYear(){
        let val = Number.parseInt(year)
        const currentDate = new Date()
        if(val < currentDate.getFullYear()){
            val = currentDate.getFullYear()
        }
        if(val > currentDate.getFullYear() + 1){
            val = currentDate.getFullYear() + 1
        }
        setYear(val)
        date.setFullYear(val)
    }
    function switchShowCalendar(){
        console.log('switch' + showCalendar)
       
        setShowCalendar(!showCalendar)
        
    }

    
    return (
        <div className='hc-calendar' id="calendar">
            <div className='hc-calendar__input'>
                <div>
                    <input type="text" className='hc-calendar__day-input' value={day} onFocus={e => e.target.select()} onBlur={() => handleDay()} onChange={e => beforeSetDay(e.target.value) }></input>
                    .
                    <input type="text" className='hc-calendar__day-input' value={month} onFocus={e => e.target.select()} onBlur={() => handleMonth()} onChange={e => setMonth(e.target.value)}></input>
                    .
                    <input type="text" className='hc-calendar__year-input' value={year} onFocus={e => e.target.select()} onBlur={() => handleYear()} onChange={e => setYear(e.target.value)}></input>
                </div>
                <div>
                    <button id="calendar-btn" className='hc-calendar__calendar-button' onClick={(e) => {e.stopPropagation(); switchShowCalendar()}}><img src={calendarIcon}></img></button>
                </div>
            </div>
            {showCalendar &&
                <div className='hc-calendar__calendar-conteiner' >
                <Calendar  className={showCalendar ? 'react-calendar react-calendar_active' : 'react-calendar'} value={date} onChange={setDate} locale={'uk-UK'} view={'day'} maxDetail={'month'} onClick={e => e.stopPropagation()}/>
                </div>
            }
        </div>
    )
}

export default HomeChefCalendar