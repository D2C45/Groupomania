import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { dateFormat } from '../../utils/functions'
import UpdatePost from './UpdatePost'
import { UserContext } from '../../utils/context'

const Card = ({ post, changes, setChanges }) => {
   // Information de l'utilisateur connecté
   const { userData } = useContext(UserContext)
   // Information de l'utilisateur qui a créé le post
   const [posterData, setPosterData] = useState('')
   // Toggle pour la mise à jour du post
   const [update, setUpdate] = useState(false)

   const deletePost = () => {
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

   // Récupère les informations de la personne qui a créé le post
   useEffect(() => {
      axios({
         method: 'get',
         url: `${process.env.REACT_APP_API_URL}api/user/${post.postUserId}`,
         withCredentials: true,
         headers: {
            Authorization: `Bearer ${
               JSON.parse(localStorage.getItem('auth')).token
            }`,
         },
      })
         .then((response) => {
            setPosterData(response.data)
         })
         .catch(function (error) {
            console.log(error)
         })
   }, [post.postUserId])

   return (
      <ul className="posts-container">
         <li className="card-container">
            <div className="card-header pb10">
               <div className="card-user">
                  <a href="/">
                     <img
                        src={
                           posterData.imageUrl === ''
                              ? require('../../assets/default-avatar.png')
                              : posterData.imageUrl
                        }
                        alt="avatar de la personne qui a créé le post"
                        className="avatar"
                     />
                  </a>
                  <div className="card-userinfo">
                     <a href="/" className="author">
                        {posterData.firstName} {posterData.lastName}{' '}
                        {posterData.isAdmin && '(administrateur)'}
                     </a>
                     <p className="date">{dateFormat(post.createdAt)}</p>
                  </div>
               </div>
               {(userData._id === post.postUserId || userData.isAdmin) && (
                  <div className="update">
                     <i
                        className="fas fa-edit"
                        onClick={() => setUpdate(true)}
                     ></i>
                     <i className="fas fa-trash" onClick={deletePost}></i>
                  </div>
               )}
            </div>
            {!update ? (
               <div className="card-body">
                  <p className="pb10">{post.message}</p>
                  <div className="pb10">
                     {post.imageUrl ? (
                        <img
                           src={post.imageUrl}
                           alt="illustration du post"
                           className="post-picture"
                        />
                     ) : null}
                  </div>
               </div>
            ) : (
               <UpdatePost
                  post={post}
                  setUpdate={setUpdate}
                  changes={changes}
                  setChanges={setChanges}
               />
            )}

            <div className="card-footer">
               <i className="far fa-heart"></i>
               <i className="far fa-comment"></i>
            </div>
         </li>
      </ul>
   )
}

export default Card
