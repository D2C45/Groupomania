import React from 'react'

const Card = () => {
   return (
      <li className="card-container">
         <div className="card-header pb10">
            <a href="/">
               <img
                  src={require('../../assets/sunset.jpg')}
                  alt="avatar"
                  className="avatar"
               />
            </a>
            <div className="card-userinfo">
               <a href="/" className="author">
                  auteur du post
               </a>
               <p className="date">date du post</p>
            </div>
         </div>

         <div className="card-body">
            <p className="pb10">
               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam
               sed id quos, eos eligendi, illum harum delectus repellendus
               corporis est fugit vitae fugiat dolor blanditiis? Numquam
               pariatur expedita ipsa blanditiis.
            </p>
            <div className="pb10">
               <img
                  src={require('../../assets/sunset.jpg')}
                  alt="illustration"
                  className="post-picture"
               />
            </div>
         </div>

         <div className="card-footer">
            <i className="far fa-heart"></i>
            <i className="far fa-comment"></i>
         </div>
      </li>
   )
}

export default Card
