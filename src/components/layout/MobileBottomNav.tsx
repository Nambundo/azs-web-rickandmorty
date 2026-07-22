import { NavLink } from 'react-router-dom';
import { Compass, Calendar, Users, MapPin, Info } from 'lucide-react';

const ITEMS = [
  { to: '/', label: 'Explorar', icon: Compass, end: true },
  { to: '/episodios', label: 'Episódios', icon: Calendar },
  { to: '/personagens', label: 'Personagens', icon: Users },
  { to: '/locais', label: 'Locais', icon: MapPin },
  { to: '/sobre', label: 'Sobre', icon: Info },
];

export function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-white/10 bg-[#07070f]/95 backdrop-blur-xl lg:hidden">
      {ITEMS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] ${
              isActive ? 'text-purple-400' : 'text-white/50'
            }`
          }
        >
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
