import { NextResponse } from 'next/server';

/**
 * GET /api/test
 * Simple health check endpoint (no database)
 */
export async function GET() {
  return NextResponse.json(
    {
      message: 'Server is working!',
      timestamp: new Date().toISOString(),
      port: 3001,
    },
    { status: 200 }
  );
}
