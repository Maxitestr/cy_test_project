describe('Pokemon API', () => {

  const baseUrl = 'https://pokeapi.co/api/v2'
  it('GET /pokemon/bulbasaur — smoke test', () => {
    cy.request('GET', `${baseUrl}/pokemon/bulbasaur`)
      .should((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.name.toLowerCase()).to.eq('bulbasaur')
        expect(response.body.id).to.be.a('number')
        expect(response.body.abilities).to.be.an('array').and.not.empty
      })
  })

  it('GET /pokemon/0 — возвращает 404', () => {
    cy.request({
      url: `${baseUrl}/pokemon/0`,
      failOnStatusCode: false
    }).its('status').should('eq', 404)
  });

  it('GET /pokemon?limit=10 — возвращает 10 покемонов', () => {
    cy.request(`${baseUrl}/pokemon?limit=10&offset=0`)
      .its('body.results')
      .should('have.length', 10)
  })
})