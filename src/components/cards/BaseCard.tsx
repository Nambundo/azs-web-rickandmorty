import type { KeyboardEvent, ReactNode } from 'react';

interface BaseCardProps {
  image?: string;
  imageNode?: ReactNode;
  alt: string;
  badge?: ReactNode;
  actions?: ReactNode;
  title: string;
  meta?: ReactNode;
  footer?: ReactNode;
  onClick?: () => void;
  aspect?: 'video' | 'portrait';
}

// Usamos <div role="button"> em vez de <button> porque o card contém
// botões internos (Bookmark/Watch) — aninhar <button> dentro de <button>
// é inválido em HTML e faz o navegador fechar o elemento externo antes
// da hora, quebrando o clique no card.
export function BaseCard({ image, imageNode, alt, badge, actions, title, meta, footer, onClick, aspect = 'video' }: BaseCardProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className="group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/40 hover:shadow-[0_8px_30px_rgba(147,51,234,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60"
    >
      <div className={`relative overflow-hidden ${aspect === 'video' ? 'aspect-video' : 'aspect-[3/4]'}`}>
        {imageNode ?? (
          <img
            src={image}
            alt={alt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {badge && <div className="absolute left-3 top-3">{badge}</div>}
        {actions && <div className="absolute right-3 top-3 flex gap-2">{actions}</div>}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="truncate font-semibold text-white">{title}</h3>
        {meta && <div className="text-sm text-white/60">{meta}</div>}
        {footer && <div className="mt-2 flex items-center justify-between">{footer}</div>}
      </div>
    </div>
  );
}
