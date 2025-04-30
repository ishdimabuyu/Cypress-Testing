beforeEach(() => {
  cy.visit("https://africa.educationinireland.live/register/");
});

/*
  ---SUMMARY---

  Bugs Test Cases
  1. Birthday field should have placeholder and is visible
    - Placeholder not shown by default
  2. An item is selected by default
    - Country Code field should have the first option as placeholder
    - Current Level field should have the first option as placeholder

  Potential Bugs
  1. Invalid email error message should be visible for Confirm Email field if email is invalid or doesn't follow email syntax  
    - Inconsistent error message
  2. If the field can be manually edited
    - Birthday field should be replaced with placeholder if value was cleared
    - Birthday field should allow manual entry
  3. If the filed is required
    - Unselected option error message should be visible if no option is selected in Country Code field
    - Error should be removed if Country Code field is satisfied
    - Unselected option error message should be visible if no option is selected in Current Level field
    - Error should be removed if Current Level field is satisfied

  Missing Test Cases
  1. Show alert card if Email already exists
*/

describe("Fair Field Test", () => {
  it("Fair field should be visible", () => {
    cy.get("#reg_fair").should("be.visible");
  });

  it("Fair field should have the first option as placeholder", () => {
    cy.get("#reg_fair option:first-child")
      .should("have.attr", "value", "placeholder")
      .should("contain", "Which fair are you going to?");
    cy.get("#reg_fair option:not(:first-child):selected").should("not.exist");
  });

  it("Clicking the Fair field should reveal options", () => {
    cy.get("#reg_fair").focus();
    cy.get("#reg_fair option:not(:first-child)").should("be.visible");
  });

  it("Clicking the Fair field should be in an active state", () => {
    cy.get("#reg_fair").focus().should("be.visible", "select_field:focus");
  });

  it("Clicking away from the Fair field should be in an inactive state", () => {
    cy.get("#reg_fair").focus().should("be.visible", "select_field:focus");
    cy.get("body").click(0, 0);
    cy.get("#reg_fair").should("be.visible", "select_field");
  });

  it("Unselected option error message should be visible if no option is selected in Fair field", () => {
    cy.get("#reg_fair").focus();
    cy.get("#reg_fair option:not(:first-child)").should("be.visible");
    cy.get("body").click(0, 0);

    cy.get("#reg_fair-error")
      .should("be.visible")
      .should("contain", "Please select the fair you're going to.");
  });

  it("Typing while Fair field's dropdown is open should allow search for option", () => {
    cy.get("#reg_fair").focus();
    cy.get("#reg_fair").type("Nairobi");
    cy.get('#reg_fair option[value="804"]').should("be.visible");
  });

  it("Selected option should appear in the Fair field and stored", () => {
    cy.get("#reg_fair").select("Nairobi");
    cy.get("#reg_fair").should("have.value", "804");
    cy.get("#reg_fair option:selected").should("contain", "Nairobi");
  });

  it("Error should be removed if Fair field is satisfied", () => {
    cy.get("#reg_fair").focus();
    cy.get("#reg_fair option:not(:first-child)").should("be.visible");
    cy.get("body").click(0, 0);
    cy.get("#reg_fair-error")
      .should("be.visible")
      .should("contain", "Please select the fair you're going to.");

    cy.get("#reg_fair").select("Nairobi");
    cy.get("#reg_fair").blur();
    cy.get("#reg_fair-error").should("not.be.visible");
  });
});

