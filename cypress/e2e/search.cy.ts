describe('Busca global', () => {
  beforeEach(() => {
    cy.stubApi();
  });

  it('atualiza o placeholder por página e envia o filtro correto ao digitar', () => {
    cy.visit('/personagens');
    cy.wait('@GetCharacters');
    cy.get('input[placeholder="Buscar personagens..."]').should('be.visible').type('morty');

    // A busca é debounced (400ms) — cy.wait aguarda a nova request automaticamente.
    cy.wait('@GetCharacters').its('request.body.variables.filter.name').should('eq', 'morty');
  });

  it('troca o placeholder da busca ao navegar entre páginas', () => {
    cy.visit('/episodios');
    cy.get('input[placeholder="Buscar episódios..."]').should('be.visible');

    cy.get('nav').contains('Locais').click();
    cy.get('input[placeholder="Buscar locais..."]').should('be.visible');
  });

  it('na Home, buscar dispara as 3 queries (episódios, personagens e locais) e mostra os resultados', () => {
    cy.visit('/');
    cy.wait('@GetEpisodes');

    cy.get('input[placeholder="Buscar episódios, personagens e locais..."]').type('rick');

    cy.wait('@GetEpisodes').its('request.body.variables.filter.name').should('eq', 'rick');
    cy.wait('@GetCharacters').its('request.body.variables.filter.name').should('eq', 'rick');
    cy.wait('@GetLocations').its('request.body.variables.filter.name').should('eq', 'rick');

    cy.contains('Resultados para "rick"').should('be.visible');
    cy.contains('h2', 'Episódios').should('be.visible');
    cy.contains('h2', 'Personagens').should('be.visible');
    cy.contains('h2', 'Locais').should('be.visible');
  });
});
