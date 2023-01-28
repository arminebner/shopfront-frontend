import ProductManagementDashboardTester from '../testers/ProductManagementDashboardTester'
import type Product from '../../src/types/Product'

function createProduct(date: number) {
  return <Product>{
    name: `Productname: ${date}`,
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

    ProductManagementDashboardTester.showsError()
  })
})
