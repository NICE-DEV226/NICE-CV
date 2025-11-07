const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkCVs() {
  try {
    const cvs = await prisma.cV.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          }
        }
      }
    });
    
    console.log(`\n📊 Total CVs dans la base: ${cvs.length}\n`);
    
    if (cvs.length > 0) {
      cvs.forEach((cv, index) => {
        console.log(`${index + 1}. ${cv.title} (ID: ${cv.id})`);
        console.log(`   User: ${cv.user?.name || 'N/A'} (${cv.user?.email || 'N/A'})`);
        console.log(`   Created: ${cv.createdAt}\n`);
      });
    } else {
      console.log('✅ Aucun CV dans la base de données\n');
    }

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCVs();
