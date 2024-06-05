/// <reference types="cypress" />

describe('E2E Tests for Picking App', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3006');
    });
  
    it('should see orders', () => {
      cy.intercept('GET', '**/orders').as('getOrders');
      cy.wait('@getOrders');

      cy.get('.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiCard-root.css-1jzvf4o-MuiPaper-root-MuiCard-root').first().should('be.visible');
    });

    it('should update Order', () => {
      cy.intercept('GET', '**/orders').as('getOrders');
      cy.wait('@getOrders');

      cy.intercept('PATCH', '**/orders/**').as('patchOrder');

      cy.get('.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiCard-root.css-1jzvf4o-MuiPaper-root-MuiCard-root').first().contains('button', 'In progress').click();
      
      
      cy.wait('@patchOrder').its('response.statusCode').should('eq', 204);
    });

    it('should fail update Order', () => {
      cy.intercept('GET', '**/orders').as('getOrders');
      cy.wait('@getOrders');

      cy.intercept('PATCH', '**/orders/**').as('patchOrder');

      cy.get('.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiCard-root.css-1jzvf4o-MuiPaper-root-MuiCard-root').first().contains('button', 'In progress').click();
      
      
      cy.wait('@patchOrder').its('response.statusCode').should('eq', 400);
    });

    it('should complete Order Picking', () => {
      cy.intercept('GET', '**/orders').as('getOrders');
      cy.wait('@getOrders');

      cy.intercept('PATCH', '**/orders/**').as('patchOrder');

      cy.get('.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiCard-root.css-1jzvf4o-MuiPaper-root-MuiCard-root').first().contains('button', 'Completed').click();
      
      
      cy.wait('@patchOrder').its('response.statusCode').should('eq', 204);
      cy.reload();
      cy.get('.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiCard-root.css-1jzvf4o-MuiPaper-root-MuiCard-root').should('not.exist');
    });
  });
  