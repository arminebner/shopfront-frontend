import ProductManagementDashboardTester from '../testers/ProductManagementDashboardTester'
import type Product from '../../src/types/Product'

function createProduct(date: number) {
  return <Product>{
    name: `Productname: ${date}`,
    short_description: 'Lorem ipsum dolor sit amet, consetetur sadipsc',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
    price: '5',
    image_url: 'https://picsum.photos/200',
  }
}

describe('The product management dashboard', () => {
  beforeEach(() => {
    cy.visit('/ProductManagementDashboard')
  })

  it('allows to add a new product', () => {
    const product = createProduct(Date.now())
    ProductManagementDashboardTester.addProduct(product)

    ProductManagementDashboardTester.showsProduct(product.name)
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
