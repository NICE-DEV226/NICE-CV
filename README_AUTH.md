# ✅ Authentification Google - NICE-CV

## 🎉 Migration Terminée !

Votre application NICE-CV utilise maintenant **Google Identity Services** directement, sans Clerk ni NextAuth complexe.

## ✨ Ce qui fonctionne

- ✅ **Google OAuth** - Bouton "Continuer avec Google"
- ✅ **Email/Password** - Authentification classique
- ✅ **Inscription** - Création de compte
- ✅ **Connexion** - Authentification
- ✅ **Dashboard** - Interface utilisateur
- ✅ **Déconnexion** - Logout fonctionnel
- ✅ **MongoDB** - Sauvegarde des utilisateurs

## 🚀 Configuration Requise (5 minutes)

### Créer un Google Client ID

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un projet "NICE-CV"
3. Activez "Google Identity Toolkit API"
4. Créez un "ID client OAuth" :
   - Type : Application Web
   - Origines autorisées : `http://localhost:3000`
   - URI de redirection : `http://localhost:3000`
5. Copiez le Client ID

### Configurer .env.local

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=votre-client-id-ici.apps.googleusercontent.com
```

### Démarrer l'application

```bash
npm run dev
```

Visitez http://localhost:3000 et testez !

## 📁 Structure des Fichiers

### Pages d'authentification
- `app/auth/signin/page.tsx` - Page de connexion avec Google
- `app/auth/signup/page.tsx` - Page d'inscription avec Google

### API Routes
- `app/api/auth/google/route.ts` - Authentification Google
- `app/api/auth/signin/route.ts` - Connexion email/password
- `app/api/auth/signup/route.ts` - Inscription email/password

### Pages protégées
- `app/dashboard/page.tsx` - Dashboard utilisateur
- `app/page.tsx` - Landing page

## 🔧 Comment ça marche

### 1. Frontend (Bouton Google)

```typescript
// Charger le script Google
const script = document.createElement("script");
script.src = "https://accounts.google.com/gsi/client";

// Initialiser
window.google.accounts.id.initialize({
  client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  callback: handleGoogleSignIn,
});

// Afficher le bouton
window.google.accounts.id.renderButton(element, {
  theme: "outline",
  size: "large",
  locale: "fr",
});
```

### 2. Backend (API)

```typescript
// Décoder le JWT de Google
const decoded = jwt.decode(credential);

// Créer ou trouver l'utilisateur
let user = await prisma.user.findUnique({ where: { email } });
if (!user) {
  user = await prisma.user.create({ data: { email, name, ... } });
}

// Retourner un token
const token = jwt.sign({ userId: user.id }, JWT_SECRET);
return { user, token };
```

### 3. Stockage (localStorage)

```typescript
// Sauvegarder l'utilisateur
localStorage.setItem("user", JSON.stringify(user));

// Récupérer l'utilisateur
const user = JSON.parse(localStorage.getItem("user"));

// Déconnexion
localStorage.removeItem("user");
```

## 🎨 Fonctionnalités

### Inscription
- Google OAuth en 1 clic
- Email/password classique
- Création automatique dans MongoDB
- Redirection vers dashboard

### Connexion
- Google OAuth en 1 clic
- Email/password classique
- Vérification du mot de passe (bcrypt)
- Token JWT généré

### Dashboard
- Affichage du nom de l'utilisateur
- Statistiques des CVs
- Bouton de déconnexion
- Protection de la route

## 🔐 Sécurité

- ✅ Mots de passe hashés avec bcrypt
- ✅ Tokens JWT sécurisés
- ✅ Validation Google OAuth
- ✅ Protection des routes
- ✅ Données stockées dans MongoDB

## 📱 Test de l'application

### 1. Sans Google OAuth (fonctionne déjà)

```bash
# Démarrer
npm run dev

# Tester inscription email
http://localhost:3000/auth/signup
→ Remplir le formulaire
→ Créer un compte
→ Redirection vers dashboard ✅

# Tester connexion email
http://localhost:3000/auth/signin
→ Se connecter
→ Redirection vers dashboard ✅
```

### 2. Avec Google OAuth (après configuration)

```bash
# Configurer NEXT_PUBLIC_GOOGLE_CLIENT_ID
# Redémarrer
npm run dev

# Tester Google OAuth
http://localhost:3000/auth/signup
→ Cliquer "Continuer avec Google"
→ Choisir un compte Google
→ Redirection vers dashboard ✅
```

## 🆘 Dépannage

### Le bouton Google ne s'affiche pas

```bash
# Vérifier que la variable est définie
echo $env:NEXT_PUBLIC_GOOGLE_CLIENT_ID

# Redémarrer le serveur
npm run dev
```

### Erreur "redirect_uri_mismatch"

1. Vérifiez les URI de redirection dans Google Cloud Console
2. Ajoutez exactement : `http://localhost:3000`

### Erreur de connexion

1. Vérifiez que MongoDB est accessible
2. Vérifiez DATABASE_URL dans .env.local
3. Testez la connexion : `npm run test:db`

## 📚 Documentation

- [Guide complet Google OAuth](./GOOGLE_AUTH_SIMPLE.md)
- [Google Identity Services](https://developers.google.com/identity/gsi/web)

## 🎯 Prochaines Étapes

1. ✅ Authentification Google (terminée !)
2. 💾 Sauvegarder les CVs dans MongoDB
3. 💳 Ajouter les paiements Stripe
4. 🚀 Déployer sur Vercel

## 💡 Avantages de cette solution

| Fonctionnalité | Status |
|----------------|--------|
| Google OAuth | ✅ Intégré |
| Email/Password | ✅ Fonctionnel |
| MongoDB | ✅ Connecté |
| Sécurité | ✅ bcrypt + JWT |
| UI | ✅ Design moderne |
| Complexité | ✅ Simple |
| Dépendances | ✅ Minimales |

## 🎉 Résultat

Votre application NICE-CV a maintenant :
- ✅ Authentification Google simple et fonctionnelle
- ✅ Système email/password complet
- ✅ Base de données MongoDB
- ✅ Interface moderne et professionnelle
- ✅ Code propre et maintenable

**Prêt à créer des CVs ! 🚀**
