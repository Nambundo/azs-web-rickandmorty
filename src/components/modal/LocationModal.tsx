import { Globe2, Users } from 'lucide-react';
import { BaseModal } from './BaseModal';
import { BookmarkButton } from '@/components/ui/BookmarkButton';
import { PortalLoader } from '@/components/common/PortalLoader';
import { useLocationDetails } from '@/hooks/useEntityDetails';

export function LocationModal({ locationId, onClose }: { locationId: string | null; onClose: () => void }) {
  const { location, loading } = useLocationDetails(locationId);

  return (
    <BaseModal open={!!locationId} onClose={onClose} maxWidthClass="max-w-3xl">
      {loading || !location ? (
        <div className="flex h-96 items-center justify-center">
          <PortalLoader label="Carregando local..." />
        </div>
      ) : (
        <div className="grid gap-0 md:grid-cols-[280px_1fr]">
          <img src={location.image} alt={location.name} className="h-64 w-full object-cover md:h-full" />

          <div className="flex flex-col gap-5 p-6">
            <div>
              <span className="mb-2 inline-block rounded-full bg-purple-600/20 px-3 py-1 text-xs font-medium text-purple-300">
                Local
              </span>
              <h2 className="text-2xl font-bold text-white">{location.name}</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 text-sm">
              <div>
                <p className="mb-1 flex items-center gap-1.5 text-white/40">
                  <Globe2 size={14} /> Tipo
                </p>
                <p className="text-white/80">{location.type || 'Desconhecido'}</p>
              </div>
              <div>
                <p className="mb-1 text-white/40">Dimensão</p>
                <p className="text-white/80">{location.dimension || 'Desconhecida'}</p>
              </div>
            </div>

            {location.residents.length > 0 && (
              <div>
                <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-white/40">
                  <Users size={14} /> Residentes ({location.residents.length})
                </h3>
                <p className="text-sm text-white/70">
                  {location.residents.slice(0, 8).map((r) => r.name).join(', ')}
                  {location.residents.length > 8 && '...'}
                </p>
              </div>
            )}

            <div className="mt-auto pt-2">
              <BookmarkButton type="location" id={location.id} size="md" variant="icon-labeled" />
            </div>
          </div>
        </div>
      )}
    </BaseModal>
  );
}
