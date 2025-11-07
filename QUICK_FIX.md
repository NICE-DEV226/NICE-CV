# ⚡ Solution Rapide - Connexion Base de Données

## 🚨 Problème Confirmé

Le projet Supabase actuel **n'existe plus ou n'est pas accessible**.

Les deux URLs échouent:
- ❌ Direct: `db.errdrrkyxtnlklhxfivb.supabase.co:5432`
- ❌ Pooling: `aws-0-eu-west-1.pooler.supabase.com:6543`

## ✅ Solution: 2 Options

### Option 1: Nouveau Projet Supabase (Production) ⭐ Recommandé

**Temps: 10 minutes**

#### Étape 1: Créer le Projet
1. Va sur https://supabase.com
2. Clique "New Project"
3. Configure:
   - Name: `nice-cv`
   - Password: Génère un mot de passe fort (SAUVEGARDE-LE!)
   - Region: Europe West (Ireland)
4. Attends 2-3 minutes

#### Étape 2: Récupérer les Credentials

**Dans Settings → API:**
```
Project URL: https://[REF].supabase.co
anon key: eyJhbGci...
service_role key: eyJhbGci...
```

**Dans Settings → Database → Connection string:**
```
Connection pooling:
postgresql://postgres.[REF]:[PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true

Direct connection:
postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres
```

#### Étape 3: Mettre à Jour `.env.local`

Remplace ces lignes dans `.env.local`:

```env
# Database Configuration
DATABASE_URL=postgresql://postgres.[TON-REF]:[TON-PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres:[TON-PASSWORD]@db.[TON-REF].supabase.co:5432/postgres

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://[TON-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[TA-ANON-KEY]
SUPABASE_SERVICE_ROLE_KEY=[TA-SERVICE-ROLE-KEY]
```

#### Étape 4: Créer les Tables

```bash
# Générer Prisma Client
npx prisma generate

# Créer les tables
npx prisma db push

# Tester
node scripts/test-connection.js
```

#### Étape 5: Redémarrer

```bash
npm run dev
```

---

### Option 2: SQLite Local (Développement) 🚀 Plus Rapide

**Temps: 2 minutes**

Pour développer sans Supabase:

#### Étape 1: Changer le Schema

Modifie `package.json`:
```json
{
  "prisma": {
    "schema": "prisma/schema-sqlite.prisma"
  }
}
```

#### Étape 2: Créer la DB

```bash
# Supprimer l'ancien client
rm -rf node_modules/.prisma

# Générer avec SQLite
npx prisma generate

# Créer la DB locale
npx prisma db push
```

#### Étape 3: Commenter Supabase

Dans `lib/supabase.ts`, commente temporairement:
```typescript
// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   ...
// });
```

#### Étape 4: Tester

```bash
npm run dev
```

La DB sera créée dans `prisma/dev.db`

---

## 🎯 Quelle Option Choisir?

### Choisis Option 1 (Supabase) si:
- ✅ Tu veux déployer en production
- ✅ Tu veux utiliser l'authentification Supabase
- ✅ Tu as 10 minutes devant toi

### Choisis Option 2 (SQLite) si:
- ✅ Tu veux développer rapidement
- ✅ Tu veux tester localement
- ✅ Tu configureras Supabase plus tard

---

## 📋 Checklist Option 1 (Supabase)

- [ ] Créer projet sur supabase.com
- [ ] Attendre que le projet soit "Active"
- [ ] Copier Project URL
- [ ] Copier anon key
- [ ] Copier service_role key
- [ ] Copier Connection pooling URL
- [ ] Copier Direct connection URL
- [ ] Mettre à jour `.env.local`
- [ ] Exécuter `npx prisma generate`
- [ ] Exécuter `npx prisma db push`
- [ ] Tester avec `node scripts/test-connection.js`
- [ ] Redémarrer avec `npm run dev`

## 📋 Checklist Option 2 (SQLite)

- [ ] Modifier `package.json` (ajouter prisma.schema)
- [ ] Supprimer `node_modules/.prisma`
- [ ] Exécuter `npx prisma generate`
- [ ] Exécuter `npx prisma db push`
- [ ] Commenter imports Supabase
- [ ] Redémarrer avec `npm run dev`

---

## 🧪 Test Final

Après avoir choisi une option:

```bash
# Test 1: Connexion DB
node scripts/test-connection.js
# Résultat attendu: ✅ Tous les tests sont passés

# Test 2: Démarrer l'app
npm run dev
# Résultat attendu: Aucune erreur

# Test 3: Ouvrir le navigateur
# http://localhost:3000
# Résultat attendu: Page d'accueil s'affiche
```

---

## 💡 Recommandation

**Je recommande l'Option 1 (Supabase)** car:
- C'est ce que tu utilises déjà
- Ça prend seulement 10 minutes
- Tu auras une vraie DB PostgreSQL
- Tu pourras déployer facilement

**Commence maintenant:**
1. Ouvre https://supabase.com dans un nouvel onglet
2. Crée un nouveau projet
3. Suis les étapes ci-dessus
4. Dans 10 minutes, tout fonctionnera! 🚀

---

## 🆘 Besoin d'Aide?

- **Guide détaillé**: `SUPABASE_NEW_PROJECT.md`
- **Problèmes**: `DATABASE_FIX.md`
- **Architecture**: `ARCHITECTURE.md`

---

**Bon courage! C'est la dernière étape avant que tout fonctionne! 💪**
