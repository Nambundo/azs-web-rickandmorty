import { gql } from '@apollo/client';
import { EPISODE_FIELDS } from '../fragments';

export const GET_EPISODES = gql`
  ${EPISODE_FIELDS}
  query GetEpisodes($page: Int, $filter: FilterEpisode) {
    episodes(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        ...EpisodeFields
        characters {
          id
          name
          image
        }
      }
    }
  }
`;

export const GET_EPISODE_BY_ID = gql`
  ${EPISODE_FIELDS}
  query GetEpisodeById($id: ID!) {
    episode(id: $id) {
      ...EpisodeFields
      characters {
        id
        name
        image
      }
    }
  }
`;

export const GET_EPISODES_BY_IDS = gql`
  ${EPISODE_FIELDS}
  query GetEpisodesByIds($ids: [ID!]!) {
    episodesByIds(ids: $ids) {
      ...EpisodeFields
      characters {
        id
        name
        image
      }
    }
  }
`;
