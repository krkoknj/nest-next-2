'use client';
import { use, useContext } from 'react';
import { fetcher } from '@/app/lib/fetcher';
import { Board } from '@/app/types/board';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AuthContext } from '@/app/context/AuthContext';

type Props = {
  params: Promise<{ id: string }>;
};

export default function BoardPage({ params }: Props) {
  // params는 Promise<{id: string}> 이므로 use()로 언랩
  const { id } = use(params);

  const router = useRouter();
  const [board, setBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext) as any;

  useEffect(() => {
    setLoading(true);
    fetcher(`${process.env.NEXT_PUBLIC_BOARD_URL}/boards/${id}`)
      .then((res: Board | null) => {
        if (!res) {
          router.push('/login');
          return;
        }
        setBoard(res);
      })
      .catch(() => {
        /* 에러 처리 */
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!board) {
    return <div>Board not found</div>;
  }

  return (
    <div>
      <div>
        <h1>{board.title}</h1>
        <p>{board.content}</p>
      </div>
      <br></br>
      <div>{user && <button>write comment</button>}</div>
      <div>
        <h2>Comments</h2>
        {board.comments && board.comments.length > 0 ? (
          <ul>
            {board.comments.map((comment) => (
              <li key={comment.id}>
                <strong>{comment.author}</strong>: {comment.content}
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
}
