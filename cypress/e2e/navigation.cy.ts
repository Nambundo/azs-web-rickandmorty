describe("Navegação da Sidebar", () => {
  beforeEach(() => {
    cy.visit("https://azs-web-rickandmorty-kappa.vercel.app/");
  });

  it("Deve navegar para Episódios", () => {
    cy.get("nav").contains("Episódios").click();
    cy.url().should("include", "/episodios");
  });

  it("Deve navegar para Personagens", () => {
    cy.get("nav").contains("Personagens").click();
    cy.url().should("include", "/personagens");
  });

  it("Deve navegar para Locais", () => {
    cy.get("nav").contains("Locais").click();
    cy.url().should("include", "/locais");
  });

  it("Deve navegar para Favoritos", () => {
    cy.get("nav").contains("Favoritos").click();
    cy.url().should("include", "/favoritos");
  });

  it("Deve navegar para Assistidos", () => {
    cy.get("nav").contains("Assistidos").click();
    cy.url().should("include", "/assistidos");
  });

  it("Deve navegar para Sobre", () => {
    cy.get("nav").contains("Sobre").click();
    cy.url().should("include", "/sobre");
  });

  it("Deve abrir o modal ao clicar em um personagem", () => {
    cy.get("nav").contains("Personagens").click();
    cy.url().should("include", "/personagens");

    cy.get('div[role="button"]').should("have.length.at.least", 1);

    cy.get('div[role="button"]').first().click();

    cy.get('[role="dialog"]').should("be.visible");
  });
});
