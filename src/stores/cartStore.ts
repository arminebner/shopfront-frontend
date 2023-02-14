import type Product from '@/types/product'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const products = ref<Product[]>([])

  const addItem = (product: Product) => products.value.push(product)

  const deleteItem = (id: string) => {
    products.value = products.value.filter(p => p.id !== id)
  }

  return {
    products,
    addItem,
    deleteItem,
  }
})
