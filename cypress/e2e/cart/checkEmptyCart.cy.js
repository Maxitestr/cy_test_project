import cart from '../../support/pages/cart'

describe('Отображение пустой козины', () => {
    beforeEach(() => {
        cart.visitCart()
    })

    it('Проверка отображения пустой корзины', () => {
        cart.checkEmptyCartInformation()
    })
})