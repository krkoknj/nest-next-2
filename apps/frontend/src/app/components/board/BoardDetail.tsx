'use client';
import React, { useState } from 'react';
import { Board } from '@/app/types/board';
import styles from './BoardDetail.module.css';

interface BoardDetailProps {
  board: Board;
}

export default function BoardDetail({ board }: BoardDetailProps) {
  const [title, setTitle] = useState(board.title);
  const [content, setContent] = useState(board.content);
  const [actionsVisible, setActionsVisible] = useState(false);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
      </header>
      <article className={styles.content}>
        <p>{content}</p>
      </article>
      <div style={{ visibility: actionsVisible ? 'visible' : 'hidden' }}>
        <button>삭제하기</button>
        <button>수정하기</button>
      </div>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          cols={50}
        />
      </div>
      <button
        onClick={() => {
          setActionsVisible((v) => !v);
        }}
      >
        ...
      </button>
    </div>
  );
}