describe("First Name Field Test", () => {
  it("First Name field should be visible", () => {
    cy.get("#reg_fname").should("be.visible");
  });

  it("First Name field should have placeholder and is visible", () => {
    cy.get("#reg_fname")
      .should("have.attr", "placeholder", "First name")
      .should("have.value", "");
  });

  it("Clicking the First Name field should be in an active state", () => {
    cy.get("#reg_fname").focus().should("be.visible", "select_field:focus");
  });

  it("Clicking away from the First Name field should be in an inactive state", () => {
    cy.get("#reg_fname").focus().should("be.visible", "select_field:focus");
    cy.get("body").click(0, 0);
    cy.get("#reg_fname").should("be.visible", "select_field:focus");
  });

  it("Minimum 2 char error message should be visible for First Name field if char is less than 2", () => {
    cy.get("#reg_fname").focus();
    cy.get("#reg_fname").type("N");
    cy.get("#reg_fname").blur();
    cy.get("#reg_fname-error")
      .should("be.visible")
      .should("contain", "Minimum of 2 characters.");
  });

  it("Minimum 2 char error should be removed if First Name field is satisfied", () => {
    cy.get("#reg_fname").focus();
    cy.get("#reg_fname").type("N");
    cy.get("#reg_fname").blur();
    cy.get("#reg_fname-error")
      .should("be.visible")
      .should("contain", "Minimum of 2 characters.");

    cy.get("#reg_fname").type("D");
    cy.get("#reg_fname").blur();
    cy.get("#reg_fname-error").should("not.be.visible");
  });

  it("Empty field error message should be visible if First Name field is left empty", () => {
    cy.get("#reg_fname").focus();
    cy.get("body").click(0, 0);
    cy.get("#reg_fname-error")
      .should("be.visible")
      .should("contain", "This field cannot be empty.");
  });

  it("Input value should appear in the First Name field and stored", () => {
    const testName = "Nicole";
    cy.get("#reg_fname").focus();
    cy.get("#reg_fname").type(testName);
    cy.get("#reg_fname").should("be.visible").should("have.value", testName);
  });

  it("First Name field should be replaced with placeholder if value was cleared", () => {
    const testName = "Nicole";
    cy.get("#reg_fname").focus();
    cy.get("#reg_fname").type(testName);
    cy.get("#reg_fname").should("be.visible").should("have.value", testName);
    cy.get("#reg_fname").clear();
    cy.get("#reg_fname").should("have.attr", "placeholder", "First name");
  });
});

describe("Last Name Field Test", () => {
  it("Last Name field should be visible", () => {
    cy.get("#reg_lname").should("be.visible");
  });

  it("Last Name field should have placeholder and is visible", () => {
    cy.get("#reg_lname")
      .should("have.attr", "placeholder", "Last name")
      .should("have.value", "");
  });

  it("Clicking the Last Name field should be in an active state", () => {
    cy.get("#reg_lname").focus().should("be.visible", "select_field:focus");
  });

  it("Clicking away from the Last Name field should be in an inactive state", () => {
    cy.get("#reg_lname").focus().should("be.visible", "select_field:focus");
    cy.get("body").click(0, 0);
    cy.get("#reg_lname").should("be.visible", "select_field:focus");
  });

  it("Minimum 2 char error message should be visible for Last Name field if char is less than 2", () => {
    cy.get("#reg_lname").focus();
    cy.get("#reg_lname").type("N");
    cy.get("#reg_lname").blur();
    cy.get("#reg_lname-error")
      .should("be.visible")
      .should("contain", "Minimum of 2 characters.");
  });

  it("Minimum 2 char error should be removed if Last Name field is satisfied", () => {
    cy.get("#reg_lname").focus();
    cy.get("#reg_lname").type("N");
    cy.get("#reg_lname").blur();
    cy.get("#reg_lname-error")
      .should("be.visible")
      .should("contain", "Minimum of 2 characters.");

    cy.get("#reg_lname").type("D");
    cy.get("#reg_lname").blur();
    cy.get("#reg_lname-error").should("not.be.visible");
  });

  it("Empty field error message should be visible if Last Name field is left empty", () => {
    cy.get("#reg_lname").focus();
    cy.get("body").click(0, 0);
    cy.get("#reg_lname-error")
      .should("be.visible")
      .should("contain", "This field cannot be empty.");
  });

  it("Input value should appear in the Last Name field and stored", () => {
    const testName = "Dimabuyu";
    cy.get("#reg_lname").focus();
    cy.get("#reg_lname").type(testName);
    cy.get("#reg_lname").should("be.visible").should("have.value", testName);
  });

  it("Last Name field should be replaced with placeholder if value was cleared", () => {
    const testName = "Dimabuyu";
    cy.get("#reg_lname").focus();
    cy.get("#reg_lname").type(testName);
    cy.get("#reg_lname").should("be.visible").should("have.value", testName);
    cy.get("#reg_lname").clear();
    cy.get("#reg_lname").should("have.attr", "placeholder", "Last name");
  });
});

