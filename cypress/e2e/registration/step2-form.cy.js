beforeEach(() => {
  cy.visit("https://africa.educationinireland.live/register/");
});

beforeEach(() => {
  // Navigate to step 2 before testing the courses field
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

/*
  ---SUMMARY---

  Bugs Test Cases
  1. Countries field title should be always visible and correct
    - Written in different language (¿Qué países te interesan?)
  2. Countries field should have placeholder and is visible
    - Written in different language (Selecciona hasta 3 países)
  3. Checklist items should be always visible (items 1 and 3 has empty texts)
  
  Potential Bug
  1. Areas Field will only show if Courses Field is true

  Missing Test Cases
  1. Clicking Submit CTA should send email if all required fields are satisfied
*/

describe("Courses Field Test", () => {
  it("Courses field title should be always visible and correct", () => {
    cy.get("#courses_container")
      .should("be.visible")
      .should("contain", "What are you interested in?");
  });

  it("Courses field should be always visible", () => {
    cy.get('[name="interest_courses[]"]').should("be.visible");
  });

  it("Courses field should have placeholder and is visible", () => {
    cy.get(".select2-search__field")
      .should("have.attr", "placeholder", "Select up to 3 courses")
      .should("have.value", "");
  });

  it("Clicking the Courses field should reveal options", () => {
    cy.get('[name="interest_courses[]"]').focus();
    cy.get('[name="interest_courses[]"] option:not(:first-child)').should(
      "be.visible"
    );
  });

  it("Clicking the Courses field should be in an active state", () => {
    cy.get('[name="interest_courses[]"]')
      .focus()
      .should("be.visible", "select_field:focus");
  });

  it("Clicking away from the Courses field should be in an inactive state", () => {
    cy.get('[name="interest_courses[]"]')
      .focus()
      .should("be.visible", "select_field:focus");
    cy.get("#registration").click(0, 0);
    cy.get('[name="interest_courses[]"]').should("be.visible", "select_field");
  });

  it("Unselected option error message should be visible if no option is selected in Courses field", () => {
    cy.get('[name="interest_courses[]"]').focus();
    cy.get('[name="interest_courses[]"] option:not(:first-child)').should(
      "be.visible"
    );
    cy.get(".btn.btn_primary.btn_submit").click();
    cy.get('[id="interest_courses[]-error"]')
      .should("be.visible")
      .should("contain", "Please choose at least one option.");
  });

  it("Typing while Courses field's dropdown is open should allow search for option", () => {
    cy.get('[name="interest_courses[]"]').focus();
    cy.get("#courses_container .select2-search__field").type("mas");
    cy.get('[name="interest_courses[]"] option[value="14"]').should(
      "be.visible"
    );
  });

  it("Selected option should appear in the Courses field and stored", () => {
    cy.get('[name="interest_courses[]"]').focus();
    cy.get("#courses_container .select2-search__field").type("mas{enter}");
    cy.get(".select2-selection__rendered .select2-selection__choice")
      .should("contain", "Masters")
      .should("be.visible");
  });

  it("Error should be removed if Courses field is satisfied and after clicking CTA", () => {
    cy.get(".btn.btn_primary.btn_submit").click();
    cy.get('[id="interest_courses[]-error"]').should("be.visible");

    cy.get('[name="interest_courses[]"]').focus();
    cy.get("#courses_container .select2-search__field").type("mas{enter}");
    cy.get(".select2-selection__rendered .select2-selection__choice").should(
      "contain",
      "Masters"
    );

    cy.get('[id="interest_courses[]-error"]').should("be.visible");
    cy.get(".btn.btn_primary.btn_submit").click();
    cy.get('[id="interest_courses[]-error"]').should("not.be.visible");
  });

  it("Minimum 3 items info should replace dropdown options", () => {
    cy.get('[name="interest_courses[]"]').focus();
    cy.get("#courses_container .select2-search__field").type("mas{enter}");
    cy.get('[name="interest_courses[]"]').focus();
    cy.get("#courses_container .select2-search__field").type("phd{enter}");
    cy.get('[name="interest_courses[]"]').focus();
    cy.get("#courses_container .select2-search__field").type("und{enter}");

    cy.get("#courses_container .select2-search__field").click();
    cy.get("#registration").should("contain", "You can only select 3 items");
  });

  it("Minimum 3 items info should not replace dropdown options if Courses field is satisfied", () => {
    cy.get('[name="interest_courses[]"]').focus();
    cy.get("#courses_container .select2-search__field").type("mas{enter}");
    cy.get('[name="interest_courses[]"]').focus();
    cy.get("#courses_container .select2-search__field").type("phd{enter}");
    cy.get('[name="interest_courses[]"]').focus();
    cy.get("#courses_container .select2-search__field").type("und{enter}");

    cy.get(".select2-selection__rendered")
      .find('li.select2-selection__choice:contains("PhD")')
      .find(".select2-selection__choice__remove")
      .click();
    cy.get("#courses_container .select2-search__field").click();
    cy.get("#registration").should(
      "not.contain",
      "You can only select 3 items"
    );
  });
});

describe("Countries Field Test", () => {
  // B U G - Language inconsistency here, the title should be in English like the rest.
  it("Countries field title should be always visible and correct", () => {
    cy.get("#countries_container")
      .should("be.visible")
      .should("contain", "Which countries are you interested in?");
  });

  it("Countries field should be always visible", () => {
    cy.get('[name="interest_countries[]"]').should("be.visible");
  });

  // B U G - Language inconsistency, the placeholder text is written in different language.
  it("Countries field should have placeholder and is visible", () => {
    cy.get("#countries_container .select2-search__field")
      .should("have.attr", "placeholder", "Select up to 3 countries")
      .should("have.value", "");
  });

  it("Clicking the Countries field should reveal options", () => {
    cy.get('[name="interest_countries[]"]').focus();
    cy.get('[name="interest_countries[]"] option:not(:first-child)').should(
      "be.visible"
    );
  });

  it("Clicking the Countries field should be in an active state", () => {
    cy.get('[name="interest_countries[]"]')
      .focus()
      .should("be.visible", "select_field:focus");
  });

  it("Clicking away from the Countries field should be in an inactive state", () => {
    cy.get('[name="interest_countries[]"]')
      .focus()
      .should("be.visible", "select_field:focus");
    cy.get("#registration").click(0, 0);
    cy.get('[name="interest_countries[]"]').should(
      "be.visible",
      "select_field"
    );
  });

  it("Unselected option error message should be visible if no option is selected in Countries field", () => {
    cy.get('[name="interest_countries[]"]').focus();
    cy.get('[name="interest_countries[]"] option:not(:first-child)').should(
      "be.visible"
    );
    cy.get(".btn.btn_primary.btn_submit").click();
    cy.get('[id="interest_courses[]-error"]')
      .should("be.visible")
      .should("contain", "Please choose at least one option.");
  });

  it("Typing while Countries field's dropdown is open should allow search for option", () => {
    cy.get('[name="interest_countries[]"]').focus();
    cy.get("#countries_container .select2-search__field").type("phil");
    cy.get('[name="interest_countries[]"] option[value="PHL"]').should(
      "be.visible"
    );
  });

  it("Selected option should appear in the Countries field and stored", () => {
    cy.get('[name="interest_countries[]"]').focus();
    cy.get("#countries_container .select2-search__field").type("ph{enter}");
    cy.get(".select2-selection__rendered .select2-selection__choice")
      .should("contain", "Philippines")
      .should("be.visible");
  });

  it("Error should be removed if Countries field is satisfied and after clicking CTA", () => {
    cy.get(".btn.btn_primary.btn_submit").click();
    cy.get('[id="interest_courses[]-error"]').should("be.visible");

    cy.get('[name="interest_countries[]"]').focus();
    cy.get("#countries_container .select2-search__field").type("ph{enter}");
    cy.get(".select2-selection__rendered .select2-selection__choice").should(
      "contain",
      "Philippines"
    );

    cy.get('[id="interest_courses[]-error"]').should("be.visible");
    cy.get(".btn.btn_primary.btn_submit").click();
    cy.get('[id="interest_countries[]-error"]').should("not.be.visible");
  });

  it("Minimum 3 items info should replace dropdown options", () => {
    cy.get('[name="interest_countries[]"]').focus();
    cy.get("#countries_container .select2-search__field").type("germ{enter}");
    cy.get('[name="interest_countries[]"]').focus();
    cy.get("#countries_container .select2-search__field").type("ph{enter}");
    cy.get('[name="interest_countries[]"]').focus();
    cy.get("#countries_container .select2-search__field").type("jap{enter}");

    cy.get("#countries_container .select2-search__field").click();
    cy.get("#registration").should("contain", "You can only select 3 items");
  });

  it("Minimum 3 items info should not replace dropdown options if Countries field is satisfied", () => {
    cy.get('[name="interest_countries[]"]').focus();
    cy.get("#countries_container .select2-search__field").type("germ{enter}");
    cy.get('[name="interest_countries[]"]').focus();
    cy.get("#countries_container .select2-search__field").type("ph{enter}");
    cy.get('[name="interest_countries[]"]').focus();
    cy.get("#countries_container .select2-search__field").type("jap{enter}");

    cy.get(".select2-selection__rendered")
      .find('li.select2-selection__choice:contains("Germany")')
      .find(".select2-selection__choice__remove")
      .click();
    cy.get("#countries_container .select2-search__field").click();
    cy.get("#registration").should(
      "not.contain",
      "You can only select 3 items"
    );
  });
});

// B U G (potential?) - Areas field only show up after a course is selected. The beforeEach helps test it for now.
describe("Areas Field Test", () => {
  // Bypass to make sure a course is selected first to have the Areas field appear.
  beforeEach(() => {
    cy.get('[name="interest_courses[]"]').focus();
    cy.get("#courses_container .select2-search__field").type("mas{enter}");
  });

  it("Areas field title should be always visible and correct", () => {
    cy.get("#areas_container")
      .should("be.visible")
      .should("contain", "What areas are you interested in?");
  });

  it("Areas field should be always visible", () => {
    cy.get('[name="interest_areas[]"]').should("be.visible");
  });

  it("Areas field should have placeholder and is visible", () => {
    cy.get("#areas_container .select2-search__field")
      .should("have.attr", "placeholder", "Select up to 3 areas")
      .should("have.value", "");
  });

  it("Clicking the Areas field should reveal options", () => {
    cy.get('[name="interest_areas[]"]').focus();
    cy.get('[name="interest_areas[]"] option:not(:first-child)').should(
      "be.visible"
    );
  });

  it("Clicking the Areas field should be in an active state", () => {
    cy.get('[name="interest_areas[]"]')
      .focus()
      .should("be.visible", "select_field:focus");
  });

  it("Clicking away from the Areas field should be in an inactive state", () => {
    cy.get('[name="interest_areas[]"]')
      .focus()
      .should("be.visible", "select_field:focus");
    cy.get("#registration").click(0, 0);
    cy.get('[name="interest_areas[]"]').should("be.visible", "select_field");
  });

  it("Unselected option error message should be visible if no option is selected in Areas field", () => {
    cy.get('[name="interest_areas[]"]').focus();
    cy.get('[name="interest_areas[]"] option:not(:first-child)').should(
      "be.visible"
    );
    cy.get(".btn.btn_primary.btn_submit").click();
    cy.get('[id="interest_areas[]-error"]')
      .should("be.visible")
      .should("contain", "Please choose at least one option.");
  });

  it("Typing while Areas field's dropdown is open should allow search for option", () => {
    cy.get('[name="interest_areas[]"]').focus();
    cy.get("#areas_container .select2-search__field").type("archi");
    cy.get('[name="interest_areas[]"] option[value="5"]').should("be.visible");
  });

  it("Selected option should appear in the Areas field and stored", () => {
    cy.get('[name="interest_areas[]"]').focus();
    cy.get("#areas_container .select2-search__field").type("eco{enter}");
    cy.get(".select2-selection__rendered .select2-selection__choice")
      .should("contain", "Economics")
      .should("be.visible");
  });

  it("Error should be removed if Areas field is satisfied and after clicking CTA", () => {
    cy.get(".btn.btn_primary.btn_submit").click();
    cy.get('[id="interest_areas[]-error"]').should("be.visible");

    cy.get('[name="interest_areas[]"]').focus();
    cy.get("#areas_container .select2-search__field").type("eco{enter}");
    cy.get(".select2-selection__rendered .select2-selection__choice").should(
      "contain",
      "Economics"
    );

    cy.get('[id="interest_areas[]-error"]').should("be.visible");
    cy.get(".btn.btn_primary.btn_submit").click();
    cy.get('[id="interest_areas[]-error"]').should("not.be.visible");
  });

  it("Minimum 3 items info should replace dropdown options", () => {
    cy.get('[name="interest_areas[]"]').focus();
    cy.get("#areas_container .select2-search__field").type("agr{enter}");
    cy.get('[name="interest_areas[]"]').focus();
    cy.get("#areas_container .select2-search__field").type("den{enter}");
    cy.get('[name="interest_areas[]"]').focus();
    cy.get("#areas_container .select2-search__field").type("ps{enter}");

    cy.get("#areas_container .select2-search__field").click();
    cy.get("#registration").should("contain", "You can only select 3 items");
  });

  it("Minimum 3 items info should not replace dropdown options if Areas field is satisfied", () => {
    cy.get('[name="interest_areas[]"]').focus();
    cy.get("#areas_container .select2-search__field").type("agr{enter}");
    cy.get('[name="interest_areas[]"]').focus();
    cy.get("#areas_container .select2-search__field").type("den{enter}");
    cy.get('[name="interest_areas[]"]').focus();
    cy.get("#areas_container .select2-search__field").type("ps{enter}");

    cy.get(".select2-selection__rendered")
      .find('li.select2-selection__choice:contains("Dentistry")')
      .find(".select2-selection__choice__remove")
      .click();
    cy.get("#areas_container .select2-search__field").click();
    cy.get("#registration").should(
      "not.contain",
      "You can only select 3 items"
    );
  });
});

describe("Checklist Test", () => {
  it("Checklist title should be always visible", () => {
    cy.get(".row.terms_container")
      .should("be.visible")
      .should("contain", "I want to receive information about:");
  });

  it("Checklist items should be always visible", () => {
    // B U G - Corresponding text is missing.
    cy.get('[name="sub_fair_info"]').siblings("div").should("not.be.empty");

    cy.get('[name="sub_bmi"]')
      .siblings("div")
      .should("not.be.empty")
      .should("contain.text", "Information from Education in Ireland");

    // B U G - Corresponding text is missing.
    cy.get('[name="sub_vm"]').siblings("div").should("not.be.empty");
    cy.get('[name="sub_3rd_pt"]')
      .siblings("div")
      .should("not.be.empty")
      .should("contain.text", "Please share my details");

    cy.get('[name="sub_all"]')
      .siblings("div")
      .should("not.be.empty")
      .should("contain.text", "Select All");
  });

  it("Unselected required checklist item error message should be visible when CTA was clicked", () => {
    cy.get('[name="sub_fair_info"]').should("not.be.checked");
    cy.get(".btn.btn_primary.btn_submit").click();
    cy.get("#sub_fair_info-error").should("be.visible").should(
      "contain",
      "By not allowing us to send you the required information, we cannot send the barcode needed to enter the event. Please accept the required option to proceed with registration." // Checking the exact error text.
    );
  });

  it("Error should be removed if required checklist item is satisfied", () => {
    cy.get('[name="sub_fair_info"]').should("not.be.checked");
    cy.get(".btn.btn_primary.btn_submit").click();
    cy.get("#sub_fair_info-error").should("be.visible");
    cy.get('[name="sub_fair_info"]').check().should("be.checked");
    cy.get("#sub_fair_info-error").should("not.be.visible");
  });

  it("Selecting unselected item should change checkbox state into checked", () => {
    cy.get('[name="sub_fair_info"]').should("not.be.checked");
    cy.get('[name="sub_fair_info"]').check().should("be.checked");
  });

  it("Selecting selected item should change checkbox state into unchecked", () => {
    cy.get('[name="sub_bmi"]').should("not.be.checked");
    cy.get('[name="sub_bmi"]').check().should("be.checked");
    cy.get('[name="sub_bmi"]').uncheck().should("not.be.checked");
  });

  it("Selecting Select All should select all items", () => {
    cy.get('[name="sub_all"]').check().should("be.checked");
    cy.get(
      '[name="sub_fair_info"], [name="sub_bmi"], [name="sub_vm"], [name="sub_3rd_pt"]'
    ).should("be.checked");
  });

  it("Unselecting Select All item should unselect all items", () => {
    cy.get('[name="sub_all"]').check().should("be.checked");
    cy.get('[name="sub_all"]').uncheck().should("not.be.checked");
    cy.get(
      '[name="sub_fair_info"], [name="sub_bmi"], [name="sub_vm"], [name="sub_3rd_pt"]'
    ).should("not.be.checked");
  });
});

describe("Buttons Test", () => {
  it("Previous should be always visible", () => {
    cy.get(".btn.btn_primary.btn_prev").should("be.visible");
  });

  it("Previous can change color upon hover", () => {
    cy.get(".btn.btn_primary.btn_prev");
    cy.get(".btn.btn_primary.btn_prev").should("be.visible", "btn");
    cy.get(".btn.btn_primary.btn_prev").should("be.visible", "btn:hover");
  });

  it("Clicking Previous button should replace step 1 with step 2", () => {
    cy.get(".btn.btn_primary.btn_prev").click();
    cy.get("#tab_step_1").should("be.visible");
  });

  it("Submit CTA should be always visible", () => {
    cy.get(".btn.btn_primary.btn_submit").should("be.visible");
  });

  it("Submit CTA can change color upon hover", () => {
    cy.get(".btn.btn_primary.btn_submit");
    cy.get(".btn.btn_primary.btn_submit").should("be.visible", "btn");
    cy.get(".btn.btn_primary.btn_submit").should("be.visible", "btn:hover");
  });

  it("Clicking Submit CTA should replace step 2 with success page if all required fields are satisfied", () => {
    cy.get('[name="interest_courses[]"]').focus();
    cy.get("#courses_container .select2-search__field").type("mas{enter}");
    cy.get('[name="interest_countries[]"]').focus();
    cy.get("#countries_container .select2-search__field").type("ph{enter}");
    cy.get('[name="interest_areas[]"]').focus();
    cy.get("#areas_container .select2-search__field").type("eco{enter}");
    cy.get('[name="sub_fair_info"]').check();

    cy.get(".btn.btn_primary.btn_submit").click();
    cy.get("#confirmation", { timeout: 10000 }).should("exist");
  });
  // I'm not sure how we'd automate checking if an email was sent using just Cypress, that usually needs backend checks or a specific email testing tool integration. Will leave this noted.
  // it("Clicking Submit CTA should send email if all required fields are satisfied", () => { });
});
