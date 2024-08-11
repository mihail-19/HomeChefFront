import { useEffect, useState } from "react"
import { banUser, deleteUser, getAllUsers, unbanUser } from "../../services/PersonService"


const CabinetAdminUsers  = ({person}) => {
    const [users, setUsers] = useState([])
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

    return (
        <div>
            <h1>Користувачі</h1>
            <table>
                <tr>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Ім'я</th>
                    <th>Роль</th>
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
                            <td><button onClick={() => sendBanUser(user)}>Бан</button></td>
                            <td><button onClick={() => sendRemoveUser(user)}>Видалити</button></td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
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