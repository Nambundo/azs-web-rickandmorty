import type { EntityType } from '@/types';

const STORAGE_KEY = 'rickmorty:favorites';

interface FavoritesState {
  character: string[];
  episode: string[];
  location: string[];
}

function readState(): FavoritesState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { character: [], episode: [], location: [] };
    return JSON.parse(raw);
  } catch {
    return { character: [], episode: [], location: [] };
  }
}

function writeState(state: FavoritesState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent('favorites:changed'));
}

export const favoritesService = {
  getAll(): FavoritesState {
    return readState();
  },
  isFavorite(type: EntityType, id: string): boolean {
    return readState()[type].includes(id);
  },
  toggle(type: EntityType, id: string): boolean {
    const state = readState();
    const list = state[type];
    const exists = list.includes(id);
    state[type] = exists ? list.filter((item) => item !== id) : [...list, id];
    writeState(state);
    return !exists;
  },
  remove(type: EntityType, id: string) {
    const state = readState();
    state[type] = state[type].filter((item) => item !== id);
    writeState(state);
  },
  clearAll() {
    writeState({ character: [], episode: [], location: [] });
  },
};
