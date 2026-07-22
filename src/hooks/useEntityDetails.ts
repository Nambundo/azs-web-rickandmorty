import { useQuery } from '@apollo/client/react';
import { GET_CHARACTER_BY_ID } from '@/graphql/queries/characters';
import { GET_EPISODE_BY_ID } from '@/graphql/queries/episodes';
import { GET_LOCATION_BY_ID } from '@/graphql/queries/locations';
import { getMockedCharacterExtras, getMockedEpisodeExtras, getMockedLocationExtras } from '@/mocks/mockData';
import type { ApiCharacter, ApiEpisode, ApiLocation, Character, Episode, Location } from '@/types';

export function useCharacterDetails(id: string | null) {
  const { data, loading } = useQuery<{ character: ApiCharacter & { episode: { id: string; episode: string }[] } }>(
    GET_CHARACTER_BY_ID,
    { variables: { id }, skip: !id },
  );

  const character: (Character & { episode: { id: string; episode: string }[] }) | null = data?.character
    ? { ...data.character, ...getMockedCharacterExtras(data.character) }
    : null;

  return { character, loading };
}

export function useEpisodeDetails(id: string | null) {
  const { data, loading } = useQuery<{
    episode: ApiEpisode & { characters: { id: string; name: string; image: string }[] };
  }>(GET_EPISODE_BY_ID, { variables: { id }, skip: !id });

  const episode: (Episode & { characters: { id: string; name: string; image: string }[] }) | null = data?.episode
    ? { ...data.episode, ...getMockedEpisodeExtras(data.episode) }
    : null;

  return { episode, loading };
}

export function useLocationDetails(id: string | null) {
  const { data, loading } = useQuery<{
    location: ApiLocation & { residents: { id: string; name: string }[] };
  }>(GET_LOCATION_BY_ID, { variables: { id }, skip: !id });

  const location: (Location & { residents: { id: string; name: string }[] }) | null = data?.location
    ? { ...data.location, ...getMockedLocationExtras(data.location) }
    : null;

  return { location, loading };
}
