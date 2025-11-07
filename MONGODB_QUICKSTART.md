# 🚀 Guide Rapide MongoDB

## Étape 1 : Créer un compte MongoDB Atlas (2 minutes)

1. Allez sur https://cloud.mongodb.com
2. Cliquez sur "Try Free"
3. Créez un compte (Google/GitHub ou email)

## Étape 2 : Créer un cluster (3 minutes)

1. Choisissez "M0 FREE" (gratuit pour toujours)
2. Sélectionnez une région proche (ex: Frankfurt, Paris)
3. Nommez votre cluster (ex: "nice-cv-cluster")
4. Cliquez sur "Create Deployment"

## Étape 3 : Créer un utilisateur de base de données

1. Créez un nom d'utilisateur (ex: `nicecv`)
2. Créez un mot de passe fort (notez-le !)
3. Cliquez sur "Create Database User"

## Étape 4 : Autoriser l'accès réseau

1. Cliquez sur "Add IP Address"
2. Choisissez "Allow Access from Anywhere" (0.0.0.0/0)
3. Cliquez sur "Add Entry"

## Étape 5 : Obtenir la chaîne de connexion

1. Cliquez sur "Connect" sur votre cluster
2. Choisissez "Drivers"
3. Copiez la chaîne de connexion
4. Elle ressemble à : `mongodb+srv://nicecv:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

## Étape 6 : Configurer votre projet

1. Ouvrez `.env.local`
2. Remplacez `DATABASE_URL` par votre chaîne de connexion
3. Remplacez `<password>` par votre mot de passe
4. Ajoutez `/nice-cv` après `.net` :

```bash
DATABASE_URL=mongodb+srv://nicecv:VOTRE_MOT_DE_PASSE@cluster0.xxxxx.mongodb.net/nice-cv?retryWrites=true&w=majority
```

## Étape 7 : Installer et initialiser

```bash
# Supprimer les anciennes dépendances Supabase
npm uninstall @supabase/supabase-js @supabase/auth-helpers-nextjs @supabase/auth-helpers-react @supabase/auth-ui-react @supabase/auth-ui-shared @supabase/ssr

# Installer les dépendances
npm install

# Générer le client Prisma
npx prisma generate

# Créer les collections MongoDB
npx prisma db push

# Tester la connexion
npm run test:db
```

## Étape 8 : Démarrer l'application

```bash
npm run dev
```

Ouvrez http://localhost:3000 🎉

## ✅ Vérification

Si tout fonctionne, vous devriez voir :
- ✅ Connected to MongoDB successfully!
- ✅ Found 0 users
- ✅ Found 0 CVs

## 🔧 Commandes utiles

```bash
# Voir vos données (interface graphique)
npx prisma studio

# Réinitialiser la base de données
npx prisma db push --force-reset

# Tester la connexion
npm run test:db
```

## ❌ Problèmes courants

### Erreur : "MongoServerError: bad auth"
- Vérifiez votre mot de passe dans DATABASE_URL
- Assurez-vous qu'il n'y a pas d'espaces

### Erreur : "connection timed out"
- Vérifiez que votre IP est autorisée (0.0.0.0/0)
- Attendez 1-2 minutes après avoir ajouté l'IP

### Erreur : "Invalid connection string"
- Vérifiez le format : `mongodb+srv://user:pass@cluster.mongodb.net/dbname`
- Assurez-vous d'avoir ajouté `/nice-cv` après `.net`

## 📚 Ressources

- MongoDB Atlas : https://cloud.mongodb.com
- Prisma + MongoDB : https://www.prisma.io/docs/concepts/database-connectors/mongodb
- Support : https://www.mongodb.com/community/forums
