<?php

namespace App\Support;

class ValidationMessageCatalog
{
    public static function authLogin(): array
    {
        return [
            'email.required' => 'Veuillez renseigner votre adresse e-mail.',
            'email.email' => 'Entrez une adresse e-mail valide.',
            'password.required' => 'Veuillez saisir votre mot de passe.',
        ];
    }

    public static function authLoginFailed(): string
    {
        return 'Verifiez votre adresse e-mail ou votre mot de passe.';
    }

    public static function authRegister(): array
    {
        return [
            'nom.required' => 'Veuillez renseigner votre nom.',
            'nom.max' => 'Votre nom est trop long.',
            'prenom.required' => 'Veuillez renseigner votre prenom.',
            'prenom.max' => 'Votre prenom est trop long.',
            'email.required' => 'Veuillez renseigner votre adresse e-mail.',
            'email.email' => 'Entrez une adresse e-mail valide.',
            'email.unique' => 'Cette adresse e-mail est deja utilisee.',
            'password.required' => 'Choisissez un mot de passe.',
            'password.confirmed' => 'La confirmation du mot de passe ne correspond pas.',
            'pays_residence.required' => 'Indiquez votre pays de residence.',
            'type_client.required' => 'Choisissez votre type de compte.',
            'type_client.in' => 'Le type de compte choisi est invalide.',
            'telephone.max' => 'Le numero de telephone est trop long.',
            'adresse.max' => 'L\'adresse renseignee est trop longue.',
            'entreprise.max' => 'Le nom de l\'entreprise est trop long.',
            'numero_tva.max' => 'Le numero de TVA est trop long.',
        ];
    }

    public static function storeCommande(): array
    {
        return [
            'nom.required' => 'Votre nom est obligatoire pour envoyer la commande.',
            'nom.min' => 'Votre nom semble trop court.',
            'prenom.required' => 'Votre prenom est obligatoire pour envoyer la commande.',
            'prenom.min' => 'Votre prenom semble trop court.',
            'items.required' => 'Ajoutez au moins un produit avant d\'envoyer la commande.',
            'items.min' => 'Ajoutez au moins un produit avant d\'envoyer la commande.',
            'items.*.id_produit.required' => 'Un produit de votre panier est introuvable.',
            'items.*.id_produit.integer' => 'Un produit de votre panier est invalide.',
            'items.*.quantite_kg.required' => 'Chaque produit doit avoir une quantite valide.',
            'items.*.quantite_kg.min' => 'La quantite d\'un produit doit etre superieure a zero.',
            'adresse_livraison.required' => 'Veuillez indiquer une adresse de livraison.',
            'adresse_livraison.min' => 'Votre adresse de livraison est trop courte.',
            'pays_livraison.required' => 'Veuillez indiquer le pays de livraison.',
            'pays_livraison.min' => 'Le pays de livraison semble incomplet.',
            'num_telephone.min' => 'Le numero de telephone semble incomplet.',
            'email_valide.email' => 'Entrez une adresse e-mail valide pour le suivi.',
            'mode_transport.in' => 'Le mode de transport choisi est invalide.',
            'type_achat.in' => 'Le type d\'achat choisi est invalide.',
        ];
    }

    public static function storeMessageContact(): array
    {
        return [
            'nom.required' => 'Veuillez indiquer votre nom.',
            'nom.max' => 'Votre nom est trop long.',
            'email.required' => 'Votre adresse e-mail est obligatoire.',
            'email.email' => 'Entrez une adresse e-mail valide.',
            'email.max' => 'Votre adresse e-mail est trop longue.',
            'sujet.required' => 'Choisissez le sujet de votre demande.',
            'sujet.in' => 'Le sujet choisi est invalide.',
            'message.required' => 'Ecrivez votre message avant de l\'envoyer.',
            'phone.max' => 'Le numero de telephone est trop long.',
            'company.max' => 'Le nom de l\'entreprise est trop long.',
        ];
    }

    public static function storeAvis(): array
    {
        return [
            'id_produit.required' => 'Le produit a evaluer est introuvable.',
            'id_produit.exists' => 'Le produit selectionne n\'existe pas.',
            'id_commande.required' => 'La commande liee a cet avis est introuvable.',
            'id_commande.exists' => 'La commande selectionnee n\'existe pas.',
            'note.required' => 'Veuillez attribuer une note avant d\'envoyer votre avis.',
            'note.min' => 'La note minimale est de 1 sur 5.',
            'note.max' => 'La note maximale est de 5 sur 5.',
        ];
    }

    public static function storeProduit(): array
    {
        return [
            'nom.required' => 'Le nom du produit est obligatoire.',
            'nom.max' => 'Le nom du produit est trop long.',
            'categorie.required' => 'Choisissez ou saisissez une categorie.',
            'categorie.max' => 'Le nom de la categorie est trop long.',
            'stock_disponible.required' => 'Le stock disponible est obligatoire.',
            'stock_disponible.numeric' => 'Le stock doit etre un nombre.',
            'stock_disponible.min' => 'Le stock ne peut pas etre negatif.',
            'poids_unitaire_kg.required' => 'Le poids unitaire est obligatoire.',
            'poids_unitaire_kg.numeric' => 'Le poids unitaire doit etre un nombre.',
            'poids_unitaire_kg.min' => 'Le poids unitaire doit etre superieur a zero.',
            'prix_unitaire_kg.numeric' => 'Le prix au kilo doit etre un nombre.',
            'prix_unitaire_kg.min' => 'Le prix au kilo ne peut pas etre negatif.',
            'image.image' => 'Le fichier choisi doit etre une image valide.',
            'image.max' => 'L\'image est trop lourde. La taille maximale est de 4 Mo.',
            'statut.required' => 'Le statut du produit est obligatoire.',
            'statut.in' => 'Le statut du produit est invalide.',
        ];
    }

