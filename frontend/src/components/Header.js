import React from 'react'
import logo from '../assets/logo.png'

const Header = () => {
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
                  <i className="fas fa-sign-out-alt"></i>
               </li>
            </ul>
         </nav>
      </header>
   )
}

export default Header
