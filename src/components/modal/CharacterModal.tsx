import { Dna, Users, MapPin, Star } from 'lucide-react';
import { BaseModal } from './BaseModal';
import { BookmarkButton } from '@/components/ui/BookmarkButton';
import { WatchButton } from '@/components/ui/WatchButton';
import { StatusDot } from '@/components/ui/StatusDot';
import { PortalLoader } from '@/components/common/PortalLoader';
import { useCharacterDetails } from '@/hooks/useEntityDetails';

export function CharacterModal({ characterId, onClose }: { characterId: string | null; onClose: () => void }) {
  const { character, loading } = useCharacterDetails(characterId);

  return (
    <BaseModal open={!!characterId} onClose={onClose} maxWidthClass="max-w-3xl">
      {loading || !character ? (
        <div className="flex h-96 items-center justify-center">
          <PortalLoader label="Carregando personagem..." />
        </div>
      ) : (
        <div className="grid gap-0 md:grid-cols-[280px_1fr]">
          <img src={character.image} alt={character.name} className="h-64 w-full object-cover md:h-full" />

          <div className="flex flex-col gap-5 p-6">
            <div>
              <span className="mb-2 inline-block rounded-full bg-purple-600/20 px-3 py-1 text-xs font-medium text-purple-300">
                Personagem
              </span>
              <h2 className="text-2xl font-bold text-white">{character.name}</h2>
              <div className="mt-2 flex items-center gap-3">
                <StatusDot status={character.status} />
                <span className="text-sm text-white/50">•</span>
                <span className="text-sm text-white/70">{character.species}</span>
              </div>
            </div>

            <div>
              <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-white/40">Sobre</h3>
              <p className="text-sm leading-relaxed text-white/80">{character.bio}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4 text-sm">
              <div>
                <p className="mb-1 flex items-center gap-1.5 text-white/40">
                  <Dna size={14} /> Espécie
                </p>
                <p className="text-white/80">{character.species}</p>
              </div>
              <div>
                <p className="mb-1 flex items-center gap-1.5 text-white/40">
                  <Users size={14} /> Gênero
                </p>
                <p className="text-white/80">{character.gender}</p>
              </div>
              <div>
                <p className="mb-1 flex items-center gap-1.5 text-white/40">
                  <MapPin size={14} /> Origem
                </p>
                <p className="text-white/80">{character.origin.name}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4 text-sm">
              <div>
                <p className="text-white/40">Episódios</p>
                <p className="text-lg font-semibold text-white">{character.episode.length}</p>
              </div>
              <div>
                <p className="flex items-center gap-1 text-white/40">
                  <Star size={13} /> Avaliação
                </p>
                <p className="text-lg font-semibold text-yellow-400">{character.rating.toFixed(1)}</p>
              </div>
            </div>

            <div className="mt-auto flex gap-3 pt-2">
              <div className="flex-1">
                <WatchButton type="character" id={character.id} size="md" variant="icon-labeled" />
              </div>
              <BookmarkButton type="character" id={character.id} size="md" />
            </div>
          </div>
        </div>
      )}
    </BaseModal>
  );
}
