describe('Main Page Tests', () => {
  it('Visits the main page', () => {
    cy.visit('/');
    cy.contains('h1', 'Entity Manager');
  });
  
});
