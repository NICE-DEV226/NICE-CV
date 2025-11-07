# 🧪 Test Google OAuth - NICE-CV

## ✅ Configuration Terminée !

Votre Google Client ID est configuré :
```
294938955177-vmnf1nevhe4m97s3l83iar3ok8ugsdtp.apps.googleusercontent.com
```

## 🚀 Tester Maintenant

### 1. Vérifier que le serveur tourne

Le serveur devrait être sur : **http://localhost:3000**

### 2. Tester l'inscription avec Google

1. Allez sur : http://localhost:3000/auth/signup
2. Vous devriez voir :
   - ✅ Un bouton "Continuer avec Google" (officiel Google)
   - ✅ Un formulaire email/password en dessous

3. Cliquez sur **"Continuer avec Google"**
4. Choisissez votre compte Google
5. Vous serez redirigé vers le dashboard !

### 3. Tester la connexion avec Google

1. Déconnectez-vous du dashboard
2. Allez sur : http://localhost:3000/auth/signin
3. Cliquez sur **"Continuer avec Google"**
4. Vous serez reconnecté automatiquement !

### 4. Tester email/password (fonctionne déjà)

**Inscription** :
1. http://localhost:3000/auth/signup
2. Remplissez le formulaire (nom, email, mot de passe)
3. Cliquez sur "Créer mon compte"
4. Redirection vers dashboard ✅

**Connexion** :
1. http://localhost:3000/auth/signin
2. Entrez email et mot de passe
3. Cliquez sur "Se connecter"
4. Redirection vers dashboard ✅

## 🔧 Si le bouton Google ne s'affiche pas

### Vérifier la configuration

```bash
# Vérifier que la variable est définie
cat .env.local | grep GOOGLE_CLIENT_ID
```

Devrait afficher :
```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=294938955177-vmnf1nevhe4m97s3l83iar3ok8ugsdtp.apps.googleusercontent.com
```

### Vérifier dans Google Cloud Console

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Cliquez sur votre Client ID
3. Vérifiez les **Origines JavaScript autorisées** :
   ```
   http://localhost:3000
   ```
4. Vérifiez les **URI de redirection autorisés** :
   ```
   http://localhost:3000
   http://localhost:3000/auth/signin
   http://localhost:3000/auth/signup
   ```

### Vérifier dans la console du navigateur

1. Ouvrez la page d'inscription : http://localhost:3000/auth/signup
2. Appuyez sur **F12** pour ouvrir la console
3. Regardez s'il y a des erreurs en rouge
4. Erreurs courantes :
   - `Invalid client_id` → Vérifiez le Client ID
   - `redirect_uri_mismatch` → Ajoutez l'URL dans Google Console
   - `Script not loaded` → Rechargez la page

## 🎯 Ce qui devrait fonctionner

### ✅ Fonctionnalités actives

- [x] Bouton Google OAuth officiel
- [x] Inscription avec Google (1 clic)
- [x] Connexion avec Google (1 clic)
- [x] Inscription email/password
- [x] Connexion email/password
- [x] Sauvegarde dans MongoDB
- [x] Redirection vers dashboard
- [x] Déconnexion
- [x] Protection des routes

### 📊 Vérifier dans MongoDB

Après une inscription, vérifiez que l'utilisateur est créé :

1. Allez sur [MongoDB Atlas](https://cloud.mongodb.com/)
2. Cliquez sur "Browse Collections"
3. Base de données : `nice-cv`
4. Collection : `User`
5. Vous devriez voir votre utilisateur avec :
   - `email` : votre email Google
   - `name` : votre nom Google
   - `image` : votre photo Google
   - `plan` : "FREE"
   - `cvCount` : 0
   - `maxCvs` : 3

## 🐛 Dépannage

### Erreur "Invalid client_id"

```bash
# Vérifier que le Client ID est correct
echo $env:NEXT_PUBLIC_GOOGLE_CLIENT_ID

# Redémarrer le serveur
npm run dev
```

### Erreur "redirect_uri_mismatch"

1. Copiez l'URL exacte de l'erreur
2. Ajoutez-la dans Google Cloud Console
3. Attendez 5 minutes (propagation)
4. Réessayez

### Le bouton ne s'affiche pas

1. Vérifiez la console (F12)
2. Rechargez la page (Ctrl+R)
3. Videz le cache (Ctrl+Shift+R)
4. Testez en navigation privée

### Erreur MongoDB

```bash
# Tester la connexion MongoDB
npm run test:db
```

## 🎉 Résultat Attendu

Après avoir cliqué sur "Continuer avec Google" :

1. ✅ Popup Google s'ouvre
2. ✅ Vous choisissez votre compte
3. ✅ Popup se ferme
4. ✅ Redirection vers `/dashboard`
5. ✅ Votre nom s'affiche en haut à droite
6. ✅ Vous voyez "Bienvenue, [Votre Prénom] 👋"
7. ✅ Vous pouvez créer des CVs

## 📸 Captures d'écran attendues

### Page d'inscription
```
┌─────────────────────────────────┐
│         NICE-CV Logo            │
│                                 │
│  [Continuer avec Google]        │ ← Bouton officiel Google
│                                 │
│  ─────── Ou avec email ────────│
│                                 │
│  Nom complet: [_____________]  │
│  Email:       [_____________]  │
│  Mot de passe:[_____________]  │
│                                 │
│  [Créer mon compte]            │
└─────────────────────────────────┘
```

### Dashboard après connexion
```
┌─────────────────────────────────┐
│ NICE-CV    [Votre Nom] [Logout] │
├─────────────────────────────────┤
│ Bienvenue, [Prénom] 👋          │
│                                 │
│ ┌──┐ ┌──┐ ┌──┐ ┌──┐           │
│ │0 │ │3 │ │..│ │..│           │
│ └──┘ └──┘ └──┘ └──┘           │
│                                 │
│ [+ Créer un nouveau CV]        │
│                                 │
│ Mes CV                          │
│ Aucun CV créé                   │
└─────────────────────────────────┘
```

## 🚀 Prochaines Étapes

1. ✅ Tester Google OAuth (vous êtes ici)
2. 💾 Créer et sauvegarder des CVs
3. 💳 Ajouter les paiements Stripe
4. 🚀 Déployer sur Vercel

## 💡 Astuce

Pour tester rapidement :
1. Ouvrez http://localhost:3000/auth/signup
2. Cliquez sur "Continuer avec Google"
3. C'est tout ! 🎉

**Bon test ! 🚀**
