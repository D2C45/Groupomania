import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import UserCard from '../components/users/Card'
import Card from '../components/home/Card'

const Profile = () => {
   // variable récupérant l'url de la page (chaine de caractères)
   const currentUrlString = window.location.href
   // variable qui convertit la chaine de caractères en url
   const currentUrl = new URL(currentUrlString)
   // variable qui récupère l'id de l'url
   const profilId = currentUrl.searchParams.get('id')

   const [user, setUser] = useState('')
   // switch pour relancer la requête si il ya des changements dans le profil
   const [changes, setChanges] = useState(false)
   // les posts de cet utilisateur
   const [userPosts, setUserPosts] = useState()

   // Récupère les informations de l'utilisateur
   useEffect(() => {
      axios({
         method: 'get',
         url: `${process.env.REACT_APP_API_URL}api/user/${profilId}`,
         withCredentials: true,
         headers: {
            Authorization: `Bearer ${
               JSON.parse(localStorage.getItem('auth')).token
            }`,
         },
      })
         .then((response) => {
            setUser(response.data)
         })
         .catch(function (error) {
            console.log(error)
         })
   }, [profilId, changes])

   // Récupère les posts de l'utilisateur
   useEffect(() => {
      axios({
         method: 'get',
         url: `${process.env.REACT_APP_API_URL}api/posts`,
         withCredentials: true,
         headers: {
            Authorization: `Bearer ${
               JSON.parse(localStorage.getItem('auth')).token
            }`,
         },
      })
         .then((response) => {
            setUserPosts(
               response.data.filter((post) => post.postUserId === profilId)
            )
         })
         .catch(function (error) {
            console.log(error)
         })
   }, [profilId, changes])

   return (
      <>
         <Header />
         <main className="posts-container">
            <UserCard user={user} setChanges={setChanges} />
            <ul className="posts-container">
               {userPosts &&
                  userPosts.map((post) => {
                     return (
                        <Card
                           post={post}
                           key={post._id}
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

export default Profile
