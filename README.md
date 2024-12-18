# Projet de Gestion de stocks de magasins

## Description
Ce projet est une application intranet permettant de gérer les produits d'une base de données. Il offre les fonctionnalités suivantes :

- Visualisation de la liste de produits de chaque magasins.
- Modification et ajout des informations des produits via une interface utilisateur.
- Utilisation d'une interface utilisateur moderne avec PrimeNG.

## Prérequis
- Node.js (version 16 ou supérieure)
- Angular CLI (version 16 ou supérieure)

## Installation

1. Clonez ce dépôt :
   ```bash
   git clone https://github.com/Serhat1304/magasinApp
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Lancez le serveur de développement :
   ```bash
   npm start
   ```

4. Lancez le serveur Backend :
   ```bash
   npm run start:server
   ```

5. Accédez à l'application dans votre navigateur :
   ```
   http://localhost:4200
   ```

## Fonctionnalités

### Table des Produits (`TableProductComponent`)
- Affiche une liste des produits avec leurs catégories.
- Bouton pour modifier un produit (a conditions d'etre "admin" ou d'appartenir au magasins).

### Modification des Produits (`ModifArticleComponent`)
- Formulaire pour modifier le nom, la catégorie, le prix et la quantité.
- Validation des champs :
  - Nom : au moins 3 caractères.
  - Prix : supérieur ou égal à 0.
  - Quantité : supérieur ou égal à 1.
- Affichage d'un toast de succès après mise à jour.

### Notifications
- Utilisation de `MessageService` de PrimeNG pour afficher les messages de succès.

## Dépendances principales

- Angular
- PrimeNG
- RxJS
- TypeScript
- Json serveur
- Tailwind.css

## Scripts utiles

- `ng start` : Démarre le projet en mode développement.
- `ng start:server` : Lance le serveur JSON pour la base de données.

## Contributeurs
- CREUX Damien
- KUS Serhat
- ROMAN Mathieu
