<template>
  <div class="container">
    <h1 class="text-center">Your Shopping Cart</h1>
    <shopping-cart-table
      :products="products"
      @remove-from-cart="removeProductCartStore"
      @increase-amount="increaseAmount"
      @decrease-amount="decreaseAmount"
    ></shopping-cart-table>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cartStore";
import ShoppingCartTable from "@/components/ShoppingCartTable.vue";
import { storeToRefs } from "pinia";
import type CartItem from "@/types/cartItem";
import type Product from "@/types/product";

const store = useCartStore();
const { products } = storeToRefs(store);

const removeProductCartStore = (product: CartItem) => {
  store.deleteItem(product);
};

const increaseAmount = (cartItem: CartItem) => {
  store.addItem(cartItem);
};

const decreaseAmount = (cartItem: CartItem) => {
  store.decreaseAmount(cartItem);
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 20px;
}
</style>
