import chefStabImg1 from '../assets/stabs/chefStabImg1.png'
import chefStabImg2 from '../assets/stabs/chefStabImg2.png'
import chefStabImg3 from '../assets/stabs/chefStabImg3.png'
function getChefImg(url){
    //TODO
    //stab
    if(url === "1"){
        return chefStabImg1
    } else if(url === "2"){
        return chefStabImg2
    } else if(url === "3"){
        return chefStabImg3
    }
}
export default getChefImg