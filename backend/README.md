# Akshar Backend

Modular Express.js backend for the Akshar writing platform.

## Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- Redis with ioredis

## Setup

1. Copy `.env.example` to `.env` and fill in secrets.
2. Install dependencies with pnpm:

```bash
pnpm install
```

3. Start the API:

```bash
pnpm dev
```

## Notes

- Authentication uses JWT bearer tokens.
- Content bookmarks are cached in Redis and lazily warmed on first read.
- Content versions are stored as Quill Delta snapshots, not HTML.
