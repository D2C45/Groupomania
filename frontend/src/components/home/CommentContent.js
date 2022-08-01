import React, { useContext, useEffect, useState } from 'react'
import { dateFormat } from '../../utils/functions'
import axios from 'axios'
import { UserContext } from '../../utils/context'

const CommentContent = ({ comment, changes, setChanges }) => {
   // Information de l'utilisateur connecté
   const { userData } = useContext(UserContext)
   // Toggle pour la mise à jour du commentaire
   const [update, setUpdate] = useState(false)
   // Message contenu dans le commentaire
   const [message, setMessage] = useState(comment.text)
   // Information de la personne qui a créé le commentaire
   const [commenterData, setCommenterData] = useState({})

   const deleteComment = () => {
      axios({
         method: 'patch',
         url: `${process.env.REACT_APP_API_URL}api/posts/comment/${comment._id}`,
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

   const sendCommentModifications = (e) => {
      e.preventDefault()

      const content = {
         text: message,
      }

      axios({
         method: 'put',
         url: `${process.env.REACT_APP_API_URL}api/posts/comment/${comment._id}`,
         withCredentials: true,
         headers: {
            Authorization: `Bearer ${
               JSON.parse(localStorage.getItem('auth')).token
            }`,
         },
         data: content,
      })
         .then((response) => {
            console.log(response)
            setChanges(!changes)
            setUpdate(false)
         })
         .catch(function (error) {
            console.log(error)
         })
   }

   // Récupère les informations de la personne qui a créé le post
   useEffect(() => {
      axios({
         method: 'get',
         url: `${process.env.REACT_APP_API_URL}api/user/${comment.commentUserId}`,
         withCredentials: true,
         headers: {
            Authorization: `Bearer ${
               JSON.parse(localStorage.getItem('auth')).token
            }`,
         },
      })
         .then((response) => {
            setCommenterData(response.data)
         })
         .catch(function (error) {
            console.log(error)
         })
   }, [comment.commentUserId])

   return (
      <li className="card-container comment-container">
         <div className="card-header pb10">
            <div className="card-user">
               <a href="/">
                  <img
                     src={
                        commenterData.imageUrl === ''
                           ? require('../../assets/default-avatar.png')
                           : commenterData.imageUrl
                     }
                     alt="avatar de la personne connectée"
                     className="avatar"
                  />
               </a>
               <div className="card-userinfo">
                  <a href="/" className="author">
                     {commenterData.firstName} {commenterData.lastName}{' '}
                     {commenterData.isAdmin && '(Admin)'}
                  </a>
                  <p className="date">{dateFormat(comment.timestamp)}</p>
               </div>
            </div>
            {(userData._id === comment.commentUserId || userData.isAdmin) && (
               <div className="update">
                  <i
                     className="fas fa-edit"
                     onClick={() => setUpdate(true)}
                  ></i>
                  <i className="fas fa-trash" onClick={deleteComment}></i>
               </div>
            )}
         </div>
         {!update ? (
            <p className="pb10">{message}</p>
         ) : (
            <form action="" onSubmit={(e) => sendCommentModifications(e)}>
               <textarea
                  defaultValue={message}
                  className="message message-large"
                  onChange={(e) => setMessage(e.target.value)}
               />
               <div className="newpost-footer">
                  <div>
                     <button
                        className="btn-send"
                        onClick={() => setUpdate(false)}
                     >
                        Annuler
                     </button>
                     <button className="btn-send" type="submit">
                        Envoyer
                     </button>
                  </div>
               </div>
            </form>
         )}
      </li>
   )
}

export default CommentContent
