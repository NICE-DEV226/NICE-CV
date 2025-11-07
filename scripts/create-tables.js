#!/usr/bin/env node

/**
 * Script pour créer les tables dans Supabase
 * Usage: node scripts/create-tables.js
 */

require('dotenv').config({ path: '.env.local' });
const { execSync } = require('child_process');

console.log('🚀 Création des tables dans Supabase...\n');

// Vérifier les variables d'environnement
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL non défini dans .env.local');
  process.exit(1);
}

console.log('✓ Variables d\'environnement chargées');
console.log(`✓ DATABASE_URL: ${process.env.DATABASE_URL.substring(0, 40)}...\n`);

try {
  console.log('📦 Génération du client Prisma...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✓ Client Prisma généré\n');

  console.log('🔄 Synchronisation de la base de données...');
  execSync('npx prisma db push', { stdio: 'inherit' });
  console.log('✓ Tables créées avec succès!\n');

  console.log('═'.repeat(60));
  console.log('✅ Base de données initialisée avec succès!');
  console.log('═'.repeat(60));
  console.log('\n🎯 Prochaines étapes:');
  console.log('   1. Tester la connexion: node scripts/test-connection.js');
  console.log('   2. Démarrer l\'app: npm run dev');
  console.log('   3. Ouvrir: http://localhost:3000\n');

} catch (error) {
  console.error('\n❌ Erreur lors de la création des tables:', error.message);
  console.log('\n💡 Solution alternative:');
  console.log('   1. Va sur supabase.com → ton projet');
  console.log('   2. Clique sur "SQL Editor"');
  console.log('   3. Copie le contenu de supabase-init.sql');
  console.log('   4. Colle et exécute dans SQL Editor\n');
  process.exit(1);
}
