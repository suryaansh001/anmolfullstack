# Akshar — Backend System Prompt (Updated)

Stack: Node.js + Express.js · MongoDB (Mongoose) · Redis (ioredis)

---

## 1. CONTENT SCHEMA — VERSION-CONTROLLED

```js
// Content document
{
  title: String,
  genre: String,
  tags: [String],
  language: String,
  authorId: ObjectId,           // ref: User
  contentType: enum[lyrics|story|poem|screenplay],
  quillDelta: Object,           // live operational snapshot (Quill Delta JSON)
  versions: [{                  // embedded, max 50
    versionId: ObjectId,
    delta: Object,              // Quill Delta operational snapshot — NOT full HTML
    editedAt: Date
  }],
  bookmarkCount: Number,        // default 0
  ratingSum: Number,            // default 0  ← running counter
  ratingCount: Number,          // default 0  ← running counter
  isDeleted: Boolean,           // default false (soft delete)
  createdAt: Date,
  updatedAt: Date
}

// ArchivedVersions (separate collection)
{ contentId: ObjectId, versionId: ObjectId, delta: Object, editedAt: Date }

// Ratings (separate collection)
{ contentId: ObjectId, userId: ObjectId, score: Number(1-5), createdAt: Date }
// Unique index: { contentId: 1, userId: 1 }
```

> **Why ratingSum + ratingCount?** Computing average = ratingSum / ratingCount inline
> avoids a full aggregation pipeline on every rating event.
> Aggregation pipelines are reserved for analytics/reporting routes only.

> **Terminology note:** Quill Deltas stored here are *operational snapshots*,
> not minimal incremental diffs. Each snapshot is reconstructable independently.

---

## 2. ARCHIVING — MONGODB TRANSACTION (ATOMIC)

```js
// POST /api/content/:id/versions
const session = await mongoose.startSession();
session.startTransaction();
try {
  // Step 1: check if trim is needed before push
  const doc = await Content.findById(id).session(session);
  if (doc.versions.length >= 50) {
    const oldest = doc.versions[0];
    await ArchivedVersions.create([{
      contentId: id,
      versionId: oldest.versionId,
      delta: oldest.delta,
      editedAt: oldest.editedAt
    }], { session });
  }
  // Step 2: push new version, trim to last 50
  await Content.findByIdAndUpdate(id,
    { $push: { versions: { $each: [newSnapshot], $slice: -50 } } },
    { session }
  );
  await session.commitTransaction();
} catch (err) {
  await session.abortTransaction();
  throw err;
} finally {
  session.endSession();
}
```

Both the archive insert and the Content update succeed or fail together.
Version data cannot be lost due to a mid-operation failure.

---

## 3. FULL-TEXT SEARCH — $text INDEX

```js
// Index (run at startup / migration)
db.contents.createIndex(
  { title: "text", genre: "text", tags: "text", language: "text" },
  {
    weights: { title: 10, genre: 5, tags: 3, language: 2 },
    default_language: "none"   // disables English stemming → required for Indian scripts
  }
)

// GET /api/content/search?q=&language=&genre=&cursor=
const filter = {
  $text: { $search: query },
  isDeleted: false,
  ...(language && { language }),
  ...(genre    && { genre })
};

// Cursor-based pagination (scalable — no skip())
if (cursor) filter._id = { $gt: new ObjectId(cursor) };

const results = await Content
  .find(filter, { score: { $meta: "textScore" } })
  .sort({ score: { $meta: "textScore" } })
  .limit(20);

// DEV ONLY — log explain output; include in project report
if (process.env.NODE_ENV === "development") {
  const explained = await Content.find(filter).explain("executionStats");
  logger.info({ totalKeysExamined: explained.executionStats.totalKeysExamined,
                totalDocsExamined: explained.executionStats.totalDocsExamined,
                executionTimeMillis: explained.executionStats.executionTimeMillis });
}
```

> Use `Content.find()` for search — not an aggregation pipeline.
> Aggregation is only used when faceting, joins, or transformations are required.

---

## 4. MONGODB AGGREGATION PIPELINES (3 required)

### A) Trending content
```js
// GET /api/content/trending
[
  { $match: { createdAt: { $gte: thirtyDaysAgo }, isDeleted: false } },
  { $project: { genre: 1, bookmarkCount: 1, ratingSum: 1, ratingCount: 1 } }, // reduce early
  { $group: { _id: "$genre", totalBookmarks: { $sum: "$bookmarkCount" },
              avgRating: { $avg: { $divide: ["$ratingSum","$ratingCount"] } },
              count: { $sum: 1 } } },
  { $sort: { totalBookmarks: -1 } },
  { $limit: 10 }
]
```

