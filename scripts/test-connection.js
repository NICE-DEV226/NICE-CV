#!/usr/bin/env node

/**
 * Script de test de connexion à la base de données
 * Charge automatiquement les variables d'environnement
 */

// Charger les variables d'environnement depuis .env.local
require('dotenv').config({ path: '.env.local' });

const { PrismaClient } = require('@prisma/client');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(msg, color = 'reset') {
  console.log(`${colors[color]}${msg}${colors.reset}`);
}

async function testConnection() {
  console.log();
  log('═'.repeat(60), 'cyan');
  log('  🔌 Test de Connexion à la Base de Données', 'cyan');
  log('═'.repeat(60), 'cyan');
  console.log();

  // Vérifier les variables d'environnement
  log('📋 Variables d\'environnement:', 'blue');
  if (process.env.DATABASE_URL) {
    log(`✓ DATABASE_URL: ${process.env.DATABASE_URL.substring(0, 40)}...`, 'green');
  } else {
    log('✗ DATABASE_URL non défini', 'red');
    return false;
  }

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    log(`✓ SUPABASE_URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`, 'green');
  } else {
    log('⚠ SUPABASE_URL non défini', 'yellow');
  }
  console.log();

  // Tester la connexion
  log('🔌 Test de connexion...', 'blue');
  const prisma = new PrismaClient({
    log: ['error', 'warn'],
  });

  try {
    // Test 1: Connexion
    log('   → Connexion à la base de données...', 'yellow');
    await prisma.$connect();
    log('   ✓ Connexion réussie!', 'green');

    // Test 2: Requête simple
    log('   → Test de requête...', 'yellow');
    const userCount = await prisma.user.count();
    log(`   ✓ Requête réussie - ${userCount} utilisateur(s)`, 'green');

    // Test 3: Vérifier les tables
    log('   → Vérification des tables...', 'yellow');
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
    `;
    log(`   ✓ ${tables.length} table(s) trouvée(s)`, 'green');
    
    if (tables.length > 0) {
      console.log();
      log('📊 Tables disponibles:', 'blue');
      tables.forEach(t => {
        console.log(`   - ${t.table_name}`);
      });
    }

    await prisma.$disconnect();
    console.log();
    log('═'.repeat(60), 'cyan');
    log('✅ Tous les tests sont passés avec succès!', 'green');
    log('═'.repeat(60), 'cyan');
    console.log();
    
    return true;

  } catch (error) {
    console.log();
    log('═'.repeat(60), 'red');
    log('❌ Échec de la connexion', 'red');
    log('═'.repeat(60), 'red');
    console.log();
    
    log('Erreur:', 'red');
    console.error(error.message);
    console.log();

    // Suggestions basées sur l'erreur
    if (error.message.includes('ENOTFOUND') || error.message.includes('ETIMEDOUT')) {
      log('💡 Suggestions:', 'yellow');
      console.log('   - Vérifiez votre connexion internet');
      console.log('   - Vérifiez que l\'URL Supabase est correcte');
      console.log('   - Vérifiez que le projet Supabase est actif');
    } else if (error.message.includes('authentication failed') || error.message.includes('password')) {
      log('💡 Suggestions:', 'yellow');
      console.log('   - Vérifiez le mot de passe dans DATABASE_URL');
      console.log('   - Vérifiez que les credentials Supabase sont à jour');
      console.log('   - Allez sur supabase.com pour récupérer les bonnes credentials');
    } else if (error.message.includes('does not exist') || error.message.includes('relation')) {
      log('💡 Suggestions:', 'yellow');
      console.log('   - Les tables n\'existent pas encore');
      console.log('   - Exécutez: npx prisma db push');
      console.log('   - Ou: npx prisma migrate dev');
    } else if (error.message.includes('SSL') || error.message.includes('certificate')) {
      log('💡 Suggestions:', 'yellow');
      console.log('   - Ajoutez ?sslmode=require à la fin de DATABASE_URL');
    }

    console.log();
    log('📖 Documentation:', 'blue');
    console.log('   - Consultez DATABASE_FIX.md pour plus d\'aide');
    console.log('   - Consultez SUPABASE-SETUP.md pour la configuration');
    console.log();

    await prisma.$disconnect();
    return false;
  }
}

// Exécuter le test
testConnection()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(err => {
    console.error('❌ Erreur fatale:', err);
    process.exit(1);
  });
