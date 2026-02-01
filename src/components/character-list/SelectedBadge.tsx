import Image from 'next/image';
import { Character } from '@/types';

interface SelectedBadgeProps {
  character: Character;
}

export function SelectedBadge({ character }: SelectedBadgeProps) {
  return (
    <div className="selection-badge">
      <Image
        src={character.image}
        alt={character.name}
        width={24}
        height={24}
        className="rounded-full object-cover"
      />
      <span className="text-sm text-green-300 font-medium truncate max-w-[100px]">
        {character.name}
      </span>
    </div>
  );
}
