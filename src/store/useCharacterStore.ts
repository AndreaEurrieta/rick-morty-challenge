import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { Character } from '@/types';

interface CharacterState {
  character1: Character | null;
  character2: Character | null;
}

interface CharacterActions {
  setCharacter1: (character: Character | null) => void;
  setCharacter2: (character: Character | null) => void;
  swapCharacters: () => void;
  reset: () => void;
}

type CharacterStore = CharacterState & CharacterActions;

const initialState: CharacterState = {
  character1: null,
  character2: null,
};

export const useCharacterStore = create<CharacterStore>((set) => ({
  ...initialState,

  setCharacter1: (character) => set({ character1: character }),

  setCharacter2: (character) => set({ character2: character }),

  swapCharacters: () =>
    set((state) => ({
      character1: state.character2,
      character2: state.character1,
    })),

  reset: () => set(initialState),
}));

export const useCharacter1 = () => useCharacterStore((state) => state.character1);
export const useCharacter2 = () => useCharacterStore((state) => state.character2);

export const useCharacters = () =>
  useCharacterStore(
    useShallow((state) => ({
      character1: state.character1,
      character2: state.character2,
    }))
  );

export const useCharacterActions = () =>
  useCharacterStore(
    useShallow((state) => ({
      setCharacter1: state.setCharacter1,
      setCharacter2: state.setCharacter2,
      swapCharacters: state.swapCharacters,
      reset: state.reset,
    }))
  );
