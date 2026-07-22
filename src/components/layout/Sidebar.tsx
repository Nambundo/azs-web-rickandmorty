import { NavLink } from 'react-router-dom';
import { Compass, Calendar, Users, MapPin, Bookmark, Eye, Info } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/', label: 'Explorar', icon: Compass, end: true },
  { to: '/episodios', label: 'Episódios', icon: Calendar },
  { to: '/personagens', label: 'Personagens', icon: Users },
  { to: '/locais', label: 'Locais', icon: MapPin },
  { to: '/favoritos', label: 'Favoritos', icon: Bookmark },
  { to: '/assistidos', label: 'Assistidos', icon: Eye },
  { to: '/sobre', label: 'Sobre', icon: Info },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-white/10 bg-[#07070f]/95 p-5 backdrop-blur-xl lg:flex">
      <a href="/" className="mb-8 block">
        <span className="text-2xl font-extrabold tracking-tight text-green-400" style={{ fontFamily: 'inherit' }}>
          Rick <span className="text-white">and</span> Morty
        </span>
      </a>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-purple-600/90 text-white shadow-[0_0_16px_rgba(147,51,234,0.35)]'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
        <img
          src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
          alt="Rick Sanchez"
          className="mb-3 h-20 w-20 rounded-full object-cover border-2 border-purple-500/40"
        />
        <p className="text-sm font-semibold text-white">Rick and Morty API</p>
        <p className="text-xs text-white/50">
          Dados fornecidos por{' '}
          <a
            href="https://rickandmortyapi.com"
            target="_blank"
            rel="noreferrer"
            className="text-purple-400 hover:underline"
          >
            rickandmortyapi.com
          </a>
        </p>
      </div>
    </aside>
  );
}
