import { useCallback, useEffect, useState } from 'react';
import { watchedService } from '@/services/watched.service';
import type { EntityType } from '@/types';

export function useWatchedHistory() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const handler = () => setTick((t) => t + 1);
    window.addEventListener('watched:changed', handler);
    return () => window.removeEventListener('watched:changed', handler);
  }, []);

  const isWatched = useCallback((type: EntityType, id: string) => watchedService.isWatched(type, id), []);
  const toggleWatched = useCallback(
    (type: EntityType, id: string, progress?: number) => watchedService.toggle(type, id, progress),
    [],
  );
  const removeWatched = useCallback((type: EntityType, id: string) => watchedService.remove(type, id), []);
  const clearAll = useCallback(() => watchedService.clearAll(), []);

  return {
    watched: watchedService.getAll(),
    isWatched,
    toggleWatched,
    removeWatched,
    clearAll,
  };
}
