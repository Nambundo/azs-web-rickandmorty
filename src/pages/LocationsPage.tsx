import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { usePageSearch } from '@/hooks/usePageSearch';
import { useLocations } from '@/hooks/useLocations';
import { LocationCard } from '@/components/cards/LocationCard';
import { LocationModal } from '@/components/modal/LocationModal';
import { Pagination } from '@/components/common/Pagination';
import { GridSkeleton } from '@/components/common/Skeletons';
import { PortalLoaderInline } from '@/components/common/PortalLoader';
import { EmptyState } from '@/components/common/EmptyState';

export function LocationsPage() {
  const query = usePageSearch('Buscar locais...');
  const [page, setPage] = useState(1);
  const [openLocationId, setOpenLocationId] = useState<string | null>(null);

  const { locations, info, loading } = useLocations(page, query || undefined);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Locais</h1>
        <p className="mt-1 text-white/60">Explore todos os planetas, dimensões e lugares do universo de Rick and Morty.</p>
      </div>

      <p className="flex items-center gap-3 text-sm text-white/60">
        {info ? `${info.count} locais encontrados` : 'Carregando...'}
        {loading && <PortalLoaderInline />}
      </p>

      {loading ? (
        <GridSkeleton count={10} />
      ) : locations.length === 0 ? (
        <EmptyState icon={MapPin} title="Nenhum local encontrado" description="Tente ajustar sua busca." />
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {locations.map((loc) => (
            <LocationCard key={loc.id} location={loc} onOpen={setOpenLocationId} />
          ))}
        </div>
      )}

      {info && info.pages > 1 && (
        <Pagination page={page} totalPages={info.pages} onPageChange={setPage} />
      )}

      <LocationModal locationId={openLocationId} onClose={() => setOpenLocationId(null)} />
    </div>
  );
}
