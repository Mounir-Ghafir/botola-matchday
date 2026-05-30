# 🏟️ Botola MatchDay Companion

A mobile-first MERN stack web app for football fans attending Moroccan stadium matches. Fans can crowdsource gate congestion in real time and pre-order snacks for halftime pickup — no app download needed.

## Features

- **🚪 Gate Tracker** — Fans tap Fast / Slow / Blocked to report congestion at their stadium gate. Live aggregate status is shown to everyone, like Waze for stadium entry.
- **🍽️ Snack Pre-Order** — Browse the stadium menu, pre-order for halftime, and get an `MC-XXXX` order ID. Pay on pickup at Kiosk B — no payment gateway required.
- **📱 Mobile-First** — Designed for 375px–414px viewports. Works on any phone browser.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite 8 + Tailwind CSS v4 + React Router v7 + Axios |
| Backend | Express 4 + Mongoose 9 + Node.js (CommonJS) |
| Database | MongoDB Atlas (free M0 cluster) |

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB Atlas account (free tier)

### 1. Clone and install

```bash
git clone https://github.com/Mounir-Ghafir/botola-matchday.git
cd botola-matchday

# Backend
cd server
npm install
cp .env.example .env   # then fill in your MongoDB URI

# Frontend
cd ../client
npm install
```

### 2. Configure environment

Edit `server/.env` with your MongoDB Atlas connection string:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/botola-matchday?retryWrites=true&w=majority
NODE_ENV=development
```

### 3. Seed the database

```bash
cd server
npm run seed
```

### 4. Start development

```bash
# Terminal 1 — Backend (port 5000)
cd server
npm run dev

# Terminal 2 — Frontend (port 5173)
cd client
npm run dev
```

Open **http://localhost:5173** on your phone or browser.

## Project Structure

```
server/                         # Express API
├── config/db.js                # MongoDB connection
├── models/Gate.js              # Gate schema
├── models/Order.js             # Order schema
├── routes/gates.js             # Gate endpoints
├── routes/orders.js            # Order endpoints
├── middleware/errorHandler.js   # Global error handler
├── seed.js                     # Database seeder
└── server.js                   # App entry point

client/                         # React + Vite
├── src/
│   ├── components/             # Reusable UI components
│   ├── pages/                  # Route pages
│   ├── services/api.js         # Axios API client
│   ├── App.jsx                 # Router + layout
│   └── main.jsx                # Entry point
└── vite.config.js              # Vite config + API proxy
```

## Available Scripts

### Backend (`server/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start with hot reload (nodemon) on port 5000 |
| `npm start` | Start without reload |
| `npm run seed` | Seed 6 gates into MongoDB |

### Frontend (`client/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server on port 5173 |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/api/gates` | List all gates with live status |
| `POST` | `/api/gates/seed` | Seed 6 default gates |
| `POST` | `/api/gates/:id/vote` | Vote: `{"vote": "fast"|"slow"|"blocked"}` |
| `POST` | `/api/orders` | Create pre-order |
| `GET` | `/api/orders/:orderId` | Look up order by `MC-XXXX` |

## Build Guide

This project follows a structured 10-phase build guide. See `/home/mounir/Downloads/BOTOLA_MATCHDAY_BUILD_GUIDE.md` for the full reference.

---

Built for the love of Moroccan football. 🇲🇦
