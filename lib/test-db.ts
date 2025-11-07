import { prisma } from "./prisma";

export async function testDatabaseConnection() {
  try {
    console.log("🔍 Testing database connection...");

    // Test basic connection
    await prisma.$connect();
    console.log("✅ Database connection successful");

    // Test query
    const userCount = await prisma.user.count();
    console.log(`✅ Database query successful - Found ${userCount} users`);

    // Test table existence
    const tables = await prisma.$queryRaw`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
    `;
    console.log("✅ Available tables:", tables);

    return { success: true, userCount, tables };
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}

export async function createTestUser() {
  try {
    const testUser = await prisma.user.create({
      data: {
        name: "Test User",
        email: "test@nice-cv.com",
        password: "test123456",
        plan: "FREE",
        cvCount: 0,
        maxCvs: 3,
      },
    });

    console.log("✅ Test user created:", testUser);
    return testUser;
  } catch (error) {
    console.error("❌ Failed to create test user:", error);
    throw error;
  }
}
