const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin(email, password) {
    if (!email || !password) {
        console.error('Usage: node scripts/create-admin.js <email> <password>');
        process.exit(1);
    }

    try {
        // Check if admin exists
        const existing = await prisma.admin.findUnique({
            where: { email },
        });

        if (existing) {
            console.log('⚠️ Admin already exists. Updating password...');
            const hashedPassword = await bcrypt.hash(password, 10);
            await prisma.admin.update({
                where: { email },
                data: { password: hashedPassword },
            });
            console.log('✅ Admin password updated.');
        } else {
            console.log('Creating new admin...');
            const hashedPassword = await bcrypt.hash(password, 10);
            await prisma.admin.create({
                data: {
                    email,
                    password: hashedPassword,
                    name: 'Super Admin',
                },
            });
            console.log(`✅ Admin ${email} created successfully!`);
        }
    } catch (error) {
        console.error('Error creating admin:', error);
    } finally {
        await prisma.$disconnect();
    }
}

const email = process.argv[2];
const password = process.argv[3];
createAdmin(email, password);
