

const OrderState = ({order}) => {
    
    const orderStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderEadius: "10px",
        padding: "1px",
        fontSize: "12px",
        width: "120px",
        height: "20px",
        margin: "0 auto",
    }
    
    let txt = ''

    switch(order.state){
        case "NEW":
            orderStyle.backgroundColor= "green"
            txt = 'новий'
            break;
        case "CONFIRMED":
            orderStyle.backgroundColor= "rgb(247, 247, 124)"
            txt = 'підтверджено'
            break;
        case "COOKING":
            orderStyle.backgroundColor= "rgb(211, 211, 106)"
            txt = 'готуємо'
            break;
        case "READY":
            orderStyle.backgroundColor= "rgb(146, 146, 74)"
            txt = 'приготували'
            break;
        case "DELIVERING":
            orderStyle.backgroundColor= "rgb(110, 110, 57)"
            txt = 'відправлений'
            break;
        case "DELIVERED":
            orderStyle.backgroundColor= "rgb(97, 97, 49)"
            txt = 'доставлений'
            break;
        case "CANCELED":
            orderStyle.backgroundColor= "rgb(165, 107, 89)"
            txt = 'відмінений'
            break;
    }
    return <div style={orderStyle}>{txt}</div>
    
}

export default OrderState