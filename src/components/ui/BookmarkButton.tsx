import { Bookmark } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import type { EntityType } from '@/types';

interface BookmarkButtonProps {
  type: EntityType;
  id: string;
  size?: 'sm' | 'md';
  variant?: 'icon' | 'icon-labeled';
}

export function BookmarkButton({ type, id, size = 'sm', variant = 'icon' }: BookmarkButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(type, id);
  const dim = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11';
  const iconSize = size === 'sm' ? 16 : 20;

  return (
    <button
      type="button"
      aria-label={active ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      aria-pressed={active}
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(type, id);
      }}
      className={`${dim} flex items-center justify-center rounded-full border transition-all duration-200 backdrop-blur-md
        ${active
          ? 'bg-purple-600/90 border-purple-400 text-white shadow-[0_0_12px_rgba(147,51,234,0.5)]'
          : 'bg-black/40 border-white/10 text-white/80 hover:border-purple-400/60 hover:text-purple-300'
        } ${variant === 'icon-labeled' ? 'gap-2 px-4 w-full' : ''}`}
    >
      <Bookmark size={iconSize} fill={active ? 'currentColor' : 'none'} />
      {variant === 'icon-labeled' && (
        <span className="text-sm font-medium">{active ? 'Favoritado' : 'Favoritar'}</span>
      )}
    </button>
  );
}
