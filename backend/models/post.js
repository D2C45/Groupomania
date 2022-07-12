// Import des packages
const mongoose = require('mongoose');

// Définition du schéma de données post avec mongoose
const postSchema = mongoose.Schema({
    postUserId: {type: String, required: true},
    message: {type: String, required: true, maxlength: 500, trim: true},
    imageUrl: {type: String},
    likersId: {type: [String], default: []},
    comments: {type: [{ commentUserId: String, text: String, timestamp: Number }], default: []}
})

// Exporte le schéma en tant que modèle mongoose nommé Post
module.exports = mongoose.model('Post', postSchema);