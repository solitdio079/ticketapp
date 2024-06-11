import {useState, useEffect} from 'react'
import { Outlet } from "react-router-dom" 
import Navbar from "../components/navbar"
import Footer from "../components/footer"


export default function Root() {
    const [user, setUser] = useState(null)
    const isConnected = Boolean(user)

    useEffect(() => {
        const  fetchUser = async () => {
            if (isConnected) return
            const response = await fetch('http://localhost:3000/auth/status', {
              method: 'GET',
              mode: 'cors',
              credentials: 'include',
              headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': "true",
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
            })
            const newUser = await response.json()
            console.log(newUser);
            if(newUser.data) setUser(newUser.data[0])
        }
        
        fetchUser()
    }, [isConnected])
    return (<>
        <Navbar user={user} />
        <Outlet context={[user]} />
        <Footer/>
    </>)
}