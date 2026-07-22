import { useQuery } from '@apollo/client/react';
import { GET_EPISODES } from '@/graphql/queries/episodes';
import { getMockedEpisodeExtras } from '@/mocks/mockData';
import type { ApiEpisode, ApiInfo, Episode } from '@/types';

interface EpisodesQueryResult {
  episodes: {
    info: ApiInfo;
    results: ApiEpisode[];
  };
}

export function useEpisodes(page: number, name?: string, seasonEpisode?: string) {
  const filter: Record<string, string> = {};
  if (name) filter.name = name;
  if (seasonEpisode) filter.episode = seasonEpisode;

  const { data, loading, error } = useQuery<EpisodesQueryResult>(GET_EPISODES, {
    variables: { page, filter: Object.keys(filter).length ? filter : undefined },
    notifyOnNetworkStatusChange: true,
  });

  const episodes: Episode[] =
    data?.episodes.results.map((e) => ({ ...e, ...getMockedEpisodeExtras(e) })) ?? [];

  return {
    episodes,
    info: data?.episodes.info ?? null,
    loading,
    error,
  };
}
