import { useEffect, useRef, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { addChefStory, getChefStory } from "../../services/ChefStoryService"
import ModalCenter from '../utility/ModalCenter'
import Loading from "../utility/Loading"
import Snackbar from "../utility/Snackbar"


const CabinetChefStory = () => {
    const context = useOutletContext()
    const snackbarRef = useRef(null)
    const [story, setStory] = useState(null)
    const [showUpdate, setShowUpdate] = useState(false)
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        if(context && context.chef && context.chef.id){
            loadStory()
        }
    }, [])
    useEffect(() => {
        if(context && context.chef && context.chef.id){
            loadStory()
        }
    }, [context])

    async function loadStory(){
        setIsLoading(true)
        const {data} = await getChefStory(context.chef.id)
        setStory(data)
        if(data){
            setTitle(data.title)
            setText(data.text)
        }
        setIsLoading(false)
    }

    async function addStory(){
        setIsLoading(true)
        const newStory = {
            title: title,
            text: text
        }
        try{
            await addChefStory(newStory)
            snackbarRef.current.show('Дані оновлено', false)
        } catch (err){
            snackbarRef.current.show('Помилка', true)
        } finally{
            setIsLoading(false)
            setShowUpdate(false)
        }
        loadStory()
       
        
    }

    const buttonStyle ={
        padding: "5px",
        backgroundColor: "black",
        color: "white",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "10px",
        fontSize: "16px"
    }

    return (
        <div style={{fontFamily: "Montserrat"}}>
             <Loading isActive={isLoading} setIsActive={setIsLoading}/>
             <Snackbar ref={snackbarRef}/>
            <ModalCenter content={updateWindow()} isActive={showUpdate} setIsActive={setShowUpdate}/>
            <h1>Моя історія</h1>
            {!story && <h3>Історії поки немає</h3>}
            {story &&
                <div style={{border:"1px solid gray", borderRadius:"5px", width: "320px"}}>
                    <h2 style={{margin:"5px 0",  padding:"10px"}}>{story.title}</h2>
                    <div style={{borderTop:"1px solid gray", padding:"10px"}}>{story.text}</div>
                </div>
            }
            <button style={buttonStyle} onClick={() => setShowUpdate(true)}>Редагувати історію</button>
        </div>
    )

    function updateWindow(){
        return(
            <div style={{width: "300px"}}>
                <h3>Додати/редагувати історію</h3>
                <div>
                    <label style={{display:"block"}}>Заголовок</label>
                    <input type="text" style={{width: "90%"}} value={title} onChange={e => setTitle(e.target.value)}></input>
                </div>
                <div>
                    <label style={{display:"block"}}>Історія</label>
                    <textarea style={{width: "90%", height:"150px"}} value={text} onChange={e => setText(e.target.value)}></textarea>
                </div>
                <button style={buttonStyle} onClick={addStory}>Зберегти</button>
            </div>
        )
    }
}

export default CabinetChefStory