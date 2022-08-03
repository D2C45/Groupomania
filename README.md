# Groupomania
# Créez un réseau social d’entreprise

## Description

Le projet consiste en la construction d'un réseau social interne pour les salariés de la société Groupomania.  
Le projet a été développé en utilisant les technologies suivantes : MongoDB / Express / React / Node
***

# Installation

## Prérequis

Pour lancer le projet, vous devez avoir Node.js installé sur votre machine.
***

## Etape 1. Clonage du projet

Ouvrez un terminal.
Depuis le dossier dans lequel vous souhaitez enregistrer le projet, clonez le repository du projet avec la commande :
<pre><code>git clone https://github.com/D2C45/Groupomania.git</code></pre>

## Etape 2. Création d'une base de données noSQL MongoDB

Rendez-vous sur le site de [MongoDb](https://account.mongodb.com/) et créez un compte.

Une fois le compte créé, créez votre base de données en veillant à la configurer de sorte à ce que l'utilisateur puisse exécuter l'application sur sa propre machine :
<pre>Network Access -> Allow access from anywhere</pre>

Importer dans votre base de données les collections users et posts si elles vous sont fournies.

## Etape 3. Installation de l'API

Depuis le dossier backend, à l'aide de votre terminal, installez les dépendances avec la commande :
<pre><code>npm install</code></pre>

## Etape 4. Configuration des variables d'environnement et du fichier .gitignore du backend

A la racine du dossier backend, créez un fichier .env dans lequel seront renseignés vos identifiants de connexion à MongoDB et les différentes chaînes de cryptage :

<pre><code>PORT = 5000
MONGODB_USER = identifiant de votre base de données
MONGODB_PASSWORD = mot de passe de votre base de données
MONGODB_CLUSTER_NAME = nom du cluster de votre base de données
MONGODB_DATABASE_NAME = nom de votre base de données
TOKEN_PASSWORD = clé d'encodage secrète pour le token</code></pre>

A la racine du dossier backend, créer un fichier .gitignore dans lequel vous placez les node modules, le fichier .env et le dossier images :
<pre><code>node_modules
.env
images</code></pre>

## Etape 5. Ajout du dossier images dans le backend

À la racine du dossier backend, ajoutez le dossier images.  
Le cas échéant, placez-y les images qui vous ont été fournies avec la base de données.

## Etape 6. Lancement de l'API

Avec le terminal, depuis le dossier backend, éxécutez la commande :
<pre><code>node server</code></pre>
Si tout se passe bien, les messages suivants apparaissent dans le terminal :
<pre><code>Listening on port 5000
Connected to MongoDB</code></pre>

## Etape 7. Installation du frontend

Depuis le dossier backend, à l'aide de votre terminal, installez les dépendances avec la commande :
<pre><code>npm install</code></pre>

## Etape 8. Configuration des variables d'environnement et du fichier .gitignore du frontend

A la racine du dossier frontend, créez un fichier .env en y copiant ceci :

<pre><code>REACT_APP_API_URL=http://localhost:5000/</code></pre>

A la racine du dossier frontend, créer un fichier .gitignore dans lequel vous placez les node modules et le fichier .env :
<pre><code>node_modules
.env</code></pre>

## Etape 9. Lancement de l'application

Avec le terminal, depuis le dossier frontend, éxécutez la commande :
<pre><code>npm start</code></pre>
Si tout se passe bien, votre navigateur va s'ouvrir et afficher l'application. Sinon, depuis votre navigateur, entrer l'adresse http://localhost:3000/.