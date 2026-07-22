const STATUS_MAP: Record<string, { color: string; label: string }> = {
  Alive: { color: 'bg-green-500', label: 'Vivo' },
  Dead: { color: 'bg-red-500', label: 'Morto' },
  unknown: { color: 'bg-gray-500', label: 'Desconhecido' },
};

export function StatusDot({ status }: { status: string }) {
  const info = STATUS_MAP[status] ?? STATUS_MAP.unknown;
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-white/70">
      <span className={`h-2 w-2 rounded-full ${info.color}`} />
      {info.label}
    </span>
  );
}
