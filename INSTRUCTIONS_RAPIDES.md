# ⚡ Instructions Rapides - NICE-CV

## 🔴 IMPORTANT : Reconnexion Requise

Si vous étiez déjà connecté avant, vous devez vous **reconnecter** pour obtenir un token JWT valide.

## 🚀 Démarrage Rapide (2 minutes)

### 1. Nettoyer et Reconnecter

```javascript
// Ouvrez la console (F12) et tapez :
localStorage.clear();
location.href = "/auth/signin";
```

### 2. Se Connecter

**Option A : Google OAuth (Recommandé)**
- Cliquez sur "Continuer avec Google"
- Choisissez votre compte
- ✅ Redirection automatique vers dashboard

**Option B : Email/Password**
- Email : votre@email.com
- Mot de passe : votre mot de passe
- ✅ Connexion

### 3. Créer un CV

1. Dashboard → "Créer un nouveau CV"
2. Remplissez le formulaire
3. Cliquez sur "Sauvegarder le CV"
4. ✅ Confettis + Succès !

## 📊 Ce Qui Fonctionne

- ✅ Google OAuth
- ✅ Email/Password
- ✅ Création de CVs
- ✅ Sauvegarde MongoDB
- ✅ Affichage des CVs
- ✅ Compteur de CVs (3 → 2 → 1 → 0)
- ✅ Limite de 3 CVs gratuits

## 🎯 URLs Importantes

- **Accueil** : http://localhost:3000
- **Connexion** : http://localhost:3000/auth/signin
- **Inscription** : http://localhost:3000/auth/signup
- **Dashboard** : http://localhost:3000/dashboard
- **Créer CV** : http://localhost:3000/dashboard/create

## 🔍 Vérification Rapide

```javascript
// Dans la console (F12)
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

console.log("✅ User:", user ? "Connecté" : "❌ Non connecté");
console.log("✅ Token:", token ? "Présent" : "❌ Absent");
console.log("📊 CVs créés:", user?.cvCount || 0);
console.log("📊 CVs max:", user?.maxCvs || 3);
```

## 🐛 Problèmes Courants

### "Token invalide: jwt malformé"
→ **Solution** : Reconnectez-vous (voir étape 1)

### "Session expirée"
→ **Solution** : Reconnectez-vous

### "Non authentifié"
→ **Solution** : Vérifiez que vous êtes connecté

### Le compteur ne change pas
→ **Solution** : Rechargez la page (F5)

### Les CVs ne s'affichent pas
→ **Solution** : Vérifiez MongoDB et reconnectez-vous

## 📚 Documentation Complète

- [RECONNEXION_REQUISE.md](./RECONNEXION_REQUISE.md) - Guide de reconnexion
- [TEST_FINAL_CV.md](./TEST_FINAL_CV.md) - Test complet
- [DEBUG_CV_SAVE.md](./DEBUG_CV_SAVE.md) - Débogage
- [README_AUTH.md](./README_AUTH.md) - Authentification

## 🎉 Résultat Final

Après reconnexion, vous aurez :
```
Dashboard:
┌─────────────────────────────────┐
│ Bienvenue, [Votre Nom] 👋       │
│                                 │
│ ┌──┐ ┌──┐ ┌──┐ ┌──┐           │
│ │0 │ │3 │ │..│ │..│           │
│ └──┘ └──┘ └──┘ └──┘           │
│                                 │
│ [+ Créer un nouveau CV]        │
│                                 │
│ Mes CV                          │
│ (Liste de vos CVs)              │
└─────────────────────────────────┘
```

## ⚡ Commande Magique

Pour tout réinitialiser et recommencer :

```javascript
// Dans la console (F12)
localStorage.clear();
sessionStorage.clear();
location.href = "/auth/signin";
```

**C'est tout ! Bonne création de CVs ! 🚀**
