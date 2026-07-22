import { useQuery } from '@apollo/client/react';
import { GET_LOCATIONS } from '@/graphql/queries/locations';
import { getMockedLocationExtras } from '@/mocks/mockData';
import type { ApiInfo, ApiLocation, Location } from '@/types';

interface LocationsQueryResult {
  locations: {
    info: ApiInfo;
    results: ApiLocation[];
  };
}

export function useLocations(page: number, name?: string) {
  const { data, loading, error } = useQuery<LocationsQueryResult>(GET_LOCATIONS, {
    variables: { page, filter: name ? { name } : undefined },
    notifyOnNetworkStatusChange: true,
  });

  const locations: Location[] =
    data?.locations.results.map((l) => ({ ...l, ...getMockedLocationExtras(l) })) ?? [];

  return {
    locations,
    info: data?.locations.info ?? null,
    loading,
    error,
  };
}
