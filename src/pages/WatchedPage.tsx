import { useState, type ReactNode } from 'react';
import { CheckCircle2, Calendar, Users, MapPin, Trash2 } from 'lucide-react';
import { usePageSearch } from '@/hooks/usePageSearch';
import { useWatchedHistory } from '@/hooks/useWatchedHistory';
import { useCharactersByIds, useEpisodesByIds, useLocationsByIds } from '@/hooks/useEntitiesByIds';
import { Carousel } from '@/components/common/Carousel';
import { CharacterCollage } from '@/components/cards/CharacterCollage';
import { EpisodeModal } from '@/components/modal/EpisodeModal';
import { CharacterModal } from '@/components/modal/CharacterModal';
import { LocationModal } from '@/components/modal/LocationModal';
import { EmptyState } from '@/components/common/EmptyState';
import type { WatchedEntry } from '@/types';

type Tab = 'all' | 'episode' | 'character' | 'location';

function ProgressCard({
  image,
  imageNode,
  title,
  subtitle,
  progress,
  onClick,
}: {
  image?: string;
  imageNode?: ReactNode;
  title: string;
  subtitle: string;
  progress: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-green-400/40"
    >
      <div className="relative aspect-video overflow-hidden">
        {imageNode ?? (
          <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        )}
        <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
          <CheckCircle2 size={14} />
        </div>
      </div>
      <div className="space-y-2 p-3">
        <h3 className="truncate text-sm font-semibold text-white">{title}</h3>
        <p className="truncate text-xs text-white/50">{subtitle}</p>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-purple-500" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-xs text-white/40">{progress}%</p>
      </div>
    </button>
  );
}

export function WatchedPage() {
  usePageSearch('Buscar episódios, personagens, locais...');
  const { watched, clearAll } = useWatchedHistory();
  const [tab, setTab] = useState<Tab>('all');
  const [openEpisodeId, setOpenEpisodeId] = useState<string | null>(null);
  const [openCharacterId, setOpenCharacterId] = useState<string | null>(null);
  const [openLocationId, setOpenLocationId] = useState<string | null>(null);

  const episodeIds = watched.filter((w) => w.type === 'episode').map((w) => w.id);
  const characterIds = watched.filter((w) => w.type === 'character').map((w) => w.id);
  const locationIds = watched.filter((w) => w.type === 'location').map((w) => w.id);

  const { episodes } = useEpisodesByIds(episodeIds);
  const { characters } = useCharactersByIds(characterIds);
  const { locations } = useLocationsByIds(locationIds);

  const progressOf = (id: string): number =>
    watched.find((w: WatchedEntry) => w.id === id)?.progress ?? 100;

  const total = watched.length;
  const TABS: { key: Tab; label: string; count: number }[] = [
    { key: 'all', label: 'Tudo', count: total },
    { key: 'episode', label: 'Episódios', count: episodeIds.length },
    { key: 'character', label: 'Personagens', count: characterIds.length },
    { key: 'location', label: 'Locais', count: locationIds.length },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-bold text-white">
            <CheckCircle2 className="text-green-400" />
            Assistidos
          </h1>
          <p className="mt-1 text-white/60">Aqui estão tudo que você já assistiu.</p>
        </div>
        {total > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition-colors hover:border-red-400/50 hover:text-red-300"
          >
            <Trash2 size={15} /> Limpar histórico
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              tab === t.key ? 'bg-purple-600 text-white' : 'border border-white/10 bg-white/5 text-white/70 hover:border-purple-400/40'
            }`}
          >
            {t.label}
            <span className={`rounded-full px-1.5 text-xs ${tab === t.key ? 'bg-white/20' : 'bg-white/10'}`}>{t.count}</span>
          </button>
        ))}
      </div>

      {total === 0 ? (
        <EmptyState icon={CheckCircle2} title="Nada assistido ainda" description="Marque episódios, personagens ou locais como assistidos para vê-los aqui." />
      ) : (
        <div className="space-y-10">
          {(tab === 'all' || tab === 'episode') && episodes.length > 0 && (
            <Carousel title="Episódios assistidos" count={episodes.length} icon={<Calendar size={18} className="text-green-400" />}>
              {episodes.map((ep) => (
                <div key={ep.id} className="w-48 shrink-0">
                  <ProgressCard
                    imageNode={<CharacterCollage images={ep.characters?.map((c) => c.image) ?? []} alt={ep.name} />}
                    title={ep.name}
                    subtitle={ep.episode}
                    progress={progressOf(ep.id)}
                    onClick={() => setOpenEpisodeId(ep.id)}
                  />
                </div>
              ))}
            </Carousel>
          )}

          {(tab === 'all' || tab === 'character') && characters.length > 0 && (
            <Carousel title="Personagens assistidos" count={characters.length} icon={<Users size={18} className="text-green-400" />}>
              {characters.map((c) => (
                <div key={c.id} className="w-48 shrink-0">
                  <ProgressCard
                    image={c.image}
                    title={c.name}
                    subtitle={c.species}
                    progress={progressOf(c.id)}
                    onClick={() => setOpenCharacterId(c.id)}
                  />
                </div>
              ))}
            </Carousel>
          )}

          {(tab === 'all' || tab === 'location') && locations.length > 0 && (
            <Carousel title="Locais assistidos" count={locations.length} icon={<MapPin size={18} className="text-green-400" />}>
              {locations.map((loc) => (
                <div key={loc.id} className="w-56 shrink-0">
                  <ProgressCard
                    image={loc.image}
                    title={loc.name}
                    subtitle={`Tipo: ${loc.type || 'Desconhecido'}`}
                    progress={progressOf(loc.id)}
                    onClick={() => setOpenLocationId(loc.id)}
                  />
                </div>
              ))}
            </Carousel>
          )}
        </div>
      )}

      <EpisodeModal episodeId={openEpisodeId} onClose={() => setOpenEpisodeId(null)} />
      <CharacterModal characterId={openCharacterId} onClose={() => setOpenCharacterId(null)} />
      <LocationModal locationId={openLocationId} onClose={() => setOpenLocationId(null)} />
    </div>
  );
}
