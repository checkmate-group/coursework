describe("Features", () => {
  it("should contain Technologies", () => {
    cy.contains("Technologies");
  });
  it("should contain Node.js", () => {
    cy.contains("Node.js");
  });
  it("should contain Docker", () => {
    cy.contains("Docker");
  });
  it("should contain Express.js", () => {
    cy.contains("Express.js");
  });
  it("should contain Pug", () => {
    cy.contains("Pug");
  });
  it("click on Signup", () => {
    cy.contains("Sign up").click();
  });
});
