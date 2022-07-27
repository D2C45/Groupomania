import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Error from './pages/Error'
import './styles/index.css'

const App = () => {
   /**
    * Récupère le token dans le localStorage
    * @returns null si vide ou le token
    */
   const getToken = () => {
      const auth = localStorage.getItem('auth')
      if (auth == null) {
         return null
      } else {
         return JSON.parse(auth).token
      }
   }

   // Initialise le useState du token avec ce qui est récupéré dans le localStorage
   const [token, setToken] = useState(getToken())

   // Si pas de token dans le localStorage renvoie sur la page de connection
   if (!token) {
      return <Login setToken={setToken} />
   }

   // Si token renvoie à la page d'acceuil ou d'erreur
   return (
      <Router>
         <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Error />} />
         </Routes>
      </Router>
   )
}

export default App
