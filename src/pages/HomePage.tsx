import { useNavigate } from 'react-router-dom';
import { Play, Users, Star, Search, Calendar, MapPin } from 'lucide-react';
import { useState } from 'react';
import { usePageSearch } from '@/hooks/usePageSearch';
import { useEpisodes } from '@/hooks/useEpisodes';
import { useCharacters } from '@/hooks/useCharacters';
import { useLocations } from '@/hooks/useLocations';
import { useCharactersByIds } from '@/hooks/useEntitiesByIds';
import { Carousel } from '@/components/common/Carousel';
import { EpisodeCard } from '@/components/cards/EpisodeCard';
import { CharacterCard } from '@/components/cards/CharacterCard';
import { LocationCard } from '@/components/cards/LocationCard';
import { EpisodeModal } from '@/components/modal/EpisodeModal';
import { CharacterModal } from '@/components/modal/CharacterModal';
import { LocationModal } from '@/components/modal/LocationModal';
import { CardSkeleton, GridSkeleton } from '@/components/common/Skeletons';
import { PortalLoaderInline } from '@/components/common/PortalLoader';
import { EmptyState } from '@/components/common/EmptyState';

// IDs 1 e 2 = Rick Sanchez e Morty Smith, os protagonistas da série
const HERO_CHARACTER_IDS = ['1', '2'];

