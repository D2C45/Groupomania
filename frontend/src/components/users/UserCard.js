import React, { useContext, useRef, useState } from 'react'
import { UserContext } from '../../utils/context'
import { dateFormat } from '../../utils/functions'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import UpdateProfile from './UpdateProfile'

const UserCard = ({ user, changes, setChanges, userPosts }) => {
   const { userData } = useContext(UserContext)
   const navigate = useNavigate()

   const [picture, setPicture] = useState(user.imageUrl)
   const [file, setFile] = useState('')
   const [update, setUpdate] = useState(false)

   // ref pour pouvoir vider le fichier uploader
   const ref = useRef()

   const deleteUser = () => {
      // suppression de tous les posts de l'utilisateur supprimé
      for (let post of userPosts) {
         axios({
            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}api/posts/${post._id}`,
            withCredentials: true,
            headers: {
               Authorization: `Bearer ${
                  JSON.parse(localStorage.getItem('auth')).token
               }`,
            },
         })
            .then((response) => {
               console.log(response)
               setChanges(!changes)
            })
            .catch(function (error) {
               console.log(error)
            })
      }
      // suppression de l'utilisateur
      axios({
         method: 'delete',
         url: `${process.env.REACT_APP_API_URL}api/user/${user._id}`,
         withCredentials: true,
         headers: {
            Authorization: `Bearer ${
               JSON.parse(localStorage.getItem('auth')).token
            }`,
         },
      })
         .then((response) => {
            console.log(response)
            localStorage.removeItem('auth')
            setChanges(!changes)
            navigate('/login')
         })
         .catch(function (error) {
            console.log(error)
         })
   }

   const deletePicture = () => {
      setPicture('')
      if (ref.current) ref.current.value = ''
      setFile('')
   }

   return (
      <li className="card-container user-card">
         {!update ? (
            <a href="/" className="delete-picture-container">
               <img
                  src={
                     picture === ''
                        ? require('../../assets/default-avatar.png')
                        : picture
                  }
                  alt="avatar de la personne qui a créé le post"
                  className="avatar avatar-lg"
               />
            </a>
         ) : (
            <div className="delete-picture-container">
               <img
                  src={
                     picture === ''
                        ? require('../../assets/default-avatar.png')
                        : picture
                  }
                  alt="avatar de la personne qui a créé le post"
                  className="avatar avatar-lg"
               />
               {update && picture !== '' && (
                  <i
                     className="far fa-times-circle"
                     onClick={deletePicture}
                  ></i>
               )}
            </div>
         )}

         <div className="usercard-header">
            <div className="card-header card-user pb10">
               <div className="card-userinfo">
                  {!update ? (
                     <a href="/" className="author">
                        {user.firstName} {user.lastName}{' '}
                        {user.isAdmin && '(Admin)'}
                     </a>
                  ) : (
                     <div className="author">
                        {user.firstName} {user.lastName}{' '}
                        {user.isAdmin && '(Admin)'}
                     </div>
                  )}
                  <p className="date">
                     Inscript depuis le {dateFormat(user.createdAt)}
                  </p>
               </div>
               {(user._id === userData._id || userData.isAdmin) && (
                  <div className="update">
                     <i
                        className="fas fa-edit"
                        onClick={() =>
                           update ? setUpdate(false) : setUpdate(true)
                        }
                     ></i>
                     <i className="fas fa-trash" onClick={deleteUser}></i>
                  </div>
               )}
            </div>
            {!update && user.description !== '' && (
               <p className="user-description">{user.description}</p>
            )}
            {update && (
               <UpdateProfile
                  user={user}
                  setUpdate={setUpdate}
                  changes={changes}
                  setChanges={setChanges}
                  picture={picture}
                  setPicture={setPicture}
                  file={file}
                  setFile={setFile}
               />
            )}
         </div>
      </li>
   )
}

export default UserCard
