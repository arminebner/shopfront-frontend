import type Product from '../../src/types/product'

class ProductManagementDashboardTester {
  static addProduct(product: Product) {
    cy.get('input[name="productName"]').clear().type(product.name)
    cy.get('input[name="shortDescription"]').clear().type(product.short_description)
    cy.get('input[name="description"]').clear().type(product.description)
    cy.get('input[name="productPrice"]').clear().type(product.price)
    cy.get('input[name="fileUpload"]').attachFile(product.image_url)
    cy.contains('button', 'Add Product').click()
  }

  static showsProductWithImage(productName: string) {
    cy.contains('div', productName)
    cy.wait(10000)
    cy.get('img').should('have.attr', 'src').and('not.be.empty')
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

  static updateProduct(properties: { productToUpdate: string; update: string }) {
    cy.contains('tr', properties.productToUpdate).within(() => {
      cy.get('#edit-button').click()
      cy.wait(2000)
      cy.get('input[name="productName"]').clear().type(properties.update)
    })
  }
}

export default ProductManagementDashboardTester
