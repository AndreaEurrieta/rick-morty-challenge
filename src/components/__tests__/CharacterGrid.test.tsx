import { render, screen, fireEvent } from '@testing-library/react';
import { CharacterGrid } from '../character-list';
import { Character } from '@/types';

const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [],
    url: '',
    created: '',
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    episode: [],
    url: '',
    created: '',
  },
];

describe('CharacterGrid', () => {
  const mockOnCharacterSelect = jest.fn();

  beforeEach(() => {
    mockOnCharacterSelect.mockClear();
  });

  it('renders all characters', () => {
    render(
      <CharacterGrid
        characters={mockCharacters}
        selectedCharacter={null}
        disabledCharacterId={null}
        onCharacterSelect={mockOnCharacterSelect}
      />
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  it('renders grid layout', () => {
    const { container } = render(
      <CharacterGrid
        characters={mockCharacters}
        selectedCharacter={null}
        disabledCharacterId={null}
        onCharacterSelect={mockOnCharacterSelect}
      />
    );

    expect(container.querySelector('.grid')).toBeInTheDocument();
    expect(container.querySelector('.grid-cols-2')).toBeInTheDocument();
  });

  it('marks selected character', () => {
    render(
      <CharacterGrid
        characters={mockCharacters}
        selectedCharacter={mockCharacters[0]}
        disabledCharacterId={null}
        onCharacterSelect={mockOnCharacterSelect}
      />
    );

    const rickCard = screen.getByText('Rick Sanchez').closest('[role="button"]');
    expect(rickCard).toHaveAttribute('aria-pressed', 'true');
  });

  it('marks disabled character', () => {
    render(
      <CharacterGrid
        characters={mockCharacters}
        selectedCharacter={null}
        disabledCharacterId={2}
        onCharacterSelect={mockOnCharacterSelect}
      />
    );

    const mortyCard = screen.getByText('Morty Smith').closest('[role="button"]');
    expect(mortyCard).toHaveAttribute('aria-disabled', 'true');
  });

  it('calls onCharacterSelect when clicking a character', () => {
    render(
      <CharacterGrid
        characters={mockCharacters}
        selectedCharacter={null}
        disabledCharacterId={null}
        onCharacterSelect={mockOnCharacterSelect}
      />
    );

    const rickCard = screen.getByText('Rick Sanchez').closest('[role="button"]');
    fireEvent.click(rickCard!);

    expect(mockOnCharacterSelect).toHaveBeenCalledWith(mockCharacters[0]);
  });

  it('does not call onCharacterSelect when clicking disabled character', () => {
    render(
      <CharacterGrid
        characters={mockCharacters}
        selectedCharacter={null}
        disabledCharacterId={2}
        onCharacterSelect={mockOnCharacterSelect}
      />
    );

    const mortyCard = screen.getByText('Morty Smith').closest('[role="button"]');
    fireEvent.click(mortyCard!);

    expect(mockOnCharacterSelect).not.toHaveBeenCalled();
  });

  it('renders empty grid when no characters', () => {
    const { container } = render(
      <CharacterGrid
        characters={[]}
        selectedCharacter={null}
        disabledCharacterId={null}
        onCharacterSelect={mockOnCharacterSelect}
      />
    );

    const grid = container.querySelector('.grid');
    expect(grid?.children.length).toBe(0);
  });
});
