/// <reference types="cypress" />

describe("Home - Rick and Morty", () => {
  const SITE = "https://azs-web-rickandmorty-kappa.vercel.app";

  beforeEach(() => {
    cy.visit(SITE);
  });

  it("Deve carregar a página inicial", () => {
    cy.url().should("include", "vercel.app");
  });

  it("Deve exibir o título da página", () => {
    cy.contains(/Rick/i).should("be.visible");
  });

  it("Deve carregar as imagens dos personagens principais no banner", () => {
    cy.get('img[alt="Rick Sanchez"]').should("be.visible");
    cy.get('img[alt="Morty Smith"]').should("be.visible");
  });

  it("Deve exibir pelo menos 4 episódios em destaque no carrossel", () => {
    cy.get(".w-48.shrink-0").its("length").should("be.gte", 4);
  });

  it("Deve abrir o modal ao clicar em um episódio", () => {
    cy.get('div[role="button"]').first().should("be.visible").click();

    cy.get('[role="dialog"]').should("be.visible");
  });
});
