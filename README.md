# Feedback System 

## Description

Ce projet est une API de gestion d’un système de feedback pour des produits numériques, développée avec NestJS, GraphQL et MySQL.  
Chaque utilisateur peut laisser une note et un commentaire sur un produit après l’avoir utilisé. Ce système permet de collecter et exploiter ces avis de manière automatisée.

---

## Technologies utilisées

- Node.js & NestJS (framework backend)
- GraphQL (API flexible pour les requêtes et mutations)
- TypeORM (ORM pour la gestion de la base de données MySQL)
- MySQL (base de données relationnelle)
- Apollo Server (serveur GraphQL intégré à NestJS)

---

## Architecture

Le projet suit une architecture modulaire typique NestJS :

- **UserModule** : gestion des utilisateurs (entité, service, resolver)
- **ProductModule** : gestion des produits
- **FeedbackModule** : gestion des avis laissés par les utilisateurs sur les produits
- **AppModule** : module principal intégrant les autres modules

---

## Installation et configuration

### Prérequis

- Node.js (version 18 ou supérieure recommandée)
- MySQL (serveur local ou distant)
- NestJS CLI (optionnel) : `npm i -g @nestjs/cli`

### Étapes

1. Cloner ce dépôt :

   ```bash
   git clone https://github.com/ton-utilisateur/feedback-system.git
   cd feedback-system
Installer les dépendances :

npm install
Configurer la base de données MySQL :

Créer une base de données feedback_db (ou un autre nom, à adapter dans la config)

Exemple via CLI MySQL :


CREATE DATABASE feedback_db;
Modifier le fichier src/app.module.ts ou un fichier de configuration pour renseigner les accès MySQL :

TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'votre_mot_de_passe',
  database: 'feedback_db',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // A désactiver en production
}),
Lancer le serveur en mode développement :

npm run start:dev
Accéder au playground GraphQL à l’adresse :

http://localhost:3000/graphql
Schéma GraphQL
Types principaux

type User {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
  phone: String
  feedbacks: [Feedback]
}

type Product {
  id: ID!
  name: String!
  description: String!
  feedbacks: [Feedback]
  averageRating: Float
}

type Feedback {
  id: ID!
  note: Int!
  comment: String
  user: User
  product: Product
}
Queries

# Récupérer tous les produits
getAllProducts: [Product]

# Récupérer les feedbacks d'un produit
getProductFeedback(productId: ID!): [Feedback]

# Récupérer les feedbacks d'un utilisateur
getUserFeedback(userId: ID!): [Feedback]

# Récupérer la note moyenne d'un produit
getAverageRating(productId: ID!): Float
Mutations

# Soumettre un feedback
submitFeedback(
  userId: ID!,
  productId: ID!,
  note: Int!,
  comment: String
): Feedback

# CRUD utilisateurs, produits (à ajouter selon besoin)
Exemples d’utilisation
Ajouter un feedback

mutation {
  submitFeedback(userId: 1, productId: 2, note: 5, comment: "Très bon produit !") {
    id
    note
    comment
    user {
      firstName
      lastName
    }
    product {
      name
    }
  }
}
Obtenir les feedbacks d’un produit

query {
  getProductFeedback(productId: 2) {
    id
    note
    comment
    user {
      firstName
      email
    }
  }
}
Obtenir la note moyenne d’un produit

query {
  getAverageRating(productId: 2)
}
Structure du projet

src/
├── app.module.ts
├── user/
│   ├── user.entity.ts
│   ├── user.module.ts
│   ├── user.service.ts
│   └── user.resolver.ts
├── product/
│   ├── product.entity.ts
│   ├── product.module.ts
│   ├── product.service.ts
│   └── product.resolver.ts
├── feedback/
│   ├── feedback.entity.ts
│   ├── feedback.module.ts
│   ├── feedback.service.ts
│   └── feedback.resolver.ts