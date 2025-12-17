Cypress.Commands.add("createBooking", (payload) => {
  return cy.request({
    method: "POST",
    url: "/booking",
    failOnStatusCode: false,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: payload
  })
});

Cypress.Commands.add("getBookings", (query = {}) => {
  return cy.request({
    method: "GET",
    url: "/booking",
    failOnStatusCode: false,
    qs: query
  })
});

Cypress.Commands.add("getBookingById", (bookingId) => {
  return cy.request({
    method: "GET",
    url: `/booking/${bookingId}`,
    failOnStatusCode: false
  })
});
