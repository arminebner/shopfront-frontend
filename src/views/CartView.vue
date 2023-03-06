<template>
  <div class="container">
    <h1 class="text-center">Your Shopping Cart</h1>
    <shopping-cart-table
      :products="cartItems"
      @remove-from-cart="removeProductCartStore"
      @add-item-instance="addItemInstance"
    ></shopping-cart-table>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cartStore";
import ShoppingCartTable from "@/components/ShoppingCartTable.vue";
import { storeToRefs } from "pinia";
import type CartItem from "@/types/cartItem";

const store = useCartStore();
const { cartItems } = storeToRefs(store);

const removeProductCartStore = (id: string) => {
  store.deleteItem(id);
};

const addItemInstance = (cartItem: CartItem) => {
  store.addItem(cartItem);
};
</script>

<style scoped>
h1 {
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 20px;
}
</style>
