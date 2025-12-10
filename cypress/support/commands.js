Cypress.Commands.add("createToken", () => {
  return cy.request({
    method: "POST",
    url: "/auth",
    body: {
      username: "admin",
      password: "password123"
    }
  });
});
