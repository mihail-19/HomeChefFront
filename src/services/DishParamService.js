
function parse(paramsString){
    if(!paramsString || paramsString.length === 0){
        return undefined
    }
    const paramsSplitted = paramsString.split(';')
    const paramsObject = {}
    console.log(paramsObject)
    paramsSplitted.forEach(element => {
        const param = element.split('=')
        if(param.length > 1){
            if(param[0] === 'page'){
                paramsObject.page = parseInt(param[1])
            } else if(param[0] === 'categories'){
                paramsObject.categories = multipleParamsToArray(param[1])
            } else if(param[0] === 'tags'){
                paramsObject.tags = multipleParamsToArray(param[1])
            } else if(param[0] === 'city'){
                paramsObject.city === param[1]
            }
            
        }
    });
    return paramsObject
}

function multipleParamsToArray(str){
    const splittedTags = str.split(',')
    const arr = []
    for(let i = 0; i<splittedTags.length;i++){
        arr.push(parseInt(splittedTags[i]))
    }    
    return arr
}

function stringify(params){
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
    if(params.city){
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
    return res
}

export {parse, stringify}