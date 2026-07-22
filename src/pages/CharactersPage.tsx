import { useState } from 'react';
import { Users } from 'lucide-react';
import { usePageSearch } from '@/hooks/usePageSearch';
import { useCharacters } from '@/hooks/useCharacters';
import { CharacterCard } from '@/components/cards/CharacterCard';
import { CharacterModal } from '@/components/modal/CharacterModal';
import { Pagination } from '@/components/common/Pagination';
import { GridSkeleton } from '@/components/common/Skeletons';
import { PortalLoaderInline } from '@/components/common/PortalLoader';
import { EmptyState } from '@/components/common/EmptyState';

export function CharactersPage() {
  const query = usePageSearch('Buscar personagens...');
  const [page, setPage] = useState(1);
  const [openCharacterId, setOpenCharacterId] = useState<string | null>(null);

  const { characters, info, loading } = useCharacters(page, query || undefined);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Personagens</h1>
        <p className="mt-1 text-white/60">Conheça todos os personagens do universo de Rick and Morty.</p>
      </div>

      <p className="flex items-center gap-3 text-sm text-white/60">
        {info ? `${info.count} personagens encontrados` : 'Carregando...'}
        {loading && <PortalLoaderInline />}
      </p>

      {loading ? (
        <GridSkeleton count={18} />
      ) : characters.length === 0 ? (
        <EmptyState icon={Users} title="Nenhum personagem encontrado" description="Tente ajustar sua busca." />
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {characters.map((c) => (
            <CharacterCard key={c.id} character={c} onOpen={setOpenCharacterId} />
          ))}
        </div>
      )}

      {info && info.pages > 1 && (
        <Pagination page={page} totalPages={info.pages} onPageChange={setPage} />
      )}

      <CharacterModal characterId={openCharacterId} onClose={() => setOpenCharacterId(null)} />
    </div>
  );
}
