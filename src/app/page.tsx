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

      <div className="page-content">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="page-title">
            Compara personajes y desbloquea sus aventuras
          </h2>
          <p className="text-subtle text-sm sm:text-base max-w-2xl mx-auto">
            Selecciona dos personajes para descubrir qué episodios comparten
          </p>
        </div>

        <section className="container-section mb-8 sm:mb-12">
          <div className="grid-characters">
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
