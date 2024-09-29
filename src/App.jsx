
import axios from 'axios'
import {Route, Routes} from 'react-router-dom'
import serverUrl from './serverUrl'
import { useEffect, useRef, useState } from 'react'
import { getPerson } from './services/PersonService'
import Homepage from './pages/Homepage'
import Header from './elements/Header'
import Footer from './elements/Footer.jsx'
import CabinetChefLayout from './pages/CabinetChefLayout'
import CabinetChefProfile from './elements/Cabinet/CabinetChefProfile.jsx'
import CabinetBecomeChef from './elements/Cabinet/CabinetBecomeChef.jsx'
import CabinetChefMenu from './elements/Cabinet/CabinetChefMenu.jsx'
import CabinetAdminAddData from './elements/Cabinet/CabinetAdimAddData.jsx'
import Dishes from './pages/Dishes.jsx'
import {getCart} from './services/CartService.js'
import Cart from './pages/Cart.jsx'
import Dish from './pages/Dish.jsx'
import CabinetChefOrders from './elements/Cabinet/CabinetChefOrders.jsx'
import Chefs from './pages/Chefs.jsx'
import Chef from './pages/Chef.jsx'
import ChefsMap from './pages/ChefsMap.jsx'
import DishReviews from './pages/DishReviews.jsx'
import AboutUs from './pages/AboutUs.jsx'
import CabinetReviews from './elements/Cabinet/CabinetReviews.jsx'
import CabinetUseful from './elements/Cabinet/CabinetUseful.jsx'
import CabinetTarifs from './elements/Cabinet/CabinetTarifs.jsx'
import CabinetUserOrders from './elements/Cabinet/CabinetUserOrders.jsx'
import CabinetUserProfile from './elements/Cabinet/CabinetUserProfile.jsx'
import CabinetUserDishStory from './elements/Cabinet/CabinetUserPreviousDishes.jsx'
import CabinetAdminUsers from './elements/Cabinet/CabinetAdminUsers.jsx'
import CabinetChefStory from './elements/Cabinet/CabinetChefStory.jsx'
import CabinetNotifications from './elements/Cabinet/CabinetNotifications.jsx'
import ProductsSafety from './pages/ProductsSafety.jsx'
import Certification from './pages/Certification.jsx'
import HelpingCenter from './pages/HelpingCenter.jsx'
import HowWeWork from './pages/HowWeWork.jsx'
import CabinetUsefulForUser from './elements/Cabinet/CabinetUsefulForUser.jsx'

