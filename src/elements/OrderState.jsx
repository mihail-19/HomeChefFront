
import './OrderState.css'
//Visualises order state step by step
const OrderState = ({state}) => {

    let level = 0
    switch(state){
        case "NEW":
            level = 0
            break;
        case "CONFIRMED":
            level = 1
            break;
        case "COOKING":
            level = 2
            break;
        case "READY":
            level = 3
            break;
        case "DELIVERING":
            level = 4
            break;
        case "DELIVERED":
            level = 5
            break;       
    }

    if(state === "CANCELED"){
        return (
            <div className="order-state">
                {state === "CANCELED" && <div className="order-state__canceled">Скасовано</div>}
            </div>
        )
    }
    return (
        <div className="order-state">
            <div className={level === 0 ? "order-state__element order-state__element_active" : "order-state__element order-state__element_finished"}>Новий</div>
            <div className={calculateClassname(1)}>→</div>
            <div className={calculateClassname(1)}>Підтверджено</div>
            <div className={calculateClassname(2)}>→</div>
            <div className={calculateClassname(2)}>Готується</div>
            <div className={calculateClassname(3)}>→</div>
            <div className={calculateClassname(3)}>Приготували</div>
            <div className={calculateClassname(4)}>→</div>
            <div className={calculateClassname(4)}>В дорозі</div>
            <div className={calculateClassname(5)}>→</div>
            <div className={calculateClassname(5)}>Доставлено</div>
        </div>
    )

    function calculateClassname(currentLevel){
        if( level === 5 && currentLevel === 5){
            return "order-state__element order-state__element_finished"
        }
        if(level === currentLevel){
            return "order-state__element order-state__element_active"
        } else if(level > currentLevel){
            return "order-state__element order-state__element_finished"
        } else {
            return "order-state__element"
        }
    }

}

export default OrderState