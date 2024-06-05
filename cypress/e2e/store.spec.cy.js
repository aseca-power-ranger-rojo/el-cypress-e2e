/// <reference types="cypress" />

describe('E2E Tests for Shopping Cart App', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3007');
    });
  
    it('should add products to the cart', () => {
      cy.intercept('GET', '**/products').as('getProducts');
      cy.wait('@getProducts');

      cy.get('#a66fb70e-3b26-41a1-9b93-54baec7563de > .MuiCardContent-root > .MuiContainer-root > .MuiButtonBase-root').click();

      cy.get('.css-1v8my8o > #a66fb70e-3b26-41a1-9b93-54baec7563de > .MuiCardContent-root').should('be.visible');
    });
  
    it('should increase product quantity in the cart', () => {
      cy.intercept('GET', '**/products').as('getProducts');
      cy.wait('@getProducts');

      cy.get('#a66fb70e-3b26-41a1-9b93-54baec7563de > .MuiCardContent-root > .MuiContainer-root > .MuiButtonBase-root').click();
      cy.get('[data-testid="ArrowRightIcon"] > path').click();

      cy.get('.css-2q96vg > .MuiBox-root > .MuiTypography-root').should('have.text', '2');
    });
  
    it('should decrease product quantity in the cart', () => {
      cy.intercept('GET', '**/products').as('getProducts');
      cy.wait('@getProducts');

      cy.get('#a66fb70e-3b26-41a1-9b93-54baec7563de > .MuiCardContent-root > .MuiContainer-root > .MuiButtonBase-root').click();
      cy.get('[data-testid="ArrowRightIcon"]').click();
      cy.get('[data-testid="ArrowLeftIcon"]').click();

      cy.get('.css-2q96vg > .MuiBox-root > .MuiTypography-root').should('have.text', '1');
    });
  
    it('should remove product from the cart', () => {
      cy.intercept('GET', '**/products').as('getProducts');
      cy.wait('@getProducts');

      cy.get('#a66fb70e-3b26-41a1-9b93-54baec7563de > .MuiCardContent-root > .MuiContainer-root > .MuiButtonBase-root').click();
      cy.get('[data-testid="ArrowLeftIcon"] > path').click();

      cy.get('#list').should('have.text', 'Empty cart');
    });
  
    it('should complete a purchase', () => {
      cy.intercept('GET', '**/products').as('getProducts');
      cy.intercept('POST', '**/orders').as('postOrder');
      cy.wait('@getProducts');
      
      cy.get('#a66fb70e-3b26-41a1-9b93-54baec7563de > .MuiCardContent-root > .MuiContainer-root > .MuiButtonBase-root').click();
      cy.get('.css-1t8y7w > .MuiButtonBase-root').click();
      
      cy.wait('@postOrder').its('response.statusCode').should('eq', 201);
    });
  });
  