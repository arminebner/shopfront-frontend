<template>
  <v-table fixed-header height="300px">
    <thead>
      <tr>
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
          <v-img width="100px" :src="product.image_url"></v-img>
        </td>
        <td>
          {{ product.name }}
        </td>
        <td>
          {{ product.short_description }}
        </td>
        <td>
          {{ product.price }}
        </td>
        <td>
          <v-btn id="delete-button" prepend-icon="mdi-delete" @click="removeFromCart(product.id)"></v-btn>
        </td>
      </tr>
      <tr v-if="products.length > 0">
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
import type Product from "@/types/product";

const props = defineProps({
  products: {
    type: Array as PropType<Product[]>,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "removeFromCart", id: string): void;
}>();

const totalAmount = computed(() => {
  const total = props.products.reduce((acc: any, product: Product) => {
    return acc + parseFloat(product.price)
  }, 0)
  return total.toFixed(2)
})

const startOrderingProcess = () => {
  console.log("started ordering process");
};

const removeFromCart = (id: string) => {
  emit("removeFromCart", id)
}
</script>
