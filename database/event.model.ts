import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * TypeScript interface for Event document
 * Extends Document for Mongoose typing
 */
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: 'online' | 'offline' | 'hybrid';
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Event Schema Definition
 * Stores event information with automatic slug generation and timestamp management
 */
const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
      trim: true,
    },
    overview: {
      type: String,
      required: [true, 'Event overview is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Event image URL is required'],
    },
    venue: {
      type: String,
      required: [true, 'Event venue is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Event location is required'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Event date is required'],
    },
    time: {
      type: String,
      required: [true, 'Event time is required'],
    },
    mode: {
      type: String,
      enum: {
        values: ['online', 'offline', 'hybrid'],
        message: 'Mode must be online, offline, or hybrid',
      },
      required: [true, 'Event mode is required'],
    },
    audience: {
      type: String,
      required: [true, 'Target audience is required'],
      trim: true,
    },
    agenda: {
      type: [String],
      required: [true, 'Event agenda is required'],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0,
        message: 'Agenda must contain at least one item',
      },
    },
    organizer: {
      type: String,
      required: [true, 'Organizer is required'],
      trim: true,
    },
    tags: {
      type: [String],
      required: [true, 'Tags are required'],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0,
        message: 'Must have at least one tag',
      },
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save middleware
 * 1. Auto-generates slug from title if title is new or modified
 * 2. Normalizes date to ISO format (YYYY-MM-DD)
 * 3. Ensures time is in consistent format (HH:MM AM/PM or 24-hour)
 */
eventSchema.pre<IEvent>('save', function () {
  // Generate slug from title only if title is new or modified
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Remove consecutive hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  }

  // Normalize date to ISO format (YYYY-MM-DD)
  if (this.isModified('date') && this.date) {
    const dateObj = new Date(this.date);
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date format. Please use YYYY-MM-DD');
    }
    this.date = dateObj.toISOString().split('T')[0];
  }

  // Validate time format (basic validation for HH:MM format)
  if (this.isModified('time') && this.time) {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]\s?(AM|PM)?$/i;
    if (!timeRegex.test(this.time)) {
      throw new Error('Invalid time format. Use HH:MM or HH:MM AM/PM');
    }
    this.time = this.time.toUpperCase();
  }
});

/**
 * Create or retrieve Event model
 * Prevents model overwrite error during development with hot reload
 */
const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);

export default Event;