### B) Language distribution
```js
// GET /api/content/stats/language
[
  { $match: { isDeleted: false } },
  { $project: { language: 1, ratingSum: 1, ratingCount: 1 } },
  { $group: { _id: "$language", count: { $sum: 1 },
              avgRating: { $avg: { $divide: ["$ratingSum","$ratingCount"] } } } },
  { $sort: { count: -1 } }
]
```

### C) Author profile stats ($facet)
```js
// GET /api/users/:id/profile-stats
[
  { $match: { authorId: ObjectId(userId), isDeleted: false } },
  { $project: { genre: 1, language: 1, bookmarkCount: 1, title: 1 } },
  { $facet: {
      byGenre:    [{ $group: { _id: "$genre",    count: { $sum: 1 } } }],
      byLanguage: [{ $group: { _id: "$language", count: { $sum: 1 } } }],
      topContent: [{ $sort: { bookmarkCount: -1 } }, { $limit: 5 },
                   { $project: { title: 1, bookmarkCount: 1 } }]
  } }
]
// { allowDiskUse: true } if dataset exceeds 100MB in-memory limit
```

---

## 5. REDIS — WRITE-THROUGH CACHE (BOOKMARK COUNTS)

```js
// POST /api/content/:id/bookmark  (auth required)
await Promise.all([
  Content.findByIdAndUpdate(id, { $inc: { bookmarkCount: 1 } }),
  redis.incr(`bookmark:${id}`)
]);
// Both writes fire simultaneously — this is write-through.

// POST /api/content/:id/unbookmark
await Promise.all([
  Content.findByIdAndUpdate(id, { $inc: { bookmarkCount: -1 } }),
  redis.decr(`bookmark:${id}`)
]);

// GET /api/content/:id  — Redis is primary fast-read layer; MongoDB is fallback
const cached = await redis.get(`bookmark:${id}`);
if (cached !== null) {
  logger.info(`[Redis HIT] bookmark:${id}`);
  bookmarkCount = parseInt(cached);
} else {
  logger.info(`[Redis MISS] bookmark:${id}`);
  const doc = await Content.findById(id, { bookmarkCount: 1 });
  bookmarkCount = doc.bookmarkCount;
  await redis.set(`bookmark:${id}`, bookmarkCount);  // lazy cache warm
}
```

> Cache seeding strategy: **lazy warming** (cache-aside on first read).
> Do NOT bulk-seed all content on startup — expensive at scale.
> Only hot/trending content may be optionally pre-seeded via a separate script.

---

## 6. i18n COLLATION — INDIAN LANGUAGE SORT

```js
const LOCALE_MAP = {
  hindi: "hi", tamil: "ta", telugu: "te", bengali: "bn",
  marathi: "mr", gujarati: "gu", punjabi: "pa", english: "en"
};

// GET /api/content/by-language?lang=hindi&sort=title
const locale = LOCALE_MAP[lang] || "en";
const results = await Content
  .find({ language: lang, isDeleted: false })
  .collation({ locale, strength: 2 })
  .sort({ title: 1 })
  .limit(20);
```

---

## 7. RATING SYSTEM — RUNNING COUNTERS

```js
// POST /api/content/:id/rate  { score: 1-5 }
// Upsert rating; update running counters atomically
const existing = await Ratings.findOne({ contentId: id, userId });
if (existing) {
  const diff = score - existing.score;
  await Promise.all([
    Ratings.updateOne({ contentId: id, userId }, { $set: { score } }),
    Content.findByIdAndUpdate(id, { $inc: { ratingSum: diff } }),
    redis.set(`rating:${id}`, /* recomputed */ null)  // invalidate
  ]);
} else {
  await Promise.all([
    Ratings.create({ contentId: id, userId, score }),
    Content.findByIdAndUpdate(id, { $inc: { ratingSum: score, ratingCount: 1 } })
  ]);
}
// Invalidate rating cache — next read recomputes from counters
await redis.del(`rating:${id}`);

// GET /api/content/:id/rating
const cached = await redis.get(`rating:${id}`);
if (cached) return JSON.parse(cached);
const doc = await Content.findById(id, { ratingSum: 1, ratingCount: 1 });
const avg = doc.ratingCount > 0 ? doc.ratingSum / doc.ratingCount : 0;
await redis.set(`rating:${id}`, JSON.stringify({ avg, count: doc.ratingCount }), "EX", 300);
```

---

## 8. AUTO-SAVE — DEBOUNCE SUPPORT + BACKEND THROTTLE

