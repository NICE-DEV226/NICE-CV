# 🚀 Configuration Supabase pour NICE-CV

Si votre projet Supabase actuel ne fonctionne pas, suivez ces étapes pour créer un nouveau projet.

## 📝 **Étape 1 : Créer un nouveau projet Supabase**

1. Allez sur [supabase.com](https://supabase.com)
2. Cliquez sur **"New Project"**
3. Configurez :
   - **Organization** : Votre organisation
   - **Name** : `nice-cv-production`
   - **Database Password** : Générez un mot de passe fort (NOTEZ-LE !)
   - **Region** : Europe West (Ireland)
4. Cliquez sur **"Create new project"**
5. ⏳ Attendez 2-3 minutes que le projet soit créé

## 🔑 **Étape 2 : Récupérer les informations de connexion**

### **A. URL du projet et clés API**
1. Allez dans **Settings → API**
2. Notez :
   - **Project URL** : `https://[VOTRE-REF].supabase.co`
   - **anon public key** : `eyJhbGci...`
   - **service_role key** : `eyJhbGci...` (gardez-la secrète !)

### **B. URL de la base de données**
1. Allez dans **Settings → Database**
2. Copiez l'**URL de connexion** :
   - **Connection string** : `postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres`
   - **Connection pooling** : `postgresql://postgres.[REF]:[PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:6543/postgres`

## 🗄️ **Étape 3 : Initialiser la base de données**

1. Dans votre projet Supabase, allez dans **SQL Editor**
2. Cliquez sur **"New query"**
3. Copiez le contenu du fichier `supabase-init.sql`
4. Cliquez sur **"Run"**
5. Vérifiez que toutes les tables sont créées dans **Table Editor**

## ⚙️ **Étape 4 : Mettre à jour votre .env.local**

Remplacez le contenu de votre fichier `.env.local` :

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="NICE-CV"
NEXT_PUBLIC_APP_DESCRIPTION="Créateur de CV Professionnel Premium"

# Database Configuration (REMPLACEZ avec vos nouvelles valeurs)
DATABASE_URL="postgresql://postgres:[VOTRE-PASSWORD]@db.[VOTRE-REF].supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[VOTRE-PASSWORD]@db.[VOTRE-REF].supabase.co:5432/postgres"

# Supabase Configuration (REMPLACEZ avec vos nouvelles valeurs)
NEXT_PUBLIC_SUPABASE_URL="https://[VOTRE-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[VOTRE-ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[VOTRE-SERVICE-ROLE-KEY]"

# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET="nice-cv-super-secret-key-development-2024"

# Google OAuth (Optionnel)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_PAYMENTS=false
NEXT_PUBLIC_ENABLE_GOOGLE_AUTH=false

# Build Configuration
NODE_ENV=development

# Security
JWT_SECRET="nice-cv-jwt-secret-key-development-2024"

# Premium Features
PREMIUM_PRICE_EUR=500
FREE_CV_LIMIT=3
PREMIUM_CV_LIMIT=10

# Development
NEXT_PUBLIC_DEBUG=true
```

## 🧪 **Étape 5 : Tester la nouvelle connexion**

1. **Régénérez Prisma** :
```bash
npx prisma generate
```

2. **Testez la connexion** :
   - http://localhost:3000/api/test-supabase
   - http://localhost:3000/api/test-db

3. **Si tout fonctionne**, testez l'inscription :
   - http://localhost:3000/auth/signup

## 🔧 **Dépannage**

### **Si la connexion échoue encore** :
1. Vérifiez que le projet est **"Active"** dans le dashboard
2. Vérifiez que l'URL et le mot de passe sont corrects
3. Essayez avec l'URL de connection pooling :
```env
DATABASE_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:6543/postgres"
```

### **Si les tables n'existent pas** :
1. Allez dans **SQL Editor**
2. Réexécutez le script `supabase-init.sql`
3. Vérifiez dans **Table Editor** que les tables sont créées

### **Si l'authentification ne fonctionne pas** :
1. Vérifiez que les RLS (Row Level Security) sont configurées
2. Testez d'abord avec l'API `/api/auth/register-supabase`

## 📞 **Support**

Si vous avez encore des problèmes :
1. Vérifiez les logs dans le dashboard Supabase
2. Consultez la documentation officielle Supabase
3. Vérifiez que votre région/pays n'a pas de restrictions d'accès

## ✅ **Checklist finale**

- [ ] Nouveau projet Supabase créé
- [ ] URL et clés récupérées
- [ ] Script SQL exécuté avec succès
- [ ] Tables visibles dans Table Editor
- [ ] `.env.local` mis à jour avec les nouvelles valeurs
- [ ] `npx prisma generate` exécuté
- [ ] Test `/api/test-supabase` réussi
- [ ] Test `/api/test-db` réussi
- [ ] Inscription test réussie

Une fois toutes ces étapes terminées, votre NICE-CV sera entièrement fonctionnel ! 🎉