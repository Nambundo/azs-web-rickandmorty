import { Search } from 'lucide-react';
import { useSearch } from '@/context/SearchContext';

export function SearchBar() {
  const { query, setQuery, placeholder } = useSearch();

  return (
    <div className="relative flex-1 max-w-2xl">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-11 pr-16 text-sm text-white placeholder:text-white/40 backdrop-blur-md transition-colors focus:border-purple-500/60 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
      />
      <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[11px] text-white/40">
        Ctrl K
      </kbd>
    </div>
  );
}
