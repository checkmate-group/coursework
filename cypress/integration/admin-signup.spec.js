describe("singup", () => {
  // it("visit website", () => {
  //   cy.visit("http://localhost:3000/register");
  // });

  it("login Page enter email ", () => {
    cy.get("#username").type("admin").should("have.value", "admin");
  });
  it("login Page enter email ", () => {
    cy.get("#email")
      .type("admin@gmail.com")
      .should("have.value", "admin@gmail.com");
  });
  it("login Page enter password ", () => {
    cy.get("#password").type("admin").should("have.value", "admin");
  });
  it("check rememer me checkbox", () => {
    cy.contains("Agree").find("input[type=checkbox]").check();
  });
  it("click on register button", () => {
    cy.get("form").submit();
  });
  it("click on register button", () => {
    cy.contains("Login").click();
  });
});
