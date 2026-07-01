// ─────────────────────────────────────────────────────────────
// Threadbase API — already implemented. You do NOT need to edit this.
//   GET  /api/threads  → the list, newest first
//   POST /api/threads  → creates a thread from { title, body }, returns 201
//                        (title is required; an empty title returns 400 so you
//                         can see your onError path fire)
// A small delay is added to POST so the isPending state is visible.
// ─────────────────────────────────────────────────────────────
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let nextId = 4;
const threads = [
  { id: 1, title: "Welcome to Threadbase", body: "Post a thread and watch the list refresh itself.", createdAt: 1 },
  { id: 2, title: "React Query keys are the bridge", body: "Put filters in the key and it refetches for you.", createdAt: 2 },
  { id: 3, title: "Mutations change server state", body: "useMutation + invalidateQueries = self-updating UI.", createdAt: 3 },
];

app.get("/api/threads", (req, res) => {
  const newestFirst = [...threads].sort((a, b) => b.createdAt - a.createdAt);
  res.json(newestFirst);
});

app.post("/api/threads", (req, res) => {
  const { title, body = "" } = req.body || {};

  if (!title || !title.trim()) {
    return res.status(400).json({ error: "Title is required." });
  }

  const thread = { id: nextId++, title: title.trim(), body: String(body).trim(), createdAt: Date.now() };
  threads.push(thread);

  // 600ms delay so the button's isPending / "Posting..." state is observable
  setTimeout(() => res.status(201).json(thread), 600);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Threadbase API running on http://localhost:${PORT}`);
});
