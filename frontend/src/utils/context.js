import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
   const [user, setUser] = useState(JSON.parse(localStorage.getItem('auth')))
   const [userData, setUserData] = useState({})
   // const [posts, setPosts] = useState([])
   // const [refreshPage, setRefreshPage] = useState(true)
   // const [auth, setAuth] = useState(null)

   useEffect(() => {
      if (JSON.parse(localStorage.getItem('auth')) !== null) {
         axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}api/user/${user.userId}`,
            withCredentials: true,
            headers: {
               Authorization: `Bearer ${user.token}`,
            },
         })
            .then((response) => {
               setUserData(response.data)
               // a suprimer !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
               console.log(response.data)
            })
            .catch(function (error) {
               console.log(error)
               localStorage.setItem('auth', null)
               setUser(null)
            })
      }
   }, [user])

   const login = (auth) => {
      localStorage.setItem('auth', JSON.stringify(auth))
      setUser(auth)
   }

   const logout = () => {
      localStorage.removeItem('auth')
      setUser(null)
   }

   return (
      <UserContext.Provider
         value={{
            user,
            userData,
            login,
            logout,
         }}
      >
         {children}
      </UserContext.Provider>
   )
}
