import React, { useContext } from 'react'
import logo from '../assets/logo.png'
import { UserContext } from '../utils/context'

const Header = () => {
   const { logout } = useContext(UserContext)

   return (
      <header>
         <nav>
            <div className="logo-container">
               <img src={logo} alt="logo de Groupomania" className="logo" />
            </div>
            <ul>
               <li>
                  <i className="fas fa-user"></i>
               </li>
               <li>
                  <i className="fas fa-users"></i>
               </li>
               <li>
                  <i className="fas fa-sign-out-alt" onClick={logout}></i>
               </li>
            </ul>
         </nav>
      </header>
   )
}

export default Header
