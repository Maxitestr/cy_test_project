import cart from '../../support/pages/cart'

describe('Отображение корзины с товаром', () => {
    beforeEach(() => {
        cart.visitCart({ fixture: 'cart.json' })
    })

    const cartItem = {
        title: 'Блендер погружной Scarlett SC-HB42F82',
        discountPrice: '1 770 ₽',
        fullPrice: '1 999',
        quantity: 1,
    }

    it('Проверки отображения корзины с товаром', () => {
        cy.allure().step('Проверяем карточку товара')
        cart.checkCartItem(
            cartItem.title,
            cartItem.discountPrice,
            cartItem.fullPrice)
        cart.checkCartItemQuantity(cartItem.title, cartItem.quantity)

        cy.allure().step('Проверяем детали заказа')
        cart.checkDetailsProductPrice('1 товар', cartItem.fullPrice + ' ₽')
        cart.checkDetailsDiscount('Скидка', '−229 ₽')
        cart.checkDetailsProductPrice('Итого', cartItem.discountPrice)
        cart.checkGoToChekoutButton()
    })
})