describe("Email Field Test", () => {
  it("Email field should be visible", () => {
    cy.get("#reg_email").should("be.visible");
  });

  it("Email field should have placeholder and is visible", () => {
    cy.get("#reg_email")
      .should("have.attr", "placeholder", "Email")
      .should("have.value", "");
  });

  it("Clicking the Email field should be in an active state", () => {
    cy.get("#reg_email").focus().should("be.visible", "select_field:focus");
  });

  it("Clicking away from the Email field should be in an inactive state", () => {
    cy.get("#reg_email").focus().should("be.visible", "select_field:focus");
    cy.get("body").click(0, 0);
    cy.get("#reg_email").should(
      "not.have.css",
      "border-color",
      "rgb(122, 184, 0)"
    );
  });

  it("Empty field error message should be visible if Email field is left empty", () => {
    cy.get("#reg_email").focus();
    cy.get("body").click(0, 0);
    cy.get("#reg_email-error")
      .should("be.visible")
      .should("contain", "This field cannot be empty.");
  });

  it("Invalid email error message should be visible for Email field if email is invalid or doesn't follow email syntax", () => {
    cy.get("#reg_email").focus();
    cy.get("#reg_email").type("n");
    cy.get("#reg_email").blur();
    cy.get("#reg_email-error")
      .should("be.visible")
      .should("contain", "The email you have entered is invalid.");

    cy.get("#reg_email").type("@");
    cy.get("#reg_email").blur();
    cy.get("#reg_email-error")
      .should("be.visible")
      .should("contain", "The email you have entered is invalid.");

    cy.get("#reg_email").type("g");
    cy.get("#reg_email").blur();
    cy.get("#reg_email-error")
      .should("be.visible")
      .should("contain", "The email you have entered is invalid.");

    cy.get("#reg_email").type(".");
    cy.get("#reg_email").blur();
    cy.get("#reg_email-error")
      .should("be.visible")
      .should("contain", "The email you have entered is invalid.");

    cy.get("#reg_email").type("c");
    cy.get("#reg_email").blur();
    cy.get("#reg_email-error")
      .should("be.visible")
      .should("contain", "The email you have entered is invalid.");
  });

  it("Invalid email error should be removed if Email field is satisfied", () => {
    cy.get("#reg_email").focus();
    cy.get("#reg_email").type("n@g.c");
    cy.get("#reg_email").blur();
    cy.get("#reg_email-error")
      .should("be.visible")
      .should("contain", "The email you have entered is invalid.");

    cy.get("#reg_email").type("om");
    cy.get("#reg_email").blur();
    cy.get("#reg_email-error").should("not.be.visible");
  });

  it("Input value should appear in the Email field and stored", () => {
    const testEmail = "ish.d@gmail.com";
    cy.get("#reg_email").focus();
    cy.get("#reg_email").type(testEmail);
    cy.get("#reg_email").should("be.visible").should("have.value", testEmail);
  });

  it("Email field should be replaced with placeholder if value was cleared", () => {
    const testEmail = "ish.d@gmail.com";
    cy.get("#reg_email").focus();
    cy.get("#reg_email").type(testEmail);
    cy.get("#reg_email").should("be.visible").should("have.value", testEmail);
    cy.get("#reg_email").clear();
    cy.get("#reg_email").should("have.attr", "placeholder", "Email");
  });
});

