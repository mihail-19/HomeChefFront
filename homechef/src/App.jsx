
import './App.css'
import Header from './elements/Header'
import homeImg from './assets/home.jpg'
function App() {
  
  return (
    <>
      <Header/>
      <div className='home__main-screen' >
        <div className='home__main-screen-content' >
          <div className='home__main-screen-text'>
            Те, що зроблено з любовʼю
          </div>
          <div className='home__search'>
            <input type="text" value='Ваш індекс або адреса'></input>
            <button className='home__search-button'>Знайти</button>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default App
