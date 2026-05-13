class MainPage {

    // Действия
    visitMainPage() {
        cy.setIntercept('getGoodOfDay')
        cy.visit('', {timeout: 10000})
        cy.waitForResponse('getGoodOfDay')
    }

    addToCart() {
        cy.contains('button', 'В корзину').should('be.visible').and('be.enabled').click()
    }

    goToCart() {
        cy.get('mvid-header-icon[title="Корзина"]').should('be.visible').click()
    }

    addToCartWithIntercept() {
        // Добавление в корзину с ожиданием
        cy.setIntercept('addToCart')
        this.addToCart()
        cy.waitForResponse('addToCart')
    }

    goToCartWithIntercept() {
        // Переход в корзину с ожиданием
        cy.setIntercept('getCart')
        this.goToCart()
        cy.waitForResponse('getCart')
    }
}

export default new MainPage()