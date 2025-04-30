beforeEach(() => {
  cy.visit("https://africa.educationinireland.live/register/");
});

beforeEach(() => {
  // Navigate to step 2 before testing the countries field
  cy.get("#reg_fair").select("Nairobi");
  cy.get("#reg_fname").type("Nicole");
  cy.get("#reg_lname").type("Dimabuyu");
  cy.get("#reg_email").type("ish.d@gmail.com");
  cy.get('[name="reg_confirm_email"]').type("ish.d@gmail.com");
  cy.get("#form_bday").click();
  cy.get(".datepicker-years .year").contains("2001").click();
  cy.get(".datepicker-months .month").contains("Jun").click();
  cy.get(".datepicker-days td.day:not(.old):not(.new)").contains("14").click();
  cy.get('[name="reg_country_code"]').select("+224 - Guinea");
  cy.get('[name="reg_mobile"]').type("1234567890");
  cy.get('[name="reg_level"]').select("High School");
  cy.get('[name="reg_when"]').select("2027");
  cy.get(".btn_primary.btn_next").click();
  cy.get("#tab_step_2").should("be.visible");
});

describe("Random Tests", () => {});
