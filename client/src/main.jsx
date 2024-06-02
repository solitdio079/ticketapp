import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './pages/Root'
import Login, { action as loginAction } from './pages/Login'
import ErrorPage from './error-page'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage/>,
    children: [{
      path: "/login",
      element: <Login/>,
      action: loginAction
    }]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
)
