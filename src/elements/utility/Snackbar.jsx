import { useState, forwardRef, useImperativeHandle } from "react"
import './Snackbar.css'

const timeToHide = 3000

const Snackbar = forwardRef((props, ref) => {

    const [isActive, setIsActive] = useState(false)
    const [message, setMessage] = useState('')
    const [isError, setIsError] = useState(false)
    useImperativeHandle(ref, () => ({
        show(msg, isErr){
            setMessage(msg)
            setIsError(isErr)
            setIsActive(true)
            setTimeout(() => setIsActive(false), timeToHide)
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