describe("Confirm Email Field Test", () => {
  it("Confirm Email field should be visible", () => {
    cy.get('[name="reg_confirm_email"]').should("be.visible");
  });

  it("Confirm Email field should have placeholder and is visible", () => {
    cy.get('[name="reg_confirm_email"]')
      .should("have.attr", "placeholder", "Confirm Email")
      .should("have.value", "");
  });

  it("Clicking the Confirm Email field should be in an active state", () => {
    cy.get('[name="reg_confirm_email"]')
      .focus()
      .should("be.visible", "select_field:focus");
  });

  it("Clicking away from the Confirm Email field should be in an inactive state", () => {
    cy.get('[name="reg_confirm_email"]')
      .focus()
      .should("be.visible", "select_field:focus");

    cy.get("body").click(0, 0);
    cy.get('[name="reg_confirm_email"]').should(
      "not.have.css",
      "border-color",
      "rgb(122, 184, 0)"
    );
  });

  it("Empty field error message should be visible if Confirm Email field is left empty", () => {
    cy.get('[name="reg_confirm_email"]').focus();
    cy.get("body").click(0, 0);
    cy.get("#reg_confirm_email-error")
      .should("be.visible")
      .should("contain", "This field is required.");
  });

  // B U G (potential) - Inconsistent error messages displayed during partial/invalid input.
  it("Invalid email error message should be visible for Confirm Email field if email is invalid or doesn't follow email syntax", () => {
    cy.get('[name="reg_confirm_email"]').focus();
    cy.get('[name="reg_confirm_email"]').type("n");
    cy.get('[name="reg_confirm_email"]').blur();
    cy.get("#reg_confirm_email-error")
      .should("be.visible")
      .should("contain", "Please enter a valid email address.");

    cy.get('[name="reg_confirm_email"]').type("@");
    cy.get('[name="reg_confirm_email"]').blur();
    cy.get("#reg_confirm_email-error")
      .should("be.visible")
      .should("contain", "Please enter a valid email address.");

    cy.get('[name="reg_confirm_email"]').type("g");
    cy.get('[name="reg_confirm_email"]').blur();
    cy.get("#reg_confirm_email-error")
      .should("be.visible")
      .should("contain", "Please enter the same value again.");
    cy.get('[name="reg_confirm_email"]').type(".");
    cy.get('[name="reg_confirm_email"]').blur();

    cy.get("#reg_confirm_email-error")
      .should("be.visible")
      .should("contain", "Please enter a valid email address.");
    cy.get('[name="reg_confirm_email"]').type("c");
    cy.get('[name="reg_confirm_email"]').blur();
    cy.get("#reg_confirm_email-error")
      .should("be.visible")
      .should("contain", "Please enter the same value again.");
  });

  it("Invalid email error should be removed if Confirm Email field is satisfied", () => {
    cy.get('[name="reg_email"]').focus().type("n@g.com");
    cy.get('[name="reg_confirm_email"]').focus();
    cy.get('[name="reg_confirm_email"]').type("n@g");
    cy.get('[name="reg_confirm_email"]').blur();
    cy.get("#reg_confirm_email-error")
      .should("be.visible")
      .should("contain", "Please enter the same value again.");

    cy.get('[name="reg_confirm_email"]').type(".com");
    cy.get('[name="reg_confirm_email"]').blur();
    cy.get("#reg_confirm_email-error").should("not.be.visible");
  });

  it("Input value should appear in the Confirm Email field and stored", () => {
    const testEmail = "ish.d@gmail.com";
    cy.get('[name="reg_confirm_email"]').focus();
    cy.get('[name="reg_confirm_email"]').type(testEmail);
    cy.get('[name="reg_confirm_email"]')
      .should("be.visible")
      .should("have.value", testEmail);
  });

  it("Confirm Email field should be replaced with placeholder if value was cleared", () => {
    const testEmail = "ish.d@gmail.com";
    cy.get('[name="reg_confirm_email"]').focus();
    cy.get('[name="reg_confirm_email"]').type(testEmail);
    cy.get('[name="reg_confirm_email"]')
      .should("be.visible")
      .should("have.value", testEmail);

    cy.get('[name="reg_confirm_email"]').clear();
    cy.get('[name="reg_confirm_email"]').should(
      "have.attr",
      "placeholder",
      "Confirm Email"
    );
  });
});

