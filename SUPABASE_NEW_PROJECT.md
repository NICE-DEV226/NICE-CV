# 🚀 Créer un Nouveau Projet Supabase - Guide Complet

## ⚠️ Problème Actuel

Le serveur Supabase actuel (`db.errdrrkyxtnlklhxfivb.supabase.co`) n'est pas accessible.

**Solutions possibles:**
1. Le projet Supabase a été supprimé ou mis en pause
2. Les credentials ont changé
3. Le projet est dans une région différente

## ✅ Solution: Créer un Nouveau Projet

### Étape 1: Créer le Projet Supabase

1. **Aller sur Supabase**
   - Visite: https://supabase.com
   - Connecte-toi ou crée un compte

2. **Créer un Nouveau Projet**
   - Clique sur "New Project"
   - Remplis les informations:
     - **Name**: `nice-cv-production` (ou ton choix)
     - **Database Password**: Génère un mot de passe fort
     - **Region**: `Europe West (Ireland)` ou le plus proche
     - **Pricing Plan**: Free (suffisant pour commencer)
   
3. **Attendre la Création**
   - ⏳ Cela prend 2-3 minutes
   - Le projet sera prêt quand le statut est "Active"

### Étape 2: Récupérer les Credentials

#### A. URL et Clés API

1. Va dans **Settings → API**
2. Note ces informations:

```
Project URL: https://[VOTRE-REF].supabase.co
anon public key: eyJhbGci...
service_role key: eyJhbGci... (GARDEZ-LA SECRÈTE!)
```

#### B. URL de la Base de Données

1. Va dans **Settings → Database**
2. Scroll jusqu'à "Connection string"
3. Note ces deux URLs:

**Connection Pooling (Recommandé):**
```
postgresql://postgres.[REF]:[PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

**Direct Connection:**
```
postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres
```

### Étape 3: Mettre à Jour `.env.local`

Remplace le contenu de ton fichier `.env.local`:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="NICE-CV"
NEXT_PUBLIC_APP_DESCRIPTION="Créateur de CV Professionnel Premium"

# ⚠️ REMPLACE CES VALEURS AVEC TES NOUVELLES CREDENTIALS ⚠️

# Database Configuration
# Option 1: Connection Pooling (Recommandé)
DATABASE_URL="postgresql://postgres.[VOTRE-REF]:[VOTRE-PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Option 2: Direct Connection (pour les migrations)
DIRECT_URL="postgresql://postgres:[VOTRE-PASSWORD]@db.[VOTRE-REF].supabase.co:5432/postgres"

# Supabase Configuration
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

### Étape 4: Créer les Tables dans Supabase

#### Option A: Via Prisma (Recommandé)

```bash
# 1. Générer le client Prisma
npx prisma generate

# 2. Créer les tables
npx prisma db push

# 3. Vérifier
node scripts/test-connection.js
```

#### Option B: Via SQL Editor (Manuel)

1. Va dans **SQL Editor** dans Supabase
2. Clique sur "New query"
3. Copie et exécute ce SQL:

```sql
-- Créer les tables pour NICE-CV

-- Table Users
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  email_verified TIMESTAMP,
  image TEXT,
  password TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  plan TEXT DEFAULT 'FREE',
  plan_expires_at TIMESTAMP,
  stripe_customer_id TEXT,
  cv_count INTEGER DEFAULT 0,
  max_cvs INTEGER DEFAULT 3
);

-- Table CVs
CREATE TABLE IF NOT EXISTS cvs (
  id TEXT PRIMARY KEY,
  title TEXT DEFAULT 'Mon CV',
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  personal_details JSONB,
  experiences JSONB,
  educations JSONB,
  languages JSONB,
  skills JSONB,
  hobbies JSONB,
  theme TEXT DEFAULT 'nice-theme',
  template TEXT DEFAULT 'classic',
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table Payments
CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_session_id TEXT UNIQUE NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'eur',
  status TEXT DEFAULT 'PENDING',
  plan TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table Templates
CREATE TABLE IF NOT EXISTS templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  preview TEXT NOT NULL,
  category TEXT NOT NULL,
  is_premium BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  config JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_cvs_user_id ON cvs(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE cvs ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Policies RLS
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid()::text = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid()::text = id);

CREATE POLICY "Users can view own CVs" ON cvs
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create own CVs" ON cvs
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own CVs" ON cvs
  FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete own CVs" ON cvs
  FOR DELETE USING (auth.uid()::text = user_id);
```

4. Clique sur "Run" pour exécuter

### Étape 5: Tester la Connexion

```bash
# Test de connexion
node scripts/test-connection.js

# Si succès, tu devrais voir:
# ✅ Tous les tests sont passés avec succès!
```

### Étape 6: Redémarrer l'Application

```bash
# Arrêter le serveur (Ctrl+C si en cours)

# Nettoyer le cache
rm -rf .next

# Redémarrer
npm run dev
```

### Étape 7: Tester l'Application

1. **Page d'accueil**: http://localhost:3000
2. **Test DB**: http://localhost:3000/api/test-db
3. **Test Supabase**: http://localhost:3000/api/test-supabase
4. **Inscription**: http://localhost:3000/auth/signup

## 🔍 Vérification

### Checklist Complète

- [ ] Nouveau projet Supabase créé
- [ ] Projet est "Active" (pas "Paused")
- [ ] URL et clés récupérées
- [ ] `.env.local` mis à jour avec les nouvelles valeurs
- [ ] Tables créées (via Prisma ou SQL)
- [ ] `npx prisma generate` exécuté
- [ ] Test de connexion réussi
- [ ] Serveur redémarré
- [ ] Application fonctionne

## 🆘 Dépannage

### Erreur: "Can't reach database server"
- ✅ Vérifier que le projet Supabase est "Active"
- ✅ Vérifier l'URL dans `.env.local`
- ✅ Vérifier votre connexion internet
- ✅ Essayer avec DIRECT_URL au lieu de DATABASE_URL

### Erreur: "Authentication failed"
- ✅ Vérifier le mot de passe dans l'URL
- ✅ Régénérer le mot de passe dans Supabase
- ✅ Mettre à jour `.env.local`

### Erreur: "Relation does not exist"
- ✅ Les tables n'existent pas
- ✅ Exécuter `npx prisma db push`
- ✅ Ou créer les tables via SQL Editor

## 💡 Conseils

1. **Sauvegarde tes credentials**: Note-les dans un endroit sûr
2. **Ne commit jamais `.env.local`**: C'est dans `.gitignore`
3. **Utilise Connection Pooling**: Meilleure performance
4. **Active RLS**: Pour la sécurité des données
5. **Backup régulier**: Exporte ta DB régulièrement

## 📊 Limites du Plan Gratuit

- **Database**: 500 MB
- **Bandwidth**: 5 GB
- **API Requests**: Illimité
- **Auth Users**: 50,000

C'est largement suffisant pour commencer!

## 🎯 Prochaines Étapes

Une fois la connexion établie:

1. ✅ Créer un compte test
2. ✅ Créer un CV test
3. ✅ Tester l'export PDF
4. ✅ Tester les thèmes
5. ✅ Développer les nouvelles features

## 📞 Support

Si tu as encore des problèmes:
1. Vérifie les logs Supabase (Logs → Database)
2. Vérifie les logs de ton application
3. Consulte la doc Supabase: https://supabase.com/docs
4. Consulte DATABASE_FIX.md

---

**Bon courage! Une fois configuré, tout fonctionnera parfaitement! 🚀**
