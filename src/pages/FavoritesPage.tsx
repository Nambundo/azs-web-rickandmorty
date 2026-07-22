import { useState } from 'react';
import { Bookmark, Calendar, Users, MapPin, Trash2 } from 'lucide-react';
import { usePageSearch } from '@/hooks/usePageSearch';
import { useFavorites } from '@/hooks/useFavorites';
import { useCharactersByIds, useEpisodesByIds, useLocationsByIds } from '@/hooks/useEntitiesByIds';
import { Carousel } from '@/components/common/Carousel';
import { EpisodeCard } from '@/components/cards/EpisodeCard';
import { CharacterCard } from '@/components/cards/CharacterCard';
import { LocationCard } from '@/components/cards/LocationCard';
import { EpisodeModal } from '@/components/modal/EpisodeModal';
import { CharacterModal } from '@/components/modal/CharacterModal';
import { LocationModal } from '@/components/modal/LocationModal';
import { EmptyState } from '@/components/common/EmptyState';

type Tab = 'all' | 'episode' | 'character' | 'location';

export function FavoritesPage() {
  usePageSearch('Buscar episódios, personagens, locais...');
  const { favorites, clearAll } = useFavorites();
  const [tab, setTab] = useState<Tab>('all');
  const [openEpisodeId, setOpenEpisodeId] = useState<string | null>(null);
  const [openCharacterId, setOpenCharacterId] = useState<string | null>(null);
  const [openLocationId, setOpenLocationId] = useState<string | null>(null);

  const { episodes } = useEpisodesByIds(favorites.episode);
  const { characters } = useCharactersByIds(favorites.character);
  const { locations } = useLocationsByIds(favorites.location);

  const total = favorites.episode.length + favorites.character.length + favorites.location.length;

  const TABS: { key: Tab; label: string; count: number }[] = [
    { key: 'all', label: 'Tudo', count: total },
    { key: 'episode', label: 'Episódios', count: favorites.episode.length },
    { key: 'character', label: 'Personagens', count: favorites.character.length },
    { key: 'location', label: 'Locais', count: favorites.location.length },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-bold text-white">
            <Bookmark className="text-purple-400" />
            Favoritos
          </h1>
          <p className="mt-1 text-white/60">Tudo que você marcou como favorito está aqui.</p>
        </div>
        {total > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition-colors hover:border-red-400/50 hover:text-red-300"
          >
            <Trash2 size={15} /> Remover todos
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
        <EmptyState icon={Bookmark} title="Nenhum favorito ainda" description="Marque episódios, personagens ou locais para vê-los aqui." />
      ) : (
        <div className="space-y-10">
          {(tab === 'all' || tab === 'episode') && episodes.length > 0 && (
            <Carousel title="Episódios" count={episodes.length} icon={<Calendar size={18} className="text-purple-400" />}>
              {episodes.map((ep) => (
                <div key={ep.id} className="w-48 shrink-0">
                  <EpisodeCard episode={ep} onOpen={setOpenEpisodeId} />
                </div>
              ))}
            </Carousel>
          )}

          {(tab === 'all' || tab === 'character') && characters.length > 0 && (
            <Carousel title="Personagens" count={characters.length} icon={<Users size={18} className="text-purple-400" />}>
              {characters.map((c) => (
                <div key={c.id} className="w-44 shrink-0">
                  <CharacterCard character={c} onOpen={setOpenCharacterId} />
                </div>
              ))}
            </Carousel>
          )}

          {(tab === 'all' || tab === 'location') && locations.length > 0 && (
            <Carousel title="Locais" count={locations.length} icon={<MapPin size={18} className="text-purple-400" />}>
              {locations.map((loc) => (
                <div key={loc.id} className="w-56 shrink-0">
                  <LocationCard location={loc} onOpen={setOpenLocationId} />
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
