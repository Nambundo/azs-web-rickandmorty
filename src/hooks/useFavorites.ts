import { useCallback, useEffect, useState } from 'react';
import { favoritesService } from '@/services/favorites.service';
import type { EntityType } from '@/types';

export function useFavorites() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const handler = () => setTick((t) => t + 1);
    window.addEventListener('favorites:changed', handler);
    return () => window.removeEventListener('favorites:changed', handler);
  }, []);

  const isFavorite = useCallback((type: EntityType, id: string) => favoritesService.isFavorite(type, id), []);
  const toggleFavorite = useCallback((type: EntityType, id: string) => favoritesService.toggle(type, id), []);
  const removeFavorite = useCallback((type: EntityType, id: string) => favoritesService.remove(type, id), []);
  const clearAll = useCallback(() => favoritesService.clearAll(), []);

  return {
    favorites: favoritesService.getAll(),
    isFavorite,
    toggleFavorite,
    removeFavorite,
    clearAll,
  };
}
