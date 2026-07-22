# Victor E. Díaz Diez — Portfolio

Personal portfolio website for Victor E. Díaz Diez, a Creative Technologist. Built with React + Express, featuring generative graphics, bilingual support, and a content management admin panel.

## Tech Stack

**Frontend**
- React 19 + React Router DOM 7
- Vite (build tool)
- p5.js (generative background animations)

**Backend**
- Express 5 (Node.js)
- SQLite (better-sqlite3)
- JWT authentication
- Multer (file uploads)

## Features

- Sections: Hero, About, Skills, Projects, Gallery, Experience, Education
- Project categories: Interactive Media, Audio, Full-Stack Development
- Bilingual support (i18n via language provider)
- Responsive design (mobile/tablet/desktop)
- Admin dashboard for managing projects, gallery, and experience
- JWT-secured file upload and content management

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Environment variables

Create a `.env` file in the root (see `.env.example` for the full template):

```env
# Admin auth
JWT_SECRET=your_secret_here
ADMIN_HASH=your_bcrypt_hash_here
PORT=3001

# Contact email — primary sender (Resend)
RESEND_API_KEY=your_resend_api_key_here
MAIL_FROM=Portfolio <contact@tendaysmusic.com>
MAIL_TO=you@example.com

# Contact email — optional Gmail fallback
GMAIL_USER=you@gmail.com
GMAIL_APP_PASSWORD=your_gmail_app_password_here
```

**Contact form email.** Messages submitted through the contact form are always
saved to the SQLite `contacts` table first (viewable in the admin **Messages**
tab), then a notification email is sent best-effort: Resend is the primary
sender, with the Gmail transporter as a fallback. If no email channel is
configured, submissions are still saved and recoverable from the admin panel.

Notes for production (Render):

- Set `RESEND_API_KEY`, `MAIL_FROM`, and `MAIL_TO` in the Render dashboard.
- Verify the `MAIL_FROM` domain in Resend (add the DNS records Resend provides
  at your registrar) so it can send.
- Mount a Render **persistent disk** at the `server/data` path so the `contacts`
  table survives redeploys. Without it, the disk is ephemeral and stored
  messages are lost on each deploy.

### Seed the database

```bash
npm run seed
```

### Run in development

```bash
npm run dev
```

This starts the Vite frontend on `http://localhost:5173` and the Express API on `http://localhost:3001` concurrently. API requests are proxied from the frontend to the backend.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start frontend + backend in development mode |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview production build |
| `npm run server` | Start Express server only |
| `npm run dev:server` | Start Express server with auto-reload |
| `npm run seed` | Seed the database with initial data |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
  components/       # Reusable UI components
    admin/          # Admin dashboard components
  pages/            # Page-level layouts
  sections/         # Portfolio sections (Hero, About, Skills, etc.)
  hooks/            # Custom React hooks
  styles/           # Theme and color definitions
  content/          # Static content and translations
  sketches/         # p5.js generative sketches

server/
  routes/           # API routes (auth, projects, gallery, experience, upload)
  middleware/       # Express middleware
  data/             # SQLite database files
  uploads/          # Uploaded media files
  index.js          # Express server entry point
  db.js             # Database setup
  seed.js           # Database seeding script
```
