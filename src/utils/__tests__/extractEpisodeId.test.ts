import { extractEpisodeId, extractEpisodeIds } from "../extractEpisodeId";

describe('Episode ID extraction utilities', () => {

  describe('extractEpisodeId', () => {
    it('extracts episode ID from valid URL', () => {
      expect(extractEpisodeId('https://rickandmortyapi.com/api/episode/1')).toBe(1);
    });

    it('extracts episode ID from URL with large number', () => {
      expect(extractEpisodeId('https://rickandmortyapi.com/api/episode/51')).toBe(51);
    });

    it('handles URL with double-digit ID', () => {
      expect(extractEpisodeId('https://rickandmortyapi.com/api/episode/10')).toBe(10);
    });

    it('returns 0 for invalid URL', () => {
      expect(extractEpisodeId('')).toBe(0);
    });
  });

  describe('extractEpisodeIds', () => {

    it('extracts multiple episode IDs from array of URLs', () => {
      const urls = [
        'https://rickandmortyapi.com/api/episode/1',
        'https://rickandmortyapi.com/api/episode/2',
        'https://rickandmortyapi.com/api/episode/3',
      ];
      expect(extractEpisodeIds(urls)).toEqual([1, 2, 3]);
    });

    it('returns empty array for empty input', () => {
      expect(extractEpisodeIds([])).toEqual([]);
    });

    it('handles single URL in array', () => {
      expect(extractEpisodeIds(['https://rickandmortyapi.com/api/episode/42'])).toEqual([42]);
    });

    it('preserves order of URLs', () => {
      const urls = [
        'https://rickandmortyapi.com/api/episode/5',
        'https://rickandmortyapi.com/api/episode/1',
        'https://rickandmortyapi.com/api/episode/10',
      ];
      expect(extractEpisodeIds(urls)).toEqual([5, 1, 10]);
    });

    it('filters out invalid IDs', () => {
      const urls = [
        'https://rickandmortyapi.com/api/episode/1',
        '',
        'https://rickandmortyapi.com/api/episode/3',
      ];
      expect(extractEpisodeIds(urls)).toEqual([1, 3]);
    });
  })
});