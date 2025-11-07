#!/usr/bin/env node

/**
 * Script pour tester le statut du projet Supabase
 */

require('dotenv').config({ path: '.env.local' });
const https = require('https');

console.log('🔍 Test du statut Supabase...\n');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !anonKey) {
  console.error('❌ Variables Supabase non définies');
  process.exit(1);
}

console.log(`📡 URL Supabase: ${supabaseUrl}`);
console.log(`🔑 Anon Key: ${anonKey.substring(0, 30)}...\n`);

// Test 1: Ping du serveur
console.log('Test 1: Ping du serveur Supabase...');
const url = new URL(supabaseUrl);

https.get(supabaseUrl, (res) => {
  console.log(`✓ Serveur accessible - Status: ${res.statusCode}\n`);
  
  // Test 2: Test de l'API REST
  console.log('Test 2: Test de l\'API REST...');
  const options = {
    hostname: url.hostname,
    path: '/rest/v1/',
    method: 'GET',
    headers: {
      'apikey': anonKey,
      'Authorization': `Bearer ${anonKey}`
    }
  };

  https.get(options, (res2) => {
    console.log(`✓ API REST accessible - Status: ${res2.statusCode}\n`);
    
    if (res2.statusCode === 200) {
      console.log('═'.repeat(60));
      console.log('✅ Supabase est opérationnel!');
      console.log('═'.repeat(60));
      console.log('\n💡 Le problème vient de la connexion PostgreSQL directe.');
      console.log('   Solutions:');
      console.log('   1. Attendre 2-3 minutes que le projet s\'initialise');
      console.log('   2. Vérifier que le projet est "Active" dans le dashboard');
      console.log('   3. Essayer de redémarrer le projet dans Supabase\n');
    }
  }).on('error', (err) => {
    console.error('❌ API REST inaccessible:', err.message);
  });

}).on('error', (err) => {
  console.error('❌ Serveur Supabase inaccessible:', err.message);
  console.log('\n💡 Solutions:');
  console.log('   1. Vérifier que l\'URL est correcte');
  console.log('   2. Vérifier ta connexion internet');
  console.log('   3. Vérifier que le projet existe sur supabase.com\n');
});
