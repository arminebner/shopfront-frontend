<template>
  <v-table fixed-header height="300px">
    <thead>
      <tr>
        <th class="text-left">Quantity</th>
        <th class="text-left">Image</th>
        <th class="text-left">Name</th>
        <th class="text-left">Short description</th>
        <th class="text-left">Price</th>
        <th class="text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>
          <v-row>
            {{ product.quantity }}
            <div>
              <v-btn prepend-icon="mdi-menu-up" @click="addItemInstance(product)"></v-btn>
              <v-btn prepend-icon="mdi-menu-down" @click="removeFromCart(product.cartId)"></v-btn>
            </div>
          </v-row>
        </td>
        <td>
          <v-img width="100px" :src="product.image_url"></v-img>
        </td>
        <td>
          {{ product.name }}
        </td>
        <td>
          {{ product.short_description }}
        </td>
        <td>
          {{ (parseFloat(product.price) * product.quantity).toFixed(2) }}
        </td>
        <td>
          <v-btn id="delete-button" prepend-icon="mdi-delete" @click="removeFromCart(product.cartId)"></v-btn>
        </td>
      </tr>
      <tr v-if="products.length > 0">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>Total: {{ totalAmount }}</td>
        <v-btn @click="startOrderingProcess">Buy now!</v-btn>
        <td></td>
      </tr>
    </tbody>
  </v-table>
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
