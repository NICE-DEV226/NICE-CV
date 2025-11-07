const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testAPI() {
  try {
    // Test avec l'userId de Darkman (le dernier qui a créé un CV)
    const userId = "690de61dfa475191ac0d5bd5";
    
    console.log('\n🔍 Test API direct pour userId:', userId);
    
    // Récupérer les CVs
    const cvs = await prisma.cV.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    });
    
    console.log('✅ CVs trouvés:', cvs.length);
    cvs.forEach(cv => {
      console.log(`  - ${cv.title} (${cv.createdAt})`);
    });
    
    // Récupérer l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        email: true,
        name: true,
        cvCount: true,
        maxCvs: true,
      },
    });
    
    console.log('\n✅ User info:');
    console.log('  Email:', user.email);
    console.log('  Name:', user.name);
    console.log('  CVs count:', user.cvCount);
    console.log('  Max CVs:', user.maxCvs);
    
    console.log('\n✅ L\'API devrait retourner ces données\n');
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAPI();
