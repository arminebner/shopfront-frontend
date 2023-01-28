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
  static showsError() {
    cy.contains('div', 'This product name is already taken.')
  }
}

export default ProductManagementDashboardTester
