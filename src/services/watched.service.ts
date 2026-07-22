import type { EntityType, WatchedEntry } from '@/types';

const STORAGE_KEY = 'rickmorty:watched';

function readState(): WatchedEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeState(entries: WatchedEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  window.dispatchEvent(new CustomEvent('watched:changed'));
}

export const watchedService = {
  getAll(): WatchedEntry[] {
    return readState();
  },
  getByType(type: EntityType): WatchedEntry[] {
    return readState().filter((entry) => entry.type === type);
  },
  isWatched(type: EntityType, id: string): boolean {
    return readState().some((entry) => entry.type === type && entry.id === id);
  },
  toggle(type: EntityType, id: string, progress = 100): boolean {
    const state = readState();
    const exists = state.some((entry) => entry.type === type && entry.id === id);
    const next = exists
      ? state.filter((entry) => !(entry.type === type && entry.id === id))
      : [...state, { id, type, progress, watchedAt: new Date().toISOString() }];
    writeState(next);
    return !exists;
  },
  remove(type: EntityType, id: string) {
    writeState(readState().filter((entry) => !(entry.type === type && entry.id === id)));
  },
  clearAll() {
    writeState([]);
  },
};
