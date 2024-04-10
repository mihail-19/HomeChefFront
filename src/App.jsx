
import axios from 'axios'
import {Route, Routes} from 'react-router-dom'
import serverUrl from './serverUrl'
import { useEffect, useState } from 'react'
import { getPerson } from './services/PersonService'
import Homepage from './pages/Homepage'
import Cabinet from './pages/Cabinet'
import Header from './elements/Header'
import CabinetChefLayout from './pages/CabinetChefLayout'
import CabinetChefProfile from './elements/Cabinet/CabinetChefProfile.jsx'
import CabinetBecomeChef from './elements/Cabinet/CabinetBecomeChef.jsx'

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth') === 'true')
  const [chef, setChef] = useState({})
  const [person, setPerson] = useState({})
  useEffect(() => {
    if(isAuth){
      sendGetPerson()
    }
  }, [])

  const sendGetPerson = async () => {
    try{
      const {data} = await getPerson()
      console.log(data)
      setPerson(data)
    } catch (error){
      console.log('error getting person')
      setIsAuth(false)
      setPerson(null)
      console.log(error)
    }
  }
  return<>
  <Header isAuth={isAuth} setIsAuth={setIsAuth} person={person} setPerson={setPerson}/>
  
  <Routes>
    <Route path="/HomeChefFront" element={<Homepage isAuth={isAuth} setIsAuth={setIsAuth} person={person} setPerson={setPerson}/>}/>
    

    <Route path="/HomeChefFront/cabinet" element={<CabinetChefLayout person={person} setPerson={setPerson} chef={chef} setChef={setChef}/>}>
      <Route path="chef-profile" element={<CabinetChefProfile/>}/>
      <Route path="become-chef" element={<CabinetBecomeChef person={person} setPerson={setPerson} setChef={setChef}/>}/>
    </Route>
    
  </Routes>
  </>
}

export default App
