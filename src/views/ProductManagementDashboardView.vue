<template>
  <h1>Product Management Dashboard</h1>
  <h2>Add Product</h2>
  <product-form button-action="Add Product" form-action="post" :user-id="userId"
    @product-submitted="fetchProducts"></product-form>
  <v-alert v-if="errorMessage" type="error"> {{ errorMessage }}</v-alert>
  <h2>Your Products</h2>
  <loading-spinner v-if="isLoading"></loading-spinner>
  <product-table v-else @update-product="fetchProducts" :user-id="userId" :products="products"></product-table>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { storeToRefs } from "pinia";
import { useTokenStore } from "@/stores/tokenStore";
import axios, { AxiosError } from "axios";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ProductForm from "@/components/ProductForm.vue";
import ProductTable from "@/components/ProductTable.vue";
import type Product from "@/types/product";

const tokenStore = useTokenStore();
const { userId } = storeToRefs(tokenStore);
const products = ref<Product[]>([]);
const isLoading = ref(false);
const errorMessage = ref("");
const product = ref({
  id: "",
  name: "",
  short_description: "",
  description: "",
  category: "",
  quantity: "",
  price: "",
  image_url: "",
});

onBeforeMount(() => {
  fetchProducts();
});

const fetchProducts = async () => {
  try {
    isLoading.value = true;
    const result = await axios.post(`http://localhost:5000/api/products/filtered`, {
      userId: userId.value,
    });
    products.value = result.data;
  } catch (error) {
    console.log(error);
  }
  isLoading.value = false;
};
</script>
