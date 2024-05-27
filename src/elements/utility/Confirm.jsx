import { forwardRef, useImperativeHandle, useState } from "react";

import './Confirm.css'

const Confirm = forwardRef((props, ref) => {
    const [isActive, setIsActive] = useState(false)
    const [text, setText] = useState('')
    useImperativeHandle(ref, () => ({
        show(msg){
            setText(msg)
            setIsActive(true)
        }
    }))
    if(!isActive){
        return <></>
    }
    function onOk(){
        setIsActive(false)
        props.okFunction()
    }
    function onNo(){
        setIsActive(false)
        props.noFunction()
    }
    return(
        <div className="confirm">
            <div className="confirm__text">{text}</div>
            <div className="confirm__actions">
                <button className="confirm__button confirm__button_ok" onClick={onOk}>Так</button>
                <button className="confirm__button confirm__button_no" onClick={onNo}>Ні</button>
            </div>
        </div>
    )
})


export default Confirm