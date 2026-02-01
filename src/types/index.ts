export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';
export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';

export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface ApiResponse<T> {
  info: ApiInfo;
  results: T[];
}

export interface CharacterCardProps {
  character: Character;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: (character: Character) => void;
}

export interface CharacterListProps {
  title: string;
  selectedCharacter: Character | null;
  disabledCharacterId: number | null;
  onCharacterSelect: (character: Character) => void;
}

export type EpisodeListVariant = 'character1' | 'shared' | 'character2';
export type ColorVariant = 'blue' | 'green' | 'purple';

export interface EpisodesListProps {
  episodes: Episode[];
  title: string;
  emptyMessage: string;
  variant?: EpisodeListVariant;
  page?: number;
  onPageChange?: (page: number) => void;
}

export interface EpisodesSectionProps {
  character1: Character | null;
  character2: Character | null;
}
