/// <reference types="cypress" />

describe('E2E Tests for Delivery App', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081');
    });
  
    it('should see orders', () => {
      cy.intercept('GET', '**/orders').as('getOrders');
      cy.wait('@getOrders');

      cy.get('.css-view-175oi2r').first().should('be.visible');
    });

    it('should update Order', () => {
      cy.intercept('GET', '**/orders').as('getOrders');
      cy.wait('@getOrders');

      cy.intercept('PATCH', '**/orders/**').as('patchOrder');

      cy.get(':nth-child(2) > .r-flexDirection-18u37iz > :nth-child(2) > .css-text-146c3p1').click();

      cy.wait('@patchOrder').its('response.statusCode').should('eq', 204);
    });

    it('should fail update Order', () => {
      cy.intercept('GET', '**/orders').as('getOrders');
      cy.wait('@getOrders');

      cy.intercept('PATCH', '**/orders/**').as('patchOrder');

      cy.get(':nth-child(2) > .r-flexDirection-18u37iz > :nth-child(2) > .css-text-146c3p1').click(); 

      cy.wait('@patchOrder').its('response.statusCode').should('eq', 400);
    });

    it('should complete Order Picking', () => {
      cy.intercept('GET', '**/orders').as('getOrders');
      cy.wait('@getOrders');

      cy.intercept('PATCH', '**/orders/**').as('patchOrder');

      cy.get(':nth-child(3) > .css-text-146c3p1').click();
      
      cy.wait('@patchOrder').its('response.statusCode').should('eq', 204);
      cy.reload();
    });
  });
  