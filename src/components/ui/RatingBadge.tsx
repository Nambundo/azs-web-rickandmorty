import { Star } from 'lucide-react';

export function RatingBadge({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm font-medium text-yellow-400">
      <Star size={size} fill="currentColor" />
      {rating.toFixed(1)}
    </span>
  );
}
