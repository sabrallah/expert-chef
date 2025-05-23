# Riad Salam - Site Web Restaurant Marocain

Un site web moderne et élégant pour un restaurant marocain traditionnel proposant des spécialités authentiques du Maroc.

## 🍽️ Aperçu du Projet

Riad Salam est un site web responsive conçu pour présenter l'authenticité de la cuisine marocaine traditionnelle. Le site met en valeur les plats typiques, l'ambiance du restaurant et permet aux clients de découvrir les spécialités et de faire des réservations.

## ✨ Fonctionnalités

- **Design Responsive** : Compatible avec tous les appareils (desktop, tablette, mobile)
- **Navigation Fluide** : Menu de navigation avec défilement smooth
- **Menu Interactif** : Présentation élégante des plats avec prix en dirhams (MAD)
- **Formulaire de Réservation** : Système de réservation en ligne avec validation
- **Animations Modernes** : Effets visuels et animations CSS
- **Thème Sombre** : Possibilité de basculer entre thème clair et sombre
- **Design Authentique** : Couleurs et typographies inspirées de l'art marocain

## 🎨 Design et Couleurs

- **Couleur Principale** : #d4af37 (Or/Doré) - évoque les couleurs traditionnelles marocaines
- **Couleur Secondaire** : #1a2332 (Bleu Marine Foncé) - élégance et sophistication
- **Typographie** : 
  - Amiri (serif) pour les titres - police arabe élégante
  - Open Sans (sans-serif) pour le contenu - lisibilité moderne

## 📱 Structure du Site

1. **Accueil** : Section hero avec présentation du restaurant
2. **Menu** : Catalogue complet des plats organisé par catégories
3. **Spécialités** : Mise en avant des plats signature
4. **À Propos** : Histoire du restaurant et valeurs
5. **Contact** : Informations de contact et formulaire de réservation

## 🍴 Menu Proposé

### Plats Principaux
- Couscous Royal (120 MAD)
- Tajine d'Agneau aux Pruneaux (95 MAD)
- Pastilla au Poulet (85 MAD)
- Tajine de Poisson Chermoula (110 MAD)
- Mechoui d'Agneau (130 MAD)

### Entrées & Salades
- Briouates au Fromage (35 MAD)
- Salade Marocaine (30 MAD)
- Zaalouk (25 MAD)

### Desserts & Thé
- Cornes de Gazelle (45 MAD)
- Thé à la Menthe (15 MAD)
- Chebakia (40 MAD)

## 🚀 Technologies Utilisées

- **HTML5** : Structure sémantique moderne
- **CSS3** : Animations, Flexbox, Grid, variables CSS
- **JavaScript ES6+** : Interactivité et animations
- **Font Awesome** : Icônes vectorielles
- **Google Fonts** : Typographies Amiri et Open Sans

## 📂 Structure des Fichiers

```
expert-chef/
│
├── index.html          # Page principale
├── styles.css          # Feuille de style principale
├── script.js           # Logique JavaScript
└── README.md          # Documentation du projet
```

## 🛠️ Installation et Utilisation

1. **Clonage du projet** :
   ```bash
   git clone [repository-url]
   cd expert-chef
   ```

2. **Ouverture du site** :
   - Ouvrir `index.html` dans un navigateur web
   - Ou utiliser un serveur local pour le développement

3. **Serveur local** (optionnel) :
   ```bash
   # Avec Python
   python -m http.server 8000
   
   # Avec Node.js (live-server)
   npx live-server
   ```

## 📱 Compatibilité

- **Navigateurs** : Chrome, Firefox, Safari, Edge (versions récentes)
- **Appareils** : Desktop, tablettes, smartphones
- **Résolutions** : Optimisé de 320px à 1920px+

## 🎯 Caractéristiques Techniques

### Performance
- Images optimisées avec lazy loading
- CSS et JS minifiés pour la production
- Animations hardware-accelerated

### Accessibilité
- Structure HTML sémantique
- Contrastes de couleurs respectés
- Navigation au clavier supportée

### SEO
- Métadonnées appropriées
- Structure de titres hiérarchique
- URLs conviviales

## 🔧 Personnalisation

### Modifier les Couleurs
Dans le fichier `styles.css`, ajustez les variables CSS :
```css
:root {
    --primary-color: #d4af37;
    --secondary-color: #1a2332;
    --accent-color: #f1c40f;
}
```

### Ajouter des Plats au Menu
Dans le fichier `index.html`, section `#menu` :
```html
<div class="menu-item">
    <div class="item-info">
        <h4>Nom du Plat</h4>
        <p>Description du plat</p>
    </div>
    <span class="price">Prix MAD</span>
</div>
```

### Modifier les Informations de Contact
Dans le fichier `index.html`, section `#contact` :
- Adresse
- Téléphone
- Email
- Horaires

## 🌟 Fonctionnalités Avancées

- **Formulaire de Réservation** : Validation côté client
- **Animation au Scroll** : Intersection Observer API
- **Navigation Mobile** : Menu hamburger responsive
- **Thème Sombre** : Toggle jour/nuit
- **Effet Parallax** : Légère animation de fond

## 📞 Support et Contact

Pour toute question ou suggestion concernant le site web :
- Email : contact@riadsalam.ma
- Téléphone : +212 5 24 43 21 87
- Adresse : Avenue Mohammed V, Quartier Gueliz, Marrakech, Maroc

## 📄 Licence

Ce projet est destiné à des fins éducatives et de démonstration. 
Tous droits réservés © 2025 Riad Salam.

---

**Note** : Ce site est une démonstration créée pour présenter un restaurant marocain fictif. Les prix et informations sont à titre d'exemple uniquement.