```js
// PATCH /api/content/:id/autosave  { delta: <QuillDelta> }
// Backend throttle: ignore if same user saved this doc within 2s
const lockKey = `autosave_lock:${req.user.id}:${id}`;
const locked  = await redis.set(lockKey, 1, "NX", "EX", 2);
if (!locked) return res.json({ saved: false, reason: "throttled" });

await Content.findByIdAndUpdate(id,
  { quillDelta: delta, updatedAt: new Date() },
  { new: true }
);
res.json({ saved: true, updatedAt: new Date() });

// NOTE: autosave = update live delta only. No version snapshot created.
// POST /api/content/:id/versions = explicit named save (triggers archive logic).
```

---

## 9. VALIDATION LAYER (Zod)

```js
import { z } from "zod";

const QuillDeltaSchema = z.object({
  ops: z.array(z.object({ insert: z.any(), attributes: z.any().optional() }))
});

const ContentCreateSchema = z.object({
  title:       z.string().min(1).max(200),
  genre:       z.string().min(1).max(100),
  tags:        z.array(z.string()).max(10),
  language:    z.enum(["hindi","tamil","telugu","bengali","marathi","gujarati","punjabi","english"]),
  contentType: z.enum(["lyrics","story","poem","screenplay"]),
  quillDelta:  QuillDeltaSchema
});

const RatingSchema    = z.object({ score: z.number().int().min(1).max(5) });
const AutosaveSchema  = z.object({ delta: QuillDeltaSchema });

// Middleware
const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ errors: result.error.flatten() });
  req.body = result.data;
  next();
};
```

---

## 10. OWNERSHIP AUTHORIZATION MIDDLEWARE

```js
// Applied to: autosave, create version, delete, restore version
const requireOwnership = async (req, res, next) => {
  const doc = await Content.findById(req.params.id, { authorId: 1 });
  if (!doc) return res.status(404).json({ error: "Not found" });
  if (doc.authorId.toString() !== req.user.id)
    return res.status(403).json({ error: "Forbidden" });
  next();
};
```

---

## 11. RATE LIMITING (Redis-backed, distributed)

```js
import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";

const limiter = (max, windowMs) => rateLimit({
  max, windowMs,
  store: new RedisStore({ sendCommand: (...args) => redis.call(...args) })
});

// Applied per route
app.post("/api/content/:id/bookmark", limiter(30, 60_000));   // 30/min
app.get("/api/content/search",        limiter(60, 60_000));   // 60/min
app.patch("/api/content/:id/autosave",limiter(10, 10_000));   // 10/10s
app.post("/api/content/:id/rate",     limiter(10, 60_000));   // 10/min
// Global: 200 req/min per IP across all routes
```

---

## 12. INDEX CHECKLIST

```js
// Content collection
{ title:"text", genre:"text", tags:"text", language:"text" }  // weights + default_language:"none"
{ authorId: 1, createdAt: -1 }
{ bookmarkCount: -1 }
{ language: 1 }
{ genre: 1, ratingSum: -1, createdAt: -1 }
{ isDeleted: 1, createdAt: -1 }                               // soft delete compound

// Ratings collection
{ contentId: 1, userId: 1 }   unique: true

// ArchivedVersions collection
{ contentId: 1, editedAt: -1 }
```

---

## 13. ROUTES SUMMARY

```
POST   /api/content                       Create (validate + auth)
GET    /api/content/:id                   Read (bookmark from Redis)
PATCH  /api/content/:id/autosave          Live delta update (throttled, owner only)
POST   /api/content/:id/versions          Named version save (atomic transaction)
GET    /api/content/:id/versions          List embedded + archived versions
GET    /api/content/:id/versions/:vid     Restore a delta snapshot
DELETE /api/content/:id                   Soft delete (owner only)
GET    /api/content/search                $text search + cursor pagination
GET    /api/content/by-language           Language filter + collation
GET    /api/content/trending              Aggregation pipeline A
GET    /api/content/stats/language        Aggregation pipeline B
GET    /api/users/:id/profile-stats       Aggregation pipeline C ($facet)
POST   /api/content/:id/bookmark          Write-through: DB + Redis INCR
POST   /api/content/:id/unbookmark        Write-through: DB + Redis DECR
POST   /api/content/:id/rate              Upsert + running counter update
GET    /api/content/:id/rating            Redis cache (TTL 300s) → counters
```

---

## 14. MANDATORY DELIVERABLES (Project Report)

- `explain("executionStats")` output for all 3 search/aggregation queries — show IXSCAN vs COLLSCAN
- `redis-cli MONITOR` screenshot showing INCR firing on bookmark (write-through proof)
- Quill Delta JSON example (an operational snapshot, not a git-style diff)
- Version archive trigger log (console output when 51st version is pushed + transaction commit)
- Collation demo: same Hindi title query with and without `.collation()` — show sort order difference
- `ratingSum` / `ratingCount` vs aggregation benchmark — response time comparison
- Autosave throttle log: `[throttled]` response when 2s lock is active