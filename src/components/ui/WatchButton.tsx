import { Eye } from 'lucide-react';
import { useWatchedHistory } from '@/hooks/useWatchedHistory';
import type { EntityType } from '@/types';

interface WatchButtonProps {
  type: EntityType;
  id: string;
  size?: 'sm' | 'md';
  variant?: 'icon' | 'icon-labeled';
  label?: string;
}

export function WatchButton({ type, id, size = 'sm', variant = 'icon', label }: WatchButtonProps) {
  const { isWatched, toggleWatched } = useWatchedHistory();
  const active = isWatched(type, id);
  const dim = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11';
  const iconSize = size === 'sm' ? 16 : 20;

  return (
    <button
      type="button"
      aria-label={active ? 'Marcar como não assistido' : 'Marcar como assistido'}
      aria-pressed={active}
      onClick={(e) => {
        e.stopPropagation();
        toggleWatched(type, id);
      }}
      className={`${dim} flex items-center justify-center rounded-full border transition-all duration-200 backdrop-blur-md
        ${active
          ? 'bg-green-600/90 border-green-400 text-white shadow-[0_0_12px_rgba(34,197,94,0.5)]'
          : 'bg-black/40 border-white/10 text-white/80 hover:border-green-400/60 hover:text-green-300'
        } ${variant === 'icon-labeled' ? 'gap-2 px-4 w-full' : ''}`}
    >
      <Eye size={iconSize} />
      {variant === 'icon-labeled' && (
        <span className="text-sm font-medium">{active ? 'Assistido' : label ?? 'Marcar como assistido'}</span>
      )}
    </button>
  );
}
