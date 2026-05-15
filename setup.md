# Full Project Setup (MongoDB + Redis)

This project has:
- `backend/` (Express + MongoDB + Redis)
- `frontend/` (TanStack Start)

## 1) Prerequisites

Install these first:
- Node.js `>=20`
- pnpm `>=9`
- MongoDB (local server, default port `27017`)
- Redis (local server, default port `6379`)

## 2) Required env file(s)

### Backend env file

Create this file:
- `backend/.env` (copy from `backend/.env.example`)

```bash
cd backend
cp .env.example .env
```

Set values in `backend/.env`:

| Variable | Example | Purpose |
|---|---|---|
| `NODE_ENV` | `development` | App mode |
| `PORT` | `4000` | Backend port |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/akshar` | MongoDB connection string |
| `REDIS_URL` | `redis://127.0.0.1:6379` | Redis connection string |
| `JWT_SECRET` | `replace-with-very-long-random-secret` | JWT signing secret (min 32 chars) |
| `CORS_ORIGIN` | `http://localhost:3000` | Allowed frontend origin |

### Frontend env file

No frontend `.env` variable is required by current codebase.

## 3) MongoDB setup steps

1. Install MongoDB Community Edition.
2. Start MongoDB service.
3. Verify MongoDB is running on `27017`.
4. Keep `MONGODB_URI` in `backend/.env` aligned to your host/port/database.

Common local URI:
`mongodb://127.0.0.1:27017/akshar`

## 4) Redis setup steps

1. Install Redis.
2. Start Redis server/service.
3. Verify Redis is running on `6379`.
4. Keep `REDIS_URL` in `backend/.env` aligned to your host/port.

Common local URL:
`redis://127.0.0.1:6379`

## 5) Install dependencies

```bash
cd backend && pnpm install
cd ../frontend && pnpm install
```

## 6) Run the project

Backend:
```bash
cd backend
pnpm dev
```

Frontend:
```bash
cd frontend
pnpm dev
```

## 7) Quick checks if something fails

- Backend fails on startup with env error:
  - Check `backend/.env` exists and all required values are set.
- DB connection fails:
  - Confirm MongoDB service is running and `MONGODB_URI` is correct.
- Redis connection fails:
  - Confirm Redis service is running and `REDIS_URL` is correct.
- CORS issue in browser:
  - Set `CORS_ORIGIN` exactly to your frontend URL.
