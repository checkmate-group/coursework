describe("login", () => {
  // it("visit website", () => {
  //   cy.visit("http://localhost:3000/login");
  // });

  it("login Page enter email ", () => {
    cy.get("#username").type("admin").should("have.value", "admin");
  });
  it("login Page enter password ", () => {
    cy.get("#password").type("admin").should("have.value", "admin");
  });
  it("check rememer me checkbox", () => {
    cy.contains("Remember me").find("input[type=checkbox]").check();
  });
  it("check rememer me checkbox", () => {
    cy.contains("Agree").find("input[type=checkbox]").check();
  });
  it("dd", () => {
    Cypress.Cookies.debug(true);
  });
  it("prever", () => {
    cy.setCookie("username", "rizwan");
  });
  it("click on login", () => {
    cy.get("form").submit();
  });
});
