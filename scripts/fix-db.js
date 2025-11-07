#!/usr/bin/env node

/**
 * Script de réparation automatique de la connexion DB
 * Usage: node scripts/fix-db.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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

function exec(command, silent = false) {
  try {
    const output = execSync(command, { encoding: 'utf-8', stdio: silent ? 'pipe' : 'inherit' });
    return { success: true, output };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.clear();
  log('╔════════════════════════════════════════════════════════════╗', 'cyan');
  log('║     🔧 Script de Réparation - Connexion Base de Données   ║', 'cyan');
  log('╚════════════════════════════════════════════════════════════╝', 'cyan');
  console.log();

  // Étape 1: Vérifier .env.local
  log('📋 Étape 1: Vérification de .env.local', 'blue');
  const envPath = path.join(process.cwd(), '.env.local');
  
  if (!fs.existsSync(envPath)) {
    log('⚠ .env.local n\'existe pas', 'yellow');
    const create = await question('Voulez-vous le créer depuis .env.example? (o/n): ');
    
    if (create.toLowerCase() === 'o') {
      const examplePath = path.join(process.cwd(), '.env.example');
      if (fs.existsSync(examplePath)) {
        fs.copyFileSync(examplePath, envPath);
        log('✓ .env.local créé avec succès', 'green');
        log('⚠ N\'oubliez pas de configurer vos credentials Supabase!', 'yellow');
      } else {
        log('✗ .env.example n\'existe pas', 'red');
      }
    }
  } else {
    log('✓ .env.local existe', 'green');
  }
  console.log();

  // Étape 2: Nettoyer Prisma
  log('🧹 Étape 2: Nettoyage de Prisma', 'blue');
  const clean = await question('Voulez-vous nettoyer le cache Prisma? (o/n): ');
  
  if (clean.toLowerCase() === 'o') {
    log('Suppression du cache...', 'yellow');
    const prismaPath = path.join(process.cwd(), 'node_modules', '.prisma');
    if (fs.existsSync(prismaPath)) {
      fs.rmSync(prismaPath, { recursive: true, force: true });
      log('✓ Cache Prisma supprimé', 'green');
    }
  }
  console.log();

  // Étape 3: Générer Prisma Client
  log('📦 Étape 3: Génération de Prisma Client', 'blue');
  const generate = await question('Voulez-vous générer Prisma Client? (o/n): ');
  
  if (generate.toLowerCase() === 'o') {
    log('Génération en cours...', 'yellow');
    const result = exec('npx prisma generate');
    if (result.success) {
      log('✓ Prisma Client généré avec succès', 'green');
    } else {
      log('✗ Échec de la génération', 'red');
    }
  }
  console.log();

  // Étape 4: Synchroniser la base de données
  log('🔄 Étape 4: Synchronisation de la base de données', 'blue');
  const push = await question('Voulez-vous synchroniser la DB (db push)? (o/n): ');
  
  if (push.toLowerCase() === 'o') {
    log('Synchronisation en cours...', 'yellow');
    const result = exec('npx prisma db push');
    if (result.success) {
      log('✓ Base de données synchronisée', 'green');
    } else {
      log('✗ Échec de la synchronisation', 'red');
      log('Vérifiez vos credentials dans .env.local', 'yellow');
    }
  }
  console.log();

  // Étape 5: Tester la connexion
  log('🧪 Étape 5: Test de connexion', 'blue');
  const test = await question('Voulez-vous tester la connexion? (o/n): ');
  
  if (test.toLowerCase() === 'o') {
    log('Test en cours...', 'yellow');
    const result = exec('node scripts/diagnose-db.js');
    if (result.success) {
      log('✓ Test réussi', 'green');
    } else {
      log('⚠ Des problèmes ont été détectés', 'yellow');
    }
  }
  console.log();

  // Résumé
  log('═'.repeat(60), 'cyan');
  log('✅ Processus de réparation terminé!', 'green');
  log('═'.repeat(60), 'cyan');
  console.log();
  log('📖 Prochaines étapes:', 'blue');
  console.log('   1. Vérifiez votre .env.local');
  console.log('   2. Configurez vos credentials Supabase');
  console.log('   3. Redémarrez votre serveur: npm run dev');
  console.log('   4. Testez: http://localhost:3000/api/test-db');
  console.log();
  log('📚 Documentation:', 'blue');
  console.log('   - DATABASE_FIX.md - Guide de résolution détaillé');
  console.log('   - SUPABASE-SETUP.md - Configuration Supabase');
  console.log();

  rl.close();
}

main().catch(err => {
  console.error('❌ Erreur:', err);
  rl.close();
  process.exit(1);
});
