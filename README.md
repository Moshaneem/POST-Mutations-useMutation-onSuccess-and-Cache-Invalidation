# Threadbase — Create Thread (useMutation) Starter

A React (Vite) + Express scaffold. The Express `POST /api/threads` works, the Axios
client, the `QueryClientProvider`, the `getThreads` / `createThread` services, and the
`ThreadList` (which reads the `['threads']` query) are all **done**. Your job is to wire
the `CreateThreadForm` to a `useMutation` so posting a thread refreshes the list — no reload.

## Run it

```bash
npm run setup     # installs root + server + client deps
cp client/.env.development.example client/.env.development
npm run dev       # Express on :3001, Vite on :5173
```

Open http://localhost:5173. Type a title/body and hit **Post thread** — right now it only
logs to the console. The thread is never posted and the list never changes.

## Your task

Edit **`client/src/components/CreateThreadForm.jsx`**:

1. `import { useMutation, useQueryClient } from "@tanstack/react-query"` and get the client
   with `useQueryClient()`.
2. Create a `useMutation({ mutationFn: createThread, onSuccess, onError })`.
3. In `handleSubmit`, call `mutation.mutate({ title, body })`.
4. Disable the submit button while `mutation.isPending` (label it "Posting…").
5. In `onSuccess`, call `queryClient.invalidateQueries({ queryKey: ["threads"] })` so the
   list refetches (and reset the form).
6. Render an inline error when `mutation.isError` (submit with an empty title — the server
   returns 400 — to see it).

## What you should NOT touch

- `server/` — the API already handles `GET` and `POST /api/threads`.
- `apiClient.js`, `main.jsx`, `threads.service.js`, `ThreadList.jsx` — all done.

## Verify

- DevTools → **Network**: posting fires `POST /api/threads` → **201**, followed immediately
  by a `GET /api/threads` refetch (that's the invalidation), and the new thread appears on top.
- The button reads "Posting…" and is disabled during the request — fast double-clicks send **one** POST.
- Submit with an empty title → an inline error message appears (the `onError` / `isError` path).
