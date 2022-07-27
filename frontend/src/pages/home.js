import React from 'react'
import Header from '../components/Header'
import Card from '../components/home/Card'
import Newpost from '../components/home/Newpost'

const Home = () => {
   return (
      <>
         <Header />
         <section>
            <Newpost />
         </section>
         <main>
            <ul className="posts-container">
               <Card />
            </ul>
         </main>
      </>
   )
}

export default Home
