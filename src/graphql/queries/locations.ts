import { gql } from '@apollo/client';
import { LOCATION_FIELDS } from '../fragments';

export const GET_LOCATIONS = gql`
  ${LOCATION_FIELDS}
  query GetLocations($page: Int, $filter: FilterLocation) {
    locations(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        ...LocationFields
      }
    }
  }
`;

export const GET_LOCATION_BY_ID = gql`
  ${LOCATION_FIELDS}
  query GetLocationById($id: ID!) {
    location(id: $id) {
      ...LocationFields
      residents {
        id
        name
      }
    }
  }
`;

export const GET_LOCATIONS_BY_IDS = gql`
  ${LOCATION_FIELDS}
  query GetLocationsByIds($ids: [ID!]!) {
    locationsByIds(ids: $ids) {
      ...LocationFields
      residents {
        id
        name
      }
    }
  }
`;