    public static function updateProduit(): array
    {
        return [
            'nom.max' => 'Le nom du produit est trop long.',
            'categorie.max' => 'Le nom de la categorie est trop long.',
            'stock_disponible.numeric' => 'Le stock doit etre un nombre.',
            'stock_disponible.min' => 'Le stock ne peut pas etre negatif.',
            'poids_unitaire_kg.numeric' => 'Le poids unitaire doit etre un nombre.',
            'poids_unitaire_kg.min' => 'Le poids unitaire doit etre superieur a zero.',
            'prix_unitaire_kg.numeric' => 'Le prix au kilo doit etre un nombre.',
            'prix_unitaire_kg.min' => 'Le prix au kilo ne peut pas etre negatif.',
            'image.image' => 'Le fichier choisi doit etre une image valide.',
            'image.max' => 'L\'image est trop lourde. La taille maximale est de 4 Mo.',
            'statut.in' => 'Le statut du produit est invalide.',
        ];
    }

    public static function storeArticle(): array
    {
        return [
            'titre.required' => 'Le titre de l\'article est obligatoire.',
            'titre.max' => 'Le titre de l\'article est trop long.',
            'slug.required' => 'Le lien de l\'article est obligatoire.',
            'slug.alpha_dash' => 'Le lien de l\'article ne doit contenir que des lettres, chiffres et tirets.',
            'slug.unique' => 'Ce lien d\'article existe deja.',
            'extrait.max' => 'L\'extrait est trop long.',
            'contenu.required' => 'Le contenu de l\'article est obligatoire.',
            'image.image' => 'Le fichier choisi doit etre une image valide.',
            'image.max' => 'L\'image est trop lourde. La taille maximale est de 4 Mo.',
            'statut.required' => 'Choisissez un statut pour l\'article.',
            'statut.in' => 'Le statut choisi pour l\'article est invalide.',
            'date_publication.date' => 'La date de publication est invalide.',
            'categorie_id.exists' => 'La categorie selectionnee n\'existe pas.',
        ];
    }

    public static function updateArticle(): array
    {
        return self::storeArticle();
    }

    public static function storeCategorieArticle(): array
    {
        return [
            'nom.required' => 'Le nom de la categorie est obligatoire.',
            'nom.max' => 'Le nom de la categorie est trop long.',
            'nom.unique' => 'Cette categorie existe deja.',
            'description.max' => 'La description de la categorie est trop longue.',
        ];
    }

    public static function updateCategorieArticle(): array
    {
        return self::storeCategorieArticle();
    }

    public static function updateAvis(): array
    {
        return [
            'statut.required' => 'Choisissez le statut de l\'avis.',
            'statut.in' => 'Le statut choisi pour l\'avis est invalide.',
        ];
    }

    public static function updateCommande(): array
    {
        return [
            'statut.in' => 'Le statut choisi pour la commande est invalide.',
            'numero_suivi.max' => 'Le numero de suivi est trop long.',
            'date_livraison_estimee.date' => 'La date de livraison estimee est invalide.',
            'mode_transport.in' => 'Le mode de transport choisi est invalide.',
            'cout_transport.numeric' => 'Le cout de transport doit etre un nombre.',
            'cout_transport.min' => 'Le cout de transport ne peut pas etre negatif.',
            'montant_ht.numeric' => 'Le montant hors taxes doit etre un nombre.',
            'montant_ht.min' => 'Le montant hors taxes ne peut pas etre negatif.',
            'pays_livraison.max' => 'Le pays de livraison est trop long.',
            'poids_total_kg.numeric' => 'Le poids total doit etre un nombre.',
            'poids_total_kg.min' => 'Le poids total ne peut pas etre negatif.',
        ];
    }

    public static function updateMessageContact(): array
    {
        return [
            'statut.required' => 'Choisissez le statut du message.',
            'statut.in' => 'Le statut choisi pour le message est invalide.',
        ];
    }

    public static function profileUpdate(): array
    {
        return [
            'nom.required' => 'Veuillez renseigner votre nom.',
            'nom.max' => 'Votre nom est trop long.',
            'prenom.required' => 'Veuillez renseigner votre prenom.',
            'prenom.max' => 'Votre prenom est trop long.',
            'email.required' => 'Veuillez renseigner votre adresse e-mail.',
            'email.email' => 'Entrez une adresse e-mail valide.',
            'email.unique' => 'Cette adresse e-mail est deja utilisee.',
        ];
    }

    public static function passwordUpdate(): array
    {
        return [
            'current_password.required' => 'Veuillez saisir votre mot de passe actuel.',
            'current_password.current_password' => 'Le mot de passe actuel ne correspond pas.',
            'password.required' => 'Choisissez un nouveau mot de passe.',
            'password.confirmed' => 'La confirmation du nouveau mot de passe ne correspond pas.',
        ];
    }

    public static function profileDelete(): array
    {
        return [
            'password.required' => 'Veuillez saisir votre mot de passe pour supprimer le compte.',
            'password.current_password' => 'Le mot de passe saisi ne correspond pas a votre compte.',
        ];
    }

    public static function adminSettings(): array
    {
        return [
            'email.required' => 'Veuillez renseigner une adresse e-mail.',
            'email.email' => 'Entrez une adresse e-mail valide.',
            'email.unique' => 'Cette adresse e-mail est deja utilisee.',
            'mot_de_passe.min' => 'Le nouveau mot de passe doit contenir au moins 6 caracteres.',
            'mot_de_passe.confirmed' => 'La confirmation du nouveau mot de passe ne correspond pas.',
        ];
    }
}
