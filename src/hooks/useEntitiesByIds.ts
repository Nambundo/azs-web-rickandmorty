import { useQuery } from '@apollo/client/react';
import { GET_CHARACTERS_BY_IDS } from '@/graphql/queries/characters';
import { GET_EPISODES_BY_IDS } from '@/graphql/queries/episodes';
import { GET_LOCATIONS_BY_IDS } from '@/graphql/queries/locations';
import { getMockedCharacterExtras, getMockedEpisodeExtras, getMockedLocationExtras } from '@/mocks/mockData';
import type { ApiCharacter, ApiEpisode, ApiLocation, Character, Episode, Location } from '@/types';

export function useCharactersByIds(ids: string[]) {
  const { data, loading } = useQuery<{ charactersByIds: ApiCharacter[] }>(GET_CHARACTERS_BY_IDS, {
    variables: { ids },
    skip: ids.length === 0,
  });
  const characters: Character[] =
    data?.charactersByIds.map((c) => ({ ...c, ...getMockedCharacterExtras(c) })) ?? [];
  return { characters, loading: ids.length > 0 && loading };
}

export function useEpisodesByIds(ids: string[]) {
  const { data, loading } = useQuery<{ episodesByIds: ApiEpisode[] }>(GET_EPISODES_BY_IDS, {
    variables: { ids },
    skip: ids.length === 0,
  });
  const episodes: Episode[] = data?.episodesByIds.map((e) => ({ ...e, ...getMockedEpisodeExtras(e) })) ?? [];
  return { episodes, loading: ids.length > 0 && loading };
}

export function useLocationsByIds(ids: string[]) {
  const { data, loading } = useQuery<{ locationsByIds: ApiLocation[] }>(GET_LOCATIONS_BY_IDS, {
    variables: { ids },
    skip: ids.length === 0,
  });
  const locations: Location[] = data?.locationsByIds.map((l) => ({ ...l, ...getMockedLocationExtras(l) })) ?? [];
  return { locations, loading: ids.length > 0 && loading };
}
