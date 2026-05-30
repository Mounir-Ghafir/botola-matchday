# Botola MatchDay Companion — AGENTS.md

## Project structure

```
server/   — Express 4 + Mongoose 9, CommonJS (require/module.exports)
client/   — Vite 8 + React 19 + Tailwind v4 + React Router v7 + Axios, ESM (import/export)
```

Each directory has its own `package.json` and `node_modules/`. Both dev servers must run simultaneously.

## Essential commands

```bash
# Backend (server/)
npm run dev    # nodemon server.js on :5000
npm run seed   # node seed.js — populates gates in MongoDB
npm start      # node server.js (no reload)

# Frontend (client/)
npm run dev    # Vite dev server on :5173
npm run build  # Production build
npm run lint   # ESLint
```

## Critical gotchas

- **Route ordering in `server/routes/gates.js`**: `POST /seed` must be defined **before** `POST /:id/vote`. Otherwise Express tries to match `"seed"` as an ObjectId and throws a CastError.
- **Vite proxy**: `vite.config.js` must include `server.proxy: { '/api': { target: 'http://localhost:5000', changeOrigin: true } }` — without it, API calls from the React app will hit a 404.
- **Tailwind v4** uses `@import "tailwindcss"` in `index.css` (NOT the v3 `@tailwind base/components/utilities` directives). No `tailwind.config.js`.
- **Gate virtual**: The schema must include `{ toJSON: { virtuals: true }, toObject: { virtuals: true } }` or the computed `status` field won't appear in API responses.
- **`$inc` for votes**: Always use `{ $inc: { fastVotes: 1 } }`, never assignment — otherwise concurrent votes from different fans will race.
- **Two ESM/CJS boundaries**: Server files use `require`/`module.exports` (`"type": "commonjs"`). Client files use `import`/`export` (`"type": "module"`). An agent should not mix them.

## Non-obvious architecture notes

- **No auth, no payments** — this is a demo/hackathon app. Orders are pay-on-pickup, identified by `MC-XXXX` order ID.
- **Order ID** is generated server-side: `"MC-" + Math.floor(1000 + Math.random() * 9000)`.
- **Auto-refresh**: GatePage polls `GET /api/gates` every 30s via `setInterval`. The interval must be cleaned up in `useEffect` return.
- **Seed script** (`server/seed.js`) is a standalone Node script (not a route). It connects directly to MongoDB, drops all gates, inserts 6 defaults, then disconnects.

## Environment

`server/.env` is gitignored. Must contain:
```
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/botola-matchday?retryWrites=true&w=majority
NODE_ENV=development
```
MongoDB Atlas cluster must whitelist `0.0.0.0/0`. Never commit `.env`.

## Testing

- **Backend**: Manual via curl/Postman/Thunder Client. No test framework installed.
- **Frontend**: Manual in Chrome DevTools mobile viewport (375–414px). No test framework installed.
- **End-to-end**: Both dev servers running, DB seeded (`npm run seed`), then manually step through the Phase 9 checklist.

## Build guide reference

This project follows a 10-phase build guide at `/home/mounir/Downloads/BOTOLA_MATCHDAY_BUILD_GUIDE.md`. Each phase has a copy-paste prompt for an AI assistant. Phases must be executed in strict order (0 → 10), and the build is not yet complete.
