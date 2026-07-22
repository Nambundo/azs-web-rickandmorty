import { gql } from '@apollo/client';

export const CHARACTER_FIELDS = gql`
  fragment CharacterFields on Character {
    id
    name
    status
    species
    type
    gender
    image
    origin {
      id
      name
    }
    location {
      id
      name
    }
    created
  }
`;

export const EPISODE_FIELDS = gql`
  fragment EpisodeFields on Episode {
    id
    name
    air_date
    episode
    created
  }
`;

export const LOCATION_FIELDS = gql`
  fragment LocationFields on Location {
    id
    name
    type
    dimension
    created
  }
`;
