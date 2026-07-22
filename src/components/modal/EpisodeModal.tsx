import { Calendar, Clock, Star } from 'lucide-react';
import { BaseModal } from './BaseModal';
import { BookmarkButton } from '@/components/ui/BookmarkButton';
import { WatchButton } from '@/components/ui/WatchButton';
import { PortalLoader } from '@/components/common/PortalLoader';
import { CharacterCollage } from '@/components/cards/CharacterCollage';
import { useEpisodeDetails } from '@/hooks/useEntityDetails';

export function EpisodeModal({ episodeId, onClose }: { episodeId: string | null; onClose: () => void }) {
  const { episode, loading } = useEpisodeDetails(episodeId);

  return (
    <BaseModal open={!!episodeId} onClose={onClose} maxWidthClass="max-w-4xl">
      {loading || !episode ? (
        <div className="flex h-96 items-center justify-center">
          <PortalLoader label="Carregando episódio..." />
        </div>
      ) : (
        <div className="grid gap-0 md:grid-cols-2">
          <div className="relative aspect-video md:aspect-auto md:h-full">
            <CharacterCollage images={episode.characters.map((c) => c.image)} alt={episode.name} />
            <span className="absolute left-4 top-4 rounded-md bg-purple-600/90 px-2.5 py-1 text-xs font-semibold text-white">
              {episode.episode}
            </span>
          </div>

          <div className="flex flex-col gap-5 p-6">
            <h2 className="text-2xl font-bold text-white">{episode.name}</h2>

            <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
              <span className="flex items-center gap-1.5">
                <Calendar size={15} /> {episode.air_date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={15} /> {episode.durationMinutes} min
              </span>
              <span className="flex items-center gap-1.5 text-yellow-400">
                <Star size={15} fill="currentColor" /> {episode.rating.toFixed(1)} / 10
              </span>
            </div>

            <div>
              <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-white/40">Sinopse</h3>
              <p className="text-sm leading-relaxed text-white/80">{episode.synopsis}</p>
            </div>

            {episode.characters.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/40">
                  Personagens principais
                </h3>
                <div className="flex flex-wrap gap-4">
                  {episode.characters.slice(0, 6).map((c) => (
                    <div key={c.id} className="flex w-16 flex-col items-center gap-1.5 text-center">
                      <img
                        src={c.image}
                        alt={c.name}
                        className="h-14 w-14 rounded-full border-2 border-purple-500/40 object-cover"
                      />
                      <span className="truncate text-xs text-white/70">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 text-sm">
              <div>
                <p className="text-white/40">Roteiro</p>
                <p className="text-white/80">{episode.writer}</p>
              </div>
              <div>
                <p className="text-white/40">Direção</p>
                <p className="text-white/80">{episode.director}</p>
              </div>
            </div>

            <div className="mt-auto flex gap-3 pt-2">
              <div className="flex-1">
                <WatchButton type="episode" id={episode.id} size="md" variant="icon-labeled" label="Assistir episódio" />
              </div>
              <BookmarkButton type="episode" id={episode.id} size="md" />
            </div>
          </div>
        </div>
      )}
    </BaseModal>
  );
}
