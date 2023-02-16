import ProductManagementDashboardTester from '../testers/ProductManagementDashboardTester'
import type Product from '../../src/types/product'

function createProduct(date: number) {
  return <Product>{
    name: `Productname: ${date}`,
    short_description: 'Lorem ipsum dolor sit amet, consetetur sadipsc',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
    category: 'Category2',
    quantity: '3',
    price: '5.99',
    image_url: 'images/testImage.jpg',
  }
}

describe('The product management dashboard', () => {
  before(() => {})
  beforeEach(() => {
    cy.visit('/ProductManagementDashboard')
  })

  it('allows to add a new product', () => {
    const product = createProduct(Date.now())
    ProductManagementDashboardTester.addProduct(product)

    ProductManagementDashboardTester.showsProductWithImage(product.name)
  })

  it('shows an error when a product could not be added', () => {
    const product = createProduct(Date.now())
    ProductManagementDashboardTester.addProduct(product)

    ProductManagementDashboardTester.addProduct(product)

    ProductManagementDashboardTester.showsProductNameExistsError()
  })

  it('allows to delete a product', () => {
    const product = createProduct(Date.now())
    ProductManagementDashboardTester.addProduct(product)

    ProductManagementDashboardTester.deletesProduct(product.name)

    ProductManagementDashboardTester.doesNotShow(product.name)
  })

  xit('allows to update a product', () => {
    // Cypress overflow:hidden BUG (?)
    const product = createProduct(Date.now())
    ProductManagementDashboardTester.addProduct(product)

    ProductManagementDashboardTester.updateProduct({
      productToUpdate: product.name,
      update: `UPDATED_Product: ${Date.now()}`,
    })
  })
})
