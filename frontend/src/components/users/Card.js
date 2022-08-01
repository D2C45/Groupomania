import React from 'react'
import { dateFormat } from '../../utils/functions'

const UserCard = ({ user, changes, setChanges }) => {
   return (
      <li className="card-container user-card">
         <a href="/">
            <img
               src={
                  user.imageUrl === ''
                     ? require('../../assets/default-avatar.png')
                     : user.imageUrl
               }
               alt="avatar de la personne qui a créé le post"
               className="avatar avatar-lg"
            />
         </a>
         <div className="card-userinfo">
            <a href="/" className="author">
               {user.firstName} {user.lastName} {user.isAdmin && '(Admin)'}
            </a>
            <p className="date">
               Inscript depuis le {dateFormat(user.createdAt)}
            </p>
            {user.description !== '' && (
               <p className="user-description">{user.description}</p>
            )}
         </div>
      </li>
   )
}

export default UserCard
