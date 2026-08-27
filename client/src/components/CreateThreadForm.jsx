import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createThread } from "../services/threads.service";

export default function CreateThreadForm() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const mutation = useMutation({
    mutationFn: createThread,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threads"] });
      setTitle("");
      setBody("");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate({ title, body });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>

      {mutation.isError && (
        <p role="alert">
          Failed to create thread. Please try again.
        </p>
      )}

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Posting…" : "Post"}
      </button>
    </form>
  );
}