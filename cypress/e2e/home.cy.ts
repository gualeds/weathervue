/// <reference types="cypress" />
describe("Home Page", () => {
  it("Visita a página inicial e renderiza corretamente as cinco cidades pré-definidas", () => {
    cy.visit("http://localhost:8080/");
    cy.contains("WeatherVue");
    cy.contains("New York, US");
    cy.contains("Recife, BR");
    cy.contains("Caruaru, BR");
    cy.contains("Passira, BR");
    cy.contains("Campina Grande, BR");
  });

it("Adiciona uma Cidade", () => {
cy.visit("http://localhost:8080/");
cy.get('#input-7').type("Limoeiro");

cy.wait(2000);
cy.get('#list-item-19-0 > .v-list-item__content > .v-list-item__title').click();
cy.get('.btn-plus').click();
cy.contains("Limoeiro");
cy.get(':nth-child(1) > #weather-icon-01n > .maininfo > .btn-container > .btn > .v-btn__content').click();
cy.get('.forecast-data > .container > :nth-child(1)').should('exist');
cy.get('.forecast-data > .container > :nth-child(40)').should('exist');
  });
});

