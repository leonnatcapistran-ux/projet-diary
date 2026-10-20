<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PageController extends Controller
{
    public function history(): JsonResponse
    {
        return response()->json([
            'hero' => [
                'eyebrow' => 'Diary Madagascar',
                'title' => 'Une maison malagasy tournee vers le monde',
                'subtitle' => 'Nous valorisons les produits et savoir-faire de Madagascar avec une approche exigeante de la qualite, de la tracabilite et de la relation commerciale.',
            ],
            'pillars' => [
                [
                    'title' => 'Authenticite',
                    'description' => 'Nous travaillons avec des filieres qui respectent l origine des produits, les pratiques locales et la singularite des terroirs malagasy.',
                ],
                [
                    'title' => 'Exigence',
                    'description' => 'Chaque lot est selectionne avec attention pour garantir un niveau de qualite compatible avec des attentes professionnelles et export.',
                ],
                [
                    'title' => 'Relation durable',
                    'description' => 'Nous privilegions des collaborations de confiance, utiles autant a nos partenaires producteurs qu a nos clients.',
                ],
            ],
            'timeline' => [
                [
                    'year' => '2019',
                    'title' => 'Structuration de la filiere',
                    'description' => 'Mise en place des premiers partenariats de sourcing et de collecte avec des acteurs locaux.',
                ],
                [
                    'year' => '2023',
                    'title' => 'Montée en gamme',
                    'description' => 'Renforcement des procedures de controle qualite, de tri et de presentation commerciale.',
                ],
                [
                    'year' => '2026',
                    'title' => 'Acceleration export',
                    'description' => 'Preparation d un catalogue plus lisible pour les acheteurs, distributeurs et partenaires internationaux.',
                ],
            ],
        ]);
    }

    public function engagements(): JsonResponse
    {
        return response()->json([
            'hero' => [
                'eyebrow' => 'Qualite & transparence',
                'title' => 'Nos engagements',
                'subtitle' => 'Diary Madagascar structure son offre autour d engagements concrets de qualite, de tracabilite et d accompagnement commercial.',
            ],
            'engagements' => [
                [
                    'title' => 'Traçabilité',
                    'description' => 'Nous documentons l origine des produits et la chaine de traitement pour offrir une lecture claire aux partenaires commerciaux.',
                ],
                [
                    'title' => 'Controle qualite',
                    'description' => 'Nous appliquons des verifications sur la selection, l etat visuel, le conditionnement et la coherence des lots.',
                ],
                [
                    'title' => 'Transparence',
                    'description' => 'Nous preferons des informations commerciales claires, realistes et compréhensibles plutot qu un discours flou.',
                ],
                [
                    'title' => 'Reactivite',
                    'description' => 'Les demandes de devis et prises de contact sont traitees avec un cadre de reponse simple et suivi.',
                ],
            ],
        ]);
    }

    public function contact(Request $request): JsonResponse
    {
        $user = $request->user();
        $fullName = trim(implode(' ', array_filter([
            $user?->prenom,
            $user?->nom,
        ])));
        $productName = trim((string) $request->query('produit', ''));

        $subject = $productName !== '' ? 'demande_produit' : 'autre';
        $message = $productName !== ''
            ? sprintf("Bonjour,\n\nJe souhaite recevoir plus d informations et un devis pour le produit : %s.\n\nMerci.", $productName)
            : '';

        return response()->json([
            'contactInfo' => [
                'email' => 'contact@diarymadagascar.com',
                'telephone' => '+261 34 05 077 55',
                'whatsapp' => '+261 34 05 077 55',
                'address' => 'Antananarivo, Madagascar',
                'hours' => 'Lun - Ven, 8h - 17h',
                'response_time' => 'Reponse sous 24 a 48h',
            ],
            'subjectOptions' => [
                ['value' => 'partenariat', 'label' => 'Partenariat'],
                ['value' => 'demande_produit', 'label' => 'Demande produit'],
                ['value' => 'livraison', 'label' => 'Livraison'],
                ['value' => 'autre', 'label' => 'Autre'],
            ],
            'prefill' => [
                'nom' => $fullName,
                'email' => $user?->email ?? '',
                'sujet' => $subject,
                'message' => $message,
                'produit' => $productName,
            ],
        ]);
    }
}
