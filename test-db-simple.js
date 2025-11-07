const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('🔍 Test de connexion MongoDB...\n');

    // Test 1: Connexion
    await prisma.$connect();
    console.log('✅ Connexion MongoDB réussie !');

    // Test 2: Compter les utilisateurs
    const userCount = await prisma.user.count();
    console.log(`✅ Nombre d'utilisateurs: ${userCount}`);

    // Test 3: Compter les CVs
    const cvCount = await prisma.cV.count();
    console.log(`✅ Nombre de CVs: ${cvCount}`);

    // Test 4: Récupérer un utilisateur
    const users = await prisma.user.findMany({
      take: 1,
      select: {
        id: true,
        email: true,
        name: true,
        cvCount: true,
        maxCvs: true,
        plan: true,
      }
    });

    if (users.length > 0) {
      console.log('\n✅ Exemple d\'utilisateur:');
      console.log(JSON.stringify(users[0], null, 2));
    }

    // Test 5: Récupérer un CV
    const cvs = await prisma.cV.findMany({
      take: 1,
      select: {
        id: true,
        title: true,
        userId: true,
        createdAt: true,
      }
    });

    if (cvs.length > 0) {
      console.log('\n✅ Exemple de CV:');
      console.log(JSON.stringify(cvs[0], null, 2));
    }

    console.log('\n✅ TOUS LES TESTS RÉUSSIS !');
    console.log('✅ La base de données fonctionne correctement.\n');

  } catch (error) {
    console.error('\n❌ ERREUR:', error.message);
    console.error('\n🔧 Vérifiez:');
    console.error('   1. DATABASE_URL dans .env.local');
    console.error('   2. Connexion internet');
    console.error('   3. MongoDB Atlas accessible');
    console.error('   4. npx prisma generate a été exécuté\n');
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
