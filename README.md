# Rick and Morty - Character Episode Comparator

Aplicacion web interactiva para explorar personajes del universo Rick and Morty y comparar sus apariciones en episodios.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![Zustand](https://img.shields.io/badge/Zustand-5.0-orange?style=flat-square)
![Tests](https://img.shields.io/badge/Tests-141%20passing-green?style=flat-square)

## Demo

**[Ver aplicación en vivo](https://rick-morty-challenge-eta.vercel.app/)**

## Caracteristicas

- **Comparacion de Personajes**: Selecciona dos personajes y visualiza:
  - Episodios exclusivos del Personaje #1
  - Episodios compartidos por ambos
  - Episodios exclusivos del Personaje #2

- **Interfaz Moderna**:
  - Gradientes animados y transiciones suaves
  - Diseño responsive
  - Soporte para dark mode

- **Experiencia de Usuario**:
  - Cards interactivas con estados visuales
  - Paginacion inteligente
  - Loading states con skeletons
  - Accesibilidad (ARIA labels, navegacion por teclado)

## Stack Tecnologico

| Tecnologia | Version | Proposito |
|------------|---------|-----------|
| Next.js | 15 | Framework React con App Router |
| TypeScript | 5.7 | Tipado estatico |
| Tailwind CSS | 3.4 | Estilos utility-first |
| Zustand | 5.0 | Estado global |
| Jest | 29.7 | Testing framework |
| React Testing Library | 16.1 | Testing de componentes |

## Inicio Rapido

```bash
# Clonar el repositorio
git clone <repository-url>
cd rick-morty-challenge

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Abrir en el navegador
open http://localhost:3000
```

## Scripts Disponibles

| Comando | Descripcion |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Construye para produccion |
| `npm start` | Inicia servidor de produccion |
| `npm run lint` | Ejecuta ESLint |
| `npm test` | Ejecuta todos los tests |
| `npm run test:watch` | Tests en modo watch |
| `npm run test:coverage` | Genera reporte de cobertura |

## Arquitectura del Proyecto

```
src/
├── api/                         # Funciones de fetch
│   ├── fetchCharactersByPage.ts # Obtener personajes paginados
│   ├── fetchEpisodesByIds.ts    # Obtener episodios por IDs
│   └── index.ts
│
│
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Pagina principal
│   ├── error.tsx                # Error boundary
│   ├── not-found.tsx            # Pagina 404
│   └── globals.css              # Estilos globales
│
├── components/                   # Componentes React
│   ├── character-card/          # Card de personaje (modular)
│   │   ├── CharacterCard.tsx
│   │   ├── CharacterImage.tsx
│   │   ├── CharacterInfo.tsx
│   │   ├── SelectedCheck.tsx
│   │   ├── DisabledOverlay.tsx
│   │   ├── HoverOverlay.tsx
│   │   └── index.ts
│   │
│   ├── character-list/          # Lista de personajes (modular)
│   │   ├── CharacterList.tsx
│   │   ├── CharacterGrid.tsx
│   │   ├── ListTitle.tsx
│   │   ├── SelectedBadge.tsx
│   │   ├── LoadingSkeleton.tsx
│   │   ├── ErrorState.tsx
│   │   └── index.ts
│   │
│   ├── episodes-list/           # Lista de episodios (modular)
│   │   ├── EpisodesList.tsx
│   │   ├── EpisodeItem.tsx
│   │   ├── EpisodeListContent.tsx
│   │   ├── EpisodeFooter.tsx
│   │   ├── EpisodePagination.tsx
│   │   ├── EmptyState.tsx
│   │   └── index.ts
│   │
│   ├── pagination/              # Paginacion
│   │   └── Pagination.tsx
│   │
│   ├── ui/                      # Componentes UI reutilizables
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Icon.tsx
│   │   ├── Skeleton.tsx
│   │   └── ...
│   │
│   ├── EpisodesSection.tsx
│   └── __tests__/               # Tests de componentes
│
├── hooks/                       # Custom React hooks
│   ├── useCharacters.ts        # Personajes con paginacion
│   └── useEpisodes.ts          # Filtrado de episodios
│
├── store/                       # Estado global (Zustand)
│   ├── useCharacterStore.ts    # Store de personajes
│   └── __tests__/              # Tests del store
│
├── types/                       # Definiciones TypeScript
│   └── index.ts
│
└── utils/                       # Funciones utilitarias
    ├── episodeFilters.ts
    ├── getCardClasses.ts
    └── __tests__/
```

## Decisiones Tecnicas

### Arquitectura
- **Componentes Modulares**: Cada componente complejo tiene su propia carpeta con sub-componentes
- **Separation of Concerns**: Componentes presentacionales separados de la logica
- **Custom Hooks**: Encapsulan logica de estado y side effects

### Estado Global (Zustand)
- **Selectores Optimizados**: Evitan re-renders innecesarios
- **useShallow**: Comparacion superficial para objetos
- **Acciones Separadas**: Las funciones no causan re-renders

```typescript
const { character1, character2 } = useCharacters();
const { setCharacter1, setCharacter2 } = useCharacterActions();
```

### Testing
- 141 tests unitarios cubriendo:
  - Componentes (CharacterCard, CharacterGrid, Pagination, EpisodesList)
  - Store (useCharacterStore con selectores)
  - Utilidades (episodeFilters, extractors)

## API Utilizada

[Rick and Morty API](https://rickandmortyapi.com/)

---

Desarrollado como prueba tecnica para Conexa
