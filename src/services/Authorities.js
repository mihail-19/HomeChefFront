function hasAuthority(authority, person){
    if(!person || !person.authorities){
        return false
    }
    const hasAuth = person.authorities.find(a => a.authority === authority) !== undefined
    return hasAuth
}
function isChef(person){
    return hasAuthority('chef', person)
}
function isAdmin(person){
    return hasAuthority('admin', person)
}
function isUser(person){
    return hasAuthority('user', person)
}

export {hasAuthority, isChef, isAdmin, isUser}