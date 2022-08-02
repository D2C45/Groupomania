import React, { useContext } from 'react'
import logo from '../assets/logo.png'
import { UserContext } from '../utils/context'
import { Link } from 'react-router-dom'

const Header = () => {
   const { logout } = useContext(UserContext)

   return (
      <header>
         <nav>
            <div className="logo-container">
               <Link to="/">
                  <img src={logo} alt="logo de Groupomania" className="logo" />
               </Link>
            </div>
            <ul>
               <li>
                  <Link to="/account">
                     <i className="fas fa-user"></i>
                  </Link>
               </li>
               <li>
                  <Link to="/users">
                     <i className="fas fa-users"></i>
                  </Link>
               </li>
               <li>
                  <Link to="/login">
                     <i className="fas fa-sign-out-alt" onClick={logout}></i>
                  </Link>
               </li>
            </ul>
         </nav>
      </header>
   )
}

export default Header
