import { CharacterCardProps } from '@/types';
import { StatusDot } from '../ui';
import { CharacterImage } from './CharacterImage';
import { CharacterInfo } from './CharacterInfo';
import { SelectedCheck } from './SelectedCheck';
import { DisabledOverlay } from './DisabledOverlay';
import { HoverOverlay } from './HoverOverlay';
import { getCardClasses } from '@/utils/getCardClasses';


export function CharacterCard({
  character,
  isSelected,
  isDisabled,
  onSelect,
}: CharacterCardProps) {
  const handleClick = () => {
    if (!isDisabled) {
      onSelect(character);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-disabled={isDisabled}
      aria-pressed={isSelected}
      className={getCardClasses(isSelected, isDisabled)}
    >
      <div className="relative aspect-square overflow-hidden">
        <CharacterImage
          src={character.image}
          alt={character.name}
          isDisabled={isDisabled}
        />
        <div className="overlay-gradient" />
        <StatusDot status={character.status} />
       <SelectedCheck isSelected={isSelected} />
        <CharacterInfo name={character.name} species={character.species} />
      </div>

      <DisabledOverlay isDisabled={isDisabled} />
       <HoverOverlay isDisabled={isDisabled} isSelected={isSelected} />
    </div>
  );
}
