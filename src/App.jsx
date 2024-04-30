
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
import CabinetChefMenu from './elements/Cabinet/CabinetChefMenu.jsx'
import CabinetAdminAddData from './elements/Cabinet/CabinetAdimAddData.jsx'
import Dishes from './pages/Dishes.jsx'
import {getCart} from './services/CartService.js'
import Cart from './pages/Cart.jsx'
import Dish from './pages/Dish.jsx'
function App() {
  console.log('app')
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth') === 'true')
  const [person, setPerson] = useState({})
  const [cart, setCart] = useState({})
  useEffect(() => {
    loadCart()
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
  const loadCart = async () => {
    const {data} = await getCart()
    setCart(data)
  }
  return<>
  <Header isAuth={isAuth} setIsAuth={setIsAuth} person={person} setPerson={setPerson} cart={cart}/>
  
  <Routes>
    <Route path="/HomeChefFront" element={<Homepage />}/>
    <Route path="/HomeChefFront/dishes" element={<Dishes loadCart={loadCart}/>}/>
    <Route path="/HomeChefFront/dishes/:id" element={<Dish/>}/>
    <Route path="/HomeChefFront/cart" element={<Cart cart={cart} loadCart={loadCart}/>}/>
    <Route path="/HomeChefFront/cabinet" element={<CabinetChefLayout person={person} setPerson={setPerson} isAuth={isAuth}/>}>
      <Route path="chef-profile" element={<CabinetChefProfile/>}/>
      <Route path="become-chef" element={<CabinetBecomeChef person={person} setPerson={setPerson}/>}/>
      <Route path="chef-menu" element={<CabinetChefMenu/>}/>
      <Route path="admin-data" element={<CabinetAdminAddData person={person}/>}/>
    </Route>
    
  </Routes>
  </>
}

export default App
