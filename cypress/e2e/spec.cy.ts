describe('Main Page Tests', () => {
  it('Visits the main page', () => {
    cy.visit('/');
    cy.contains('h1', 'Entity Manager');
  });

  it('Finds and clicks the Create New Entity button', () => {
    cy.visit('/');
    cy.contains('button', 'Create').click();
  });
  it('create new user', () => {
    cy.visit('/create');
    cy.wait(5000);
    cy.intercept('POST', 'https://671a5bf5acf9aa94f6aa5599.mockapi.io/api/entityList').as('createEntity');

    cy.get('input[type=text]').type('Cypress Test')
    cy.get('textarea').type('Description Cypress')
    cy.get('input[type=checkbox]').check()
    cy.get('input[type=date]').type('2024-01-01')

    cy.wait(500);

    cy.contains('button', 'Save').click()

    cy.wait('@createEntity', { timeout: 10000 });

    cy.url().should('eq', `${Cypress.config().baseUrl}/`);

    cy.contains('h2', 'Cypress Test').should('exist');
  })
  it('edit new user', () => {
    cy.visit('/')
    cy.wait(5000);
    cy.contains('h2', 'Cypress Test').parents('li').within(() => {
      cy.contains('button', 'Edit').click()
    })

    cy.intercept('PUT', 'https://671a5bf5acf9aa94f6aa5599.mockapi.io/api/entityList/*').as('editEntity');

    cy.get('input[type=text]').type(' Edit')
    cy.get('textarea').type(' Edit')
    cy.get('input[type=checkbox]').uncheck()
    cy.get('input[type=date]').invoke('val', '').type('2024-02-02');

    cy.wait(500);

    cy.contains('button', 'Save').click()

    cy.wait('@editEntity', {timeout: 10000});

    cy.url().should('eq', `${Cypress.config().baseUrl}/`);

    cy.contains('h2', 'Cypress Test Edit').should('exist');
  })
  it('delete user', () => {
    cy.visit('/')
    cy.wait(5000);
    cy.contains('h2', 'Cypress Test Edit').parents('li').within(() => {
      cy.contains('button', 'Delete').click()
    })

    cy.intercept('DELETE', 'https://671a5bf5acf9aa94f6aa5599.mockapi.io/api/entityList/*').as('deleteEntity');

    cy.window().then((win) => {
      cy.stub(win, 'confirm').returns(true);
    });

    cy.wait('@deleteEntity').its('response.statusCode').should('be.oneOf', [200, 201]);

    cy.contains('h2', 'Cypress Test Edit').should('not.exist');
  })
});
