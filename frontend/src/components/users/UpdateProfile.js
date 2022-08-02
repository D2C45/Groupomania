import React, { useRef, useState } from 'react'
import axios from 'axios'

const UpdateProfile = ({
   user,
   setUpdate,
   changes,
   setChanges,
   picture,
   setPicture,
   file,
   setFile,
}) => {
   const [description, setDescription] = useState(user.description)

   // ref pour pouvoir vider le fichier uploader
   const ref = useRef()

   const changePicture = (e) => {
      setPicture(URL.createObjectURL(e.target.files[0]))
      setFile(e.target.files[0])
   }

   const sendUserModifications = () => {
      const data = new FormData()
      const content = {
         description: description,
         imageUrl: picture,
      }
      const contentString = JSON.stringify(content)
      data.append('user', contentString)
      if (file) {
         data.append('image', file)
      }

      axios({
         method: 'put',
         url: `${process.env.REACT_APP_API_URL}api/user/${user._id}`,
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
               defaultValue={description}
               className="message message-large"
               onChange={(e) => setDescription(e.target.value)}
            />
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
               <button className="btn-send" onClick={sendUserModifications}>
                  Envoyer
               </button>
            </div>
         </div>
      </div>
   )
}

export default UpdateProfile
