
import './Modal.css'
import closeImg from '../../assets/burgerCloseButton.png'
import { useEffect } from 'react'

const ModalCenter = ({isActive, setIsActive, content}) => {
    
    useEffect(() => {
        console.log('active? -> ' + isActive)
        if(!isActive){
            document.documentElement.style.setProperty('overflow', 'auto')
            console.log('modal scroll auto')
        } else {
            document.documentElement.style.setProperty('overflow', 'hidden')
            console.log('modal scroll hidden')
        }
    }, [isActive])
    function close(){
        document.documentElement.style.setProperty('overflow', 'auto')
        setIsActive(false)
    }
    return (
        <div className={isActive ? "modal modal_active" : "modal"} onClick={() => close()}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <div className="modal__top">
                    <div className="modal__close-button" onClick={() => close()}>
                        <img src={closeImg}></img>
                    </div>
                </div>
                {content}
            </div>
        </div>
    )
}

export default ModalCenter