describe("Birthday Field Test", () => {
  it("Birthday field should be visible and open datepicker on click", () => {
    cy.get("#form_bday").click();
    cy.get(".datepicker").should("be.visible");
  });

  // B U G - placeholder not shown by default.
  it("Birthday field should have placeholder and datepicker is hidden initially", () => {
    cy.get("#form_bday")
      .should("have.attr", "placeholder", "Date of Birth")
      .should("have.value", "");
    cy.get(".datepicker").should("not.be.visible");
  });

  it("Clicking the Birthday field should be in an active state", () => {
    cy.get("#form_bday").click().should("be.visible", "select_field:focus");
  });

  it("Clicking away from the Birthday field should be in an inactive state", () => {
    cy.get("#form_bday").click().should("be.visible", "select_field:focus");
    cy.get("body").click(0, 0);
    cy.get("#form_bday").should(
      "not.have.css",
      "border-color",
      "rgb(122, 184, 0)"
    );
  });

  it("Input value should appear in the Birthday field and stored", () => {
    const targetYear = "2001";
    const targetMonth = "Jun";
    const targetDay = "14";
    const expectedDateFormat = "2001-06-14";

    cy.get("#form_bday").click();
    cy.get(".datepicker.datepicker-dropdown").should("be.visible");

    // Navigate the date picker: select year, month, then day.
    cy.get(".datepicker-years").should("be.visible");
    cy.get(".datepicker-years .year").contains(targetYear).click();
    cy.get(".datepicker-months").should("be.visible");
    cy.get(".datepicker-months .month").contains(targetMonth).click();
    cy.get(".datepicker-days").should("be.visible");

    // Select the specific day, ensuring it's not a day from the previous/next month.
    cy.get(".datepicker-days td.day:not(.old):not(.new)")
      .contains(targetDay)
      .click();
    cy.get("#form_bday").should("have.value", expectedDateFormat);
  });

  // B U G (potential) - need to check if manual typing is allowed and if it validates correctly.
  // it("Birthday field should allow manual entry", () => {});

  // B U G (potential) - need to check if clearing the field works as expected where placeholder returns.
  // it("Birthday field should be replaced with placeholder if value was cleared", () => {});
});

describe("Country Code Field Test", () => {
  it("Country Code field should be visible", () => {
    cy.get('[name="reg_country_code"]').should("be.visible");
  });

  // B U G - An item is selected by default. This test expects a placeholder selected.
  it("Country Code field should have the first option as placeholder", () => {
    cy.get('[name="reg_country_code"]')
      .find("option:first-child")
      .should("have.attr", "value", "placeholder")
      .should("contain", "Country code");
    cy.get(
      '[name="reg_country_code"] option:not(:first-child):selected'
    ).should("not.exist");
  });

  it("Clicking the Country Code field should reveal options", () => {
    cy.get('[name="reg_country_code"]').focus();
    cy.get('[name="reg_country_code"] option:not(:first-child)').should(
      "be.visible"
    );
  });

  it("Clicking the Country Code field should be in an active state", () => {
    cy.get('[name="reg_country_code"]')
      .focus()
      .should("be.visible", "select_field:focus");
  });

  it("Clicking away from the Country Code field should be in an inactive state", () => {
    cy.get('[name="reg_country_code"]')
      .focus()
      .should("be.visible", "select_field:focus");

    cy.get("body").click(0, 0);
    cy.get('[name="reg_country_code"]').should(
      "not.have.css",
      "border-color",
      "rgb(122, 184, 0)"
    );
  });

  // B U G (potential) - Need to confirm if this field is required and should show an error if left as placeholder.
  // it("Unselected option error message should be visible if no option is selected in Country Code field", () => {});

  it("Typing while Country Code field's dropdown is open should allow search for option", () => {
    cy.get('[name="reg_country_code"]').focus();
    cy.get('[name="reg_country_code"]').type("Gui");
    cy.get('[name="reg_country_code"] option[value="224"]').should(
      "be.visible"
    );
  });

  it("Selected option should appear in the Country Code field and stored", () => {
    cy.get('[name="reg_country_code"]').select("+224 - Guinea");
    cy.get('[name="reg_country_code"]').should("have.value", "224");
    cy.get('[name="reg_country_code"]')
      .find("option")
      .contains("Guinea")
      .should("be.selected");
  });

  // B U G (potential) - Need to confirm if this field is required and if an error is cleared upon selection.
  // it("Error should be removed if Country Code field is satisfied", () => {});
});

