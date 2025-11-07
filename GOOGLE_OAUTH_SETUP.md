# 🔐 Configuration Google OAuth pour NICE-CV

## ⚠️ Statut Actuel

Google OAuth n'est **pas configuré**. Les variables d'environnement sont vides :
```bash
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_ENABLE_GOOGLE_AUTH=false
```

## 🚀 Configuration (10 minutes)

### Étape 1 : Créer un Projet Google Cloud

1. Allez sur https://console.cloud.google.com
2. Créez un nouveau projet ou sélectionnez-en un
3. Nommez-le "NICE-CV" ou similaire

### Étape 2 : Activer l'API Google+

1. Dans le menu, allez à "APIs & Services" > "Library"
2. Recherchez "Google+ API"
3. Cliquez sur "Enable"

### Étape 3 : Créer des Identifiants OAuth

1. Allez à "APIs & Services" > "Credentials"
2. Cliquez sur "Create Credentials" > "OAuth client ID"
3. Si demandé, configurez l'écran de consentement OAuth :
   - Type : External
   - Nom de l'application : NICE-CV
   - Email de support : votre email
   - Domaine autorisé : localhost (pour dev)
   - Scopes : email, profile, openid

4. Créez l'OAuth client ID :
   - Type d'application : **Web application**
   - Nom : NICE-CV Web Client
   
5. **Authorized JavaScript origins :**
   ```
   http://localhost:3000
   https://votre-domaine.com (pour production)
   ```

6. **Authorized redirect URIs :**
   ```
   http://localhost:3000/api/auth/callback/google
   https://votre-domaine.com/api/auth/callback/google (pour production)
   ```

7. Cliquez sur "Create"

### Étape 4 : Copier les Identifiants

Vous recevrez :
- **Client ID** : ressemble à `123456789-abcdefg.apps.googleusercontent.com`
- **Client Secret** : ressemble à `GOCSPX-abcdefghijklmnop`

### Étape 5 : Configurer .env.local

Ouvrez `.env.local` et ajoutez :

```bash
# Google OAuth
GOOGLE_CLIENT_ID=votre-client-id-ici
GOOGLE_CLIENT_SECRET=votre-client-secret-ici
NEXT_PUBLIC_ENABLE_GOOGLE_AUTH=true
```

### Étape 6 : Redémarrer l'Application

```bash
# Arrêtez le serveur (Ctrl+C)
npm run dev
```

### Étape 7 : Tester

1. Allez sur http://localhost:3000/auth/signin
2. Le bouton Google devrait maintenant être visible
3. Cliquez dessus pour tester la connexion

## ✅ Vérification

Si tout fonctionne :
- ✅ Bouton Google visible sur les pages de connexion/inscription
- ✅ Redirection vers Google pour l'authentification
- ✅ Création automatique du compte utilisateur
- ✅ Redirection vers le dashboard après connexion

## 🔧 Configuration NextAuth (Déjà Fait)

Le code NextAuth est déjà configuré dans `lib/auth.ts` :
- ✅ GoogleProvider conditionnel (activé si les variables existent)
- ✅ Callback `signIn` pour créer l'utilisateur automatiquement
- ✅ Session JWT avec données utilisateur

## ⚠️ Notes Importantes

### Pour le Développement :
- Utilisez `http://localhost:3000` (pas HTTPS)
- Ajoutez votre email comme testeur dans Google Cloud Console

### Pour la Production :
- Utilisez HTTPS obligatoirement
- Mettez à jour les redirect URIs avec votre domaine
- Passez l'écran de consentement en "Production"

## 🐛 Problèmes Courants

### Erreur : "redirect_uri_mismatch"
**Solution :** Vérifiez que l'URI de redirection est exactement :
```
http://localhost:3000/api/auth/callback/google
```

### Erreur : "Access blocked: This app's request is invalid"
**Solution :** Configurez l'écran de consentement OAuth

### Le bouton Google n'apparaît pas
**Solution :** Vérifiez que :
- `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET` sont remplis
- `NEXT_PUBLIC_ENABLE_GOOGLE_AUTH=true`
- Vous avez redémarré le serveur

## 📚 Ressources

- [Google Cloud Console](https://console.cloud.google.com)
- [NextAuth Google Provider](https://next-auth.js.org/providers/google)
- [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)

## 🔒 Sécurité

- ✅ Ne commitez JAMAIS vos secrets dans Git
- ✅ Utilisez des secrets différents pour dev/prod
- ✅ Limitez les domaines autorisés
- ✅ Activez la vérification en 2 étapes sur votre compte Google

---

**Besoin d'aide ?** Consultez la documentation NextAuth ou contactez le support.
