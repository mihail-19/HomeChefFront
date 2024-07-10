
function parse(paramsString){
    if(!paramsString || paramsString.length === 0){
        return undefined
    }
    const paramsSplitted = paramsString.split(';')
    const paramsObject = {}
    paramsSplitted.forEach(element => {
        const param = element.split('=')
        if(param.length > 1){
            if(param[0] === 'page'){
                paramsObject.page = parseInt(param[1])
            } else if(param[0] === 'categories'){
                const arr = multipleParamsToArray(param[1])
                if(arr && arr.length > 0){
                    paramsObject.categories = arr
                }
            } else if(param[0] === 'tags'){
                const arr = multipleParamsToArray(param[1])
                if(arr && arr.length > 0){
                    paramsObject.tags = arr
                }

            } else if(param[0] === 'city'){
                paramsObject.city = parseInt(param[1])
            } else if(param[0] === 'price'){
                const arr = multipleParamsToArray(param[1])
                if(arr && arr.length > 0){
                    paramsObject.price = arr
                }
            } else if(param[0] === 'sort'){
                if(param[1] === 'cheap'){
                    paramsObject.sort = 'cheap'
                } else if(param[1] === 'expensive'){
                    paramsObject.sort = 'expensive'
                } else if(param[1] === 'latest'){
                    paramsObject.sort = 'latest'
                } else if(param[1] === 'popular'){
                    paramsObject.sort = 'popular'
                }
            }
            
        }
    });
    return Object.keys(paramsObject).length > 0 ? paramsObject : undefined
}

function multipleParamsToArray(str){
    const splittedTags = str.split(',')
    const arr = []
    for(let i = 0; i<splittedTags.length;i++){
        const intValue = parseInt(splittedTags[i])
        if(!isNaN(intValue) && isFinite(intValue) && !arr.includes(intValue)){
            arr.push(intValue)
        }
    }    
    return arr
}

function stringify(params){
    if(!params){
        return ''
    }
    let res = ''
    if(params.page && params.page > 1){
        if(res.length > 0){
            res += ';'
        }
        res += 'page=' + params.page
    }
    if(params.categories){
        if(res.length > 0){
            res += ';'
        }
        res += 'categories='
        for(let i =0; i<params.categories.length; i++){
            if(i < params.categories.length - 1){
                res += params.categories[i] + ','
            } else {
                res += params.categories[i]
            }
        }
    }
    if(isFinite(params.city)){
        if(res.length > 0){
            res += ';'
        }
        res += 'city=' + params.city
    }
    if(params.tags && params.tags.length > 0){
        if(res.length > 0){
            res += ';'
        }
        res += 'tags='
        for(let i =0; i<params.tags.length; i++){
            if(i < params.tags.length - 1){
                res += params.tags[i] + ','
            } else {
                res += params.tags[i]
            }
        }
    }
    if(params.price && params.price.length === 2){
        if(res.length > 0){
            res += ';'
        }
        res += 'price=' + params.price[0] + ',' + params.price[1]
        
    }
    if(params.sort){
        if(res.length > 0){
            res += ';'
        }
        res += 'sort=' + params.sort
    }
    return res
}

export {parse, stringify}