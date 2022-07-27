import React, { useRef, useState } from 'react'
import axios from 'axios'

const Newpost = () => {
   const [message, setMessage] = useState('')
   const [picture, setPicture] = useState('')
   const [file, setFile] = useState('')
   // ref pour pouvoir vider le fichier uploader
   const ref = useRef()

   const sendPost = () => {
      if (message || picture) {
         const data = new FormData()
         const post = {
            postUserId: JSON.parse(localStorage.getItem('auth')).userId,
            message: message,
         }
         const postString = JSON.stringify(post)
         data.append('post', postString)
         if (file) {
            data.append('image', file)
         }

         axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}api/posts`,
            headers: {
               Authorization: `Bearer ${
                  JSON.parse(localStorage.getItem('auth')).token
               }`,
            },
            data,
         })
            .then((response) => {
               console.log(response)
            })
            .catch(function (error) {
               console.log(error)
            })

         cancelPost()
      } else {
         console.log('Pas de post')
      }
   }

   const uploadPicture = (e) => {
      setPicture(URL.createObjectURL(e.target.files[0]))
      setFile(e.target.files[0])
   }

   const cancelPost = () => {
      setMessage('')
      setPicture('')
      setFile('')
      ref.current.value = ''
   }

   return (
      <div className="card-container newpost-container">
         <div className="newpost-header">
            <img
               src={require('../../assets/sunset.jpg')}
               alt="avatar"
               className="avatar"
            />
            <textarea
               name="message"
               id="message"
               placeholder="Ecrivez quelque chose..."
               maxLength={500}
               value={message}
               onChange={(e) => setMessage(e.target.value)}
            />
         </div>

         {message || picture ? (
            <div className="card-container border">
               <div className="card-header pb10">
                  <img
                     src={require('../../assets/sunset.jpg')}
                     alt="avatar"
                     className="avatar"
                  />
                  <div className="card-userinfo">
                     <p className="author">auteur du post</p>
                     <p className="date">date du post</p>
                  </div>
               </div>

               <div className="card-body">
                  <p className="pb10">{message}</p>
                  <div className="pb10">
                     <img src={picture} alt="" className="post-picture" />
                  </div>
               </div>
            </div>
         ) : null}

         <div className="newpost-footer">
            <div className="btn-picture">
               <i className="far fa-image"></i>
               <input
                  type="file"
                  id="image"
                  name="image"
                  accept=".jpg, .jpeg, .png"
                  ref={ref}
                  onChange={(e) => uploadPicture(e)}
               />
            </div>
            <div>
               {message || picture ? (
                  <button className="btn-send" onClick={cancelPost}>
                     Annuler
                  </button>
               ) : null}
               <button className="btn-send" onClick={sendPost}>
                  Envoyer
               </button>
            </div>
         </div>
      </div>
   )
}

export default Newpost
