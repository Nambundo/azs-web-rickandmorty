import { BaseCard } from './BaseCard';
import { CharacterCollage } from './CharacterCollage';
import { BookmarkButton } from '@/components/ui/BookmarkButton';
import { RatingBadge } from '@/components/ui/RatingBadge';
import type { Episode } from '@/types';

export function EpisodeCard({ episode, onOpen }: { episode: Episode; onOpen: (id: string) => void }) {
  const images = episode.characters?.map((c) => c.image) ?? [];

  return (
    <BaseCard
      imageNode={<CharacterCollage images={images} alt={episode.name} />}
      alt={episode.name}
      onClick={() => onOpen(episode.id)}
      badge={
        <span className="rounded-md bg-purple-600/90 px-2 py-1 text-xs font-semibold text-white backdrop-blur-md">
          {episode.episode}
        </span>
      }
      actions={<BookmarkButton type="episode" id={episode.id} />}
      title={episode.name}
      meta={episode.air_date}
      footer={<RatingBadge rating={episode.rating} />}
    />
  );
}
