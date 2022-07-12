// Import des packages
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Définition du schéma de données user avec mongoose
const userSchema = mongoose.Schema({
    firstname: {type: String, required: true, minlength: 3, trim: true},
    lastname: {type: String, required: true, minlength: 3, trim: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    imageUrl: {type: String, default: '../../frontend/img/default-avatar.png'},
    description: {type: String, default: '', maxlength: 1000, trim: true},
    isAdmin: {type: Boolean, default: false}
},
{
    timestamps: true
});

// Applique le plugin uniqueValidator au schéma pour que l'email soit unique
userSchema.plugin(uniqueValidator);

// Exporte le schéma en tant que modèle mongoose nommé User
module.exports = mongoose.model('User', userSchema);