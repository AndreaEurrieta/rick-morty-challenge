'use client';

import { useMemo } from 'react';
import { useCharacters } from '@/hooks/useCharacters';
import { CharacterListProps } from '@/types';
import { Card } from '../ui';
import Pagination from '../pagination/Pagination';
import { CHARACTERS_PER_PAGE } from '@/constants';
import { ListTitle } from './ListTitle';
import { SelectedBadge } from './SelectedBadge';
import { LoadingSkeleton } from './LoadingSkeleton';
import { CharacterGrid } from './CharacterGrid';
import { ErrorState } from './ErrorState';

export function CharacterList({
  title,
  selectedCharacter,
  disabledCharacterId,
  onCharacterSelect,
}: CharacterListProps) {
  const {
    characters,
    currentPage,
    totalPages,
    loading,
    error,
    setPage,
  } = useCharacters();

  const displayedCharacters = useMemo(
    () => characters.slice(0, CHARACTERS_PER_PAGE),
    [characters]
  );

  if (error) {
    return <ErrorState title={title} error={error} />;
  }

  return (
    <Card>
      <Card.Header>
        <div className="flex items-center justify-between">
          <ListTitle title={title} />
          {selectedCharacter && <SelectedBadge character={selectedCharacter} />}
        </div>
      </Card.Header>

      <Card.Body>
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <CharacterGrid
            characters={displayedCharacters}
            selectedCharacter={selectedCharacter}
            disabledCharacterId={disabledCharacterId}
            onCharacterSelect={onCharacterSelect}
          />
        )}
        <div className="mt-4 pt-4 border-t border-white/10">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
            loading={loading}
          />
        </div>
      </Card.Body>
    </Card>
  );
}
