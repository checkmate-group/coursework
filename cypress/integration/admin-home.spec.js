describe("visit website", () => {
  // beforeEach(() => {
  it("visit website", () => {
    cy.visit("http://localhost:3000/");
  });

  // });
  describe("home page Section", () => {
    it("title", () => {
      cy.get(".display-1").should("have.text", "Database Viewer");
    });
    it("text", () => {
      cy.get(".display-1 + p").should(
        "have.text",
        "This is the Checkmate group database viewer.\nThe site make use of multiple technologies that display\ndatabase data onto the site."
      );
    });
    it("shoud find button with Dashboard text", () => {
      cy.contains("Dashboard").should("have.text", "Dashboard");
    });
    it("click on singup", () => {
      cy.contains("Sign up").click();
    });
  });
});
