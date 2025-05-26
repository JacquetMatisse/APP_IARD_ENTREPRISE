# Application de Gestion de Devis IARD Entreprise

Ce projet est une application web permettant de créer, gérer et simuler des devis pour des assurances IARD destinées aux entreprises. Il est composé d'un backend développé avec le framework Django et d'un frontend développé avec React.

## Fonctionnalités

- Création de nouveaux devis avec un formulaire détaillé.
- Liste des devis créés avec possibilité de recherche rapide.
- Génération de documents Word et PDF pour chaque devis avec les informations de tarification.
- Affichage dynamique des champs de garantie et de franchise selon le type de garantie choisi (DO seule, TRC seule, Duo).
- Calcul automatique de la prime seule en fonction du taux et du coût de l'ouvrage.

## Prérequis

- Python
- django et les dépandances
  pip install django djangorestframework python-docx docx2pdf
  pip install django-cors-headers

## Lancement du Projet

1. Backend

Accèder au dossier 'backend'

Appliquer les migrations de la base de données :
python manage.py makemigrations devis
python manage.py migrate

Lancer le serveur de développement Django :

    python manage.py runserver

2.Frontend

Dans un nouveau terminal accéder au dossier frontend

Installer les dépendances Node.js :

    npm install

Lancer l'application React :

    npm start

---
