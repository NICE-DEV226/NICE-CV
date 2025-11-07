const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkCVDetails() {
  try {
    const cvId = '690e577124e4dd84a55ab78e'; // L'ID du CV que vous modifiez
    
    const cv = await prisma.cV.findUnique({
      where: { id: cvId },
      select: {
        id: true,
        title: true,
        personalDetails: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    
    if (cv) {
      console.log('\n📋 Détails du CV:\n');
      console.log('ID:', cv.id);
      console.log('Titre:', cv.title);
      console.log('Créé:', cv.createdAt);
      console.log('Modifié:', cv.updatedAt);
      console.log('\nPersonalDetails:');
      console.log('  Nom:', cv.personalDetails.fullName);
      console.log('  Email:', cv.personalDetails.email);
      console.log('  Téléphone:', cv.personalDetails.phone);
      console.log('  Adresse:', cv.personalDetails.address);
      
      if (cv.personalDetails.profileImage) {
        console.log('  Image:', cv.personalDetails.profileImage.substring(0, 50) + '...');
      } else {
        console.log('  Image: ❌ Pas d\'image');
      }
    } else {
      console.log('CV non trouvé');
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCVDetails();
