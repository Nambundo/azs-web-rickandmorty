import { useEffect } from 'react';
import { useSearch } from '@/context/SearchContext';
import { useDebouncedValue } from './useDebouncedValue';

export function usePageSearch(placeholder: string) {
  const { query, setQuery, setPlaceholder } = useSearch();

  useEffect(() => {
    setPlaceholder(placeholder);
    setQuery('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeholder]);

  const debouncedQuery = useDebouncedValue(query, 400);
  return debouncedQuery;
}
