# Guide de Déploiement sur Vercel

## Prérequis
- Compte Vercel (https://vercel.com)
- Base de données MongoDB Atlas (déjà configurée)
- Compte Google Cloud Console pour OAuth

## Étapes de Déploiement

### 1. Préparer Google OAuth pour Production

1. Allez sur https://console.cloud.google.com
2. Sélectionnez votre projet
3. Allez dans "APIs & Services" > "Credentials"
4. Cliquez sur votre OAuth 2.0 Client ID
5. Ajoutez les URIs autorisés :
   - **Authorized JavaScript origins:**
     - `https://votre-app.vercel.app`
   - **Authorized redirect URIs:**
     - `https://votre-app.vercel.app/api/auth/google/callback`

### 2. Déployer sur Vercel

#### Option A : Via le site Vercel
1. Allez sur https://vercel.com
2. Cliquez sur "Add New Project"
3. Importez votre repository GitHub
4. Configurez les variables d'environnement (voir ci-dessous)
5. Cliquez sur "Deploy"

#### Option B : Via CLI
```bash
npm install -g vercel
vercel login
vercel
```

### 3. Variables d'Environnement sur Vercel

Allez dans "Settings" > "Environment Variables" et ajoutez :

```
DATABASE_URL=mongodb+srv://NICEDEV77:niceDEV%40226@cluster0.e2ur4fn.mongodb.net/nice-cv?retryWrites=true&w=majority&appName=Cluster0

GOOGLE_CLIENT_ID=votre_client_id_google
GOOGLE_CLIENT_SECRET=votre_client_secret_google

JWT_SECRET=votre_secret_jwt_production

NEXT_PUBLIC_APP_URL=https://votre-app.vercel.app
```

**IMPORTANT:** 
- Utilisez un JWT_SECRET différent pour la production (générez-en un nouveau)
- Remplacez `votre-app.vercel.app` par votre vraie URL Vercel

### 4. Générer un nouveau JWT_SECRET pour Production

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 5. Après le Premier Déploiement

1. Notez l'URL de votre application (ex: `https://nice-cv.vercel.app`)
2. Retournez sur Google Cloud Console
3. Mettez à jour les URIs autorisés avec la vraie URL
4. Redéployez sur Vercel si nécessaire

### 6. Vérifications Post-Déploiement

- [ ] L'application se charge correctement
- [ ] La connexion avec email/mot de passe fonctionne
- [ ] La connexion avec Google fonctionne
- [ ] La création de CV fonctionne
- [ ] La modification de CV fonctionne
- [ ] Les images de profil s'affichent

## Problèmes Courants

### Google OAuth ne fonctionne pas
- Vérifiez que les URIs de redirection sont corrects
- Vérifiez que GOOGLE_CLIENT_ID et GOOGLE_CLIENT_SECRET sont bien configurés
- Attendez quelques minutes après avoir modifié les URIs sur Google Cloud

### Erreur de connexion à la base de données
- Vérifiez que DATABASE_URL est correct
- Vérifiez que votre IP Vercel est autorisée sur MongoDB Atlas (ou autorisez toutes les IPs : 0.0.0.0/0)

### Images ne s'affichent pas
- Les images sont stockées en base64 dans MongoDB, elles devraient fonctionner automatiquement

## Commandes Utiles

```bash
# Voir les logs
vercel logs

# Redéployer
vercel --prod

# Voir les variables d'environnement
vercel env ls
```

## Support

Si vous rencontrez des problèmes, vérifiez :
1. Les logs Vercel
2. La console du navigateur (F12)
3. Les variables d'environnement
