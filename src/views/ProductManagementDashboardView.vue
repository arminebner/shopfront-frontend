<template>
  <h1>Product Management Dashboard</h1>
  <h2>Add Product</h2>
  <product-form @product-added="fetchProducts"></product-form>
  <h2>All Products</h2>
  <v-row v-if="isLoading"
    ><v-icon icon="mdi-loading" width="100px" class="mx-auto bg-red"></v-icon
  ></v-row>
  <card-grid v-else :products="products"></card-grid>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import dataFetcher from "@/utils/DataFetcher";
import CardGrid from "@/components/CardGrid.vue";
import ProductForm from "@/components/ProductForm.vue";

const products = ref([]);
const isLoading = ref(false);

onBeforeMount(() => {
  fetchProducts();
});

const fetchProducts = async () => {
  try {
    isLoading.value = true;
    products.value = await dataFetcher("products");
  } catch (error) {
    console.log(error);
  }
  isLoading.value = false;
};
</script>
