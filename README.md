# Elixir — The Blood Donors Portal

A redesigned version of the Elixir blood donor portal: a React (Vite + Tailwind) frontend
backed by an Express + PostgreSQL API.

```
elixir-portal/
├── frontend/     React app (Vite, Tailwind, React Router)
└── backend/      Express API + PostgreSQL schema
```

## 1. Database

Create a PostgreSQL database, then load the schema:

```bash
createdb elixir
cd backend
cp .env.example .env        # set DATABASE_URL to your real connection string
npm install
npm run migrate             # runs db/schema.sql against DATABASE_URL
```

Free hosted Postgres options if you don't want to run it locally: [Supabase](https://supabase.com),
[Neon](https://neon.tech), or [Railway](https://railway.app) — just paste the connection
string they give you into `DATABASE_URL`.

Tables created:
- **donors** — registered donors (name, age, blood group, city, phone, email, last donation date)
- **blood_requests** — open requests for blood, ready for a future "request board" feature
- **helplines** — emergency contact numbers shown on the Helpline page

## 2. Backend API

```bash
cd backend
npm run dev        # starts on http://localhost:4000
```

Endpoints:
| Method | Path | Purpose |
|---|---|---|
| GET | `/api/donors?blood_group=O+&city=Noida` | Search donors |
| POST | `/api/donors` | Register a donor |
| GET | `/api/requests?status=open` | List blood requests |
| POST | `/api/requests` | Create a blood request |
| GET | `/api/helplines` | Emergency contact numbers |

## 3. Frontend

```bash
cd frontend
npm install
npm run dev         # starts on http://localhost:5173
```

The Vite dev server proxies `/api/*` to `http://localhost:4000`, so run the backend
first (or alongside) for the Find Donors, Register, and Helpline pages to load live data.

## Design notes

The redesign moves away from the original centered, all-red template toward an editorial
layout: a wine/amber/teal palette on a warm paper background, Fraunces for display type
paired with Inter for body text, and a heartbeat "pulse line" as the recurring visual motif
instead of generic cards and gradients.

## Deploying

- **Frontend**: `npm run build` in `frontend/` produces a static `dist/` folder — deploy to
  Vercel, Netlify, or GitHub Pages.
- **Backend**: deploy `backend/` to Render, Railway, or Fly.io, and point its
  `DATABASE_URL` at your Postgres instance.
- Update the frontend's API base URL (`frontend/src/api.js`) if the backend isn't served
  from the same origin in production.
