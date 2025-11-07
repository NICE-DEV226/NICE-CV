# Migration vers MongoDB

## ✅ Changements effectués

### 1. Schéma Prisma mis à jour
- Provider changé de `postgresql` à `mongodb`
- Tous les IDs convertis en ObjectId MongoDB
- Suppression de `directUrl` (non nécessaire pour MongoDB)
- Suppression des types PostgreSQL spécifiques (`@db.Text`)

### 2. Variables d'environnement
- `.env.local` et `.env.example` mis à jour
- Suppression des variables Supabase
- Ajout de `DATABASE_URL` pour MongoDB

### 3. Fichiers supprimés
- `lib/supabase.ts` - Client Supabase
- `supabase-init.sql` - Script d'initialisation SQL

## 🚀 Prochaines étapes

### 1. Créer un compte MongoDB Atlas (gratuit)
1. Allez sur https://cloud.mongodb.com
2. Créez un compte gratuit
3. Créez un nouveau cluster (M0 Sandbox - gratuit)
4. Attendez que le cluster soit créé (2-3 minutes)

### 2. Configurer l'accès à la base de données
1. Dans MongoDB Atlas, cliquez sur "Database Access"
2. Créez un utilisateur avec un mot de passe
3. Notez le nom d'utilisateur et le mot de passe

### 3. Configurer l'accès réseau
1. Cliquez sur "Network Access"
2. Ajoutez votre adresse IP ou `0.0.0.0/0` pour autoriser toutes les IPs (développement uniquement)

### 4. Obtenir la chaîne de connexion
1. Cliquez sur "Connect" sur votre cluster
2. Choisissez "Connect your application"
3. Copiez la chaîne de connexion
4. Remplacez `<password>` par votre mot de passe
5. Remplacez `<database>` par `nice-cv`

### 5. Mettre à jour .env.local
```bash
DATABASE_URL=mongodb+srv://votre-username:votre-password@cluster0.xxxxx.mongodb.net/nice-cv?retryWrites=true&w=majority
```

### 6. Installer les dépendances et générer Prisma
```bash
npm install
npx prisma generate
npx prisma db push
```

### 7. Vérifier la connexion
```bash
npm run test:db
```

## 📝 Avantages de MongoDB

- ✅ Pas de problèmes de connexion PostgreSQL
- ✅ Gratuit jusqu'à 512 MB (largement suffisant pour commencer)
- ✅ Facile à configurer
- ✅ Excellente performance
- ✅ Schéma flexible avec JSON natif
- ✅ Hébergement cloud géré

## 🔧 Commandes utiles

```bash
# Générer le client Prisma
npx prisma generate

# Pousser le schéma vers MongoDB
npx prisma db push

# Ouvrir Prisma Studio (interface graphique)
npx prisma studio

# Réinitialiser la base de données
npx prisma db push --force-reset
```

## ⚠️ Notes importantes

1. MongoDB utilise des ObjectId au lieu de CUID
2. Les relations fonctionnent différemment mais Prisma gère tout
3. Pas besoin de migrations avec MongoDB (utilisez `db push`)
4. Les index sont créés automatiquement pour les champs `@unique`

## 🆘 Besoin d'aide ?

Si vous rencontrez des problèmes :
1. Vérifiez que votre IP est autorisée dans MongoDB Atlas
2. Vérifiez que le mot de passe ne contient pas de caractères spéciaux (ou encodez-les)
3. Vérifiez que la chaîne de connexion est correcte
4. Consultez la documentation : https://www.prisma.io/docs/concepts/database-connectors/mongodb
