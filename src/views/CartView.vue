<template>
  <h1>Your Shoppingcart</h1>
  <shopping-cart-table :products="products" @remove-from-cart="removeProductCartStore"></shopping-cart-table>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cartStore";
import { storeToRefs } from "pinia";
import ShoppingCartTable from "@/components/ShoppingCartTable.vue";

const store = useCartStore();
const { products } = storeToRefs(store);

const removeProductCartStore = (id: string) => {
  store.deleteItem(id);
};
</script>

<style scoped>

</style>
