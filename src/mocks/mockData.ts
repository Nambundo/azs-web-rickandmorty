import { seededFloat, seededInt, seededPick } from '@/utils/seededRandom';
import type {
  ApiCharacter,
  ApiEpisode,
  ApiLocation,
  MockedCharacterExtras,
  MockedEpisodeExtras,
  MockedLocationExtras,
} from '@/types';

/**
 * Todos os campos abaixo NÃO existem no schema público do GraphQL
 * (rickandmortyapi.com/graphql). São gerados de forma determinística
 * (mesmo ID sempre gera o mesmo valor) apenas para completar a UI.
 * Basta trocar essas funções por chamadas reais caso uma fonte de dados
 * complementar seja integrada no futuro.
 */

const SYNOPSIS_TEMPLATES = [
  'Rick arrasta Morty para mais uma aventura interdimensional cheia de riscos e consequências inesperadas.',
  'Uma missão aparentemente simples se transforma em uma jornada perigosa que muda tudo.',
  'A família Smith se envolve em um esquema que rapidamente sai do controle.',
  'Rick precisa de um favor de um velho conhecido, e nada sai como planejado.',
  'Um portal aberto por engano leva os personagens a uma dimensão bizarra e imprevisível.',
];

const BIO_TEMPLATES = [
  'Um personagem carismático cujo destino está profundamente ligado ao multiverso.',
  'Conhecido por suas escolhas imprevisíveis e momentos icônicos ao longo da série.',
  'Uma figura recorrente no universo de Rick and Morty, com aparições marcantes.',
  'Um dos rostos mais lembrados pelos fãs da série, com uma trajetória única.',
];

const WRITERS = ['Mike McMahan', 'Jessica Gao', 'Ryan Ridley', 'Sarah Carbiener', 'Erica Rosbe'];
const DIRECTORS = ['Bryan Newton', 'Juan Meza-León', 'Anthony Chun', 'Jacob Hair', 'Erica Hayes'];

const LOCATION_IMAGES = [
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
  'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80',
  'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800&q=80',
  'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80',
  'https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=800&q=80',
  'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80',
  'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&q=80',
];

export function getMockedEpisodeExtras(episode: ApiEpisode): MockedEpisodeExtras {
  return {
    rating: Number(seededFloat(episode.id + 'rating', 6.5, 9.6).toFixed(1)),
    synopsis: seededPick(episode.id + 'syn', SYNOPSIS_TEMPLATES),
    writer: seededPick(episode.id + 'wri', WRITERS),
    director: seededPick(episode.id + 'dir', DIRECTORS),
    durationMinutes: seededInt(episode.id + 'dur', 20, 24),
  };
}

export function getMockedCharacterExtras(character: ApiCharacter): MockedCharacterExtras {
  return {
    rating: Number(seededFloat(character.id + 'rating', 6.0, 9.8).toFixed(1)),
    bio: seededPick(character.id + 'bio', BIO_TEMPLATES),
  };
}

export function getMockedLocationExtras(location: ApiLocation): MockedLocationExtras {
  return {
    image: seededPick(location.id + 'img', LOCATION_IMAGES),
  };
}
