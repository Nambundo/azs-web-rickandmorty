import { useQuery } from '@apollo/client/react';
import { GET_CHARACTERS } from '@/graphql/queries/characters';
import { getMockedCharacterExtras } from '@/mocks/mockData';
import type { ApiCharacter, ApiInfo, Character } from '@/types';

interface CharactersQueryResult {
  characters: {
    info: ApiInfo;
    results: ApiCharacter[];
  };
}

export function useCharacters(page: number, name?: string) {
  const { data, loading, error } = useQuery<CharactersQueryResult>(GET_CHARACTERS, {
    variables: { page, filter: name ? { name } : undefined },
    notifyOnNetworkStatusChange: true,
  });

  const characters: Character[] =
    data?.characters.results.map((c) => ({ ...c, ...getMockedCharacterExtras(c) })) ?? [];

  return {
    characters,
    info: data?.characters.info ?? null,
    loading,
    error,
  };
}
