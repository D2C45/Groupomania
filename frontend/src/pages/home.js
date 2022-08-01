import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Card from '../components/home/Card'
import Newpost from '../components/home/Newpost'
import axios from 'axios'

const Home = () => {
   const [posts, setPosts] = useState(null)
   // switch pour relancer la requête si il ya des changements dans le fil des posts
   const [changes, setChanges] = useState(false)

   // Récupère tous les posts
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
            setPosts(response.data)
         })
         .catch(function (error) {
            console.log(error)
         })
   }, [changes])

   return (
      <>
         <Header />
         <section>
            <Newpost changes={changes} setChanges={setChanges} />
         </section>
         <main>
            <ul className="posts-container">
               {posts &&
                  posts.map((post) => {
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

export default Home
