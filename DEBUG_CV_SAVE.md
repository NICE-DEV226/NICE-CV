# 🐛 Debug - Sauvegarde de CV

## Problème : Erreur JSON Circulaire

L'erreur "Converting circular structure to JSON" se produit quand un objet contient des références circulaires (A → B → A).

## ✅ Solutions Implémentées

### 1. Fonction cleanData()

Une fonction utilitaire qui nettoie récursivement toutes les données :
- Convertit les valeurs en types primitifs
- Supprime les références circulaires
- Gère les tableaux et objets imbriqués

### 2. Mapping Explicite

Chaque tableau (experiences, educations, etc.) est mappé explicitement pour créer de nouveaux objets propres.

### 3. Try/Catch sur JSON.stringify

Si la sérialisation échoue, l'erreur est capturée et un message clair est affiché.

## 🧪 Test de Débogage

### Dans la Console (F12)

```javascript
// Tester la sérialisation des données
const personalDetails = {
  fullName: "Jean Dupont",
  email: "jean@example.com",
  phone: "0612345678",
  address: "Paris",
  postSeeking: "Développeur",
  description: "Passionné..."
};

const experiences = [
  {
    company: "Google",
    position: "Dev",
    startDate: "2020",
    endDate: "2023",
    description: "..."
  }
];

const cvData = {
  userId: "test-id",
  title: "Mon CV",
  personalDetails,
  experiences,
  educations: [],
  languages: [],
  skills: [],
  hobbies: [],
  theme: "light",
  template: "classic",
  isDraft: false
};

// Tester la sérialisation
try {
  const json = JSON.stringify(cvData);
  console.log("✅ Sérialisation OK");
  console.log("Taille:", json.length, "caractères");
} catch (error) {
  console.error("❌ Erreur:", error);
}
```

### Vérifier les Données Avant Sauvegarde

Ajoutez temporairement dans `handleSave` :

```typescript
console.log("=== DEBUG SAVE ===");
console.log("User:", user);
console.log("Title:", cvTitle);
console.log("PersonalDetails:", personalDetails);
console.log("Experiences:", experiences);
console.log("Hobbies:", hobbies);
console.log("==================");
```

## 🔍 Identifier la Source du Problème

### Étape 1 : Tester Chaque Section

```javascript
// Dans la console, testez chaque section individuellement
const sections = {
  personalDetails: {...},
  experiences: [...],
  educations: [...],
  languages: [...],
  skills: [...],
  hobbies: [...]
};

for (const [key, value] of Object.entries(sections)) {
  try {
    JSON.stringify(value);
    console.log(`✅ ${key} OK`);
  } catch (error) {
    console.error(`❌ ${key} ERREUR:`, error);
  }
}
```

### Étape 2 : Vérifier les Types

```javascript
// Vérifier qu'il n'y a pas d'objets React
console.log("Type personalDetails:", typeof personalDetails);
console.log("Type experiences:", typeof experiences);
console.log("Est un tableau?", Array.isArray(experiences));

// Vérifier le contenu
experiences.forEach((exp, i) => {
  console.log(`Experience ${i}:`, {
    company: typeof exp.company,
    position: typeof exp.position,
    hasReactProps: '__reactProps' in exp
  });
});
```

## 🛠️ Solutions Alternatives

### Solution 1 : Utiliser structuredClone

```typescript
const cvData = structuredClone({
  userId: user.id,
  title: cvTitle,
  personalDetails,
  experiences,
  // ...
});
```

### Solution 2 : JSON.parse(JSON.stringify())

```typescript
const cvData = JSON.parse(JSON.stringify({
  userId: user.id,
  title: cvTitle,
  personalDetails,
  experiences,
  // ...
}));
```

### Solution 3 : Créer Manuellement

```typescript
const cvData = {
  userId: user.id,
  title: cvTitle,
  personalDetails: {
    fullName: personalDetails.fullName,
    email: personalDetails.email,
    // ... copier chaque propriété
  },
  // ...
};
```

## 🎯 Checklist de Vérification

Avant de sauvegarder, vérifiez :

- [ ] `user.id` est une string
- [ ] `cvTitle` est une string
- [ ] `personalDetails` est un objet simple
- [ ] `experiences` est un tableau d'objets simples
- [ ] Aucun objet ne contient de références DOM
- [ ] Aucun objet ne contient de fonctions
- [ ] Aucun objet ne contient de références React

## 🚀 Test Rapide

Pour tester rapidement si la sauvegarde fonctionne :

1. **Ouvrez la console** (F12)
2. **Remplissez le formulaire** avec des données simples
3. **Avant de cliquer sur "Sauvegarder"**, tapez :
   ```javascript
   // Intercepter la sauvegarde
   const originalFetch = window.fetch;
   window.fetch = function(...args) {
     console.log("FETCH:", args);
     return originalFetch.apply(this, args);
   };
   ```
4. **Cliquez sur "Sauvegarder"**
5. **Vérifiez la console** pour voir les données envoyées

## 📊 Résultat Attendu

Après correction, vous devriez voir dans la console :

```
Début de la sauvegarde...
User ID: 507f1f77bcf86cd799439011
Title: Mon CV
✅ Sérialisation OK
POST /api/cv/save
Status: 201 Created
Response: { message: "CV créé avec succès", ... }
```

## 🎉 Si Ça Fonctionne

Vous devriez voir :
1. ✅ Confettis
2. ✅ Message "CV sauvegardé avec succès !"
3. ✅ Redirection vers dashboard
4. ✅ CV affiché dans la liste
5. ✅ Compteur mis à jour (3 → 2)

## 🆘 Si Ça Ne Fonctionne Toujours Pas

1. **Videz le cache** : Ctrl+Shift+R
2. **Reconnectez-vous** : Pour avoir un token frais
3. **Testez avec des données minimales** :
   - Juste nom et email
   - Pas d'expériences
   - Pas de hobbies
4. **Vérifiez MongoDB** : Que la connexion fonctionne
5. **Vérifiez les logs serveur** : Dans le terminal

## 💡 Astuce

Si l'erreur persiste, essayez de créer un CV avec le strict minimum :
- Titre : "Test"
- Nom : "Test"
- Email : "test@test.com"
- Rien d'autre

Si ça fonctionne, ajoutez progressivement les autres sections pour identifier laquelle pose problème.
