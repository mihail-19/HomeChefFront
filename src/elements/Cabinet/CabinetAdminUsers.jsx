import { useEffect, useState } from "react"
import { banUser, deleteUser, getAllUsers, unbanUser } from "../../services/PersonService"
import ModalCenter from "../utility/ModalCenter"
import { addNotification } from "../../services/NotificationService"


const CabinetAdminUsers  = ({person}) => {
    const [users, setUsers] = useState([])
    const [showAddNotification, setShowAddNotification] = useState(false)
    const [notificationTitle, setNotificationTitle] = useState('')
    const [notificationText, setNotificationText] = useState('')
    const [notificationUser, setNotificationUser] = useState(null)

    useEffect(() => {
        if(person && person.authorities){
            if(person.authorities.find(a => a.authority === 'admin') === undefined){
                navigate("/HomeChefFront")
            }
        } else {
            loadUsers()
        }
    },[person])

    useEffect(() => {
        if(person){
            loadUsers()
        }
    }, [])

    async function loadUsers(){
        const {data} = await getAllUsers()
        setUsers(data.content)
    }

    
    async function sendBanUser(user){
        if(!user.isBanned){
            await banUser(user.id)
           
        } else {
            await unbanUser(user.id)
        }
        loadUsers()
    }

    async function sendRemoveUser(user){
        await deleteUser(user.id)
        loadUsers()
    }

    async function sendNotification(){
        await addNotification(notificationTitle, notificationText, notificationUser.id)
        setShowAddNotification(false)
    }

    return (
        <div>
             <ModalCenter isActive={showAddNotification} setIsActive={setShowAddNotification} content={notificationWindow()}/>
            <h1>Користувачі</h1>
            <table>
                <tr>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Ім'я</th>
                    <th>Роль</th>
                    <th>Повідомл.</th>
                    <th>Бан</th>
                    <th>Видалити</th>
                </tr>
                {users.map(user => {
                    return (
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.firstName}</td>
                            <td>{mainAuthority(user.authorities)}</td>
                            
                            <td><button onClick={() => {
                                setShowAddNotification(true)
                                setNotificationUser(user)}}>
                                    Повідомл.
                                </button>
                            </td>

                            <td><button onClick={() => sendBanUser(user)}>Бан</button></td>
                            <td><button onClick={() => sendRemoveUser(user)}>Видалити</button></td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )

    function notificationWindow(){
       return <div style={{width: '330px'}}>
             <label>Заголовок повідомлення для <b>[{notificationUser?.username}]</b></label>
             <input value={notificationTitle} onChange={e => setNotificationTitle(e.target.value)}></input>
             <label>Текст повідомлення</label>
             <textarea value={notificationText} onChange={e => setNotificationText(e.target.value)}></textarea>
             <button onClick={() => sendNotification()}>Надіслати</button>
        </div>
       
    }
}

function mainAuthority(authorities){
    if(authorities.find(a => a.authority === "admin")){
        return 'адмін'
    } else if (authorities.find(a => a.authority === "chef")){
        return 'шеф'
    }else {
        return 'юзер'
    }
}   

export default CabinetAdminUsers