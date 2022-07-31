import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Error from './pages/Error'
import './styles/index.css'
import Users from './pages/Users'
import { UserContext } from './utils/context'

const App = () => {
   const { user } = useContext(UserContext)

   return (
      <Router>
         <Routes>
            <Route exact path="/" element={user ? <Home /> : <Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<Users />} />
            <Route path="*" element={<Error />} />
         </Routes>
      </Router>
   )
}

export default App
