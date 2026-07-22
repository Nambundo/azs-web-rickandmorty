describe('Favoritos', () => {
  beforeEach(() => {
    cy.stubApi();
    cy.clearLocalStorage();
  });

  it('favorita um personagem, persiste no localStorage e aparece na página de Favoritos', () => {
    cy.visit('/personagens');
    cy.wait('@GetCharacters');

    cy.contains('[role="button"]', 'Rick Sanchez')
      .find('button[aria-label="Adicionar aos favoritos"]')
      .click();

    cy.contains('[role="button"]', 'Rick Sanchez')
      .find('button[aria-pressed="true"]')
      .should('exist');

    cy.window()
      .its('localStorage')
      .invoke('getItem', 'rickmorty:favorites')
      .should('contain', '"1"');

    cy.get('nav').contains('Favoritos').click();
    cy.url().should('include', '/favoritos');
    cy.wait('@GetCharactersByIds');

    cy.contains('Personagens').should('be.visible');
    cy.contains('Rick Sanchez').should('be.visible');
  });

  it('remove todos os favoritos e mostra o estado vazio', () => {
    cy.window().then((win) => {
      win.localStorage.setItem(
        'rickmorty:favorites',
        JSON.stringify({ character: ['1'], episode: [], location: [] }),
      );
    });

    cy.visit('/favoritos');
    cy.wait('@GetCharactersByIds');
    cy.contains('Remover todos').click();

    cy.contains('Nenhum favorito ainda').should('be.visible');
    cy.window()
      .its('localStorage')
      .invoke('getItem', 'rickmorty:favorites')
      .then((raw) => {
        const parsed = JSON.parse(raw as string);
        expect(parsed.character).to.have.length(0);
      });
  });
});
