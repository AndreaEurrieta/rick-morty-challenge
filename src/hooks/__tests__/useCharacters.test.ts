import { renderHook, waitFor, act } from '@testing-library/react';
import { useCharacters } from '../useCharacters';

const mockCharactersPage1 = {
  info: { count: 826, pages: 42, next: 'url', prev: null },
  results: [
    { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', image: 'url', episode: [] },
    { id: 2, name: 'Morty Smith', status: 'Alive', species: 'Human', image: 'url', episode: [] },
  ],
};

const mockCharactersPage2 = {
  info: { count: 826, pages: 42, next: 'url', prev: 'url' },
  results: [
    { id: 21, name: 'Aqua Morty', status: 'unknown', species: 'Human', image: 'url', episode: [] },
    { id: 22, name: 'Aqua Rick', status: 'unknown', species: 'Human', image: 'url', episode: [] },
  ],
};

describe('useCharacters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches characters on mount', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockCharactersPage1),
    });

    const { result } = renderHook(() => useCharacters());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.characters).toHaveLength(2);
    expect(result.current.characters[0].name).toBe('Rick Sanchez');
    expect(result.current.totalPages).toBe(42);
    expect(result.current.currentPage).toBe(1);
  });

  it('handles fetch error', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.characters).toHaveLength(0);
  });

  it('fetches new page when setPage is called', async () => {
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCharactersPage1),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCharactersPage2),
      });

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.characters[0].name).toBe('Rick Sanchez');

    act(() => {
      result.current.setPage(2);
    });

    await waitFor(() => {
      expect(result.current.currentPage).toBe(2);
    });

    await waitFor(() => {
      expect(result.current.characters[0].name).toBe('Aqua Morty');
    });
  });

  it('does not change page if out of bounds', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockCharactersPage1),
    });

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setPage(0);
    });

    expect(result.current.currentPage).toBe(1);

    act(() => {
      result.current.setPage(100);
    });

    expect(result.current.currentPage).toBe(1);
  });

  it('starts with loading true', () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockCharactersPage1),
    });

    const { result } = renderHook(() => useCharacters());

    expect(result.current.loading).toBe(true);
    expect(result.current.characters).toHaveLength(0);
    expect(result.current.error).toBeNull();
  });
});
