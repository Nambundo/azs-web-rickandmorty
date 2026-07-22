import { gql } from '@apollo/client';
import { CHARACTER_FIELDS } from '../fragments';

export const GET_CHARACTERS = gql`
  ${CHARACTER_FIELDS}
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        ...CharacterFields
      }
    }
  }
`;

export const GET_CHARACTER_BY_ID = gql`
  ${CHARACTER_FIELDS}
  query GetCharacterById($id: ID!) {
    character(id: $id) {
      ...CharacterFields
      episode {
        id
        episode
      }
    }
  }
`;

export const GET_CHARACTERS_BY_IDS = gql`
  ${CHARACTER_FIELDS}
  query GetCharactersByIds($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      ...CharacterFields
    }
  }
`;
