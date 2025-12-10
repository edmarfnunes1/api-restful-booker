Cypress.Commands.add("auth", (username, password) => {
  return cy.request({
    method: "POST",
    url: "/auth",
    failOnStatusCode: false,
    body: {
      username: username, 
      password: password 
    }
  });
});
