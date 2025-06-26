"use client";

import { fetcher } from "@/app/lib/fetcher";
import { useRouter } from "next/navigation";

export default function NewBoardPage() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      title: formData.get("title"),
      content: formData.get("content"),
    };

    // POST 요청
    await fetcher(`${process.env.NEXT_PUBLIC_BOARD_URL}/boards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // 생성 후 /boards로 이동
    router.push("/boards");
  };

  return (
    <div>
      <h1>Create a New Board</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea id="content" name="content" required />
        </div>
        <button type="submit">Create Board</button>
      </form>
    </div>
  );
}
