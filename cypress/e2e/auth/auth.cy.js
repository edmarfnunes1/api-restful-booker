import { faker } from '@faker-js/faker';

describe("POST /auth - Geração de Token", () => {


  it("Deve gerar um token válido com credenciais corretas", () => {
    cy.auth(Cypress.env("AUTH_USERNAME"),Cypress.env("AUTH_PASSWORD")).then(response => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property("token")
    })
  });

  it("Não deve autenticar com senha incorreta", () => {
    cy.auth(Cypress.env("AUTH_USERNAME"), faker.internet.password()).then(response => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property("reason", "Bad credentials")
    })
  });

  it("Não deve autenticar com usuário incorreto", () => {
    cy.auth(faker.internet.userName(), Cypress.env("AUTH_PASSWORD")).then(response => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property("reason", "Bad credentials")
    })
  });

  it("Não deve autenticar com payload vazio", () => {
    cy.auth(null, null).then(response => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property("reason", "Bad credentials")
    })
  });

  it("Não deve autenticar sem username", () => {
    cy.auth(null, Cypress.env("AUTH_PASSWORD")).then(response => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property("reason", "Bad credentials")
    })
  });

  it("Não deve autenticar sem password", () => {
    cy.auth(Cypress.env("AUTH_USERNAME"), null).then(response => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property("reason", "Bad credentials")
    })
  });

})
