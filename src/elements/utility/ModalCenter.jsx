
import './Modal.css'
import closeImg from '../../assets/burgerCloseButton.png'
import { useEffect } from 'react'

const ModalCenter = ({isActive, setIsActive, content}) => {
    
    useEffect(() => {
        if(!isActive){
            document.documentElement.style.setProperty('overflow', 'auto')
            console.log('modal scroll auto')
        } else {
            document.documentElement.style.setProperty('overflow', 'hidden')
            console.log('modal scroll hidden')
        }
    }, [isActive])
    return (
        <div className={isActive ? "modal modal_active" : "modal"} onClick={() => { document.documentElement.style.setProperty('overflow', 'auto');setIsActive(false)}}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <div className="modal__top">
                    <div className="modal__close-button" onClick={() => { document.documentElement.style.setProperty('overflow', 'auto');setIsActive(false)}}>
                        <img src={closeImg}></img>
                    </div>
                </div>
                {content}
            </div>
        </div>
    )
}

export default ModalCenter