function prettyPrintDate(d){
    const date = new Date(d)
    const month = date.getMonth() + 1
    const monthTxt = month < 10 ? '0' + month : month
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    return day + '.' + monthTxt + '.' + date.getFullYear() + ' - ' + hour + ':' + minute
}

export default prettyPrintDate