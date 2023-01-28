import type Product from '../../src/types/Product'

class ProductManagementDashboardTester {
  static addProduct(product: Product) {
    cy.get('input[name="productName"]').clear().type(product.name)
    cy.get('input[name="productPrice"]').clear().type(product.price)
    cy.get('input[name="productImage"]').clear().type(product.image_url)
    cy.contains('button', 'Add Product').click()
  }
  static showsProduct(productName: string) {
    cy.contains('div', productName)
  }
  static deletesProduct(name: string) {
    cy.contains('tr', name).within(() => {
      cy.get('#delete-button').click()
    })
  }
  static doesNotShow(productName: string) {
    cy.contains(productName).should('not.exist')
  }
  static showsProductNameExistsError() {
    cy.contains('div', 'This product name is already taken.')
  }
  static showsProductNotFoundError(id: string) {
    cy.contains('div', `The product with the id: ${id} was not found.`)
  }
  static updateProduct(properties: { productToUpdate: string; update: string }) {
    cy.contains('tr', properties.productToUpdate).within(() => {
      cy.get('#edit-button').click()
      cy.wait(2000)
      cy.get('input[name="productName"]').clear().type(properties.update)
    })
  }
}

export default ProductManagementDashboardTester
