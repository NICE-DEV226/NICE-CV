const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function testMongoDBConnection() {
  console.log('🧪 Testing MongoDB connection via Prisma...\n');

  try {
    // Test 1: Connection
    console.log('1️⃣ Testing database connection...');
    await prisma.$connect();
    console.log('✅ Connected to MongoDB successfully!\n');

    // Test 2: Count users
    console.log('2️⃣ Counting users...');
    const userCount = await prisma.user.count();
    console.log(`✅ Found ${userCount} users\n`);

    // Test 3: List users
    if (userCount > 0) {
      console.log('3️⃣ Listing users...');
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          plan: true,
          cvCount: true,
          createdAt: true,
        },
        take: 5,
      });
      console.log('✅ Users:', JSON.stringify(users, null, 2));
      console.log('');
    }

    // Test 4: Count CVs
    console.log('4️⃣ Counting CVs...');
    const cvCount = await prisma.cV.count();
    console.log(`✅ Found ${cvCount} CVs\n`);

    // Test 5: Database info
    console.log('5️⃣ Database information:');
    console.log('   Provider: MongoDB');
    console.log('   Connection: Prisma Client');
    console.log('   Status: ✅ All tests passed!\n');

    console.log('🎉 MongoDB connection test completed successfully!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Run: npx prisma studio (to view your data)');
    console.log('2. Run: npm run dev (to start your app)');

  } catch (error) {
    console.error('❌ MongoDB connection test failed!');
    console.error('Error:', error.message);
    console.error('');
    console.error('Troubleshooting:');
    console.error('1. Check your DATABASE_URL in .env.local');
    console.error('2. Verify your MongoDB Atlas cluster is running');
    console.error('3. Check your IP is whitelisted in MongoDB Atlas');
    console.error('4. Verify username and password are correct');
    console.error('5. Run: npx prisma generate');
    console.error('6. Run: npx prisma db push');
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testMongoDBConnection();
