import { getPages } from '../getPages';

describe('getPages', () => {
  describe('when totalPages <= 5', () => {
    it('returns all pages for 1 page', () => {
      expect(getPages(1, 1)).toEqual([1]);
    });

    it('returns all pages for 3 pages', () => {
      expect(getPages(1, 3)).toEqual([1, 2, 3]);
    });

    it('returns all pages for 5 pages', () => {
      expect(getPages(3, 5)).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('when totalPages > 5', () => {
    it('shows ellipsis after first page when currentPage is near the end', () => {
      expect(getPages(8, 10)).toEqual([1, '...', 7, 8, 9, 10]);
    });

    it('shows ellipsis before last page when currentPage is near the start', () => {
      expect(getPages(2, 10)).toEqual([1, 2, 3, '...', 10]);
    });

    it('shows ellipsis on both sides when currentPage is in the middle', () => {
      expect(getPages(5, 10)).toEqual([1, '...', 4, 5, 6, '...', 10]);
    });

    it('handles first page correctly', () => {
      expect(getPages(1, 10)).toEqual([1, 2, '...', 10]);
    });

    it('handles last page correctly', () => {
      expect(getPages(10, 10)).toEqual([1, '...', 9, 10]);
    });

    it('handles page 3 without left ellipsis', () => {
      expect(getPages(3, 10)).toEqual([1, 2, 3, 4, '...', 10]);
    });

    it('handles second-to-last page without right ellipsis', () => {
      expect(getPages(9, 10)).toEqual([1, '...', 8, 9, 10]);
    });
  });

  describe('edge cases', () => {
    it('handles large page numbers', () => {
      expect(getPages(50, 100)).toEqual([1, '...', 49, 50, 51, '...', 100]);
    });

    it('handles 6 pages with currentPage in middle', () => {
      expect(getPages(3, 6)).toEqual([1, 2, 3, 4, '...', 6]);
    });
  });
});
