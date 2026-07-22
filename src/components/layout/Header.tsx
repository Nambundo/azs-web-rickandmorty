import { NavLink } from 'react-router-dom';
import { Bookmark, Eye } from 'lucide-react';
import { SearchBar } from '@/components/common/SearchBar';

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-white/10 bg-[#07070f]/80 px-4 py-4 backdrop-blur-xl lg:px-8">
      <SearchBar />

      <div className="ml-auto flex items-center gap-3">
        <NavLink
          to="/favoritos"
          aria-label="Favoritos"
          className={({ isActive }) =>
            `flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
              isActive
                ? 'border-purple-400 bg-purple-600/20 text-purple-300'
                : 'border-white/10 bg-white/5 text-white/70 hover:border-purple-400/50 hover:text-white'
            }`
          }
        >
          <Bookmark size={18} />
        </NavLink>

        <NavLink
          to="/assistidos"
          aria-label="Assistidos"
          className={({ isActive }) =>
            `flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
              isActive
                ? 'border-green-400 bg-green-600/20 text-green-300'
                : 'border-white/10 bg-white/5 text-white/70 hover:border-green-400/50 hover:text-white'
            }`
          }
        >
          <Eye size={18} />
        </NavLink>
      </div>
    </header>
  );
}
