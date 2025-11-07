# 📋 Commandes à Exécuter

## 🎯 Ordre d'Exécution

### 1️⃣ Créer votre cluster MongoDB
👉 Suivez `MONGODB_QUICKSTART.md` (5 minutes)

### 2️⃣ Configurer .env.local
Éditez `.env.local` et remplacez DATABASE_URL :
```bash
DATABASE_URL=mongodb+srv://votre-user:votre-password@cluster0.xxxxx.mongodb.net/nice-cv?retryWrites=true&w=majority
```

### 3️⃣ Exécuter les commandes

#### Option A : Script Automatique (Recommandé)

**Windows :**
```bash
scripts\cleanup-and-setup.bat
```

**Linux/Mac :**
```bash
chmod +x scripts/cleanup-and-setup.sh
./scripts/cleanup-and-setup.sh
```

#### Option B : Commandes Manuelles

```bash
# 1. Supprimer les dépendances Supabase
npm uninstall @supabase/supabase-js @supabase/auth-helpers-nextjs @supabase/auth-helpers-react @supabase/auth-ui-react @supabase/auth-ui-shared @supabase/ssr

# 2. Installer les dépendances
npm install

# 3. Générer le client Prisma
npx prisma generate

# 4. Créer les collections MongoDB
npx prisma db push

# 5. Tester la connexion
npm run test:db

# 6. Démarrer l'application
npm run dev
```

## ✅ Vérification

Après `npm run test:db`, vous devriez voir :
```
✅ Connected to MongoDB successfully!
✅ Found 0 users
✅ Found 0 CVs
✅ All tests passed!
```

## 🚀 Démarrage

```bash
npm run dev
```

Ouvrez http://localhost:3000

## 🔧 Commandes Utiles

```bash
# Interface graphique pour voir vos données
npx prisma studio

# Régénérer le client Prisma
npx prisma generate

# Pousser le schéma vers MongoDB
npx prisma db push

# Réinitialiser la base de données
npx prisma db push --force-reset

# Tester la connexion
npm run test:db
```

## ❌ En cas d'erreur

### "MongoServerError: bad auth"
```bash
# Vérifiez votre mot de passe dans .env.local
# Assurez-vous qu'il n'y a pas d'espaces
```

### "connection timed out"
```bash
# Vérifiez que votre IP est autorisée dans MongoDB Atlas
# Network Access → Add IP Address → 0.0.0.0/0
```

### "Invalid connection string"
```bash
# Format correct :
# mongodb+srv://user:pass@cluster.mongodb.net/nice-cv?retryWrites=true&w=majority
```

### Erreur Prisma
```bash
# Régénérer le client
npx prisma generate

# Pousser le schéma
npx prisma db push
```

## 📚 Documentation

- **Guide rapide :** `MONGODB_QUICKSTART.md`
- **Guide détaillé :** `MONGODB_MIGRATION.md`
- **Problèmes :** `DATABASE_FIX.md`
- **Changements :** `MIGRATION_COMPLETE.md`

---

**Prêt ?** Commencez par créer votre cluster MongoDB ! 🚀
