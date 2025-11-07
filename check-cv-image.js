const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkCVImage() {
  try {
    const cvs = await prisma.cV.findMany({
      select: {
        id: true,
        title: true,
        personalDetails: true,
      },
      take: 5,
    });
    
    console.log('\n📋 Vérification des images de profil:\n');
    
    cvs.forEach((cv, index) => {
      console.log(`${index + 1}. ${cv.title}`);
      console.log(`   ID: ${cv.id}`);
      
      if (cv.personalDetails && typeof cv.personalDetails === 'object') {
        const details = cv.personalDetails;
        console.log(`   Nom: ${details.fullName || 'N/A'}`);
        console.log(`   Email: ${details.email || 'N/A'}`);
        
        if (details.profileImage) {
          const imageLength = details.profileImage.length;
          const imagePreview = details.profileImage.substring(0, 50);
          console.log(`   ✅ Image présente (${imageLength} caractères)`);
          console.log(`   Début: ${imagePreview}...`);
        } else {
          console.log(`   ❌ Pas d'image`);
        }
      } else {
        console.log(`   ⚠️  personalDetails invalide`);
      }
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCVImage();
