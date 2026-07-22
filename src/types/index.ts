// ---- Tipos vindos diretamente da API GraphQL (rickandmortyapi.com/graphql) ----

export interface ApiInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface ApiCharacter {
  id: string;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  image: string;
  origin: { id: string | null; name: string };
  location: { id: string | null; name: string };
  episode: { id: string; episode: string }[];
  created: string;
}

export interface ApiEpisode {
  id: string;
  name: string;
  air_date: string;
  episode: string; // ex: "S01E01"
  characters: { id: string; name: string; image: string }[];
  created: string;
}

export interface ApiLocation {
  id: string;
  name: string;
  type: string;
  dimension: string;
  residents: { id: string; name: string }[];
  created: string;
}

// ---- Campos mockados (não existem no schema público) ----

export interface MockedEpisodeExtras {
  rating: number;
  synopsis: string;
  writer: string;
  director: string;
  durationMinutes: number;
}

export interface MockedCharacterExtras {
  rating: number;
  bio: string;
}

export interface MockedLocationExtras {
  image: string;
}

// ---- Tipos combinados (o que os componentes efetivamente consomem) ----

export type Character = ApiCharacter & MockedCharacterExtras;
export type Episode = ApiEpisode & MockedEpisodeExtras;
export type Location = ApiLocation & MockedLocationExtras;

export type EntityType = 'character' | 'episode' | 'location';

export interface WatchedEntry {
  id: string;
  type: EntityType;
  progress: number; // 0-100
  watchedAt: string;
}
