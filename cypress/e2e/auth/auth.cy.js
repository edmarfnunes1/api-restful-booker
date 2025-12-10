describe("POST /auth - Geração de Token", () => {

  it("Deve gerar um token válido com credenciais corretas", () => {
    cy.createToken().then(response => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property("token")
      expect(response.body.token).to.be.a("string")
    })
  })

  it("Não deve autenticar com senha incorreta", () => {
    cy.request({
      method: "POST",
      url: "/auth",
      failOnStatusCode: false,
      body: {
        username: "admin",
        password: "senhaErrada"
      }
    }).then(response => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property("reason", "Bad credentials")
    })
  });

  it("Não deve autenticar com usuário incorreto", () => {
    cy.request({
      method: "POST",
      url: "/auth",
      failOnStatusCode: false,
      body: {
        username: "usuarioInvalido",
        password: "password123"
      }
    }).then(response => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property("reason", "Bad credentials")
    })
  });

  it("Não deve autenticar com payload vazio", () => {
    cy.request({
      method: "POST",
      url: "/auth",
      failOnStatusCode: false,
      body: {}
    }).then(response => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property("reason")
    })
  });

  it("Não deve autenticar sem username", () => {
    cy.request({
      method: "POST",
      url: "/auth",
      failOnStatusCode: false,
      body: {
        password: "password123"
      }
    }).then(response => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property("reason")
    })
  });

  it("Não deve autenticar sem password", () => {
    cy.request({
      method: "POST",
      url: "/auth",
      failOnStatusCode: false,
      body: {
        username: "admin"
      }
    }).then(response => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property("reason")
    })
  });

})