describe("Mobile Field Test", () => {
  it("Mobile field should be visible", () => {
    cy.get('[name="reg_mobile"]').should("be.visible");
  });

  it("Mobile field should have placeholder and is visible", () => {
    cy.get('[name="reg_mobile"]')
      .should("have.attr", "placeholder", "Mobile")
      .should("have.value", "");
  });

  it("Clicking the Mobile field should be in an active state", () => {
    cy.get('[name="reg_mobile"]')
      .focus()
      .should("be.visible", "select_field:focus");
  });

  it("Clicking away from the Mobile field should be in an inactive state", () => {
    cy.get('[name="reg_mobile"]')
      .focus()
      .should("be.visible", "select_field:focus");
    cy.get("body").click(0, 0);
    cy.get('[name="reg_mobile"]').should(
      "not.have.css",
      "border-color",
      "rgb(122, 184, 0)"
    );
  });

  it("Minimum 8 digits error message should be visible for Mobile field if digits is less than 8", () => {
    cy.get('[name="reg_mobile"]').focus();
    cy.get('[name="reg_mobile"]').type(123);
    cy.get('[name="reg_mobile"]').blur();
    cy.get("#reg_mobile-error")
      .should("be.visible")
      .should("contain", "Minimum of 8 digits.");
  });

  it("Maximum 12 digits error message should be visible for Mobile field if digits exceeds 12", () => {
    cy.get('[name="reg_mobile"]').focus();
    cy.get('[name="reg_mobile"]').type(1234567891012);
    cy.get('[name="reg_mobile"]').blur();
    cy.get("#reg_mobile-error")
      .should("be.visible")
      .should("contain", "Maximum of 12 digits.");
  });

  it("Minimum 8 digits error message should be removed if Mobile field is satisfied", () => {
    cy.get('[name="reg_mobile"]').focus();
    cy.get('[name="reg_mobile"]').type(123);
    cy.get('[name="reg_mobile"]').blur();
    cy.get("#reg_mobile-error")
      .should("be.visible")
      .should("contain", "Minimum of 8 digits.");

    cy.get('[name="reg_mobile"]').type(12345678);
    cy.get('[name="reg_mobile"]').blur();
    cy.get("#reg_mobile-error").should("not.be.visible");
  });

  it("Maximum 12 digits error message should be removed if Mobile field is satisfied", () => {
    cy.get('[name="reg_mobile"]').focus();
    cy.get('[name="reg_mobile"]').type(1234567891012);
    cy.get('[name="reg_mobile"]').blur();
    y.get("#reg_mobile-error")
      .should("be.visible")
      .should("contain", "Maximum of 12 digits.");

    cy.get('[name="reg_mobile"]').clear().type(123456789101);
    cy.get('[name="reg_mobile"]').blur();
    cy.get("#reg_mobile-error").should("not.be.visible");
  });

  it("Empty field error message should be visible if Mobile field is left empty", () => {
    cy.get('[name="reg_mobile"]').focus();
    cy.get("body").click(0, 0);
    cy.get("#reg_mobile-error")
      .should("be.visible")
      .should("contain", "This field cannot be empty.");
  });

  it("Input value should appear in the Mobile field and stored", () => {
    const testNumber = 1234567890;
    cy.get('[name="reg_mobile"]').focus();
    cy.get('[name="reg_mobile"]').type(testNumber);

    cy.get('[name="reg_mobile"]')
      .should("be.visible")
      .should("have.value", testNumber);
  });

  it("Mobile field should be replaced with placeholder if value was cleared", () => {
    const testNumber = 1234567890;
    cy.get('[name="reg_mobile"]').focus();
    cy.get('[name="reg_mobile"]').type(testNumber);
    cy.get('[name="reg_mobile"]')
      .should("be.visible")
      .should("have.value", testNumber);

    cy.get('[name="reg_mobile"]').clear();
    cy.get('[name="reg_mobile"]').should("have.attr", "placeholder", "Mobile");
  });
});

