# 🔐 Configuration Google OAuth Simple - NICE-CV

## ✅ Solution Simple avec Google Identity Services

Pas besoin de NextAuth ou Clerk ! On utilise directement l'API Google Identity Services.

**Avantages** :
- ✅ Juste un Client ID nécessaire (pas de secret!)
- ✅ Configuration en 5 minutes
- ✅ Gratuit et illimité
- ✅ Bouton Google officiel
- ✅ Pas de bibliothèque complexe

## 🚀 Configuration (5 minutes)

### Étape 1 : Créer un projet Google Cloud

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Cliquez sur "Sélectionner un projet" > "Nouveau projet"
3. Nom du projet : **NICE-CV**
4. Cliquez sur "Créer"

### Étape 2 : Activer l'API Google Identity

1. Dans le menu, allez dans **API et services** > **Bibliothèque**
2. Recherchez "Google Identity"
3. Cliquez sur "Google Identity Toolkit API"
4. Cliquez sur "Activer"

### Étape 3 : Créer un Client ID OAuth

1. Allez dans **API et services** > **Identifiants**
2. Cliquez sur **"Créer des identifiants"** > **"ID client OAuth"**
3. Si demandé, configurez l'écran de consentement :
   - Type d'application : **Externe**
   - Nom de l'application : **NICE-CV**
   - Email d'assistance : votre email
   - Domaine autorisé : `localhost` (pour dev)
   - Cliquez sur "Enregistrer et continuer"
   - Portées : laissez par défaut
   - Cliquez sur "Enregistrer et continuer"

4. Revenez à **Identifiants** > **Créer des identifiants** > **ID client OAuth**
5. Type d'application : **Application Web**
6. Nom : **NICE-CV Web Client**
7. **Origines JavaScript autorisées** :
   ```
   http://localhost:3000
   ```
8. **URI de redirection autorisés** :
   ```
   http://localhost:3000
   http://localhost:3000/auth/signin
   http://localhost:3000/auth/signup
   ```
9. Cliquez sur **"Créer"**

### Étape 4 : Copier le Client ID

1. Une popup s'affiche avec votre **Client ID**
2. Copiez-le (format : `123456789-abc...xyz.apps.googleusercontent.com`)
3. Collez-le dans votre `.env.local` :

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=123456789-abc...xyz.apps.googleusercontent.com
```

### Étape 5 : Tester !

```bash
npm run dev
```

Visitez http://localhost:3000 et testez :
1. Cliquez sur "Commencer gratuitement"
2. Vous verrez le bouton "Continuer avec Google"
3. Cliquez dessus et connectez-vous !

## 🎉 C'est tout !

Votre authentification Google fonctionne maintenant !

## 🔧 Comment ça marche ?

### Frontend (pages d'auth)
```typescript
// Le script Google est chargé automatiquement
window.google.accounts.id.initialize({
  client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  callback: handleGoogleSignIn,
});

// Affiche le bouton Google
window.google.accounts.id.renderButton(element, options);
```

### Backend (API route)
```typescript
// Décoder le JWT de Google
const decoded = jwt.decode(credential);
// Créer ou trouver l'utilisateur
const user = await prisma.user.findUnique({ where: { email } });
// Retourner un token
return { user, token };
```

## 📱 Pour la Production

Quand vous déployez sur Vercel/autre :

1. Retournez dans Google Cloud Console
2. **Identifiants** > Cliquez sur votre Client ID
3. Ajoutez vos URLs de production :

**Origines JavaScript autorisées** :
```
https://votre-domaine.com
https://www.votre-domaine.com
```

**URI de redirection autorisés** :
```
https://votre-domaine.com
https://votre-domaine.com/auth/signin
https://votre-domaine.com/auth/signup
```

4. Mettez à jour `.env.production` avec le même Client ID

## 🆘 Dépannage

### Le bouton Google ne s'affiche pas

1. Vérifiez que `NEXT_PUBLIC_GOOGLE_CLIENT_ID` est défini
2. Ouvrez la console (F12) pour voir les erreurs
3. Vérifiez que l'URL est dans les origines autorisées

### Erreur "redirect_uri_mismatch"

1. Vérifiez que l'URL exacte est dans les URI de redirection
2. Incluez `http://localhost:3000` (sans slash final)

### Erreur "invalid_client"

1. Vérifiez que le Client ID est correct
2. Redémarrez le serveur : `npm run dev`

## 💡 Avantages de cette solution

| Fonctionnalité | Google Identity Services |
|----------------|--------------------------|
| Configuration | ✅ 5 minutes |
| Coût | ✅ Gratuit illimité |
| Sécurité | ✅ Niveau Google |
| UI | ✅ Bouton officiel Google |
| Maintenance | ✅ Aucune |
| Dépendances | ✅ Aucune bibliothèque |

## 📚 Documentation

- [Google Identity Services](https://developers.google.com/identity/gsi/web)
- [Guide de configuration](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid)

## 🎯 Prochaines Étapes

1. ✅ Configurer Google OAuth (vous êtes ici)
2. 🔄 Tester l'authentification
3. 💾 Sauvegarder les CVs dans MongoDB
4. 💳 Ajouter les paiements Stripe
5. 🚀 Déployer sur Vercel

**Prêt à tester ! 🚀**
