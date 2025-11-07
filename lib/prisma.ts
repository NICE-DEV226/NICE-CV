import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Helper function to handle connection issues
export async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log("✅ Connected to Supabase database");
    return true;
  } catch (error) {
    console.error("❌ Failed to connect to database:", error);
    return false;
  }
}

// Helper function to disconnect
export async function disconnectFromDatabase() {
  try {
    await prisma.$disconnect();
    console.log("✅ Disconnected from database");
  } catch (error) {
    console.error("❌ Error disconnecting from database:", error);
  }
}
