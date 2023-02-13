<template>
  <h1>Your Shoppingcart</h1>
  <shopping-cart-table :products="cart" @remove-from-cart="removeProductCartStore"></shopping-cart-table>
</template>

<script setup lang="ts">
import { cartStore } from "@/stores/cartStore";
import { storeToRefs } from "pinia";
import ShoppingCartTable from "@/components/ShoppingCartTable.vue";

const store = cartStore();
const { cart } = storeToRefs(store);

const removeProductCartStore = (id: any) => {
  store.deleteItem(id);
};
</script>

<style scoped>

</style>
