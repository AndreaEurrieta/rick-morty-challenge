"use client";

import { useCharacters, useCharacterActions } from "@/store/useCharacterStore";
import { CharacterList } from "@/components/character-list";
import EpisodesSection from "@/components/episodes-section/EpisodesSection";
import BackgroundOrbs from "@/components/ui/BackgroundOrbs";

export default function Home() {
  const { character1, character2 } = useCharacters();
  const { setCharacter1, setCharacter2 } = useCharacterActions();

  return (
    <main className="page-bg">
      <BackgroundOrbs />

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <h2 className="text-gray-400 max-w-xl mx-auto text-base sm:text-lg md:text-xl">
          Compara personajes y desbloquea sus aventuras
        </h2>

        <section className="container-section mb-8 sm:mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <CharacterList
              title="Personaje #1"
              selectedCharacter={character1}
              disabledCharacterId={character2?.id || null}
              onCharacterSelect={setCharacter1}
            />
            <CharacterList
              title="Personaje #2"
              selectedCharacter={character2}
              disabledCharacterId={character1?.id || null}
              onCharacterSelect={setCharacter2}
            />
          </div>
        </section>

        <section className="container-wide">
          <EpisodesSection character1={character1} character2={character2} />
        </section>
      </div>
    </main>
  );
}
