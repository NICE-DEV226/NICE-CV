# 🔧 Fix Authentification - Test Simple

## Problème Actuel

L'API `/api/cv/save` retourne 401 (non authentifié) car l'userId n'est pas transmis correctement.

## Solution Temporaire : Test Sans Authentification

Pour tester rapidement la création de CV, vous pouvez :

### Option 1 : Tester avec un userId en dur

Modifiez temporairement `app/api/cv/save/route.ts` :

```typescript
// Ligne 15 - Remplacer par un userId de test
const userId = "test-user-id"; // ← Utilisez un vrai ID de votre base MongoDB
```

### Option 2 : Créer un utilisateur de test

```bash
# Ouvrir Prisma Studio
npx prisma studio

# Créer un utilisateur manuellement
# Copiez son ID
```

Puis dans `app/dashboard/create/page.tsx`, ligne 215 :

```typescript
userId: "VOTRE_USER_ID_ICI", // ← Collez l'ID de l'utilisateur
```

## Solution Complète : Système de Token

Pour une vraie authentification, il faut :

1. **Sauvegarder le token lors de la connexion**
2. **Envoyer le token avec chaque requête**
3. **Vérifier le token côté serveur**

### Étape 1 : Modifier l'API de connexion

Dans `app/api/auth/signin/route.ts` et `app/api/auth/google/route.ts`, on retourne déjà un token.

### Étape 2 : Sauvegarder le token

Modifier `app/auth/signin/page.tsx` ligne 90 :

```typescript
if (res.ok) {
  const data = await res.json();
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("token", data.token); // ← Ajouter cette ligne
  router.push("/dashboard");
}
```

Faire pareil dans `app/auth/signup/page.tsx` et `app/api/auth/google/route.ts`.

### Étape 3 : Envoyer le token

Modifier `app/dashboard/create/page.tsx` ligne 240 :

```typescript
const token = localStorage.getItem("token");

const response = await fetch("/api/cv/save", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`, // ← Ajouter cette ligne
  },
  body: JSON.stringify(cvData),
});
```

### Étape 4 : L'API est déjà prête

L'API `app/api/cv/save/route.ts` vérifie déjà le token dans les headers.

## Test Rapide

Pour tester maintenant sans tout modifier :

1. **Connectez-vous** avec Google ou email
2. **Ouvrez la console** (F12)
3. **Tapez** :
   ```javascript
   const user = JSON.parse(localStorage.getItem("user"));
   console.log("User ID:", user.id);
   ```
4. **Copiez l'ID**
5. **Modifiez temporairement** `app/api/cv/save/route.ts` ligne 15 :
   ```typescript
   const userId = "VOTRE_ID_ICI";
   ```
6. **Testez la création de CV**

## Prochaines Étapes

1. ✅ Implémenter le système de token complet
2. ✅ Tester la sauvegarde de CV
3. ✅ Afficher les CVs dans le dashboard
4. 💳 Ajouter les paiements Stripe
5. 🚀 Déployer

## Note

Le système d'authentification fonctionne (Google OAuth + Email/Password), il faut juste connecter correctement l'API de sauvegarde des CVs avec le système d'authentification.
