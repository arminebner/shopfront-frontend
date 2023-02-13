import type Product from '@/types/product'
import { defineStore } from 'pinia'

export const cartStore = defineStore('cart', {
  state: () => ({
    cart: <Product[]>[],
  }),
  actions: {
    addItem(product: Product) {
      this.cart.push(product)
    },
    deleteItem(id: any) {
      this.cart = this.cart.filter(product => product.id !== id)
    },
    clear() {
      this.cart = []
    },
  },
})
