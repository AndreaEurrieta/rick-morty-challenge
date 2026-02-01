import { useState, useEffect } from 'react';
import { Character } from '@/types';
import { fetchCharactersByPage } from '@/api';

export function useCharacters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadCharacters() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchCharactersByPage(currentPage);
        if (!cancelled) {
          setCharacters(data.results);
          setTotalPages(data.info.pages);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Error loading characters');
          setCharacters([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadCharacters();
    return () => { cancelled = true; };
  }, [currentPage]);

  const setPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    characters,
    currentPage,
    totalPages,
    loading,
    error,
    setPage,
  };
}
