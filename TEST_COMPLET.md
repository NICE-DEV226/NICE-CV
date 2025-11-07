# ✅ Test Complet - NICE-CV

## 🎉 Système d'Authentification Complet

Votre application est maintenant complètement fonctionnelle avec :
- ✅ Google OAuth
- ✅ Email/Password
- ✅ Tokens JWT
- ✅ Sauvegarde de CVs
- ✅ MongoDB

## 🧪 Test Complet en 5 Étapes

### Étape 1 : Déconnexion Complète

1. Ouvrez la console (F12)
2. Tapez :
   ```javascript
   localStorage.clear();
   location.reload();
   ```

### Étape 2 : Inscription

**Option A : Avec Google**
1. http://localhost:3000/auth/signup
2. Cliquez sur "Continuer avec Google"
3. Choisissez votre compte
4. ✅ Redirection vers dashboard

**Option B : Avec Email**
1. http://localhost:3000/auth/signup
2. Remplissez :
   - Nom : Jean Dupont
   - Email : test@example.com
   - Mot de passe : test123
3. Cliquez sur "Créer mon compte"
4. ✅ Redirection vers dashboard

### Étape 3 : Vérifier le Token

1. Ouvrez la console (F12)
2. Tapez :
   ```javascript
   console.log("User:", JSON.parse(localStorage.getItem("user")));
   console.log("Token:", localStorage.getItem("token"));
   ```
3. ✅ Vous devriez voir votre utilisateur et un token JWT

### Étape 4 : Créer un CV

1. Dans le dashboard, cliquez sur "Créer un nouveau CV"
2. Remplissez le formulaire :
   - Titre du CV : "Mon CV Test"
   - Nom complet : Jean Dupont
   - Email : jean@example.com
   - Téléphone : 06 12 34 56 78
   - Adresse : Paris, France
   - Poste recherché : Développeur Web
   - Description : "Développeur passionné..."

3. Ajoutez une expérience :
   - Entreprise : Google
   - Poste : Développeur
   - Dates : 2020 - 2023
   - Description : "Développement d'applications..."

4. Cliquez sur "Sauvegarder le CV"
5. ✅ Message de succès + confettis !
6. ✅ Redirection vers dashboard

### Étape 5 : Vérifier dans MongoDB

1. Allez sur [MongoDB Atlas](https://cloud.mongodb.com/)
2. Cliquez sur "Browse Collections"
3. Base : `nice-cv`
4. Collection : `CV`
5. ✅ Vous devriez voir votre CV sauvegardé !

## 🔍 Vérifications

### Vérifier l'Authentification

```javascript
// Dans la console (F12)
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

console.log("Authentifié:", !!user && !!token);
console.log("User ID:", user?.id);
console.log("Email:", user?.email);
console.log("Plan:", user?.plan);
console.log("CVs créés:", user?.cvCount);
```

### Vérifier le Token JWT

```javascript
// Décoder le token (sans vérification)
const token = localStorage.getItem("token");
const parts = token.split('.');
const payload = JSON.parse(atob(parts[1]));
console.log("Token payload:", payload);
```

### Vérifier l'API

```javascript
// Tester l'API de sauvegarde
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

fetch("/api/cv/save", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
  body: JSON.stringify({
    userId: user.id,
    title: "Test CV",
    personalDetails: {
      fullName: "Test User",
      email: "test@test.com"
    },
    experiences: [],
    educations: [],
    languages: [],
    skills: [],
    hobbies: [],
    theme: "light",
    template: "classic",
    isDraft: false
  })
})
.then(res => res.json())
.then(data => console.log("Résultat:", data))
.catch(err => console.error("Erreur:", err));
```

## 🐛 Dépannage

### Erreur "Non authentifié"

1. Vérifiez que le token existe :
   ```javascript
   console.log(localStorage.getItem("token"));
   ```

2. Si null, reconnectez-vous :
   - Déconnexion
   - Connexion avec Google ou email
   - Le token sera créé automatiquement

### Erreur "Limite de CV atteinte"

Vous avez créé 3 CVs (limite gratuite). Options :
1. Supprimer des CVs dans MongoDB
2. Passer à Premium (à implémenter)
3. Modifier `maxCvs` dans MongoDB

### Erreur "Données manquantes"

Vérifiez que vous avez rempli :
- Titre du CV
- Informations personnelles (au minimum nom et email)

### Erreur MongoDB

```bash
# Tester la connexion
npm run test:db

# Vérifier DATABASE_URL
cat .env.local | grep DATABASE_URL
```

## 📊 Résultats Attendus

### Après Inscription
```
✅ User créé dans MongoDB
✅ Token JWT généré
✅ Redirection vers /dashboard
✅ Nom affiché en haut à droite
✅ Statistiques : 0 CV créés, 3 disponibles
```

### Après Création de CV
```
✅ CV sauvegardé dans MongoDB
✅ cvCount incrémenté (0 → 1)
✅ Confettis affichés
✅ Message de succès
✅ Redirection vers /dashboard
✅ CV visible dans la liste (à implémenter)
```

### Dans MongoDB
```
Collection User:
{
  _id: ObjectId("..."),
  email: "votre@email.com",
  name: "Votre Nom",
  plan: "FREE",
  cvCount: 1,
  maxCvs: 3,
  createdAt: ISODate("..."),
  ...
}

Collection CV:
{
  _id: ObjectId("..."),
  userId: ObjectId("..."),
  title: "Mon CV Test",
  personalDetails: {...},
  experiences: [...],
  theme: "cupcake",
  template: "classic",
  createdAt: ISODate("..."),
  ...
}
```

## 🎯 Prochaines Étapes

1. ✅ Authentification complète (terminée !)
2. ✅ Sauvegarde de CVs (terminée !)
3. 📋 Afficher les CVs dans le dashboard
4. ✏️ Modifier un CV existant
5. 🗑️ Supprimer un CV
6. 📥 Export PDF
7. 💳 Paiements Stripe
8. 🚀 Déploiement Vercel

## 🎉 Félicitations !

Votre application NICE-CV est maintenant complètement fonctionnelle avec :
- Authentification Google OAuth + Email/Password
- Système de tokens JWT sécurisé
- Sauvegarde de CVs dans MongoDB
- Interface moderne et professionnelle

**Prêt à créer des CVs ! 🚀**
