<template>
  <table>
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
          <div
            class="product-image"
            :style="{ backgroundImage: 'url(' + product.image_url + ')' }"
          ></div>
        </td>
        <td>
          {{ product.price }}
        </td>
        <td>
          {{ product.quantity }}
        </td>
        <td>
          <v-btn class="button edit-button" @click="editProduct(product)"
            ><font-awesome-icon icon="fa-solid fa-pen-to-square"
          /></v-btn>
          <v-btn class="button delete-button" @click="deleteProduct(product.id)"
            ><font-awesome-icon icon="fa-solid fa-trash"
          /></v-btn>
        </td>
      </tr>
    </tbody>
  </table>
  <div v-if="popup.show">
    <div class="overlay" @click="popup.show = false"></div>
    <div class="dialog">
      <div class="header">
        Edit Product: {{ popup.payload.name }}
        <button class="close" @click="popup.show = false">X</button>
      </div>
      <div class="content">
        <product-form
          :product="popup.payload"
          form-action="put"
          :user-id="props.userId"
          @product-submitted="updateProduct"
        ></product-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from "vue";
import axios, { AxiosError } from "axios";
import ProductForm from "@/components/ProductForm.vue";
import type Product from "@/types/product";

const props = defineProps({
  products: {
    type: Array as PropType<Product[]>,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    default: "Default"
  },
});

const errorMessage = ref("");

const emit = defineEmits<{
  (e: "updateProduct"): void
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

const updateProduct = () => {
  emit('updateProduct')
  popup.value.show = false
}

const deleteProduct = async (id: string) => {
  try {
    await axios.delete(`http://localhost:5000/api/product/${id}`);
    emit('updateProduct')
  } catch (e) {
    const error = e as AxiosError;
    const message = error.response?.data as string;
    errorMessage.value = message;
  }
};
</script>
<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:last-child td {
  border-bottom: none;
}

.button {
  cursor: pointer;
}

.product-image {
  height: 50px;
  width: 100%;
  background-position: center;
  background-size: cover;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 400px;
  max-width: 90%;
  z-index: 1000;
  border-radius: 5px;
}

.header {
  background-color: #f5f5f5;
  padding: 10px;
  font-size: 1.2em;
  font-weight: bold;
}

.content {
  padding: 10px;
}

.close {
  position: absolute;
  top: 5px;
  right: 5px;
  border: none;
  background-color: transparent;
  font-size: 1.2em;
  cursor: pointer;
}

@media (max-width: 768px) {
  .product-image {
    display: none;
  }

  .button {
    display: block;
    margin-right: 0;
    margin-bottom: 8px;
  }
}
</style>
