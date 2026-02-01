import { useState, useEffect, useMemo } from 'react';
import { Character, Episode } from '@/types';
import { fetchEpisodesByIds } from '@/api';
import { extractEpisodeIds } from '@/utils/extractEpisodeId';

interface UseEpisodesReturn {
  character1Episodes: Episode[];
  character2Episodes: Episode[];
  sharedEpisodes: Episode[];
  loading: boolean;
  error: string | null;
}

export function useEpisodes(
  character1: Character | null,
  character2: Character | null
): UseEpisodesReturn {
  const [character1Episodes, setCharacter1Episodes] = useState<Episode[]>([]);
  const [character2Episodes, setCharacter2Episodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const char1EpisodeIds = useMemo(
    () => (character1 ? extractEpisodeIds(character1.episode) : []),
    [character1]
  );

  const char2EpisodeIds = useMemo(
    () => (character2 ? extractEpisodeIds(character2.episode) : []),
    [character2]
  );

  useEffect(() => {
    const fetchEpisodes = async () => {
      if (!character1 && !character2) {
        setCharacter1Episodes([]);
        setCharacter2Episodes([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const [episodes1, episodes2] = await Promise.all([
          char1EpisodeIds.length > 0 ? fetchEpisodesByIds(char1EpisodeIds) : Promise.resolve([]),
          char2EpisodeIds.length > 0 ? fetchEpisodesByIds(char2EpisodeIds) : Promise.resolve([]),
        ]);

        setCharacter1Episodes(episodes1);
        setCharacter2Episodes(episodes2);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar episodios');
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [char1EpisodeIds, char2EpisodeIds, character1, character2]);

  const sharedEpisodes = useMemo(() => {
    const char2Ids = new Set(character2Episodes.map(ep => ep.id));
    return character1Episodes.filter(ep => char2Ids.has(ep.id));
  }, [character1Episodes, character2Episodes]);

  return {
    character1Episodes,
    character2Episodes,
    sharedEpisodes,
    loading,
    error,
  };
}