const POLLING_TIME = 10000

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth') === 'true')
  const [person, setPerson] = useState({})
  const [cart, setCart] = useState({})
  const [locality, setLocality] = useState(undefined)
  const [showRegisterWindow, setShowRegisterWindow] = useState(false)
  const [hasNotification, setHasNotifications] = useState(false) 
  const timerIdRef = useRef(null)
  const eventSouceRef = useRef(null)

  useEffect(() => {
    const fromStorage = JSON.parse(localStorage.getItem('locality'))
    if(fromStorage){
        setLocality(fromStorage)
    }
  }, [])

  useEffect(() => {
    loadCart()
    sendGetPerson()
  }, [])

  //notification sse subscription
  useEffect(() => {
    if(isAuth){
      openSseConnection()
        return () => {
          eventSouceRef.current.close(); // Закрыть соединение при размонтировании
        }
    }
      // if(isAuth){
      //   const eventSource = new EventSource(serverUrl + '/sse/notifications-subscribe', { withCredentials: true });
        
      //   if(eventSource.readyState)
      //   eventSource.onmessage = (event) => {
      //     const parsed = JSON.parse(event.data)
      //     console.log(parsed)
      //     console.log(isAuth)
      //   }
      // }
  }, [])

  function openSseConnection(){
    eventSouceRef.current = new EventSource(serverUrl + '/sse/notifications-subscribe', { withCredentials: true })
    eventSouceRef.current.onmessage = (event) => {
      const parsed = JSON.parse(event.data)
      console.log(parsed)
      console.log(isAuth)
    }
    eventSouceRef.current.onerror = (error) => {
      eventSouceRef.current.close()
      openSseConnection()
    }
    window.onbeforeunload = function () {
      console.log('close eventsource')
      eventSouceRef.current.close();
    };
  }

  useEffect(() => {
    if(isAuth){
      openSseConnection()
        return () => {
          eventSouceRef.current.close(); // Закрыть соединение при размонтировании
        }
    }
  //   if(isAuth){
  //     const eventSource = new EventSource(serverUrl + '/sse/notifications-subscribe', { withCredentials: true });
      
  //     // attaching a handler to receive message events
  //     eventSource.onmessage = (event) => {
  //       const parsed = JSON.parse(event.data)
  //       console.log(parsed)
  //       console.log(isAuth)
  //     };
  //     return () => eventSource.close();
  // }
}, [isAuth])

  const sendGetPerson = async () => {
    try{
      const {data} = await getPerson()
      setPerson(data)
    } catch (error){
      console.log('error getting person')
      setIsAuth(false)
      setPerson(null)
      console.log(error)
    }
  }
  const loadCart = async () => {
    try{
      const {data} = await getCart()
      setCart(data)
    } catch(error){
      console.error(error)
    }
  }
  return(
  <>
    <div className='home-chef-content'>
      <Header isAuth={isAuth} setIsAuth={setIsAuth} person={person} setPerson={setPerson} cart={cart} 
              locality={locality} setLocality={setLocality} showRegisterWindow={showRegisterWindow} setShowRegisterWindow={setShowRegisterWindow} hasNotifications={hasNotification}/>
      
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/about-us" element={<AboutUs setShowRegisterWindow={setShowRegisterWindow}/>}/>
        <Route path="/chefs/:params?" element={<Chefs />}/>
        <Route path="/chefs-map" element={<ChefsMap/>}/>
        <Route path="/chef/:id" element={<Chef/>}/>
        <Route path="/dishes/:params?" element={<Dishes cart={cart} loadCart={loadCart} locality={locality}/>}/>
        <Route path="/dish/:id" element={<Dish cart={cart} loadCart={loadCart}/>}/>
        <Route path="/dish/:id/comments" element={<DishReviews person={person}/>}/>
        <Route path="/cart" element={<Cart cart={cart} loadCart={loadCart}/>}/>
        <Route path="/products-safety" element={<ProductsSafety/>}/>
        <Route path="/certification" element={<Certification/>}/>
        <Route path="/helping-center" element={<HelpingCenter/>}/>
        <Route path="/how-we-work" element={<HowWeWork/>}/>
        <Route path="/cabinet" element={<CabinetChefLayout person={person} setPerson={setPerson} isAuth={isAuth}/>}>
          <Route path="chef-profile" element={<CabinetChefProfile/>}/>
          <Route path="reviews" element={<CabinetReviews/>}/>
          <Route path="chef-usefull" element={<CabinetUseful/>}/>
          <Route path="tarif" element={<CabinetTarifs/>}/>
          <Route path="become-chef" element={<CabinetBecomeChef person={person} setPerson={setPerson}/>}/>
          <Route path="chef-menu" element={<CabinetChefMenu/>}/>
          <Route path="chef-story" element={<CabinetChefStory/>}/>
          <Route path="admin-data" element={<CabinetAdminAddData person={person}/>}/>
          <Route path="chef-orders" element={<CabinetChefOrders/>}/>
          <Route path="user-orders" element={<CabinetUserOrders/>}/>
          <Route path="user-profile" element={<CabinetUserProfile person={person} sendGetPerson={sendGetPerson}/>}/>
          <Route path="previous-dishes" element={<CabinetUserDishStory person={person} cart={cart} loadCart={loadCart}/>}/>
          <Route path="usefull" element={<CabinetUsefulForUser/>}/>
          <Route path="users-list" element={<CabinetAdminUsers person={person}/>}/>
          <Route path="notifications/:params?" element={<CabinetNotifications person={person} setPerson={setPerson}/>}/>
        </Route>
        
      </Routes>
    </div>
    <Footer/>
  </>
  )
}

export default App
