describe("Viewer Page", () => {
  it("should contain Database Viewer heading", () => {
    cy.contains("Database Viewer");
  });
  it("select option from dropdown default dropdown should be world population", () => {
    cy.get("#view-select").should("have.value", "0");
  });

  it("select option World cities by population in region from dropdown ", () => {
    cy.wait(1000);
    cy.get("#view-select").select("World cities by population in region");
    cy.wait(1000);
  });
  it("click on View Report", () => {
    cy.contains("View Report").click();
  });
  it("should contain city Sydney", () => {
    cy.contains("Sydney");
  });
  it("scroll down", () => {
    cy.contains("Dunedin").scrollIntoView({ behavior: "smooth" });
    cy.wait(2000);
  });
  it("should contain city Sydney", () => {
    cy.contains("Sydney");
  });
  it("scroll down", () => {
    cy.contains("Dunedin").scrollIntoView({ behavior: "smooth" });
    cy.wait(2000);
  });
  it("should contain Database Viewer heading", () => {
    cy.contains("Database Viewer").scrollIntoView({ behavior: "smooth" });
    cy.wait(1000);
  });
  it("select option World countries by population from dropdown ", () => {
    cy.wait(1000);
    cy.get("#view-select").select("World countries by population");
    cy.wait(1000);
  });
  it("click on View Report", () => {
    cy.contains("View Report").click();
  });
  it("shoudld contain China", () => {
    cy.contains("China");
    cy.wait(1000);
  });
  it("Select database", () => {
    cy.get("#view-select-database").select("Country");
  });
  it("click on Add New Data In Report", () => {
    cy.contains("Add New Data In Report").click();
  });
  it("click on About section", () => {
    cy.contains("About").click();
    cy.wait(1000);
  });
});
//World countries by population