export function HomePage() {
  const query = usePageSearch('Buscar episódios, personagens e locais...');
  const navigate = useNavigate();
  const [openEpisodeId, setOpenEpisodeId] = useState<string | null>(null);
  const [openCharacterId, setOpenCharacterId] = useState<string | null>(null);
  const [openLocationId, setOpenLocationId] = useState<string | null>(null);

  const isSearching = query.trim().length > 0;

  // Conteúdo padrão da Home (banner + destaques)
  const { episodes: featured, loading: loadingFeatured } = useEpisodes(1);
  const { episodes: topRated, loading: loadingTop } = useEpisodes(2);
  const { characters: heroCharacters } = useCharactersByIds(HERO_CHARACTER_IDS);

  // Busca global: dispara as 3 queries só quando há texto digitado
  const { episodes: searchEpisodes, loading: loadingSearchEpisodes } = useEpisodes(1, isSearching ? query : undefined);
  const { characters: searchCharacters, loading: loadingSearchCharacters } = useCharacters(1, isSearching ? query : undefined);
  const { locations: searchLocations, loading: loadingSearchLocations } = useLocations(1, isSearching ? query : undefined);

  const sortedTopRated = [...topRated].sort((a, b) => b.rating - a.rating);
  const rick = heroCharacters.find((c) => c.id === '1');
  const morty = heroCharacters.find((c) => c.id === '2');

  const isSearchLoading = loadingSearchEpisodes || loadingSearchCharacters || loadingSearchLocations;
  const hasAnySearchResult = searchEpisodes.length > 0 || searchCharacters.length > 0 || searchLocations.length > 0;

  if (isSearching) {
    return (
      <div className="space-y-10">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="flex items-center gap-2 text-2xl font-bold text-white">
            <Search className="text-purple-400" size={22} />
            Resultados para "{query}"
          </h1>
          {isSearchLoading && <PortalLoaderInline label="Buscando..." />}
        </div>

        {!isSearchLoading && !hasAnySearchResult ? (
          <EmptyState
            icon={Search}
            title="Nenhum resultado encontrado"
            description="Tente buscar por outro episódio, personagem ou local."
          />
        ) : (
          <div className="space-y-10">
            {(loadingSearchEpisodes || searchEpisodes.length > 0) && (
              <section className="space-y-4">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
                  <Calendar size={18} className="text-purple-400" /> Episódios
                  {!loadingSearchEpisodes && (
                    <span className="rounded-full bg-purple-600/20 px-2 py-0.5 text-sm text-purple-300">
                      {searchEpisodes.length}
                    </span>
                  )}
                </h2>
                {loadingSearchEpisodes ? (
                  <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                    {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                    {searchEpisodes.map((ep) => (
                      <EpisodeCard key={ep.id} episode={ep} onOpen={setOpenEpisodeId} />
                    ))}
                  </div>
                )}
              </section>
            )}

            {(loadingSearchCharacters || searchCharacters.length > 0) && (
              <section className="space-y-4">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
                  <Users size={18} className="text-purple-400" /> Personagens
                  {!loadingSearchCharacters && (
                    <span className="rounded-full bg-purple-600/20 px-2 py-0.5 text-sm text-purple-300">
                      {searchCharacters.length}
                    </span>
                  )}
                </h2>
                {loadingSearchCharacters ? (
                  <GridSkeleton count={6} />
                ) : (
                  <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                    {searchCharacters.map((c) => (
                      <CharacterCard key={c.id} character={c} onOpen={setOpenCharacterId} />
                    ))}
                  </div>
                )}
              </section>
            )}

            {(loadingSearchLocations || searchLocations.length > 0) && (
              <section className="space-y-4">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
                  <MapPin size={18} className="text-purple-400" /> Locais
                  {!loadingSearchLocations && (
                    <span className="rounded-full bg-purple-600/20 px-2 py-0.5 text-sm text-purple-300">
                      {searchLocations.length}
                    </span>
                  )}
                </h2>
                {loadingSearchLocations ? (
                  <GridSkeleton count={5} />
                ) : (
                  <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {searchLocations.map((loc) => (
                      <LocationCard key={loc.id} location={loc} onOpen={setOpenLocationId} />
                    ))}
                  </div>
                )}
              </section>
            )}
          </div>
        )}

        <EpisodeModal episodeId={openEpisodeId} onClose={() => setOpenEpisodeId(null)} />
        <CharacterModal characterId={openCharacterId} onClose={() => setOpenCharacterId(null)} />
        <LocationModal locationId={openLocationId} onClose={() => setOpenLocationId(null)} />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#160f2e] via-[#0d0b1a] to-[#07070f]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(34,197,94,0.15),transparent_55%)]" />

        <div className="relative flex flex-col gap-6 p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 lg:max-w-lg">
            <p className="text-sm font-medium text-white/70">Bem-vindo ao universo de</p>
            <h1 className="text-4xl font-extrabold sm:text-5xl">
              Rick <span className="text-purple-400">and Morty</span>
            </h1>
            <p className="max-w-lg text-white/70">
              Explore episódios, personagens e locais dessa jornada interdimensional.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => navigate('/episodios')}
                className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
              >
                <Play size={16} /> Explorar episódios
              </button>
              <button
                onClick={() => navigate('/personagens')}
                className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10"
              >
                <Users size={16} /> Ver personagens
              </button>
            </div>
          </div>

          {/* Personagens principais em destaque */}
          <div className="relative flex h-56 items-end justify-center gap-[-1rem] sm:h-72 lg:h-80">
            {rick && (
              <img
                src={rick.image}
                alt={rick.name}
                className="relative z-10 h-52 w-52 rounded-full border-4 border-purple-500/60 object-cover shadow-[0_0_50px_rgba(147,51,234,0.45)] sm:h-64 sm:w-64 lg:h-72 lg:w-72"
              />
            )}
            {morty && (
              <img
                src={morty.image}
                alt={morty.name}
                className="relative -ml-10 h-36 w-36 translate-y-4 rounded-full border-4 border-green-500/60 object-cover shadow-[0_0_40px_rgba(34,197,94,0.4)] sm:h-44 sm:w-44 lg:h-48 lg:w-48"
              />
            )}
          </div>
        </div>
      </section>

      <Carousel title="Episódios em destaque">
        {loadingFeatured
          ? Array.from({ length: 6 }).map((_, i) => <div key={i} className="w-48 shrink-0"><CardSkeleton /></div>)
          : featured.map((ep) => (
              <div key={ep.id} className="w-48 shrink-0">
                <EpisodeCard episode={ep} onOpen={setOpenEpisodeId} />
              </div>
            ))}
      </Carousel>

      <Carousel title="Mais avaliados" icon={<Star size={18} className="text-yellow-400" />}>
        {loadingTop
          ? Array.from({ length: 6 }).map((_, i) => <div key={i} className="w-48 shrink-0"><CardSkeleton /></div>)
          : sortedTopRated.map((ep) => (
              <div key={ep.id} className="w-48 shrink-0">
                <EpisodeCard episode={ep} onOpen={setOpenEpisodeId} />
              </div>
            ))}
      </Carousel>

      <EpisodeModal episodeId={openEpisodeId} onClose={() => setOpenEpisodeId(null)} />
      <CharacterModal characterId={openCharacterId} onClose={() => setOpenCharacterId(null)} />
      <LocationModal locationId={openLocationId} onClose={() => setOpenLocationId(null)} />
    </div>
  );
}
