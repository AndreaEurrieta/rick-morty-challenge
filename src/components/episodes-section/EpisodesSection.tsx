'use client';

import { useState, useEffect } from 'react';
import { useEpisodes } from '@/hooks/useEpisodes';
import { EpisodesList } from '../episodes-list';
import { EpisodesSectionProps } from '@/types';
import { Alert, Skeleton } from '../ui';

export default function EpisodesSection({ character1, character2 }: EpisodesSectionProps) {
  const [page1, setPage1] = useState(1);
  const [pageShared, setPageShared] = useState(1);
  const [page2, setPage2] = useState(1);

  useEffect(() => {
    setPage1(1);
    setPageShared(1);
  }, [character1?.id]);

  useEffect(() => {
    setPage2(1);
    setPageShared(1);
  }, [character2?.id]);

  const {
    character1Episodes,
    character2Episodes,
    sharedEpisodes,
    loading,
    error,
  } = useEpisodes(character1, character2);

  const char1Name = character1?.name || 'Personaje 1';
  const char2Name = character2?.name || 'Personaje 2';

  if (loading) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center title-gradient-green-blue">
          Cargando Episodios...
        </h2>
        <div className="grid-episodes">
          <Skeleton variant="tall" />
          <Skeleton variant="tall" />
          <Skeleton variant="tall" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="error" icon="⚠️" className="mt-12">
        <p className="text-center text-red-600 dark:text-red-400 text-lg font-medium">
          Error al cargar episodios: {error}
        </p>
      </Alert>
    );
  }

  return (
    <div className="mt-12">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold title-gradient-green-blue">Comparación de Episodios</h2>
        {character1 && character2 && (
          <p className="text-muted text-sm mt-1">
            <span className="font-semibold text-blue-600 dark:text-blue-400">{character1.name}</span>
            {' vs '}
            <span className="font-semibold text-purple-600 dark:text-purple-400">{character2.name}</span>
          </p>
        )}
      </div>

      <div className="grid-episodes">
        <EpisodesList
          episodes={character1Episodes}
          title={char1Name}
          emptyMessage={character1 ? `${char1Name} no tiene episodios` : 'Selecciona un personaje'}
          variant="character1"
          page={page1}
          onPageChange={setPage1}
        />
        <EpisodesList
          episodes={sharedEpisodes}
          title={`${char1Name} & ${char2Name}`}
          emptyMessage={character1 && character2 ? 'No comparten episodios' : 'Selecciona ambos personajes'}
          variant="shared"
          page={pageShared}
          onPageChange={setPageShared}
        />
        <EpisodesList
          episodes={character2Episodes}
          title={char2Name}
          emptyMessage={character2 ? `${char2Name} no tiene episodios` : 'Selecciona un personaje'}
          variant="character2"
          page={page2}
          onPageChange={setPage2}
        />
      </div>
    </div>
  );
}
