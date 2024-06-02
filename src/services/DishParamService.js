
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
            } else if(param[0] === 'category'){
                paramsObject.category = param[1]
            } else if(param[0] === 'tags'){
                const splittedTags = param[1].split(',')
                console.log(splittedTags.length)
                paramsObject.tags = []
                for(let i = 0; i<splittedTags.length;i++){
                    console.log('push')
                    paramsObject.tags.push(parseInt(splittedTags[i]))
                }
                console.log(paramsObject.tags)
            } else if(param[0] === 'city'){
                paramsObject.city === param[1]
            }
            
        }
    });
    return paramsObject
}

function stringify(params){
    let res = ''
    if(params.page && params.page > 1){
        if(res.length > 0){
            res += ';'
        }
        res += 'page=' + params.page
    }
    if(params.category){
        if(res.length > 0){
            res += ';'
        }
        res += 'category=' + params.category
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