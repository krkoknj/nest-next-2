'use client';
import { use, useContext, useEffect, useState } from 'react';
import { fetcher } from '@/app/lib/fetcher';
import { Board } from '@/app/types/board';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/app/context/AuthContext';
import { Comment } from '@/app/types/comment';

// CSS Modules import
import styles from './page.module.css';
import BoardDetail from '@/app/components/board/BoardDetail';

type Props = {
  params: Promise<{ id: string }>;
};

export default function BoardPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const [board, setBoard] = useState<Board | null>(null);
  const [commentText, setCommentText] = useState('');
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
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) return <div className={styles.container}>Loading...</div>;
  if (!board) return <div className={styles.container}>Board not found</div>;

  return (
    <div className={styles.container}>
      <BoardDetail board={board} />

      <div className={styles.commentSection}>
        {user && (
          <button className={styles.commentButton}>Write Comment</button>
        )}
        <h2 className={styles.commentHeader}>Comments</h2>
        {/* {board.comments?.length ? (
          <ul className={styles.commentList}>
            {board.comments.map((c: Comment) => (
              <li key={c.id} className={styles.commentItem}>
                <strong>{c.author?.name}</strong>: {c.content}
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )} */}
        {/* 추후 입력폼 추가 시 */}
        {/* <div className={styles.commentInputWrapper}>
          <input
            className={styles.commentInput}
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button
            className={styles.submitButton}
            onClick={handleCommentSubmit}
            disabled={!commentText.trim()}
          >
            Submit
          </button>
        </div> */}
      </div>
    </div>
  );
}
