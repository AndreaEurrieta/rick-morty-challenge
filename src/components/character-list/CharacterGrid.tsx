import { Character } from '@/types';
import { CharacterCard } from '../character-card';

interface CharacterGridProps {
  characters: Character[];
  selectedCharacter: Character | null;
  disabledCharacterId: number | null;
  onCharacterSelect: (character: Character) => void;
}

export function CharacterGrid({
  characters,
  selectedCharacter,
  disabledCharacterId,
  onCharacterSelect,
}: CharacterGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          isSelected={selectedCharacter?.id === character.id}
          isDisabled={disabledCharacterId === character.id}
          onSelect={onCharacterSelect}
        />
      ))}
    </div>
  );
}
