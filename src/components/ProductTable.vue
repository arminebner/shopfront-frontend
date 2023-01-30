<template>
  <h2>List of products</h2>
  <v-table fixed-header height="300px">
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Short description</th>
        <th class="text-left">Description</th>
        <th class="text-left">Image</th>
        <th class="text-left">Price</th>
        <th class="text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>
          <v-text-field
            v-if="editingProductId === product.id"
            v-model="name"
            name="productName"
            clearable
            required
          ></v-text-field>
          <div v-else>{{ product.name }}</div>
        </td>
        <td>
          <v-text-field
            v-if="editingProductId === product.id"
            v-model="shortDescription"
            name="shortDescription"
            clearable
            required
          ></v-text-field>
          <div v-else>
            {{ product.short_description }}
          </div>
        </td>
        <td>
          <v-text-field
            v-if="editingProductId === product.id"
            v-model="description"
            name="description"
            clearable
            required
          ></v-text-field>
          <div v-else>
            {{ product.description }}
          </div>
        </td>
        <td>
          <v-text-field
            v-if="editingProductId === product.id"
            v-model="image"
            name="productImage"
            clearable
            required
          ></v-text-field>
          <div v-else>
            {{ product.image_url }}
          </div>
        </td>
        <td>
          <v-text-field
            v-if="editingProductId === product.id"
            v-model="price"
            name="productPrice"
            clearable
            required
          ></v-text-field>
          <div v-else>
            {{ product.price }}
          </div>
        </td>
        <td>
          <div v-if="editingProductId === product.id">
            <v-btn
              id="save-button"
              prepend-icon="mdi-check"
              @click="validateForm"
            ></v-btn>
            <v-btn
              prepend-icon="mdi-alpha-x-box"
              @click="editingProductId = null"
            ></v-btn>
          </div>
          <div v-else>
            <v-btn
              id="edit-button"
              prepend-icon="mdi-file-edit"
              @click="editProduct(product)"
            ></v-btn>
            <v-btn
              id="delete-button"
              prepend-icon="mdi-delete"
              @click="emit('deleteProduct', product.id)"
            ></v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import { ref, type PropType } from "vue";
import type Product from "@/types/Product";

defineProps({
  products: {
    type: Array as PropType<Product[]>,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "deleteProduct", id: string): void;
  (e: "updateProduct", id: string, name: string, short_description: string, description: string, price: string, image: string): void;
}>();

const valid = ref<boolean>(true);
const id = ref<string>('')
const name = ref<string>("");
const shortDescription = ref<string>("");
const description = ref<string>("");
const image = ref<string>("");
const price = ref<string>("");
const editingProductId = ref<string | null>('')

const validateForm = () => {
  if (valid) {
    emit("updateProduct", id.value, name.value, shortDescription.value, description.value, price.value, image.value);
    editingProductId.value = null
  }
};

const editProduct = (product: Product) => {
  editingProductId.value = product.id
  id.value = product.id
  name.value = product.name
  shortDescription.value = product.short_description
  description.value = product.description
  image.value = product.image_url
  price.value = product.price
}
</script>
