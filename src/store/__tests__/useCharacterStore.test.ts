import { act, renderHook } from '@testing-library/react';
import {
  useCharacterStore,
  useCharacter1,
  useCharacter2,
  useCharacters,
  useCharacterActions,
} from '../useCharacterStore';
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
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [],
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
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  episode: [],
  url: '',
  created: '',
};

describe('useCharacterStore', () => {
  beforeEach(() => {
    useCharacterStore.setState({
      character1: null,
      character2: null,
    });
  });

  describe('initial state', () => {
    it('starts with null characters', () => {
      const { result } = renderHook(() => useCharacterStore());

      expect(result.current.character1).toBeNull();
      expect(result.current.character2).toBeNull();
    });
  });

  describe('setCharacter1', () => {
    it('sets character1', () => {
      const { result } = renderHook(() => useCharacterStore());

      act(() => {
        result.current.setCharacter1(mockCharacter1);
      });

      expect(result.current.character1).toEqual(mockCharacter1);
      expect(result.current.character2).toBeNull();
    });

    it('can set character1 to null', () => {
      const { result } = renderHook(() => useCharacterStore());

      act(() => {
        result.current.setCharacter1(mockCharacter1);
      });

      act(() => {
        result.current.setCharacter1(null);
      });

      expect(result.current.character1).toBeNull();
    });
  });

  describe('setCharacter2', () => {
    it('sets character2', () => {
      const { result } = renderHook(() => useCharacterStore());

      act(() => {
        result.current.setCharacter2(mockCharacter2);
      });

      expect(result.current.character1).toBeNull();
      expect(result.current.character2).toEqual(mockCharacter2);
    });
  });

  describe('swapCharacters', () => {
    it('swaps character1 and character2', () => {
      const { result } = renderHook(() => useCharacterStore());

      act(() => {
        result.current.setCharacter1(mockCharacter1);
        result.current.setCharacter2(mockCharacter2);
      });

      act(() => {
        result.current.swapCharacters();
      });

      expect(result.current.character1).toEqual(mockCharacter2);
      expect(result.current.character2).toEqual(mockCharacter1);
    });

    it('handles swap when one character is null', () => {
      const { result } = renderHook(() => useCharacterStore());

      act(() => {
        result.current.setCharacter1(mockCharacter1);
      });

      act(() => {
        result.current.swapCharacters();
      });

      expect(result.current.character1).toBeNull();
      expect(result.current.character2).toEqual(mockCharacter1);
    });
  });

  describe('reset', () => {
    it('resets both characters to null', () => {
      const { result } = renderHook(() => useCharacterStore());

      act(() => {
        result.current.setCharacter1(mockCharacter1);
        result.current.setCharacter2(mockCharacter2);
      });

      act(() => {
        result.current.reset();
      });

      expect(result.current.character1).toBeNull();
      expect(result.current.character2).toBeNull();
    });
  });
});

describe('selectors', () => {
  beforeEach(() => {
    useCharacterStore.setState({
      character1: null,
      character2: null,
    });
  });

  describe('useCharacter1', () => {
    it('returns only character1', () => {
      useCharacterStore.setState({ character1: mockCharacter1 });

      const { result } = renderHook(() => useCharacter1());

      expect(result.current).toEqual(mockCharacter1);
    });
  });

  describe('useCharacter2', () => {
    it('returns only character2', () => {
      useCharacterStore.setState({ character2: mockCharacter2 });

      const { result } = renderHook(() => useCharacter2());

      expect(result.current).toEqual(mockCharacter2);
    });
  });

  describe('useCharacters', () => {
    it('returns both characters', () => {
      useCharacterStore.setState({
        character1: mockCharacter1,
        character2: mockCharacter2,
      });

      const { result } = renderHook(() => useCharacters());

      expect(result.current.character1).toEqual(mockCharacter1);
      expect(result.current.character2).toEqual(mockCharacter2);
    });
  });

  describe('useCharacterActions', () => {
    it('returns all actions', () => {
      const { result } = renderHook(() => useCharacterActions());

      expect(typeof result.current.setCharacter1).toBe('function');
      expect(typeof result.current.setCharacter2).toBe('function');
      expect(typeof result.current.swapCharacters).toBe('function');
      expect(typeof result.current.reset).toBe('function');
    });

    it('actions work correctly', () => {
      const { result: actionsResult } = renderHook(() => useCharacterActions());
      const { result: storeResult } = renderHook(() => useCharacterStore());

      act(() => {
        actionsResult.current.setCharacter1(mockCharacter1);
      });

      expect(storeResult.current.character1).toEqual(mockCharacter1);
    });
  });
});
