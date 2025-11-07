# 📦 Backup Configuration Supabase

Ce fichier contient les anciennes configurations Supabase au cas où vous voudriez revenir en arrière.

## Variables d'environnement Supabase

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://kgzpeagamjwusxuecrgd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnenBlYWdhbWp3dXN4dWVjcmdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NjMwNDAsImV4cCI6MjA3ODAzOTA0MH0.ljlqkbZpHRiU_mC8fb8L1lYjYUyNr33UIUzyEf_DA40
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnenBlYWdhbWp3dXN4dWVjcmdkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjQ2MzA0MCwiZXhwIjoyMDc4MDM5MDQwfQ.qV5KqXa0F72LLSaMZW1SeRmT7ZyBYidxvqM4XYOqF70

# Database URLs
DATABASE_URL=postgresql://postgres.kgzpeagamjwusxuecrgd:93UmlkszhqMZ8j5M@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
DIRECT_URL=postgresql://postgres:93UmlkszhqMZ8j5M@db.kgzpeagamjwusxuecrgd.supabase.co:5432/postgres
```

## Dépendances Supabase (package.json)

```json
"@supabase/auth-helpers-nextjs": "^0.10.0",
"@supabase/auth-helpers-react": "^0.5.0",
"@supabase/auth-ui-react": "^0.4.7",
"@supabase/auth-ui-shared": "^0.1.8",
"@supabase/ssr": "^0.7.0",
"@supabase/supabase-js": "^2.80.0",
```

## Schéma Prisma PostgreSQL

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

// IDs utilisaient @default(cuid()) au lieu de @default(auto()) @map("_id") @db.ObjectId
// Les champs texte utilisaient @db.Text
```

## Problèmes rencontrés avec Supabase

1. **Erreur de connexion directe PostgreSQL**
   - "Tenant or user not found"
   - Connexion via pooler fonctionnait partiellement
   - Connexion directe échouait systématiquement

2. **Complexité de configuration**
   - Deux URLs nécessaires (DATABASE_URL et DIRECT_URL)
   - Configuration du pooler PgBouncer
   - Gestion des clés API multiples

3. **Limitations du plan gratuit**
   - Connexions limitées
   - Performances variables
   - Timeouts fréquents

## Pour revenir à Supabase

Si vous voulez revenir à Supabase :

1. Restaurer le schéma Prisma PostgreSQL
2. Réinstaller les dépendances Supabase
3. Restaurer les variables d'environnement
4. Recréer `lib/supabase.ts`
5. Restaurer les routes API Supabase
6. Exécuter `npx prisma generate` et `npx prisma db push`

**Note:** Ce n'est pas recommandé car les problèmes de connexion persisteront.

## Raison de la migration

La migration vers MongoDB a été effectuée pour résoudre les problèmes de connexion persistants avec Supabase PostgreSQL. MongoDB offre :
- Une connexion stable et fiable
- Une configuration plus simple
- De meilleures performances pour les documents JSON
- Un plan gratuit généreux (512 MB)
- Une excellente intégration avec Prisma

---

**Date de backup:** 2025-01-06
**Projet:** NICE-CV
**Migration:** Supabase PostgreSQL → MongoDB Atlas
