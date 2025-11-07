import { NextRequest, NextResponse } from "next/server";
import { testDatabaseConnection, createTestUser } from "@/lib/test-db";

export async function GET(req: NextRequest) {
  try {
    console.log("🧪 Starting database test...");

    const result = await testDatabaseConnection();

    if (result.success) {
      return NextResponse.json({
        status: "success",
        message: "Database connection successful",
        data: {
          userCount: result.userCount,
          tables: result.tables,
        },
      });
    } else {
      return NextResponse.json({
        status: "error",
        message: "Database connection failed",
        error: result.error,
      }, { status: 500 });
    }
  } catch (error) {
    console.error("❌ Database test error:", error);
    return NextResponse.json({
      status: "error",
      message: "Database test failed",
      error: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log("🧪 Creating test user...");

    const testUser = await createTestUser();

    return NextResponse.json({
      status: "success",
      message: "Test user created successfully",
      data: testUser,
    });
  } catch (error) {
    console.error("❌ Test user creation error:", error);
    return NextResponse.json({
      status: "error",
      message: "Failed to create test user",
      error: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}
