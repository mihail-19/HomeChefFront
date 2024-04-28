
import loadGif from '../../assets/load-spinner.gif'
import './Loading.css'
const Loading = ({isActive}) =>{

    return (
        <div className={isActive ? 'loading loading_active' : 'loading'}>
            <img src={loadGif}></img>
        </div>

    )
}
export default Loading