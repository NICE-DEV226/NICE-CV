# 🔧 Guide de Résolution - Connexion Base de Données

## ✅ PROBLÈME RÉSOLU - Migration vers MongoDB

### 🎯 Problème Original
La connexion à Supabase/PostgreSQL échouait avec l'erreur "Tenant or user not found".

### 💡 Solution Appliquée
**Migration complète vers MongoDB Atlas**

Tous les fichiers ont été mis à jour pour utiliser MongoDB au lieu de Supabase PostgreSQL.

## 📚 Documentation de Migration

Consultez ces fichiers pour plus d'informations :

1. **`README_MIGRATION.md`** - Vue d'ensemble de la migration
2. **`MONGODB_QUICKSTART.md`** - Guide rapide de démarrage (5-10 min)
3. **`MONGODB_MIGRATION.md`** - Guide détaillé de migration
4. **`MIGRATION_COMPLETE.md`** - Récapitulatif des changements
5. **`SUPABASE_BACKUP.md`** - Backup de l'ancienne configuration

## 🚀 Prochaines Étapes

### 1. Créer un compte MongoDB Atlas (gratuit)
Allez sur https://cloud.mongodb.com et créez un compte gratuit.

### 2. Créer un cluster
- Choisissez le plan M0 (gratuit)
- Sélectionnez une région proche
- Attendez 2-3 minutes

### 3. Configurer l'accès
- Créez un utilisateur de base de données
- Autorisez votre IP (ou 0.0.0.0/0 pour le développement)

### 4. Obtenir la chaîne de connexion
Copiez votre connection string et mettez-la dans `.env.local` :

```bash
DATABASE_URL=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/nice-cv?retryWrites=true&w=majority
```

### 5. Installer et initialiser

#### Option A : Script automatique (Windows)
```bash
scripts\cleanup-and-setup.bat
```

#### Option B : Script automatique (Linux/Mac)
```bash
chmod +x scripts/cleanup-and-setup.sh
./scripts/cleanup-and-setup.sh
```

#### Option C : Commandes manuelles
```bash
# Supprimer les dépendances Supabase
npm uninstall @supabase/supabase-js @supabase/auth-helpers-nextjs @supabase/auth-helpers-react @supabase/auth-ui-react @supabase/auth-ui-shared @supabase/ssr

# Installer les dépendances
npm install

# Générer Prisma
npx prisma generate

# Créer les collections
npx prisma db push

# Tester la connexion
npm run test:db
```

### 6. Démarrer l'application
```bash
npm run dev
```

## ✅ Vérification

Si tout fonctionne, vous devriez voir :
```
✅ Connected to MongoDB successfully!
✅ Found 0 users
✅ Found 0 CVs
✅ All tests passed!
```

## 🎉 Avantages de MongoDB

- ✅ Connexion stable et fiable
- ✅ Setup simple (5 minutes)
- ✅ Gratuit jusqu'à 512 MB
- ✅ Excellente performance
- ✅ Support complet avec Prisma
- ✅ Pas de problèmes de connexion

## 🔧 Commandes Utiles

```bash
# Tester la connexion
npm run test:db

# Interface graphique pour voir les données
npx prisma studio

# Régénérer le client Prisma
npx prisma generate

# Pousser le schéma vers MongoDB
npx prisma db push

# Réinitialiser la base de données
npx prisma db push --force-reset
```

## ❌ Problèmes Courants

### Erreur : "MongoServerError: bad auth"
**Solution :** Vérifiez votre mot de passe dans DATABASE_URL

### Erreur : "connection timed out"
**Solution :** Vérifiez que votre IP est autorisée dans MongoDB Atlas (Network Access)

### Erreur : "Invalid connection string"
**Solution :** Vérifiez le format : `mongodb+srv://user:pass@cluster.mongodb.net/dbname`

## 📞 Support

- **MongoDB Community :** https://www.mongodb.com/community/forums
- **Prisma Discord :** https://pris.ly/discord
- **Documentation :** https://www.prisma.io/docs/concepts/database-connectors/mongodb

---

**Prêt à commencer ?** Ouvrez `MONGODB_QUICKSTART.md` ! 🚀
