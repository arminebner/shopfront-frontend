<template>
  <table>
    <thead>
      <tr>
        <th class="text-left caption" scope="col">Quantity</th>
        <th class="text-left caption" scope="col">Name</th>
        <th class="text-left caption" scope="col">Description</th>
        <th class="text-left caption" scope="col">Price</th>
        <th class="text-left caption" scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>
          <v-row align="center" justify="space-between">
            <div>{{ product.quantity }}</div>
            <div>
              <v-btn icon @click="addItemInstance(product)">
                <v-icon>mdi-menu-up</v-icon>
              </v-btn>
              <v-btn icon @click="removeFromCart(product.cartId)">
                <v-icon>mdi-menu-down</v-icon>
              </v-btn>
            </div>
          </v-row>
        </td>
        <td>
          <div class="subtitle-1">{{ product.name }}</div>
        </td>
        <td>
          <div class="caption">{{ product.short_description }}</div>
        </td>
        <td>
          <div class="subtitle-1">
            {{ (parseFloat(product.price) * product.quantity).toFixed(2) }}
          </div>
        </td>
        <td>
          <v-btn icon @click="removeFromCart(product.cartId)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </td>
      </tr>
      <tr v-if="products.length > 0">
        <td></td>
        <td></td>
        <td></td>
        <td>
          <div class="subtitle-1 font-weight-bold">Total: {{ totalAmount }}</div>
        </td>
        <td>
          <v-btn block @click="startOrderingProcess">Buy now!</v-btn>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { computed, type PropType } from "vue";
import type CartItem from "@/types/cartItem";

const props = defineProps({
  products: {
    type: Array as PropType<CartItem[]>,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "removeFromCart", cartId: string): void;
  (e: "addItemInstance", cartItem: CartItem): void;
}>();

const totalAmount = computed(() => {
  const total = props.products.reduce((acc: any, product: CartItem) => {
    return acc + (parseFloat(product.price) * product.quantity)
  }, 0)
  return total.toFixed(2)
})

const startOrderingProcess = () => {
  console.log("started ordering process");
};

const removeFromCart = (cartId: string) => {
  emit("removeFromCart", cartId)
}

const addItemInstance = (cartItem: CartItem) => {
  emit("addItemInstance", cartItem)
}
</script>

<style scoped>
@media only screen and (max-width: 600px) {
  .caption {
    font-size: 12px !important;
  }

  .subtitle-1 {
    font-size: 14px !important;
  }
}
</style>
