import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import UserCard from '../components/users/Card'
import axios from 'axios'

const Users = () => {
   const [users, setUsers] = useState(null)
   // switch pour relancer la requête si il ya des changements dans les utilisateurs
   const [changes, setChanges] = useState(false)

   // Récupère tous les utilisateurs
   useEffect(() => {
      axios({
         method: 'get',
         url: `${process.env.REACT_APP_API_URL}api/user`,
         withCredentials: true,
         headers: {
            Authorization: `Bearer ${
               JSON.parse(localStorage.getItem('auth')).token
            }`,
         },
      })
         .then((response) => {
            setUsers(response.data)
         })
         .catch(function (error) {
            console.log(error)
         })
   }, [changes])

   return (
      <>
         <Header />
         <main>
            <ul className="posts-container">
               {users &&
                  users.map((user) => {
                     return (
                        <UserCard
                           user={user}
                           key={user._id}
                           changes={changes}
                           setChanges={setChanges}
                        />
                     )
                  })}
            </ul>
         </main>
      </>
   )
}

export default Users
