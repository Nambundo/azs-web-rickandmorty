export function PortalLoader({ label = 'Carregando...', size = 64 }: { label?: string; size?: number }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <PortalSpinner size={size} />
      <p className="text-sm font-medium text-white/60">{label}</p>
      <PortalKeyframes />
    </div>
  );
}

export function PortalLoaderInline({ label = 'Buscando...' }: { label?: string }) {
  return (
    <div className="flex items-center gap-2.5 text-sm text-white/50">
      <PortalSpinner size={16} />
      {label}
      <PortalKeyframes />
    </div>
  );
}

function PortalSpinner({ size }: { size: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-full border-4 border-transparent"
        style={{
          borderTopColor: '#22c55e',
          borderRightColor: '#a855f7',
          animation: 'portal-spin 1s linear infinite',
        }}
      />
      <div
        className="absolute inset-[3px] rounded-full border-4 border-transparent"
        style={{
          borderBottomColor: '#a855f7',
          borderLeftColor: '#22c55e',
          animation: 'portal-spin-reverse 1.6s linear infinite',
        }}
      />
      <div
        className="absolute inset-[35%] rounded-full bg-gradient-to-br from-green-400 to-purple-500"
        style={{ animation: 'portal-pulse 1.4s ease-in-out infinite' }}
      />
    </div>
  );
}

function PortalKeyframes() {
  return (
    <style>{`
      @keyframes portal-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes portal-spin-reverse {
        from { transform: rotate(360deg); }
        to { transform: rotate(0deg); }
      }
      @keyframes portal-pulse {
        0%, 100% { opacity: 0.6; transform: scale(0.85); }
        50% { opacity: 1; transform: scale(1.05); }
      }
    `}</style>
  );
}
