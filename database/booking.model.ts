import mongoose, { Schema, Document, Model } from 'mongoose';
import Event from './event.model';

/**
 * TypeScript interface for Booking document
 * Extends Document for Mongoose typing
 */
export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Booking Schema Definition
 * Links users to events via email with automatic event validation
 */
const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
      index: true, // Index for faster queries
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      validate: {
        validator: (v: string) => {
          // RFC 5322 simplified email regex
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Invalid email format',
      },
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save middleware
 * Validates that the referenced eventId corresponds to an existing Event document
 * Throws error if event not found to maintain referential integrity
 */
bookingSchema.pre<IBooking>('save', async function () {
  // Check if eventId is being set or modified
  if (this.isModified('eventId')) {
    const eventExists = await Event.findById(this.eventId);

    if (!eventExists) {
      throw new Error(
        `Event with ID "${this.eventId}" does not exist. Cannot create booking for non-existent event.`
      );
    }
  }
});

/**
 * Create or retrieve Booking model
 * Prevents model overwrite error during development with hot reload
 */
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;
