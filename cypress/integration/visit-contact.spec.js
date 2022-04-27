describe("Contact", () => {
  it("Get in touch", () => {
    cy.contains("Get in touch");
  });
  it("login Page enter text ", () => {
    cy.get("#floatingInputName")
      .type("dummy text")
      .should("have.value", "dummy text");
  });
  it("login Page enter email ", () => {
    cy.get("#floatingInputEmail")
      .type("fake@gmail.com")
      .should("have.value", "fake@gmail.com");
  });
  it("login Page enter password ", () => {
    cy.get("#floatingPassword")
      .type("admin123")
      .should("have.value", "admin123");
  });
  it("click on Featues tab", () => {
    cy.contains("Features").click();
  });
  // it("scroll to slider section", () => {
  //   cy.contains("Features").scrollIntoView();
  //   cy.wait(1000);
  // });
  // it("click on Features Tab", () => {
  //   cy.contains("Features").click();
  //   cy.wait(1000);
  // });
});
