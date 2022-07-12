// Import du modèle post
const Post = require('../models/post');

// Import du package fs
const fs = require('fs');

// Import de la fonction removeImageFile
const functions = require('../utils/functions');

// Enregistrement dun nouveau post
exports.createPost = (req,res) => {    
        if (req.file) {
            const postObject = JSON.parse(req.body.post); // Conversion du corps de la requête en objet json
            delete postObject._id;     //  Suppression de l'id renvoyé par le frontend

            if (postObject.postUserId == req.token.userId) { // Test si l'userId de la requête correspond au token d'authentification
                const post = new Post({
                    ...postObject,         // Copie tous les éléments de l'objet json dans la nouvelle instance
                    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,    // Récupère l'url de l'image de manière dynamique
                });
                post.save()    // Enregistrement du nouveau post dans la base de données
                    .then(() => res.status(201).json({ message: 'Post saved'}))    // Création de ressource
                    .catch(error => res.status(400).json({ error }));               // Mauvaise requête
            } else {
                functions.removeImageFile(req, res);  // Supprime le fichier crée inutilement par multer et renvoie un message d'erreur
            }

        } else {
            const postObject = req.body; // Conversion du corps de la requête en objet json
            delete postObject._id;     //  Suppression de l'id renvoyé par le frontend
            if (postObject.postUserId == req.token.userId) { // Test si l'userId de la requête correspond au token d'authentification
                const post = new Post({
                    ...postObject,         // Copie tous les éléments de l'objet json dans la nouvelle instance
                });
                post.save()    // Enregistrement du nouveau post dans la base de données
                    .then(() => res.status(201).json({ message: 'Post saved'}))    // Création de ressource
                    .catch(error => res.status(400).json({ error }));               // Mauvaise requête
            } else {
                res.status(403).json({ error: "Unauthorized request" });    // Requête non autorisée
            }
        }
};


// Récupération de tous les posts
exports.getAllPosts = (req, res) => {
    Post.find()
      .then(posts => res.status(200).json(posts))         // Requête ok
      .catch(error => res.status(400).json({ error }));     // Mauvaise requête
};

// Récupération dun post
exports.getOnePost = (req, res) => {
    Post.findOne({ _id: req.params.id })
      .then(post => res.status(200).json(post))         // Requête ok
      .catch(error => res.status(404).json({ error }));   // Ressource non trouvée
};

// Modification dun post
exports.modifyPost = (req, res) => {
    Post.findOne({ _id: req.params.id })                 // Recherche du post avec l'id
      .then (post => {

        if (post.postUserId == req.token.userId) {           // Test si le userId du token correspond à celui du post à modifier

          if (req.file) {                                 // Test si présence d'un fichier dans la requête
            let filename = sauce.imageUrl.split('/images/')[1];   // Récupération du nom du fichier
            fs.unlink(`images/${filename}`, () => {                 // Suppression du fichier dans le dossier images
              const postObject = {                                 // Création du nouvel objet post
                ...JSON.parse(req.body.post),                      // Conversion du corps de la requête en objet json
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`  // Mise à jour de l'url de la nouvelle image
              }
              Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id }) // Récupère le post avec l'id passé en paramètre et le remplace par le nouvel objet post créé auquel on rajoute le même id
                .then(() => res.status(200).json({ message: 'Post modified'})) // Requête ok
                .catch(error => res.status(400).json({ error }));               // Mauvaise requête
            })

          } else {                                                                          // Si pas de fichier dans la requête
            Post.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })    // Rempacement par le corps de la requête
              .then(() => res.status(200).json({ message: 'Post modified'})) // Requête ok
              .catch(error => res.status(400).json({ error }));               // Mauvaise requête
          }

        } else {                                  // Si l'utilisateur n'est pas celui qui a créé le post
          if (req.file) {                         // Si présence d'un fichier dans la requête
            functions.removeImageFile(req, res);  // Supprime le fichier crée inutilement par multer et renvoie un message d'erreur
          } else {                                // Si absence de fichier dans la requête
            res.status(403).json({ error: "Unauthorized request" });    // Requête non autorisée
          }          
        }
      })
      .catch(error => res.status(404).json({ error }));   // Ressource non trouvée
};

// Suppression du post
exports.deletePost = (req, res) => {
  Post.findOne({_id: req.params.id})                   // Recherche du post avec l'id
    .then (post => {
      if (post.postUserId == req.token.userId) {           // Test si le userId du token correspond à celui du post à modifier
        let filename = sauce.imageUrl.split('/images/')[1];   // Récupération du nom du fichier
        fs.unlink(`images/${filename}`, () => {                 // Suppression du fichier dans le dossier images
          Post.deleteOne({_id: req.params.id})                 // Suppression du post
            .then(() => res.status(200).json({ message : "Post deleted"})) // Requête ok
            .catch(error => res.status(400).json({error}));                 // Mauvaise requête
        })
      } else {
        res.status(403).json({ error: "Unauthorized request" });
      }
    })
    .catch(error => res.status(404).json({ error }));   // Ressource non trouvée
}