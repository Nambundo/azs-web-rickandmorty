import { BaseCard } from './BaseCard';
import { BookmarkButton } from '@/components/ui/BookmarkButton';
import type { Location } from '@/types';

export function LocationCard({ location, onOpen }: { location: Location; onOpen: (id: string) => void }) {
  return (
    <BaseCard
      aspect="portrait"
      image={location.image}
      alt={location.name}
      onClick={() => onOpen(location.id)}
      actions={<BookmarkButton type="location" id={location.id} />}
      title={location.name}
      meta={`Tipo: ${location.type || 'Desconhecido'}`}
      footer={<span className="text-sm text-white/60">Dimensão: {location.dimension || 'Desconhecida'}</span>}
    />
  );
}
