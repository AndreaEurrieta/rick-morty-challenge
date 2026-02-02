import { renderHook, waitFor } from '@testing-library/react';
import { useEpisodes } from '../useEpisodes';
import { Character } from '@/types';

const mockCharacter1: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth', url: '' },
  location: { name: 'Earth', url: '' },
  image: 'url',
  episode: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2',
    'https://rickandmortyapi.com/api/episode/3',
  ],
  url: '',
  created: '',
};

const mockCharacter2: Character = {
  id: 2,
  name: 'Morty Smith',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth', url: '' },
  location: { name: 'Earth', url: '' },
  image: 'url',
  episode: [
    'https://rickandmortyapi.com/api/episode/2',
    'https://rickandmortyapi.com/api/episode/3',
    'https://rickandmortyapi.com/api/episode/4',
  ],
  url: '',
  created: '',
};

const mockEpisodes1 = [
  { id: 1, name: 'Pilot', air_date: 'December 2, 2013', episode: 'S01E01', characters: [], url: '', created: '' },
  { id: 2, name: 'Lawnmower Dog', air_date: 'December 9, 2013', episode: 'S01E02', characters: [], url: '', created: '' },
  { id: 3, name: 'Anatomy Park', air_date: 'December 16, 2013', episode: 'S01E03', characters: [], url: '', created: '' },
];

const mockEpisodes2 = [
  { id: 2, name: 'Lawnmower Dog', air_date: 'December 9, 2013', episode: 'S01E02', characters: [], url: '', created: '' },
  { id: 3, name: 'Anatomy Park', air_date: 'December 16, 2013', episode: 'S01E03', characters: [], url: '', created: '' },
  { id: 4, name: 'M. Night Shaym-Aliens!', air_date: 'January 13, 2014', episode: 'S01E04', characters: [], url: '', created: '' },
];

describe('useEpisodes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns empty arrays when no characters selected', async () => {
    const { result } = renderHook(() => useEpisodes(null, null));

    expect(result.current.character1Episodes).toHaveLength(0);
    expect(result.current.character2Episodes).toHaveLength(0);
    expect(result.current.sharedEpisodes).toHaveLength(0);
    expect(result.current.loading).toBe(false);
  });

  it('fetches episodes for character 1 only', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockEpisodes1),
    });

    const { result } = renderHook(() => useEpisodes(mockCharacter1, null));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.character1Episodes).toHaveLength(3);
    expect(result.current.character2Episodes).toHaveLength(0);
    expect(result.current.sharedEpisodes).toHaveLength(0);
  });

  it('fetches episodes for both characters and calculates shared', async () => {
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockEpisodes1),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockEpisodes2),
      });

    const { result } = renderHook(() => useEpisodes(mockCharacter1, mockCharacter2));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.character1Episodes).toHaveLength(3);
    expect(result.current.character2Episodes).toHaveLength(3);
    expect(result.current.sharedEpisodes).toHaveLength(2);
    expect(result.current.sharedEpisodes.map(ep => ep.id)).toEqual([2, 3]);
  });

  it('handles fetch error', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useEpisodes(mockCharacter1, null));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeTruthy();
  });

  it('shows loading state while fetching', async () => {
    global.fetch = jest.fn().mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({
        ok: true,
        json: () => Promise.resolve(mockEpisodes1),
      }), 100))
    );

    const { result } = renderHook(() => useEpisodes(mockCharacter1, null));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it('fetches in parallel for both characters', async () => {
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockEpisodes1),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockEpisodes2),
      });

    renderHook(() => useEpisodes(mockCharacter1, mockCharacter2));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });
});
