import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

/**
 * Example API route showing how to use the MongoDB connection
 * 
 * Usage:
 * - GET /api/health - Check if MongoDB connection is working
 */
export async function GET(request: NextRequest) {
  try {
    // Establish connection to MongoDB
    const db = await connectDB();

    // Check connection status
    if (!db) {
      return NextResponse.json(
        { message: 'Database connection failed' },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        message: 'Database connected successfully',
        status: 'healthy',
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Database connection error:', error);

    return NextResponse.json(
      {
        message: 'Database connection error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
