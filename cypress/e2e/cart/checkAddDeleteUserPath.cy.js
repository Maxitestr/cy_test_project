import mainPage from '../../support/pages/mainPage'
import cart from '../../support/pages/cart'

describe('Добавление, удаление товара', () => {
    beforeEach(() => {
        mainPage.visitMainPage()
    })

    it('Проверка пользовательского пути: добавление, удаление товара', () => {
        cy.allure().step('Добавление товара в корзину')
        mainPage.addToCartWithIntercept()

        cy.allure().step('Переход в корзину')
        mainPage.goToCartWithIntercept()

        cy.allure().step('Удаление товара')
        cart.deleteSelectedItemsWithIntercept()

        cy.allure().step(' Проверяем сообщение что товар удален')
        cart.checkDeletionConfirmation()
    })
})