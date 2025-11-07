# 🔄 Reconnexion Requise

## ⚠️ Problème : Token JWT Malformé

Si vous voyez l'erreur "Token invalide: jwt malformé", cela signifie que vous vous êtes connecté **avant** que le système de tokens JWT soit implémenté.

## ✅ Solution Simple : Reconnectez-vous

### Étape 1 : Déconnexion Complète

1. Ouvrez la console du navigateur (F12)
2. Tapez :
   ```javascript
   localStorage.clear();
   location.reload();
   ```

OU

1. Cliquez sur le bouton de déconnexion dans le dashboard
2. Vous serez redirigé vers la page d'accueil

### Étape 2 : Reconnexion

1. Allez sur http://localhost:3000/auth/signin
2. Connectez-vous avec :
   - **Google OAuth** (recommandé) OU
   - **Email/Password**

### Étape 3 : Vérification

Après connexion, vérifiez que le token est créé :

```javascript
// Dans la console (F12)
const token = localStorage.getItem("token");
console.log("Token:", token ? "✅ Présent" : "❌ Absent");

// Vérifier le format
if (token) {
  const parts = token.split('.');
  console.log("Format JWT:", parts.length === 3 ? "✅ Valide" : "❌ Invalide");
}
```

## 🎯 Pourquoi Cette Erreur ?

### Avant (Sans Token)
```javascript
localStorage:
{
  "user": "{...}"
  // ❌ Pas de token
}
```

### Après (Avec Token)
```javascript
localStorage:
{
  "user": "{...}",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // ✅ Token JWT
}
```

## 🔧 Détection Automatique

L'application détecte maintenant automatiquement :
- ✅ Absence de token → Redirection vers connexion
- ✅ Token invalide → Redirection vers connexion
- ✅ Token expiré → Redirection vers connexion

Vous verrez le message : **"Session expirée. Veuillez vous reconnecter."**

## 🧪 Test Après Reconnexion

### 1. Vérifier le Token

```javascript
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

console.log("User ID:", user.id);
console.log("Token présent:", !!token);
console.log("Token valide:", token && token.split('.').length === 3);
```

### 2. Tester l'API

```javascript
const token = localStorage.getItem("token");

fetch("/api/cv/list", {
  headers: {
    "Authorization": `Bearer ${token}`
  }
})
.then(r => r.json())
.then(d => console.log("✅ API fonctionne:", d))
.catch(e => console.error("❌ Erreur:", e));
```

### 3. Créer un CV

1. Allez sur http://localhost:3000/dashboard/create
2. Remplissez le formulaire
3. Cliquez sur "Sauvegarder le CV"
4. ✅ Devrait fonctionner maintenant !

## 📊 Résultat Attendu

Après reconnexion :

```
✅ Token JWT créé
✅ Token sauvegardé dans localStorage
✅ Dashboard accessible
✅ Liste des CVs chargée
✅ Création de CV fonctionnelle
✅ Compteur de CVs mis à jour
```

## 🚨 Si Le Problème Persiste

### Solution 1 : Vider Complètement le Cache

```javascript
// Dans la console
localStorage.clear();
sessionStorage.clear();
// Puis Ctrl+Shift+R pour recharger
```

### Solution 2 : Navigation Privée

1. Ouvrez une fenêtre de navigation privée
2. Allez sur http://localhost:3000
3. Connectez-vous
4. Testez la création de CV

### Solution 3 : Vérifier les Variables d'Environnement

```bash
# Vérifier que JWT_SECRET est défini
cat .env.local | grep JWT_SECRET
```

Devrait afficher :
```
JWT_SECRET=bsJwLaD2pdWaL74MQDo1uOOmdEtP9T4X8RmP3ltbVGY97Z41YkNYQj//Ywh1Wv18QU1aL5pE/v9brXL5q9hVXQ==
```

## 💡 Astuce

Pour éviter ce problème à l'avenir :
- Ne modifiez pas manuellement localStorage
- Utilisez toujours les boutons de connexion/déconnexion
- Si vous modifiez le code d'authentification, reconnectez-vous

## 🎉 Après Reconnexion

Vous pourrez :
1. ✅ Voir votre dashboard
2. ✅ Créer des CVs
3. ✅ Voir vos CVs dans la liste
4. ✅ Voir le compteur se mettre à jour (3 → 2 → 1 → 0)
5. ✅ Exporter en PDF
6. ✅ Modifier vos CVs

## 📚 Documentation Connexe

- [TEST_COMPLET.md](./TEST_COMPLET.md) - Guide de test complet
- [TEST_FINAL_CV.md](./TEST_FINAL_CV.md) - Test de création de CV
- [README_AUTH.md](./README_AUTH.md) - Documentation authentification

## 🚀 Prêt !

Après reconnexion, votre application NICE-CV sera complètement fonctionnelle ! 🎊
