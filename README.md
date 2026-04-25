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

Create a `.env` file in the root:

```env
JWT_SECRET=your_secret_here
PORT=3001
```

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
