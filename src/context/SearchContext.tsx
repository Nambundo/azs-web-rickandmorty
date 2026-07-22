import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

interface SearchContextValue {
  query: string;
  setQuery: (value: string) => void;
  placeholder: string;
  setPlaceholder: (value: string) => void;
}

const SearchContext = createContext<SearchContextValue | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('');
  const [placeholder, setPlaceholder] = useState('Buscar episódios, personagens e locais...');

  const value = useMemo(
    () => ({ query, setQuery, placeholder, setPlaceholder }),
    [query, placeholder],
  );

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error('useSearch deve ser usado dentro de SearchProvider');
  return ctx;
}
