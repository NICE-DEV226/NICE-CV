const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixDashboard() {
  try {
    console.log('\n=== Diagnostic du problème ===\n');
    
    // 1. Compter les CVs
    const cvCount = await prisma.cV.count();
    console.log(`📊 CVs dans la base: ${cvCount}`);
    
    if (cvCount === 0) {
      console.log('✅ Pas de CVs, c\'est normal si vous venez de les supprimer\n');
      return;
    }
    
    // 2. Lister les CVs avec leurs utilisateurs
    const cvs = await prisma.cV.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    });
    
    console.log('\n📋 CVs trouvés:\n');
    cvs.forEach((cv, i) => {
      console.log(`${i + 1}. "${cv.title}"`);
      console.log(`   Créé par: ${cv.user.name} (${cv.user.email})`);
      console.log(`   CV ID: ${cv.id}`);
      console.log(`   User ID: ${cv.userId}\n`);
    });
    
    console.log('✅ Si vous êtes connecté avec un de ces emails, le CV devrait s\'afficher\n');
    console.log('⚠️  Si le CV ne s\'affiche pas, déconnectez-vous et reconnectez-vous\n');
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixDashboard();
