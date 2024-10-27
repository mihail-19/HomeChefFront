function hasAuthority(authority, person){
    if(!person || !person.authorities){
        return false
    }
    const hasAuth = person.authorities.find(a => a.authority === authority) !== undefined
    return hasAuth
}
function isChef(person){
    return hasAuthority('user')
}
function isAdmin(person){
    return hasAuthority('chef')
}
function isUser(person){
    return hasAuthority('admin')
}

export {hasAuthority, isChef, isAdmin, isUser}