import { fetchCharactersByPage, fetchEpisodesByIds } from '../index';

describe('fetchCharactersByPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches characters for a specific page', async () => {
    const mockResponse = {
      info: { count: 826, pages: 42, next: 'url', prev: null },
      results: [{ id: 1, name: 'Rick' }],
    };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await fetchCharactersByPage(1);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/character?page=1')
    );
    expect(result).toEqual(mockResponse);
  });

  it('fetches page 1 by default', async () => {
    const mockResponse = {
      info: { count: 826, pages: 42, next: 'url', prev: null },
      results: [],
    };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    await fetchCharactersByPage();

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/character?page=1')
    );
  });

  it('throws error when response is not ok', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(fetchCharactersByPage(999)).rejects.toThrow('Failed to fetch characters: 404');
  });

  it('fetches different pages correctly', async () => {
    const mockResponse = {
      info: { count: 826, pages: 42, next: 'url', prev: 'url' },
      results: [{ id: 21, name: 'Aqua Morty' }],
    };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    await fetchCharactersByPage(2);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/character?page=2')
    );
  });
});

describe('fetchEpisodesByIds', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns empty array for empty ids', async () => {
    const result = await fetchEpisodesByIds([]);

    expect(result).toEqual([]);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('fetches single episode', async () => {
    const mockEpisode = { id: 1, name: 'Pilot', episode: 'S01E01' };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockEpisode),
    });

    const result = await fetchEpisodesByIds([1]);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/episode/1')
    );
    expect(result).toEqual([mockEpisode]);
  });

  it('fetches multiple episodes', async () => {
    const mockEpisodes = [
      { id: 1, name: 'Pilot', episode: 'S01E01' },
      { id: 2, name: 'Lawnmower Dog', episode: 'S01E02' },
    ];

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockEpisodes),
    });

    const result = await fetchEpisodesByIds([1, 2]);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/episode/1,2')
    );
    expect(result).toEqual(mockEpisodes);
  });

  it('throws error when response is not ok', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(fetchEpisodesByIds([1, 2])).rejects.toThrow('Failed to fetch episodes: 500');
  });

  it('wraps single episode in array', async () => {
    const mockEpisode = { id: 1, name: 'Pilot' };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockEpisode),
    });

    const result = await fetchEpisodesByIds([1]);

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);
  });
});
