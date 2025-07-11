'use client';
import { useState } from 'react';

export default function SearchPage() {
  const [options, setOptions] = useState({
    searchType: 'all',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    const url = process.env.NEXT_PUBLIC_SEARCH_URL;
    fetch(`${url}?query=${searchQuery}&type=${options.searchType}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div>
      <h1>Search Page</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select
        value={options.searchType}
        onChange={(e) => setOptions({ ...options, searchType: e.target.value })}
      >
        <option value="all">All</option>
        <option value="recording">곡 검색</option>
        <option value="artist">아티스트 검색</option>
      </select>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
