describe('The product management dashboard allows to', () => {
  const time = Date.now()
  it('add a new product', () => {
    cy.visit('/ProductManagementDashboard')

    cy.get('input[name="productName"]').type(`Productname: ${time}`)
    cy.get('input[name="productPrice"]').type('10')
    cy.get('input[name="productImage"]').type('https://picsum.photos')
    cy.contains('button', 'Add Product').click()

    cy.contains('div', `Productname: ${time}`)
  })
})
