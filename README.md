# Dev Events

**The Hub for Every Dev Event You Can't Miss.**

Dev Events is a full-stack web application that aggregates developer events — hackathons, meetups, and conferences — into a single, beautiful platform. Users can browse events, view detailed information, and book their spot with just an email address.

---

## ✨ Features

- 🗓️ **Browse Events** — Discover hackathons, meetups, and conferences from around the world
- 🔍 **Event Detail Pages** — Rich detail views with agenda, venue, organizer, tags, and more
- 📧 **Email-based Booking** — Reserve your spot at any event with a simple email form
- 🌐 **Online / Offline / Hybrid** — Events are categorized by mode so you know what to expect
- ⚡ **Server-side Caching** — Pages are cached at the edge using Next.js `cacheLife` for fast loads
- 📸 **Cloudinary Images** — Event posters served via Cloudinary CDN
- 📊 **PostHog Analytics** — Built-in event tracking and error capture

---

## 🛠️ Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Framework   | [Next.js 16](https://nextjs.org) (App Router) |
| Language    | TypeScript                          |
| UI          | React 19                            |
| Styling     | Tailwind CSS v4                     |
| Database    | MongoDB via [Mongoose](https://mongoosejs.com) |
| Images      | [Cloudinary](https://cloudinary.com) |
| Analytics   | [PostHog](https://posthog.com)      |

---

## 📁 Project Structure

```
dev-events/
├── app/
│   ├── page.tsx              # Home page — lists all featured events
│   ├── events/
│   │   └── [slug]/
│   │       └── page.tsx      # Dynamic event detail page
│   └── api/
│       ├── events/
│       │   ├── route.ts      # GET all events
│       │   └── [slug]/       # GET single event by slug
│       ├── bookings/         # POST create booking
│       ├── health/           # GET health check
│       └── test/             # GET test route
├── components/
│   ├── EventCard.tsx         # Event listing card
│   ├── EventDetails.tsx      # Full event detail view
│   ├── BookEvent.tsx         # Email booking form (client component)
│   ├── ExploreBtn.tsx        # CTA button
│   ├── navbar.tsx            # Site navigation
│   └── LightRays.tsx         # Decorative visual effect
├── database/
│   ├── event.model.ts        # Mongoose Event schema & model
│   ├── booking.model.ts      # Mongoose Booking schema & model
│   └── index.ts              # Model exports
├── lib/
│   ├── mongodb.ts            # MongoDB connection helper
│   ├── constants.ts          # Static event data / type definitions
│   └── actions/
│       ├── event.actions.ts  # Server actions for events
│       └── booking.actions.ts# Server actions for bookings
└── public/                   # Static assets (images, icons)
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A [Cloudinary](https://cloudinary.com) account (for event images)
- A [PostHog](https://posthog.com) project (for analytics)

### 1. Clone the repository

```bash
git clone https://github.com/Faizanyousaf140/Dev-Events-nextjs.git
cd Dev-Events-nextjs
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root of the project:

```env
# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dev-events

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📡 API Reference

| Method | Endpoint                  | Description                  |
|--------|---------------------------|------------------------------|
| GET    | `/api/events`             | Fetch all events             |
| GET    | `/api/events/:slug`       | Fetch a single event by slug |
| POST   | `/api/bookings`           | Create an event booking      |
| GET    | `/api/health`             | Health check                 |

---

## 🗃️ Data Models

### Event

| Field        | Type                            | Description                         |
|--------------|---------------------------------|-------------------------------------|
| `title`      | `string`                        | Event name (auto-generates slug)    |
| `slug`       | `string`                        | URL-friendly identifier             |
| `description`| `string`                        | Short description                   |
| `overview`   | `string`                        | Detailed overview                   |
| `image`      | `string`                        | Cloudinary image URL                |
| `venue`      | `string`                        | Venue name                          |
| `location`   | `string`                        | City / country                      |
| `date`       | `string`                        | ISO date (YYYY-MM-DD)               |
| `time`       | `string`                        | Time (HH:MM AM/PM)                  |
| `mode`       | `online \| offline \| hybrid`   | Event format                        |
| `audience`   | `string`                        | Target audience                     |
| `agenda`     | `string[]`                      | List of agenda items                |
| `organizer`  | `string`                        | Organizer name                      |
| `tags`       | `string[]`                      | Topic tags                          |

### Booking

| Field     | Type       | Description                  |
|-----------|------------|------------------------------|
| `eventId` | `ObjectId` | Reference to the Event       |
| `email`   | `string`   | Attendee's email address     |

---

## 🧪 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## ☁️ Deployment

The easiest way to deploy this app is with [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the repository in the [Vercel dashboard](https://vercel.com/new)
3. Add all environment variables from your `.env.local`
4. Deploy — Vercel handles the rest

For other platforms, run `npm run build` and serve the `.next` output with `npm run start`.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open a [GitHub issue](https://github.com/Faizanyousaf140/Dev-Events-nextjs/issues) or submit a pull request.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
