import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
}

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 py-16 text-center">
      <Icon size={36} className="text-white/30" />
      <p className="text-lg font-medium text-white/80">{title}</p>
      {description && <p className="max-w-sm text-sm text-white/50">{description}</p>}
    </div>
  );
}
