describe("About", () => {
  it("should contain heading About Checkmate", () => {
    cy.contains("About Checkmate");
  });
  it("should contain text Code of conduct", () => {
    cy.contains("Code of conduct");
  });
  it("should contain text Meeting minutes", () => {
    cy.contains("Meeting minutes");
  });
  it("should contain text Use case diagram", () => {
    cy.contains("Use case diagram");
  });
  it("scroll to slider section", () => {
    cy.contains("Group members").scrollIntoView();
    cy.wait(1000);
  });
  it("should contain name of group member Zakariya Oulhadj", () => {
    cy.contains("Zakariya Oulhadj");
  });
  it("should contain name of group member Taylor Head", () => {
    cy.contains("Taylor Head");
  });
  it("should contain name of grup member Mohamed Kaizra", () => {
    cy.contains("Mohamed Kaizra");
  });
  it("should contain name of grup member Bogdan Adascalului", () => {
    cy.contains("Bogdan Adascalului");
  });
  it("click on Zakariya Oulhadj should open his profile page", () => {
    cy.contains("Find out more").click();
    cy.wait(2000);
  });
  it("go back to about page", () => {
    cy.go("back");
  });
  it("scroll to slider section", () => {
    cy.contains("Features").scrollIntoView();
    cy.wait(1000);
  });
  it("click on Contact Tab", () => {
    cy.contains("Contact").click();
    cy.wait(1000);
  });
});
