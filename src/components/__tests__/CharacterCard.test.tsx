import { render, screen, fireEvent } from '@testing-library/react';
import { CharacterCard } from '../character-card';
import { Character } from '@/types';

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth', url: '' },
  location: { name: 'Earth', url: '' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/1', 'https://rickandmortyapi.com/api/episode/2'],
  url: '',
  created: '',
};

describe('CharacterCard', () => {
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it('renders character information', () => {
    render(<CharacterCard character={mockCharacter} isSelected={false} isDisabled={false} onSelect={mockOnSelect} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Alive')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
  });

  it('calls onSelect when clicked and not disabled', () => {
    render(<CharacterCard character={mockCharacter} isSelected={false} isDisabled={false} onSelect={mockOnSelect} />);

    fireEvent.click(screen.getByRole('button'));
    expect(mockOnSelect).toHaveBeenCalledWith(mockCharacter);
  });

  it('does not call onSelect when disabled', () => {
    render(<CharacterCard character={mockCharacter} isSelected={false} isDisabled={true} onSelect={mockOnSelect} />);

    fireEvent.click(screen.getByRole('button'));
    expect(mockOnSelect).not.toHaveBeenCalled();
  });

  it('shows selected state with checkmark', () => {
    const { container } = render(
      <CharacterCard character={mockCharacter} isSelected={true} isDisabled={false} onSelect={mockOnSelect} />
    );

    expect(container.querySelector('.character-card-selected')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('shows disabled state with overlay message', () => {
    render(<CharacterCard character={mockCharacter} isSelected={false} isDisabled={true} onSelect={mockOnSelect} />);

    expect(screen.getByText('Ya seleccionado')).toBeInTheDocument();
  });

  it('has correct aria attributes when disabled', () => {
    render(<CharacterCard character={mockCharacter} isSelected={false} isDisabled={true} onSelect={mockOnSelect} />);

    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });

  it('has correct aria attributes when selected', () => {
    render(<CharacterCard character={mockCharacter} isSelected={true} isDisabled={false} onSelect={mockOnSelect} />);

    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('handles keyboard navigation', () => {
    render(<CharacterCard character={mockCharacter} isSelected={false} isDisabled={false} onSelect={mockOnSelect} />);

    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    expect(mockOnSelect).toHaveBeenCalledWith(mockCharacter);
  });

  it('renders different status colors for Dead', () => {
    const deadCharacter = { ...mockCharacter, status: 'Dead' as const };
    const { container } = render(
      <CharacterCard character={deadCharacter} isSelected={false} isDisabled={false} onSelect={mockOnSelect} />
    );

    expect(screen.getByText('Dead')).toBeInTheDocument();
    expect(container.querySelector('.status-dead')).toBeInTheDocument();
  });

  it('renders unknown status correctly', () => {
    const unknownCharacter = { ...mockCharacter, status: 'unknown' as const };
    const { container } = render(
      <CharacterCard character={unknownCharacter} isSelected={false} isDisabled={false} onSelect={mockOnSelect} />
    );

    expect(screen.getByText('unknown')).toBeInTheDocument();
    expect(container.querySelector('.status-unknown')).toBeInTheDocument();
  });
});
