import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Basic health check - just return 200 OK with timestamp
    return NextResponse.json(
      {
        status: "healthy",
        timestamp: new Date().toISOString(),
        service: "versapath-frontend",
      },
      { status: 200 }
    );
  } catch (error) {
    // If anything goes wrong, return 503 Service Unavailable
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        service: "versapath-frontend",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 503 }
    );
  }
}

// Also support HEAD requests for simple health checks
export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}
