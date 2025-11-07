# 🔐 Configuration Clerk pour NICE-CV

## ✅ Avantages de Clerk

- **Google OAuth intégré** : Connexion Google sans configuration complexe
- **Interface prête à l'emploi** : Composants UI modernes inclus
- **Gratuit** : Plan gratuit généreux (10,000 utilisateurs/mois)
- **Simple** : Pas besoin de Client Secret Google
- **Sécurisé** : Gestion complète de l'authentification

## 🚀 Configuration Rapide (5 minutes)

### 1. Créer un compte Clerk

1. Allez sur [clerk.com](https://clerk.com)
2. Cliquez sur "Start building for free"
3. Créez votre compte (avec Google c'est plus rapide !)

### 2. Créer une application

1. Dans le dashboard Clerk, cliquez sur "Create application"
2. Nom de l'application : **NICE-CV**
3. Activez les méthodes de connexion :
   - ✅ **Email** (activé par défaut)
   - ✅ **Google** (cliquez pour activer)
   - ✅ **GitHub** (optionnel)
4. Cliquez sur "Create application"

### 3. Copier les clés API

Dans le dashboard Clerk :

1. Allez dans **API Keys** (menu de gauche)
2. Copiez les clés suivantes :

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### 4. Mettre à jour .env.local

Remplacez les clés dans votre fichier `.env.local` :

```env
# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_votre_cle_publique
CLERK_SECRET_KEY=sk_test_votre_cle_secrete

# Clerk URLs (déjà configurées)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/signin
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/signup
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### 5. Configurer les URLs de redirection

Dans le dashboard Clerk :

1. Allez dans **Paths** (menu de gauche)
2. Configurez :
   - Sign-in URL: `/auth/signin`
   - Sign-up URL: `/auth/signup`
   - After sign-in URL: `/dashboard`
   - After sign-up URL: `/dashboard`

### 6. Activer Google OAuth

Dans le dashboard Clerk :

1. Allez dans **User & Authentication** > **Social Connections**
2. Activez **Google**
3. C'est tout ! Clerk gère automatiquement la configuration Google

## 🎉 Tester l'authentification

```bash
npm run dev
```

Visitez http://localhost:3000 et testez :

1. **Inscription** : Cliquez sur "Commencer gratuitement"
2. **Google OAuth** : Cliquez sur "Continue with Google"
3. **Email** : Ou inscrivez-vous avec email/mot de passe
4. **Connexion** : Testez la connexion

## 🔧 Fonctionnalités Incluses

### Avec Clerk, vous avez automatiquement :

- ✅ **Google OAuth** : Connexion en 1 clic
- ✅ **Email/Password** : Authentification classique
- ✅ **Vérification email** : Emails automatiques
- ✅ **Mot de passe oublié** : Récupération automatique
- ✅ **Profil utilisateur** : Gestion du profil
- ✅ **Sessions sécurisées** : JWT automatique
- ✅ **Protection des routes** : Middleware inclus
- ✅ **UI moderne** : Composants stylisés

## 📱 Personnalisation de l'apparence

Dans le dashboard Clerk :

1. Allez dans **Customization** > **Theme**
2. Personnalisez les couleurs pour matcher NICE-CV :
   - Primary color: `#4F46E5` (indigo)
   - Background: `#FFFFFF`
   - Border radius: `12px`

## 🌍 Langue française

L'application est déjà configurée en français grâce à :

```typescript
import { frFR } from "@clerk/localizations";

<ClerkProvider localization={frFR}>
```

## 🔒 Sécurité

Clerk gère automatiquement :

- Hachage des mots de passe (bcrypt)
- Protection CSRF
- Rate limiting
- Détection de bots
- Vérification 2FA (optionnel)

## 📊 Dashboard Clerk

Accédez à votre dashboard pour :

- Voir les utilisateurs inscrits
- Gérer les sessions actives
- Consulter les logs d'authentification
- Configurer les webhooks
- Exporter les données

## 🆘 Dépannage

### Erreur "Invalid publishable key"

- Vérifiez que vous avez bien copié la clé complète
- Redémarrez le serveur : `npm run dev`

### Google OAuth ne fonctionne pas

- Vérifiez que Google est activé dans Clerk
- Vérifiez les URLs de redirection
- Testez en navigation privée

### Redirection infinie

- Vérifiez les URLs dans `.env.local`
- Vérifiez les Paths dans Clerk dashboard

## 🎯 Prochaines Étapes

1. ✅ Configurer Clerk (vous êtes ici)
2. 🔄 Synchroniser les utilisateurs avec MongoDB
3. 💳 Ajouter les paiements Stripe
4. 🚀 Déployer sur Vercel

## 📚 Documentation

- [Clerk Documentation](https://clerk.com/docs)
- [Next.js Integration](https://clerk.com/docs/quickstarts/nextjs)
- [Customization](https://clerk.com/docs/customization/overview)

## 💡 Astuce Pro

Clerk offre un plan gratuit très généreux :
- 10,000 utilisateurs actifs/mois
- Authentification illimitée
- Support communautaire

Parfait pour démarrer NICE-CV ! 🚀
