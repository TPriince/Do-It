import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import Header from "../../components/header/Header"
import Login from "../login/Login"

export default function Dashboard() {
  const [userToken, setUserToken] = useState(null)
  const [user, setUser] = useState('')
  useEffect(()  => {
    const token = sessionStorage.getItem('token')
    const currentUser = sessionStorage.getItem('user')
    setUser(JSON.parse(currentUser))
    setUserToken(JSON.parse(token))
  }, [userToken])

  if (!userToken) return <Login />
  return (
    <div className="dashboard">
        <Header user={user} />
        <Outlet />
    </div>
  )
}
