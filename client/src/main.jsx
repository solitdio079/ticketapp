import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './pages/Root'
import Login, { action as loginAction } from './pages/Login'
import EmailSuccess from './pages/email-success'
import Admin from './pages/admin/Admin'
import Profile, {action as profileAction} from './pages/admin/Profile'
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
    }, {
      path: "/check-email",
      element: <EmailSuccess/>
      },
      {
        path: "/admin",
        element: <Admin />,
        children: [{
          index: true,
          element: <Profile />,
          action: profileAction
        }]
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
)
