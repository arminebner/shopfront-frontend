<template>
  <v-table fixed-header height="300px">
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Short description</th>
        <th class="text-left">Description</th>
        <th class="text-left">Category</th>
        <th class="text-left">Image</th>
        <th class="text-left">Price</th>
        <th class="text-left">Quantity</th>
        <th class="text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>
          {{ product.name }}
        </td>
        <td>
          {{ product.short_description }}
        </td>
        <td>
          {{ product.description }}
        </td>
        <td>
          {{ product.category }}
        </td>
        <td>
          <v-img width="100px" :src="product.image_url"></v-img>
        </td>
        <td>
          {{ product.price }}
        </td>
        <td>
          {{ product.quantity }}
        </td>
        <td>
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
        </td>
      </tr>
    </tbody>
  </v-table>
  <v-dialog v-model="popup.show">
    <v-card>
      <v-card-title>
        Edit Product: {{ popup.payload.name }}
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <product-form
          :product="popup.payload"
          @form-payload="updateProduct"
        ></product-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon color="grey darken-1" @click="popup.show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, type PropType } from "vue";
import type Product from "@/types/product";
import ProductForm from "@/components/ProductForm.vue";


defineProps({
  products: {
    type: Array as PropType<Product[]>,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "deleteProduct", id: string): void;
  (e: "updateProduct", id: string, name: string, short_description: string, description: string, category: string, quantity: string, price: string, image: string): void;
}>();

const popup = ref({
  show: false,
  payload: {
    id: "",
    name: "",
    short_description: "",
    description: "",
    category: "",
    quantity: "",
    price: "",
    image_url: ""
  }
})

const editProduct = (product: Product) => {
  popup.value.payload.id = product.id
  popup.value.payload.name = product.name
  popup.value.payload.short_description = product.short_description
  popup.value.payload.description = product.description
  popup.value.payload.category = product.category
  popup.value.payload.quantity = product.quantity
  popup.value.payload.price = product.price
  popup.value.payload.image_url = product.image_url
  popup.value.show = true
}

const updateProduct = (
  id: string,
  name: string,
  shortDescription: string,
  description: string,
  category: string,
  quantity: string,
  price: string,
  image: string) => {
  emit('updateProduct',
    id, name, shortDescription, description, category, quantity, price, image)
  popup.value.show = false
}
</script>
