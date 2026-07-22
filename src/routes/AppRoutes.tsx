import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { EpisodesPage } from '@/pages/EpisodesPage';
import { CharactersPage } from '@/pages/CharactersPage';
import { LocationsPage } from '@/pages/LocationsPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { WatchedPage } from '@/pages/WatchedPage';
import { AboutPage } from '@/pages/AboutPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/episodios" element={<EpisodesPage />} />
      <Route path="/personagens" element={<CharactersPage />} />
      <Route path="/locais" element={<LocationsPage />} />
      <Route path="/favoritos" element={<FavoritesPage />} />
      <Route path="/assistidos" element={<WatchedPage />} />
      <Route path="/sobre" element={<AboutPage />} />
    </Routes>
  );
}
