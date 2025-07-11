'use client';
import { useEffect, useState } from 'react';
import { fetcher } from '../lib/fetcher';
import { useRouter, useSearchParams } from 'next/navigation';
import { Board } from '../types/board';
import Link from 'next/link';
import styles from './page.module.css';

export default function BoardsPage() {
  const router = useRouter();
  const params = useSearchParams();
  const initialPage = Number(params.get('page')) || 1;

  const [boards, setBoards] = useState<Board[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const size = 10; // 한 페이지당 아이템 개수
  const totalPages = Math.ceil(total / size);
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    setLoading(true);
    fetcher(
      `${process.env.NEXT_PUBLIC_BOARD_URL}/boards?page=${page}&size=${size}`,
    )
      .then((res: { data: Board[]; total: number | null }) => {
        if (!res) {
          router.push('/login');
          return;
        }
        setBoards(res.data);
        setTotal(res.total || 0);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, [page, router]);

  const goTo = (p: number) => {
    setPage(p);
    router.replace(`?page=${p}`, { scroll: false });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Board Page</h1>
      <button
        className={styles.createBtn}
        onClick={() => router.push('/boards/new')}
      >
        Create Board
      </button>

      <table className={styles.boardsTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={3}>Loading...</td>
            </tr>
          ) : boards.length === 0 ? (
            <tr>
              <td colSpan={3}>No boards found</td>
            </tr>
          ) : (
            boards.map((board) => (
              <tr key={board.id}>
                <td>
                  <Link href={`/boards/${board.id}`}>{board.id}</Link>
                </td>
                <td>{board.title}</td>
                <td>{board.content}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button onClick={() => goTo(page - 1)} disabled={page <= 1}>
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            className={p === page ? styles.active : ''}
            onClick={() => goTo(p)}
          >
            {p}
          </button>
        ))}

        <button onClick={() => goTo(page + 1)} disabled={page >= totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
