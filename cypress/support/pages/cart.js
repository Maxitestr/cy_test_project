class Cart {
    //Геттеры
    getDetails() {
        //Возвращает блок деталей заказа
        return cy.get('mvid-cart-total')
    }
    // Действия
    visitCart(fixture) {
        cy.setIntercept('getCart', fixture)
        cy.visit('/cart', { timeout: 10000 })
        cy.waitForResponse('getCart')
    }

    deleteSelectedItems() {
        cy.contains('a', 'Удалить выбранные').should('be.visible').click()
    }

    deleteSelectedItemsWithIntercept() {
        cy.setIntercept('deleteCartItems')
        this.deleteSelectedItems()
        cy.waitForResponse('deleteCartItems')
    }

    checkDeletionConfirmation() {
        cy.contains('p', 'Вы удалили товар').should('be.visible')
        cy.contains('a', 'Вернуть').should('be.visible').and('have.css', 'cursor', 'pointer')
    }

    //Проверки
    checkDetailsText(text) {
        cy.get('p').eq(0).should('be.visible').and('contain', text)
    }

    checkDetailsPrice(price) {
        cy.get('p').eq(1).should('be.visible').then(($el) => {
            const actualPrice = $el.text().trim().replace(/\s+/g, ' ')
            expect(actualPrice).to.equal(price)
        })
    }

    checkDetailsProductPrice(text, price) {
        this.getDetails().within(() => {
            // Проверяет текст, суммы товаров и итого 
            cy.contains(text).parent().within(() => {
                this.checkDetailsText(text)
                this.checkDetailsPrice(price)
            })
        })
    }

    checkDetailsDiscount(text, price) {
        //Проверяет размер скидки
        this.getDetails().within(() => {
            cy.contains('.cart-total__item-discount-button', text).within(() => {
                this.checkDetailsText(text)
                this.checkDetailsPrice(price)
            })
        })
    }

    checkEmptyCartInformation() {
        //Проверяет информацию в пустой корзине
        cy.get('mvid-cart-empty').within(() => {
            cy.contains('h1', 'Корзина пуста').should('be.visible')
            cy.contains('p', 'авторизуйтесь, чтобы увидеть выбранные товары').should('be.visible')
            cy.contains('p', 'Акции, специальные предложения').should('be.visible')
            cy.contains('a', 'главной странице').should('be.visible').and('have.css', 'cursor', 'pointer')
            cy.contains('button', 'Авторизоваться').should('be.visible').and('be.enabled')
        })
    }

    checkCartItemExists(text) {
        return cy.contains('mvid-cart-item', text).should('be.visible')
    }

    checkCartItem(title, price, fullPrice) {
        //Проверяет карточку товара в корзине
        this.checkCartItemExists(title).within(() => {
            cy.get('img').should('be.visible')
            cy.get('h3').contains(title).should('be.visible')
            cy.get('.price__main-value').then(($el) => {
                let normalized = $el.text().trim().replace(/\s+/g, ' ')
                expect(normalized).to.equal(price)
            })
            cy.get('.price__sale-value').then(($el) => {
                let normalized = $el.text().trim().replace(/\s+/g, ' ')
                expect(normalized).to.equal(fullPrice)
            })
            cy.get('mvid-checkbox').find('mvid-icon').should('be.visible')
            cy.contains('button', 'Удалить').should('be.visible').and('be.enabled')
            cy.contains('button', 'В избранное').should('be.visible').and('be.enabled')
        })
    }

    checkCartItemQuantity(title, quantity) {
        this.checkCartItemExists(title).within(() => {
            cy.get('.change-quantity__button_minus').should('have.attr', 'disabled')
            cy.get('.change-quantity__count').should('have.text', quantity).and('be.visible')
            cy.get('.change-quantity__button_plus').should('be.visible').and('not.have.attr', 'disabled')
        })
    }

    checkGoToChekoutButton() {
        cy.contains('button', 'Перейти к оформлению').should('be.visible').and('be.enabled')
    }
}
export default new Cart()