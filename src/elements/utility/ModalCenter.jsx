
import './Modal.css'
import closeImg from '../../assets/burgerCloseButton.png'

const ModalCenter = ({isActive, setIsActive, content}) => {

    return (
        <div className={isActive ? "modal modal_active" : "modal"} onClick={() => setIsActive(false)}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <div className="modal__top">
                    <div className="modal__close-button" onClick={() => setIsActive(false)}>
                        <img src={closeImg}></img>
                    </div>
                </div>
                {content}
            </div>
        </div>
    )
}

export default ModalCenter