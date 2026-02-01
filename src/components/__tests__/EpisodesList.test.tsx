import { render, screen, fireEvent } from '@testing-library/react';
import { EpisodesList } from '../episodes-list';
import { Episode } from '@/types';

const mockEpisodes: Episode[] = [
  {
    id: 1,
    name: 'Pilot',
    air_date: 'December 2, 2013',
    episode: 'S01E01',
    characters: [],
    url: '',
    created: '',
  },
  {
    id: 2,
    name: 'Lawnmower Dog',
    air_date: 'December 9, 2013',
    episode: 'S01E02',
    characters: [],
    url: '',
    created: '',
  },
  {
    id: 3,
    name: 'Anatomy Park',
    air_date: 'December 16, 2013',
    episode: 'S01E03',
    characters: [],
    url: '',
    created: '',
  },
];

describe('EpisodesList', () => {
  it('renders title correctly', () => {
    render(
      <EpisodesList
        episodes={mockEpisodes}
        title="Rick Sanchez"
        emptyMessage="No episodes"
      />
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('renders episodes list', () => {
    render(
      <EpisodesList
        episodes={mockEpisodes}
        title="Test"
        emptyMessage="No episodes"
      />
    );

    expect(screen.getByText('Pilot')).toBeInTheDocument();
    expect(screen.getByText('Lawnmower Dog')).toBeInTheDocument();
    expect(screen.getByText('Anatomy Park')).toBeInTheDocument();
  });

  it('renders episode badges', () => {
    render(
      <EpisodesList
        episodes={mockEpisodes}
        title="Test"
        emptyMessage="No episodes"
      />
    );

    expect(screen.getByText('S01E01')).toBeInTheDocument();
    expect(screen.getByText('S01E02')).toBeInTheDocument();
  });

  it('renders air dates', () => {
    render(
      <EpisodesList
        episodes={mockEpisodes}
        title="Test"
        emptyMessage="No episodes"
      />
    );

    expect(screen.getByText('December 2, 2013')).toBeInTheDocument();
  });

  it('shows empty message when no episodes', () => {
    render(
      <EpisodesList
        episodes={[]}
        title="Test"
        emptyMessage="No hay episodios"
      />
    );

    expect(screen.getByText('No hay episodios')).toBeInTheDocument();
  });

  it('shows total count', () => {
    render(
      <EpisodesList
        episodes={mockEpisodes}
        title="Test"
        emptyMessage="No episodes"
      />
    );

    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText(/episodios/i)).toBeInTheDocument();
  });

  it('applies correct variant class for character1', () => {
    const { container } = render(
      <EpisodesList
        episodes={mockEpisodes}
        title="Test"
        emptyMessage="No episodes"
        variant="character1"
      />
    );

    expect(container.querySelector('.episode-card-blue')).toBeInTheDocument();
  });

  it('applies correct variant class for shared', () => {
    const { container } = render(
      <EpisodesList
        episodes={mockEpisodes}
        title="Test"
        emptyMessage="No episodes"
        variant="shared"
      />
    );

    expect(container.querySelector('.episode-card-green')).toBeInTheDocument();
  });

  it('applies correct variant class for character2', () => {
    const { container } = render(
      <EpisodesList
        episodes={mockEpisodes}
        title="Test"
        emptyMessage="No episodes"
        variant="character2"
      />
    );

    expect(container.querySelector('.episode-card-purple')).toBeInTheDocument();
  });

  it('does not show pagination when episodes fit in one page', () => {
    const mockOnPageChange = jest.fn();
    render(
      <EpisodesList
        episodes={mockEpisodes}
        title="Test"
        emptyMessage="No episodes"
        page={1}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.queryByText('Anterior')).not.toBeInTheDocument();
    expect(screen.queryByText('Siguiente')).not.toBeInTheDocument();
  });

  it('shows pagination when episodes exceed page limit', () => {
    const manyEpisodes: Episode[] = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      name: `Episode ${i + 1}`,
      air_date: 'Date',
      episode: `S01E${String(i + 1).padStart(2, '0')}`,
      characters: [],
      url: '',
      created: '',
    }));

    const mockOnPageChange = jest.fn();
    render(
      <EpisodesList
        episodes={manyEpisodes}
        title="Test"
        emptyMessage="No episodes"
        page={1}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText('Anterior')).toBeInTheDocument();
    expect(screen.getByText('Siguiente')).toBeInTheDocument();
  });

  it('calls onPageChange when clicking pagination buttons', () => {
    const manyEpisodes: Episode[] = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      name: `Episode ${i + 1}`,
      air_date: 'Date',
      episode: `S01E${String(i + 1).padStart(2, '0')}`,
      characters: [],
      url: '',
      created: '',
    }));

    const mockOnPageChange = jest.fn();
    render(
      <EpisodesList
        episodes={manyEpisodes}
        title="Test"
        emptyMessage="No episodes"
        page={1}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByText('Siguiente'));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('disables previous button on first page', () => {
    const manyEpisodes: Episode[] = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      name: `Episode ${i + 1}`,
      air_date: 'Date',
      episode: `S01E${String(i + 1).padStart(2, '0')}`,
      characters: [],
      url: '',
      created: '',
    }));

    const mockOnPageChange = jest.fn();
    render(
      <EpisodesList
        episodes={manyEpisodes}
        title="Test"
        emptyMessage="No episodes"
        page={1}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText('Anterior')).toBeDisabled();
  });
});
