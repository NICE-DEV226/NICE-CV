#!/usr/bin/env node

/**
 * Script de diagnostic de la connexion à la base de données
 * Usage: node scripts/diagnose-db.js
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

console.log('🔍 Diagnostic de la connexion à la base de données\n');

// Couleurs pour le terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function success(msg) {
  console.log(`${colors.green}✓${colors.reset} ${msg}`);
}

function error(msg) {
  console.log(`${colors.red}✗${colors.reset} ${msg}`);
}

function warning(msg) {
  console.log(`${colors.yellow}⚠${colors.reset} ${msg}`);
}

function info(msg) {
  console.log(`${colors.blue}ℹ${colors.reset} ${msg}`);
}

async function diagnose() {
  let hasErrors = false;

  // 1. Vérifier .env.local
  console.log('\n📋 Étape 1: Vérification des fichiers de configuration\n');
  
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    success('.env.local existe');
    
    const envContent = fs.readFileSync(envPath, 'utf-8');
    
    if (envContent.includes('DATABASE_URL=')) {
      success('DATABASE_URL est défini');
    } else {
      error('DATABASE_URL n\'est pas défini');
      hasErrors = true;
    }
    
    if (envContent.includes('DIRECT_URL=')) {
      success('DIRECT_URL est défini');
    } else {
      warning('DIRECT_URL n\'est pas défini (optionnel mais recommandé)');
    }
    
    if (envContent.includes('NEXT_PUBLIC_SUPABASE_URL=')) {
      success('NEXT_PUBLIC_SUPABASE_URL est défini');
    } else {
      error('NEXT_PUBLIC_SUPABASE_URL n\'est pas défini');
      hasErrors = true;
    }
  } else {
    error('.env.local n\'existe pas');
    info('Copiez .env.example vers .env.local et configurez-le');
    hasErrors = true;
  }

  // 2. Vérifier les variables d'environnement
  console.log('\n🔐 Étape 2: Vérification des variables d\'environnement\n');
  
  if (process.env.DATABASE_URL) {
    success('DATABASE_URL est chargé');
    info(`URL: ${process.env.DATABASE_URL.substring(0, 30)}...`);
  } else {
    error('DATABASE_URL n\'est pas chargé');
    warning('Redémarrez votre serveur après avoir modifié .env.local');
    hasErrors = true;
  }

  if (process.env.DIRECT_URL) {
    success('DIRECT_URL est chargé');
  } else {
    warning('DIRECT_URL n\'est pas chargé (optionnel)');
  }

  // 3. Tester la connexion Prisma
  console.log('\n🔌 Étape 3: Test de connexion à la base de données\n');
  
  if (!hasErrors) {
    try {
      const prisma = new PrismaClient();
      
      info('Tentative de connexion...');
      await prisma.$connect();
      success('Connexion à la base de données réussie!');
      
      info('Test de requête...');
      const userCount = await prisma.user.count();
      success(`Requête réussie - ${userCount} utilisateur(s) trouvé(s)`);
      
      await prisma.$disconnect();
      success('Déconnexion réussie');
      
    } catch (err) {
      error('Échec de la connexion à la base de données');
      console.error('\n❌ Erreur détaillée:');
      console.error(err.message);
      hasErrors = true;
      
      // Suggestions basées sur l'erreur
      if (err.message.includes('ENOTFOUND') || err.message.includes('ETIMEDOUT')) {
        warning('\n💡 Suggestions:');
        console.log('   - Vérifiez votre connexion internet');
        console.log('   - Vérifiez que l\'URL Supabase est correcte');
        console.log('   - Vérifiez que le projet Supabase est actif');
      } else if (err.message.includes('authentication failed')) {
        warning('\n💡 Suggestions:');
        console.log('   - Vérifiez le mot de passe dans DATABASE_URL');
        console.log('   - Vérifiez que les credentials Supabase sont à jour');
      } else if (err.message.includes('does not exist')) {
        warning('\n💡 Suggestions:');
        console.log('   - Exécutez: npx prisma db push');
        console.log('   - Ou: npx prisma migrate dev');
      }
    }
  }

  // 4. Vérifier Prisma Client
  console.log('\n📦 Étape 4: Vérification de Prisma Client\n');
  
  const prismaClientPath = path.join(process.cwd(), 'node_modules', '.prisma', 'client');
  if (fs.existsSync(prismaClientPath)) {
    success('Prisma Client est généré');
  } else {
    error('Prisma Client n\'est pas généré');
    info('Exécutez: npx prisma generate');
    hasErrors = true;
  }

  // 5. Résumé
  console.log('\n' + '='.repeat(60));
  if (hasErrors) {
    console.log(`\n${colors.red}❌ Des problèmes ont été détectés${colors.reset}\n`);
    console.log('📖 Consultez DATABASE_FIX.md pour les solutions détaillées');
    console.log('\n🔧 Actions recommandées:');
    console.log('   1. Vérifiez votre fichier .env.local');
    console.log('   2. Exécutez: npx prisma generate');
    console.log('   3. Exécutez: npx prisma db push');
    console.log('   4. Redémarrez votre serveur: npm run dev');
  } else {
    console.log(`\n${colors.green}✅ Tout fonctionne correctement!${colors.reset}\n`);
    console.log('Votre connexion à la base de données est opérationnelle.');
  }
  console.log('\n' + '='.repeat(60) + '\n');

  process.exit(hasErrors ? 1 : 0);
}

// Exécuter le diagnostic
diagnose().catch((err) => {
  console.error('\n❌ Erreur lors du diagnostic:', err);
  process.exit(1);
});
