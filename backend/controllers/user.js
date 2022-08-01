// Import des packages
const bcrypt = require('bcrypt');   // Pour crypter le mot de passe
const jwt = require('jsonwebtoken');  // Pour obtenir un token d'authentification
const dotenv = require('dotenv');   // Pour utiliser les variables d'environnement
const emailValidator = require('email-validator');  // Pour valider le format de l'email
const passwordValidator = require('password-validator');  // Pour valider le format du mot de passe

// Import du package fs
const fs = require('fs');

// Création d'un schema pour le password
const schema = new passwordValidator();
// Ajout des propriétés au schema password
schema
  .is().min(8)
  .is().max(16)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().not().spaces()
  .has().symbols()

// Configure l'environnement de variables
dotenv.config();

// Import du modèle user
const User = require('../models/user');

// Middleware de création d'un nouveau user
exports.signup = (req, res) => {
  if (!emailValidator.validate(req.body.email)) {             // Test la validité de l'email avec email-validator
    return res.status(400).json({error: 'invalid email'});
  }

  if (!schema.validate(req.body.password)) {                  // Test la validité du mot de passe avec password-validator
    return res.status(400).json({error: schema.validate(req.body.password, {details: true})});  // Renvoie un tableau avec les détails des critères non respectés sur le mot de passe

  } else {
    bcrypt.hash(req.body.password, 10)  // Hashage du mot de passe avec bcrypt
        .then(hash => {
            const user = new User({     // Création du nouveau user
                ...req.body,            // Copie tous les éléments de la requête dans la nouvelle instance
                password: hash          // Password issu du hashage
            });
            user.save()                 // Sauvegarde du user
                .then(() => res.status(201).json({message: 'User created'}))  // Création de ressource
                .catch(error => res.status(500).json({error}))  // Erreur serveur
        })
        .catch(error => res.status(500).json({error})); // Erreur serveur
  }
    
};

// Middleware de connection d'un user existant
exports.login = (req, res) => {
    User.findOne({email: req.body.email}) // Recherche dans la base de données de l'email de la requête
      .then(user => {
        if (!user) {
          return res.status(401).json({error: `Cet utilisateur n'existe pas`}); // Message d'erreur si le user n'existe pas dans la base de données (non autorisé)
        }
        bcrypt.compare(req.body.password, user.password) // Comparaison du password contenu dans la requête avec le hash de la base de données
          .then(valid => {
            if (!valid) {
              return res.status(401).json({error: 'Mot de passe invalide'}); // Message d'erreur si le mot de passe ne correspond pas (non autorisé)
            }
            res.status(200).json({                // Sinon renvoit un objet json avec l'userId et un token d'authentification
              userId: user._id,
              token: jwt.sign(                    // Création du token avec jsonwebtoken à partir de l'userId avec une clé d'encodage et un délai d'expiration
                {userId: user._id, isAdmin: user.isAdmin},
                process.env.TOKEN_PASSWORD,
                {expiresIn: '24h'}
              )
            });
          })
          .catch(error => res.status(500).json({error})); // Erreur serveur
      })
      .catch(error => res.status(500).json({error}));     // Erreur serveur
  };

// Récupération de tous les utilisateurs
exports.getAllUsers = (req, res) => {
    User.find()
      .then(users => res.status(200).json(users))         // Requête ok
      .catch(error => res.status(400).json({ error }));     // Mauvaise requête
};

// Récupération d'un utilisateur
exports.getOneUser = (req, res) => {
    User.findOne({ _id: req.params.id })
      .then(user => res.status(200).json(user))         // Requête ok
      .catch(error => res.status(404).json({ error }));   // Ressource non trouvée
};

// Modification d'un utilisateur
exports.modifyUser = (req, res) => {
    User.findOne({ _id: req.params.id })                 // Recherche du user avec l'id
      .then (user => {

        if (user._id == req.token.userId || req.token.isAdmin) {           // Test si le userId du token correspond à celui du user à modifier ou si c'est le token d'un administrateur

            if (req.file) {                                 // Test si présence d'un fichier dans la requête

                if (user.imageUrl !== '../../frontend/img/default-avatar.png') {    // Test si l'image est différente de celle créée par défaut pour la retrouver et la supprimer

                    let filename = user.imageUrl.split('/images/')[1];   // Récupération du nom du fichier
                    fs.unlink(`images/${filename}`, () => {                 // Suppression du fichier dans le dossier images
                        const userObject = {                                 // Création du nouvel objet user
                            ...JSON.parse(req.body.user),                      // Conversion du corps de la requête en objet json
                            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`  // Mise à jour de l'url de la nouvelle image
                        }
                        User.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id }) // Récupère le user avec l'id passé en paramètre et la remplace par le nouvel objet user créé auquel on rajoute le même id
                        .then(() => res.status(200).json({ message: 'User modified'})) // Requête ok
                        .catch(error => res.status(400).json({ error }));               // Mauvaise requête
                    })

                } else {                                                // Si l'image n'est pas celle par défaut
                    const userObject = {                                 // Création du nouvel objet user
                        ...JSON.parse(req.body.user),                      // Conversion du corps de la requête en objet json
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`  // Mise à jour de l'url de la nouvelle image
                    }
                    User.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id }) // Récupère le user avec l'id passé en paramètre et la remplace par le nouvel objet user créé auquel on rajoute le même id
                    .then(() => res.status(200).json({ message: 'User modified'})) // Requête ok
                    .catch(error => res.status(400).json({ error }));               // Mauvaise requête
                }
            

            } else {                                                                          // Si pas de fichier dans la requête
            User.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })    // Rempacement par le corps de la requête
              .then(() => res.status(200).json({ message: 'User modified'})) // Requête ok
              .catch(error => res.status(400).json({ error }));               // Mauvaise requête
          }

        } else {                                  // Si l'utilisateur n'est pas celui qui a créé le user
          if (req.file) {                         // Si présence d'un fichier dans la requête
            functions.removeImageFile(req, res);  // Supprime le fichier crée inutilement par multer et renvoie un message d'erreur
          } else {                                // Si absence de fichier dans la requête
            res.status(403).json({ error: "Unauthorized request" });    // Requête non autorisée
          }          
        }
      })
      .catch(error => res.status(404).json({ error }));   // Ressource non trouvée
};

// Suppression d'un utilisateur
exports.deleteUser = (req, res) => {
    User.findOne({_id: req.params.id})                   // Recherche du user avec l'id
    .then (user => {
      if (user._id == req.token.userId || req.token.isAdmin) {           // Test si le userId du token correspond à celui du user à modifier ou si c'est le token d'un administrateur
        let filename = user.imageUrl.split('/images/')[1];   // Récupération du nom du fichier
        fs.unlink(`images/${filename}`, () => {                 // Suppression du fichier dans le dossier images
          User.deleteOne({_id: req.params.id})                 // Suppression du user
            .then(() => res.status(200).json({ message : "User deleted"})) // Requête ok
            .catch(error => res.status(400).json({error}));                 // Mauvaise requête
        })
      } else {
        res.status(403).json({ error: "Unauthorized request" });
      }
    })
    .catch(error => res.status(404).json({ error }));   // Ressource non trouvée
};