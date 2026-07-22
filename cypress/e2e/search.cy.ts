describe("Busca Global", () => {
  beforeEach(() => {
    cy.visit("https://azs-web-rickandmorty-kappa.vercel.app/");
  });

  it("Busca personagens Morty", () => {
    cy.get("nav").contains("Personagens").click();

    cy.get('input[placeholder="Buscar personagens..."]')
      .should("be.visible")
      .type("Morty");

    cy.contains("Morty").should("be.visible");
  });

  it("Busca personagem Million Ants", () => {
    cy.get("nav").contains("Personagens").click();

    cy.get('input[placeholder="Buscar personagens..."]')
      .should("be.visible")
      .type("Million Ants");

    cy.contains("Million Ants", { timeout: 10000 }).should("be.visible");
  });

  it("Troca o placeholder ao navegar", () => {
    cy.get("nav").contains("Episódios").click();

    cy.get("input").should("have.attr", "placeholder", "Buscar episódios...");

    cy.get("nav").contains("Locais").click();

    cy.get("input").should("have.attr", "placeholder", "Buscar locais...");
  });

  it("Busca global na Home", () => {
    cy.get('input[placeholder="Buscar episódios, personagens e locais..."]')
      .should("be.visible")
      .type("Rick");

    cy.contains('Resultados para "Rick"').should("be.visible");
  });
});
