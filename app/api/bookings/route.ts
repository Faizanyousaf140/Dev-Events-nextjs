import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Booking } from '@/database';

/**
 * POST /api/bookings
 * Create a new booking
 * 
 * Request body:
 * {
 *   eventId: "mongo-object-id",
 *   email: "user@example.com"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Create booking (validates event exists in pre-save hook)
    const booking = new Booking(body);
    await booking.save();

    return NextResponse.json(
      {
        message: 'Booking created successfully',
        data: booking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Booking creation error:', error);

    return NextResponse.json(
      {
        message: 'Failed to create booking',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 400 }
    );
  }
}

/**
 * GET /api/bookings
 * Fetch all bookings with event details
 */
export async function GET() {
  try {
    await connectDB();

    const bookings = await Booking.find()
      .populate('eventId', 'title slug location date time')
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        message: 'Bookings fetched successfully',
        data: bookings,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Booking fetch error:', error);

    return NextResponse.json(
      {
        message: 'Failed to fetch bookings',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
