import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import{
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import Cabinet from './pages/Cabinet.jsx'

const router = createBrowserRouter([
  {
    path: "/HomeChefFront",
    element: <App/>
  },
  {
    path: "/HomeChefFront/cabinet",
    element: <Cabinet/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
