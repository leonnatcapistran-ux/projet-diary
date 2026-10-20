## Démarrage Rapide

_Détails à compléter par les développeurs du projet._

1.  **Cloner le dépôt :**
    ```bash
    git clone [URL_DU_DÉPÔT]
    cd [NOM_DU_DOSSIER]
    ```
2.  **Installer les dépendances :**
    ```bash
    composer install
    npm install # Si utilisation de Vite/Mix/etc.
    ```
3.  **Configurer l'environnement :**
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```
    (Configurer les accès à la base de données dans le fichier `.env`)
4.  **Migrer la base de données :**
    ```bash
    php artisan migrate --seed # Utiliser --seed si des données initiales sont nécessaires
    ```
5.  **Lancer le serveur :**
    ```bash
    php artisan serve
    npm run dev
    ```
6.  Accéder à l'application via votre navigateur à l'adresse : `http://127.0.0.1:8000`

## Fiche produit : contenu des rubriques

La page `ProductDetail` affiche chaque rubrique à partir de son champ produit dédié :

| Rubrique                    | Champ utilisé                                             |
| --------------------------- | --------------------------------------------------------- |
| Région de production        | `origine_details`                                         |
| Type et qualité             | `categorie`, `calibre_variete`, `methode_extraction`      |
| Caractéristiques techniques | `certifications`, `poids_unitaire_kg`, `prix_unitaire_kg` |
| Conditionnement             | `conditionnement`                                         |
| Conservation                | `saisonnalite`                                            |
| Utilisation et application  | `utilisation`                                             |

La rubrique « Conservation » ne doit jamais utiliser le champ `description`. Chaque carte est affichée seulement lorsqu'au moins un de ses champs associés est renseigné.