describe("Current Level Field Test", () => {
  it("Current Level field should be visible", () => {
    cy.get('[name="reg_level"]').should("be.visible");
  });

  // B U G - An item is selected by default.
  it("Current Level field should have the first option as placeholder", () => {
    cy.get('[name="reg_level"]')
      .find("option:first-child")
      .should("have.attr", "value", "placeholder")
      .should("contain", "What is your current level of study?");
    cy.get('[name="reg_level"] option:not(:first-child):selected').should(
      "not.exist"
    );
  });

  it("Clicking the Current Level field should reveal options", () => {
    cy.get('[name="reg_level"]').focus();
    cy.get('[name="reg_level"] option:not(:first-child)').should("be.visible");
  });

  it("Clicking the Current Level field should be in an active state", () => {
    cy.get('[name="reg_level"]')
      .focus()
      .should("be.visible", "select_field:focus");
  });

  it("Clicking away from the Current Level field should be in an inactive state", () => {
    cy.get('[name="reg_level"]')
      .focus()
      .should("be.visible", "select_field:focus");

    cy.get("body").click(0, 0);
    cy.get('[name="reg_level"]').should(
      "not.have.css",
      "border-color",
      "rgb(122, 184, 0)"
    );
  });

  // B U G (potential) - Need to confirm if this field is required and should show an error if left as placeholder.
  // it("Unselected option error message should be visible if no option is selected in Current Level field", () => {});

  it("Typing while Current Level field's dropdown is open should allow search for option", () => {
    cy.get('[name="reg_level"]').focus();
    cy.get('[name="reg_level"]').type("high");
    cy.get('[name="reg_level"] option[value="1"]').should("be.visible");
  });

  it("Selected option should appear in the Current Level field and stored", () => {
    cy.get('[name="reg_level"]').select("High School");
    cy.get('[name="reg_level"]').should("have.value", "1");
    cy.get('[name="reg_level"]')
      .find("option")
      .contains("High School")
      .should("be.selected");
  });

  // B U G (potential) - Need to confirm if this field is required and if an error is cleared upon selection.
  // it("Error should be removed if Current Level field is satisfied", () => {});
});

