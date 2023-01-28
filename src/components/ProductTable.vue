<template>
  <h2>List of products</h2>
  <v-table fixed-header height="300px">
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Image</th>
        <th class="text-left">Price</th>
        <th class="text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.name }}</td>
        <td>{{ product.image_url }}</td>
        <td>{{ product.price }}</td>
        <td>
          <v-btn prepend-icon="mdi-file-edit"></v-btn>
          <v-btn
            id="delete-button"
            prepend-icon="mdi-delete"
            @click="emit('deleteProduct', product.id)"
          ></v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type Product from "@/types/Product";

defineProps({
  products: {
    type: Array as PropType<Product[]>,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "deleteProduct", id: string): void;
}>();
</script>
