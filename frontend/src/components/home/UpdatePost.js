import React, { useRef, useState } from 'react'
import axios from 'axios'

const UpdatePost = ({ post, setUpdate, changes, setChanges }) => {
   const [message, setMessage] = useState(post.message)
   const [picture, setPicture] = useState(post.imageUrl)
   const [file, setFile] = useState('')

   // ref pour pouvoir vider le fichier uploader
   const ref = useRef()

   const changePicture = (e) => {
      setPicture(URL.createObjectURL(e.target.files[0]))
      setFile(e.target.files[0])
   }

   const deletePicture = () => {
      setPicture('')
      setFile('')
      ref.current.value = ''
   }

   const sendPostModifications = () => {
      const data = new FormData()
      const content = {
         message: message,
         imageUrl: picture,
      }
      const contentString = JSON.stringify(content)
      data.append('content', contentString)
      if (file) {
         data.append('image', file)
      }

      axios({
         method: 'put',
         url: `${process.env.REACT_APP_API_URL}api/posts/${post._id}`,
         withCredentials: true,
         headers: {
            Authorization: `Bearer ${
               JSON.parse(localStorage.getItem('auth')).token
            }`,
         },
         data,
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

   return (
      <div className="update-form">
         <div className="card-body">
            <textarea
               defaultValue={message}
               className="message message-large"
               onChange={(e) => setMessage(e.target.value)}
            />
            <div className="pb10">
               {picture !== '' ? (
                  <div className="delete-picture-container">
                     <div>
                        <img
                           src={picture}
                           alt="illustration"
                           className="post-picture"
                        />
                     </div>
                     <i
                        className="far fa-times-circle"
                        onClick={deletePicture}
                     ></i>
                  </div>
               ) : null}
            </div>
         </div>
         <div className="newpost-footer">
            <div className="btn-picture">
               <i className="far fa-file-image"></i>
               <input
                  type="file"
                  name="image"
                  className="upload-img"
                  accept=".jpg, .jpeg, .png"
                  ref={ref}
                  onChange={(e) => changePicture(e)}
               />
            </div>
            <div>
               <button className="btn-send" onClick={() => setUpdate(false)}>
                  Annuler
               </button>
               <button className="btn-send" onClick={sendPostModifications}>
                  Envoyer
               </button>
            </div>
         </div>
      </div>
   )
}

export default UpdatePost
