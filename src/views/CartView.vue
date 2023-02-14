<template>
  <h1>Your Shoppingcart</h1>
  <shopping-cart-table :products="cartItems" @remove-from-cart="removeProductCartStore"
    @add-item-instance="addItemInstance"></shopping-cart-table>
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

</style>