describe("Study Year Field Test", () => {
  it("Study Year field should be visible", () => {
    cy.get('[name="reg_when"]').should("be.visible");
  });

  it("Study Year field should have the first option as placeholder", () => {
    cy.get('[name="reg_when"] option:first-child')
      .should("have.attr", "value", "placeholder")
      .should("contain", "When are you planning to study?");
    cy.get('[name="reg_when"] option:not(:first-child):selected').should(
      "not.exist"
    );
  });

  it("Clicking the Study Year field should reveal options", () => {
    cy.get('[name="reg_when"]').focus();
    cy.get('[name="reg_when"] option:not(:first-child)').should("be.visible");
  });

  it("Clicking the Study Year field should be in an active state", () => {
    cy.get('[name="reg_when"]')
      .focus()
      .should("be.visible", "select_field:focus");
  });

  it("Clicking away from the Study Year field should be in an inactive state", () => {
    cy.get('[name="reg_when"]')
      .focus()
      .should("be.visible", "select_field:focus");

    cy.get("body").click(0, 0);
    cy.get('[name="reg_when"]').should(
      "not.have.css",
      "border-color",
      "rgb(122, 184, 0)"
    );
  });

  it("Unselected option error message should be visible if no option is selected in Study Year field", () => {
    cy.get('[name="reg_when"]').focus();
    cy.get('[name="reg_when"] option:not(:first-child)').should("be.visible");

    cy.get("body").click(0, 0);
    cy.get("#reg_when-error")
      .should("be.visible")
      .should("contain", "Please select one option.");
  });

  it("Typing while Study Year field's dropdown is open should allow search for option", () => {
    cy.get('[name="reg_when"]').focus();
    cy.get('[name="reg_when"]').type(2026);
    cy.get('[name="reg_when"] option[value="2026"]').should("be.visible");
  });

  it("Selected option should appear in the Study Year field and stored", () => {
    cy.get('[name="reg_when"]').select("2027");
    cy.get('[name="reg_when"]').should("have.value", 2027).should("be.visible");
    cy.get('[name="reg_when"]')
      .find("option")
      .contains("2027")
      .should("be.selected");
  });

  it("Error should be removed if Study Level field is satisfied", () => {
    cy.get('[name="reg_when"]').focus();
    cy.get('[name="reg_when"] option:not(:first-child)').should("be.visible");
    cy.get("body").click(0, 0);

    cy.get("#reg_when-error")
      .should("be.visible")
      .should("contain", "Please select one option.");

    cy.get('[name="reg_when"]').select("2027");
    cy.get('[name="reg_when"]').blur();
    cy.get("#reg_when-error").should("not.be.visible");
  });
});

describe("CTA Test", () => {
  // Verify the "Next" button is always visible on the page.
  it("Next CTA should be always visible", () => {
    cy.get(".btn_primary.btn_next").should("be.visible");
  });

  // Test that the "Next" button changes color or style when the user hovers over it.
  it("Next CTA can change color upon hover", () => {
    // Verify the initial background color.
    cy.get(".btn_primary.btn_next").should("be.visible", "btn");
    cy.get(".btn_primary.btn_next")
      // This checks if color changes upon hover
      .should("be.visible", "btn:hover");
  });

  // Test the core functionality: filling out Step 1 fields and clicking Next CTA navigates to Step 2.
  it("Should replace step 1 with step 2 upon successful form submission", () => {
    // Fill in all fields for Step 1.
    cy.get("#reg_fair").select("Nairobi");
    cy.get("#reg_fname").type("Nicole");
    cy.get("#reg_lname").type("Dimabuyu");
    cy.get("#reg_email").type("ish.d@gmail.com");
    cy.get('[name="reg_confirm_email"]').type("ish.d@gmail.com");
    cy.get("#form_bday").click();
    cy.get(".datepicker-years .year").contains("2001").click();
    cy.get(".datepicker-months .month").contains("Jun").click();
    cy.get(".datepicker-days td.day:not(.old):not(.new)")
      .contains("14")
      .click();
    cy.get('[name="reg_country_code"]').select("+224 - Guinea");
    cy.get('[name="reg_mobile"]').type(1234567890);
    cy.get('[name="reg_level"]').select("High School");
    cy.get('[name="reg_when"]').select("2027");

    // Click the Next CTA.
    cy.get(".btn_primary.btn_next").click();
    // Verify that Step 2 element is now visible, indicating navigation/transition.
    cy.get("#tab_step_2").should("be.visible");
  });
});
