import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type CartItem from '@/types/cartItem'
import type Product from '@/types/product'

export const useCartStore = defineStore('cart', () => {
  const products = ref<CartItem[]>([])

  const addItem = (product: Product | CartItem) => {
    if (!products.value.find(p => p.id === product.id)) {
      products.value.push({ ...product, quantity: 1 })
    } else {
      const cartItem = products.value.find(p => p.id === product.id) as CartItem
      cartItem.quantity += 1
      const index = products.value.indexOf(cartItem)
      products.value.splice(index, 1, cartItem)
    }
  }

  const decreaseAmount = (product: CartItem) => {
    const cartItem = products.value.find(p => p.id === product.id) as CartItem
    if (cartItem.quantity > 1) {
      console.log(cartItem.quantity)
      cartItem.quantity -= 1
      console.log(cartItem.quantity)
      const index = products.value.indexOf(cartItem)
      console.log('hello')
      products.value.splice(index, 1, cartItem)
    } else {
      deleteItem(product)
    }
  }

  const deleteItem = (product: CartItem) => {
    const cartItem = products.value.find(p => p.id === product.id) as CartItem
    const index = products.value.indexOf(cartItem)
    products.value.splice(index, 1)
  }

  const productCount = computed(() => {
    return products.value.reduce((acc: any, cartItem: CartItem) => {
      return acc + cartItem.quantity
    }, 0)
  })

  return {
    products,
    productCount,
    addItem,
    deleteItem,
    decreaseAmount,
  }
})
