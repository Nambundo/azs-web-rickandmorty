import { BaseCard } from './BaseCard';
import { BookmarkButton } from '@/components/ui/BookmarkButton';
import { StatusDot } from '@/components/ui/StatusDot';
import type { Character } from '@/types';

export function CharacterCard({ character, onOpen }: { character: Character; onOpen: (id: string) => void }) {
  return (
    <BaseCard
      aspect="portrait"
      image={character.image}
      alt={character.name}
      onClick={() => onOpen(character.id)}
      actions={<BookmarkButton type="character" id={character.id} />}
      title={character.name}
      meta={character.species}
      footer={<StatusDot status={character.status} />}
    />
  );
}
