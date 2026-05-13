export const intercepts = {
  getCart:   { method: 'GET',  url: '/bff/shopping-cart', times: 99,},
  addToCart: { method: 'POST', url: '/bff/shopping-cart/add?*', times: 99 },
  getGoodOfDay: {method: 'GET', url: '/bff/settings/shelf-product-sets?tags=goodofday*', times:99},
  deleteCartItems: {method: 'POST', url: '/bff/shopping-cart/items/delete', times: 99}
}