import { useState, forwardRef, useImperativeHandle } from "react"
import './Snackbar.css'

const timeToHide = 3000

const Snackbar = forwardRef((props, ref) => {

    const [isActive, setIsActive] = useState(false)
    const [message, setMessage] = useState('')
    const [isError, setIsError] = useState(false)
    useImperativeHandle(ref, () => ({
        show(msg, isErr, timeToHideCustom){
            setMessage(msg)
            setIsError(isErr)
            setIsActive(true)
            if(!timeToHideCustom){
                timeToHideCustom = timeToHide
            }
            setTimeout(() => setIsActive(false), timeToHideCustom)
        }
    }))
   
    if(!isActive){
        return <></>
    }
    return(
        <div className={isError ? "snackbar snackbar_error" : "snackbar"}>
            {message}
        </div>
    )
})

export default Snackbar