const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clearCVs() {
    try {
        console.log('\n🗑️ Suppression de tous les CVs...\n');

        // Compter les CVs avant suppression
        const countBefore = await prisma.cV.count();
        console.log(`📊 CVs avant suppression: ${countBefore}`);

        // Supprimer tous les CVs
        const result = await prisma.cV.deleteMany({});
        console.log(`✅ ${result.count} CVs supprimés`);

        // Remettre à zéro le compteur de tous les utilisateurs
        const userUpdate = await prisma.user.updateMany({
            data: {
                cvCount: 0,
            },
        });
        console.log(`✅ ${userUpdate.count} utilisateurs mis à jour (cvCount = 0)`);

        // Vérifier
        const countAfter = await prisma.cV.count();
        console.log(`📊 CVs après suppression: ${countAfter}`);

        console.log('\n✅ Base de données nettoyée !\n');

    } catch (error) {
        console.error('❌ Erreur:', error);
    } finally {
        await prisma.$disconnect();
    }
}

clearCVs();
