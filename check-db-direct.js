const { PrismaClient } = require('@prisma/client');

async function checkDatabase() {
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

  try {
    console.log('\n=== Vérification de la base de données ===\n');
    
    // Afficher l'URL de connexion (masquée)
    const dbUrl = process.env.DATABASE_URL || 'Non définie';
    const maskedUrl = dbUrl.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@');
    console.log('📍 Database URL:', maskedUrl);
    
    // Compter les CVs
    const cvCount = await prisma.cV.count();
    console.log(`\n📊 Total CVs: ${cvCount}`);
    
    // Lister tous les CVs
    if (cvCount > 0) {
      const cvs = await prisma.cV.findMany({
        select: {
          id: true,
          title: true,
          userId: true,
          createdAt: true,
        },
        take: 20,
      });
      
      console.log('\n📋 Liste des CVs:\n');
      cvs.forEach((cv, index) => {
        console.log(`${index + 1}. ${cv.title}`);
        console.log(`   ID: ${cv.id}`);
        console.log(`   User ID: ${cv.userId}`);
        console.log(`   Créé: ${cv.createdAt}\n`);
      });
    }
    
    // Compter les utilisateurs
    const userCount = await prisma.user.count();
    console.log(`👥 Total utilisateurs: ${userCount}`);
    
    // Lister les utilisateurs avec leur cvCount
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        cvCount: true,
        plan: true,
      },
    });
    
    console.log('\n👤 Liste des utilisateurs:\n');
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name || 'Sans nom'} (${user.email})`);
      console.log(`   ID: ${user.id}`);
      console.log(`   CVs: ${user.cvCount}`);
      console.log(`   Plan: ${user.plan}\n`);
    });
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
