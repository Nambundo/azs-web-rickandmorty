describe('Navegação e páginas principais', () => {
  beforeEach(() => {
    cy.stubApi();
  });

  it('mostra o banner da Home com os personagens principais em destaque', () => {
    cy.visit('/');
    cy.wait('@GetEpisodes');
    cy.contains('h1', 'Rick').should('be.visible');
    cy.contains('Explorar episódios').should('be.visible');
    cy.get('img[alt="Rick Sanchez"]').should('be.visible');
    cy.get('img[alt="Morty Smith"]').should('be.visible');
  });

  it('navega para Episódios pela sidebar e lista os cards', () => {
    cy.visit('/');
    cy.get('nav').contains('Episódios').click();
    cy.url().should('include', '/episodios');
    cy.wait('@GetEpisodes');
    cy.contains('2 episódios encontrados').should('be.visible');
    cy.contains('Pilot').should('be.visible');
  });

  it('navega para Personagens pela sidebar e lista os cards', () => {
    cy.visit('/');
    cy.get('nav').contains('Personagens').click();
    cy.url().should('include', '/personagens');
    cy.wait('@GetCharacters');
    cy.contains('3 personagens encontrados').should('be.visible');
    cy.contains('Rick Sanchez').should('be.visible');
  });

  it('navega para Locais pela sidebar e lista os cards', () => {
    cy.visit('/');
    cy.get('nav').contains('Locais').click();
    cy.url().should('include', '/locais');
    cy.wait('@GetLocations');
    cy.contains('Earth (C-137)').should('be.visible');
  });

  it('ao clicar em um personagem, mostra o estado de carregando e depois os detalhes', () => {
    cy.intercept('POST', 'https://rickandmortyapi.com/graphql', (req) => {
      if (req.body?.operationName === 'GetCharacterById') {
        req.reply({ fixture: 'get-character-by-id.json', delay: 300 });
      }
    }).as('GetCharacterByIdSlow');

    cy.visit('/personagens');
    cy.wait('@GetCharacters');
    cy.contains('Rick Sanchez').click();

    cy.contains('Carregando personagem...').should('be.visible');
    cy.wait('@GetCharacterByIdSlow');
    cy.contains('Carregando personagem...').should('not.exist');
    cy.get('[role="dialog"]').contains('Rick Sanchez').should('be.visible');
  });
});
