// Script pour tester l'API directement
const fetch = require('node-fetch');

async function testAPI() {
  try {
    console.log('\n🔍 Test de l\'API /api/cv/list\n');
    
    // Vous devez remplacer ce token par un vrai token de votre localStorage
    const token = 'VOTRE_TOKEN_ICI';
    
    const response = await fetch('http://localhost:3000/api/cv/list', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    
    console.log('Status:', response.status);
    console.log('Data:', JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testAPI();
