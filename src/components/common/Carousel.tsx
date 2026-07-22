import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, type ReactNode } from 'react';

interface CarouselProps {
  title: string;
  count?: number;
  icon?: ReactNode;
  children: ReactNode;
}

export function Carousel({ title, count, icon, children }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
          {icon}
          {title}
          {typeof count === 'number' && (
            <span className="rounded-full bg-purple-600/20 px-2 py-0.5 text-sm text-purple-300">{count}</span>
          )}
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label={`${title}: rolar para a esquerda`}
            onClick={() => scroll('left')}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-purple-400/50 hover:text-white"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label={`${title}: rolar para a direita`}
            onClick={() => scroll('right')}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-purple-400/50 hover:text-white"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2"
        style={{ scrollbarWidth: 'none' }}
      >
        {children}
      </div>
    </section>
  );
}
