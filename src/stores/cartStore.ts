import type CartItem from '@/types/cartItem'
import type Product from '@/types/product'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const products = ref<CartItem[]>([])

  const addItem = (product: Product) => {
    const uuid = crypto.randomUUID()
    products.value.push({ ...product, cartId: uuid, quantity: 1 })
  }

  const deleteItem = (cartId: string) => {
    products.value = products.value.filter(i => i.cartId !== cartId)
  }

  const cartItems = computed(() => {
    return bundleCartItems(products.value)
  })

  return {
    products,
    cartItems,
    addItem,
    deleteItem,
  }
})

function bundleCartItems(products: Product[]) {
  const quantityMap = new Map()
  const ids = products.map(p => p.id)

  ids.forEach(id => {
    if (quantityMap.has(id)) {
      let currentQuantity = quantityMap.get(id)
      currentQuantity.quantity += 1
      quantityMap.set(id, currentQuantity)
    } else {
      quantityMap.set(id, { quantity: 1 })
    }
  })

  const itemsWithQuantity = products.map(p => {
    const quantity = quantityMap.get(p.id).quantity
    return { ...p, quantity }
  })

  const result = <any>[]
  const keysArray = Array.from(quantityMap.keys())

  keysArray.forEach(mapItem => {
    const a = itemsWithQuantity.find(item => item.id === mapItem)
    result.push(a)
  })

  return result
}
