<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Facture pro forma {{ $facture->numero_facture }}</title>
    <style>
        body { font-family: DejaVu Sans, Arial, sans-serif; color: #17352d; font-size: 12px; }
        .container { width: 100%; margin: 0 auto; padding: 20px; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
        .logo { font-size: 22px; font-weight: bold; letter-spacing: 2px; color: #17352d; }
        .muted { color: #66756f; }
        .proforma {
            display: inline-block;
            font-size: 28px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 16px;
            color: #b88a12;
        }
        .section { margin-bottom: 16px; }
        .title { font-size: 16px; font-weight: bold; margin-bottom: 8px; color: #17352d; }
        .grid-two { width: 100%; margin-bottom: 16px; }
        .grid-two td { vertical-align: top; width: 50%; padding-right: 16px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 8px; border-bottom: 1px solid #e4ddd0; text-align: left; }
        th { background: #f8f3e8; font-weight: bold; color: #17352d; }
        .totals { margin-top: 16px; width: 100%; }
        .totals td { padding: 4px 8px; }
        .total-strong { font-weight: bold; font-size: 14px; color: #17352d; }
        .badge { display: inline-block; padding: 2px 8px; background: #17352d; color: #fff; border-radius: 999px; font-size: 10px; }
        .amount-words { margin-top: 14px; padding: 10px 12px; background: #f8f3e8; border: 1px solid #e4ddd0; }
        .amount-words strong { display: block; margin-bottom: 4px; color: #17352d; }
        .note { font-size: 10px; color: #66756f; margin-top: 18px; }
    </style>
</head>
<body>
@php
    $totalTtc = (float) $facture->montant_ttc;
    $euros = (int) floor($totalTtc);
    $centimes = (int) round(($totalTtc - $euros) * 100);

    if ($centimes === 100) {
        $euros++;
        $centimes = 0;
    }

    if (class_exists(\NumberFormatter::class)) {
        $formatter = new \NumberFormatter('fr_FR', \NumberFormatter::SPELLOUT);
        $eurosLibelle = $formatter->format($euros);

        if ($centimes > 0) {
            $centimesLibelle = $formatter->format($centimes) . ' centime' . ($centimes > 1 ? 's' : '');
            $montantEnLettres = $eurosLibelle . ' et ' . $centimesLibelle;
        } else {
            $montantEnLettres = $eurosLibelle;
        }
    } else {
        $montantEnLettres = number_format($totalTtc, 2, ',', ' ') . ' euros';
    }
@endphp
<div class="container">
    <div class="header">
        <div>
            <div class="proforma">Facture pro forma</div>
            <div class="logo">DIARY</div>
            <div class="muted">Madagascar - Export international</div>
        </div>
        <div>
            <div><strong>Reference</strong> {{ $facture->numero_facture }}</div>
            <div class="muted">Date : {{ optional($facture->date_emission)->format('Y-m-d H:i') }}</div>
        </div>
    </div>

    <table class="grid-two">
        <tr>
            <td>
                <div class="title">Client</div>
                <div>{{ $user->prenom ?? '' }} {{ $user->nom ?? '' }}</div>
                <div class="muted">{{ $user->email ?? '' }}</div>
                <div class="muted">Telephone : {{ $commande->num_telephone ?? '-' }}</div>
                <div class="muted">Lieu de livraison : {{ $commande->adresse_livraison ?? '-' }}</div>
                <div class="muted">Pays de livraison : {{ $commande->pays_livraison ?? '-' }}</div>
            </td>
            <td>
                <div class="title">Diary</div>
                <div class="muted">NIF : 000 000 0000</div>
                <div class="muted">STAT : 00000 00 00000 00000</div>
                <div class="muted">RCS : 00000 0000 00000</div>
                <div class="muted">Mail : contact@diary-madagascar.com</div>
                <div class="muted">Tel : +261 34 05 077 55</div>
            </td>
        </tr>
    </table>

    <div class="section">
        <div class="title">Commande</div>
        <div>Numero : <strong>{{ $commande->id_commande }}</strong></div>
        <div>Origine : <span class="badge">{{ $commande->pays_origine }}</span></div>
        <div>Transport : {{ $commande->mode_transport ?? '-' }}</div>
        <div>Date de livraison estimee : {{ $commande->date_livraison_estimee ? ($commande->date_livraison_estimee instanceof \DateTime ? $commande->date_livraison_estimee->format('Y-m-d') : \Carbon\Carbon::parse($commande->date_livraison_estimee)->format('Y-m-d')) : '-' }}</div>
    </div>

    <div class="section">
        <div class="title">Articles</div>
        <table>
            <thead>
            <tr>
                <th>Produit</th>
                <th>Quantite (kg)</th>
                <th>Prix unitaire</th>
                <th>Sous-total</th>
            </tr>
            </thead>
            <tbody>
            @foreach($commande->lignes as $ligne)
                <tr>
                    <td>{{ $ligne->produit->nom ?? ('Produit #' . $ligne->id_produit) }}</td>
                    <td>{{ $ligne->quantite_kg }}</td>
                    <td>{{ number_format((float) $ligne->prix_unitaire, 2, '.', ' ') }} EUR</td>
                    <td>{{ number_format((float) $ligne->sous_total, 2, '.', ' ') }} EUR</td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>

    <table class="totals">
        <tr>
            <td class="muted">Montant HT</td>
            <td>{{ number_format((float) $facture->montant_ht, 2, '.', ' ') }} EUR</td>
        </tr>
        <tr>
            <td class="muted">TVA ({{ number_format((float) $facture->taux_tva, 2, '.', ' ') }}%)</td>
            <td>{{ number_format((float) $facture->montant_tva, 2, '.', ' ') }} EUR</td>
        </tr>
        <tr>
            <td class="muted">Frais de transport</td>
            <td>{{ number_format((float) $facture->cout_transport, 2, '.', ' ') }} EUR</td>
        </tr>
        <tr>
            <td class="total-strong">Total TTC</td>
            <td class="total-strong">{{ number_format((float) $facture->montant_ttc, 2, '.', ' ') }} EUR</td>
        </tr>
    </table>

    <div class="amount-words">
        <strong>Arrete la presente facture pro forma a la somme de :</strong>
        {{ ucfirst($montantEnLettres) }}
    </div>

    <div class="note">
        Les frais de dernier kilometre sont a la charge du destinataire.
    </div>
</div>
</body>
</html>
