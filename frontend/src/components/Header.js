import React, { useContext } from 'react'
import logo from '../assets/logo.png'
import { UserContext } from '../utils/context'

const Header = () => {
   const { logout, userData } = useContext(UserContext)

   return (
      <header>
         <nav>
            <div className="logo-container">
               <a href="/">
                  <img src={logo} alt="logo de Groupomania" className="logo" />
               </a>
            </div>
            <ul>
               <li>
                  <a href={`/profile?id=${userData._id}`}>
                     <i className="fas fa-user"></i>
                  </a>
               </li>
               <li>
                  <a href="/users">
                     <i className="fas fa-users"></i>
                  </a>
               </li>
               <li>
                  <a href="/">
                     <i className="fas fa-sign-out-alt" onClick={logout}></i>
                  </a>
               </li>
            </ul>
         </nav>
      </header>
   )
}

export default Header
