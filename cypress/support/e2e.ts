// Arquivo de suporte carregado antes de cada spec de e2e.

// Mapa de operationName (definido nas queries em src/graphql/queries) -> fixture correspondente.
const OPERATION_FIXTURES: Record<string, string> = {
  GetCharacters: 'get-characters.json',
  GetCharactersByIds: 'get-characters-by-ids.json',
  GetCharacterById: 'get-character-by-id.json',
  GetEpisodes: 'get-episodes.json',
  GetEpisodesByIds: 'get-episodes-by-ids.json',
  GetEpisodeById: 'get-episode-by-id.json',
  GetLocations: 'get-locations.json',
  GetLocationsByIds: 'get-locations-by-ids.json',
  GetLocationById: 'get-location-by-id.json',
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /** Intercepta todas as chamadas GraphQL da app e responde com fixtures determinísticas. */
      stubApi(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('stubApi', () => {
  Object.entries(OPERATION_FIXTURES).forEach(([operationName, fixture]) => {
    cy.intercept('POST', 'https://rickandmortyapi.com/graphql', (req) => {
      if (req.body?.operationName === operationName) {
        req.reply({ fixture });
      }
    }).as(operationName);
  });
});

export {};
