import Ajv from "ajv"
import { faker } from "@faker-js/faker"

describe("GET /booking - Listagem e Detalhe", () => {
  const ajv = new Ajv({ allErrors: true, strict: false })

  const bookingListItemSchema = {
    type: "object",
    required: ["bookingid"],
    additionalProperties: false,
    properties: {
      bookingid: { type: "integer" }
    }
  }

  const bookingDetailsSchema = {
    type: "object",
    required: [
      "firstname",
      "lastname",
      "totalprice",
      "depositpaid",
      "bookingdates"
    ],
    properties: {
      firstname: { type: "string" },
      lastname: { type: "string" },
      totalprice: { type: "integer" },
      depositpaid: { type: "boolean" },
      bookingdates: {
        type: "object",
        required: ["checkin", "checkout"],
        properties: {
          checkin: { type: "string" },
          checkout: { type: "string" }
        }
      },
      additionalneeds: { type: "string" }
    }
  }

  const validateListItem = ajv.compile(bookingListItemSchema)
  const validateDetails = ajv.compile(bookingDetailsSchema)

  function buildBookingPayload(overrides = {}) {
    const checkin = "2025-01-10"
    const checkout = "2025-01-15"

    return {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      totalprice: faker.number.int({ min: 50, max: 5000 }),
      depositpaid: faker.datatype.boolean(),
      bookingdates: { checkin, checkout },
      additionalneeds: faker.helpers.arrayElement([
        "Breakfast",
        "Late Checkout",
        "Baby crib",
        "None"
      ]),
      ...overrides
    }
  }

  it("GET /booking - deve listar bookings (array de bookingid)", () => {
    cy.request("GET", "/booking").then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body).to.be.an("array")
        expect(res.body[0]).to.have.property("bookingid")
    })
  })

  it("Deve retornar detalhes ao buscar por bookingid", () => {
    const payload = buildBookingPayload()

    cy.createBooking(payload).then((createRes) => {
      expect(createRes.status).to.eq(200)
      expect(createRes.body).to.have.property("bookingid")

      const bookingId = createRes.body.bookingid

      cy.getBookingById(bookingId).then((getRes) => {
        expect(getRes.status).to.eq(200)

        const ok = validateDetails(getRes.body)
        expect(ok, JSON.stringify(validateDetails.errors)).to.eq(true)

        expect(getRes.body.firstname).to.eq(payload.firstname)
        expect(getRes.body.lastname).to.eq(payload.lastname)
        expect(getRes.body.totalprice).to.eq(payload.totalprice)
        expect(getRes.body.depositpaid).to.eq(payload.depositpaid)
        expect(getRes.body.bookingdates.checkin).to.eq(payload.bookingdates.checkin)
        expect(getRes.body.bookingdates.checkout).to.eq(payload.bookingdates.checkout)
        expect(getRes.body.additionalneeds).to.eq(payload.additionalneeds)
      })
    })
  });
  it("Deve filtrar a listagem por firstname e lastname", () => {
    const uniqueFirst = `FN_${faker.string.alphanumeric(8)}`
    const uniqueLast = `LN_${faker.string.alphanumeric(8)}`

    const payload = buildBookingPayload({
      firstname: uniqueFirst,
      lastname: uniqueLast
    })

    cy.createBooking(payload).then((createRes) => {
      expect(createRes.status).to.eq(200)
      const bookingId = createRes.body.bookingid

      cy.getBookings({ firstname: uniqueFirst, lastname: uniqueLast }).then((listRes) => {
        expect(listRes.status).to.eq(200)
        expect(listRes.body).to.be.an("array")

        const ids = listRes.body.map((x) => x.bookingid)
        expect(ids).to.include(bookingId)
      })
    })
  });
  it("Deve filtrar a listagem por checkin e checkout (contrato)", () => {
  const checkin = "2025-02-01"
  const checkout = "2025-02-05"

  cy.getBookings({ checkin, checkout }).then((res) => {
    expect(res.status).to.eq(200)
    expect(res.body).to.be.an("array")  
    if (res.body.length > 0) {
      expect(res.body[0]).to.have.property("bookingid");
      expect(res.body[0].bookingid).to.be.a("number");
    }
  });
});

  it("Não deve retornar detalhes para bookingid inexistente (404)", () => {
    cy.getBookingById(99999999).then((res) => {
      expect([404, 405]).to.include(res.status)
    })
  });
});
