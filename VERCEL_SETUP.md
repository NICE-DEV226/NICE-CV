# Configuration Vercel - NICE-CV

## 🚀 Déploiement Rapide

### 1. Cliquez sur le bouton ci-dessous
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/votre-username/nice-cv)

### 2. Configurez les Variables d'Environnement

Copiez ces variables dans Vercel :

```env
DATABASE_URL=mongodb+srv://NICEDEV77:niceDEV%40226@cluster0.e2ur4fn.mongodb.net/nice-cv?retryWrites=true&w=majority

GOOGLE_CLIENT_ID=votre_client_id
GOOGLE_CLIENT_SECRET=votre_client_secret

JWT_SECRET=générez_un_nouveau_secret

NEXT_PUBLIC_APP_URL=https://votre-app.vercel.app
```

### 3. Configurez Google OAuth

1. Allez sur https://console.cloud.google.com
2. Sélectionnez votre projet
3. "APIs & Services" > "Credentials"
4. Modifiez votre OAuth 2.0 Client ID
5. Ajoutez :
   - **Authorized JavaScript origins:** `https://votre-app.vercel.app`
   - **Authorized redirect URIs:** `https://votre-app.vercel.app/api/auth/google/callback`

### 4. Autorisez Vercel sur MongoDB Atlas

1. Allez sur https://cloud.mongodb.com
2. "Network Access"
3. "Add IP Address"
4. Ajoutez `0.0.0.0/0` (toutes les IPs) OU les IPs de Vercel

### 5. Déployez !

Cliquez sur "Deploy" et attendez quelques minutes.

## ✅ Checklist Post-Déploiement

- [ ] L'app se charge sur l'URL Vercel
- [ ] Connexion email/password fonctionne
- [ ] Connexion Google fonctionne
- [ ] Création de CV fonctionne
- [ ] Modification de CV fonctionne
- [ ] Images s'affichent correctement

## 🔧 Commandes Utiles

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel --prod

# Voir les logs
vercel logs

# Voir les variables d'environnement
vercel env ls
```

## 🆘 Problèmes Courants

### "Google OAuth Error"
→ Vérifiez les URIs de redirection sur Google Cloud Console

### "Database Connection Error"
→ Vérifiez que les IPs Vercel sont autorisées sur MongoDB Atlas

### "JWT Error"
→ Vérifiez que JWT_SECRET est bien configuré sur Vercel

## 📞 Support

Consultez le fichier DEPLOYMENT.md pour plus de détails.
