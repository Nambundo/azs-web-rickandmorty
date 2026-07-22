import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { usePageSearch } from '@/hooks/usePageSearch';
import { useEpisodes } from '@/hooks/useEpisodes';
import { EpisodeCard } from '@/components/cards/EpisodeCard';
import { EpisodeModal } from '@/components/modal/EpisodeModal';
import { Pagination } from '@/components/common/Pagination';
import { GridSkeleton } from '@/components/common/Skeletons';
import { PortalLoaderInline } from '@/components/common/PortalLoader';
import { EmptyState } from '@/components/common/EmptyState';
import { Calendar } from 'lucide-react';

const SEASONS = [
  { label: 'Todas', value: '' },
  { label: 'Temporada 1', value: 'S01' },
  { label: 'Temporada 2', value: 'S02' },
  { label: 'Temporada 3', value: 'S03' },
  { label: 'Temporada 4', value: 'S04' },
  { label: 'Temporada 5', value: 'S05' },
];

export function EpisodesPage() {
  const query = usePageSearch('Buscar episódios...');
  const [page, setPage] = useState(1);
  const [season, setSeason] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openEpisodeId, setOpenEpisodeId] = useState<string | null>(null);

  const { episodes, info, loading } = useEpisodes(page, query || undefined, season || undefined);
  const currentSeasonLabel = SEASONS.find((s) => s.value === season)?.label ?? 'Todas';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Episódios</h1>
        <p className="mt-1 text-white/60">Explore todos os episódios de Rick and Morty. Clique em um episódio para ver mais detalhes.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-white/60">
          {info ? `${info.count} episódios encontrados` : 'Carregando...'}
        </span>
        {loading && <PortalLoaderInline />}

        <div className="relative ml-auto">
          <button
            type="button"
            onClick={() => setDropdownOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg border border-purple-500/50 bg-white/5 px-3 py-2 text-sm text-white"
          >
            Temporada: {currentSeasonLabel}
            <ChevronDown size={15} />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 z-10 mt-2 w-44 overflow-hidden rounded-lg border border-white/10 bg-[#0f0f1c] shadow-xl">
              {SEASONS.map((s) => (
                <button
                  key={s.value}
                  onClick={() => {
                    setSeason(s.value);
                    setPage(1);
                    setDropdownOpen(false);
                  }}
                  className={`block w-full px-4 py-2.5 text-left text-sm hover:bg-white/5 ${
                    s.value === season ? 'text-purple-400' : 'text-white/80'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <GridSkeleton count={12} />
      ) : episodes.length === 0 ? (
        <EmptyState icon={Calendar} title="Nenhum episódio encontrado" description="Tente ajustar a busca ou o filtro de temporada." />
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {episodes.map((ep) => (
            <EpisodeCard key={ep.id} episode={ep} onOpen={setOpenEpisodeId} />
          ))}
        </div>
      )}

      {info && info.pages > 1 && (
        <Pagination page={page} totalPages={info.pages} onPageChange={setPage} />
      )}

      <EpisodeModal episodeId={openEpisodeId} onClose={() => setOpenEpisodeId(null)} />
    </div>
  );
}
