<template>
  <v-app>
    <v-container class="my-5">
      <h1>Products</h1>
      <p class="mb-10 text-center">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima ad nobis ab quae
        consequatur eius? Commodi repellendus iure id rem?
      </p>
      <v-select
        @update:model-value="fetchProducts($event)"
        label="Category"
        name="category"
        :items="['All', 'Category1', 'Category2', 'Category3']"
      ></v-select>
      <loading-spinner v-if="isLoading"></loading-spinner>
      <card-grid v-else :products="products"></card-grid>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import CardGrid from "@/components/CardGrid.vue";
import { onBeforeMount, ref } from "vue";
import dataFetcher from "@/utils/dataFetcher";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import type Product from "@/types/product";
import axios from "axios";

onBeforeMount(() => {
  fetchProducts("All");
});

const products = ref<Product[]>([]);
const isLoading = ref(false);

const fetchProducts = async (selectedValue: any) => {
  try {
    isLoading.value = true;
    const result = await axios.post(`http://localhost:5000/api/products/filtered`, {
      category: selectedValue,
    });
    products.value = result.data;
  } catch (error) {
    console.log(error);
  }
  isLoading.value = false;
};
</script>
<style scoped>
h1 {
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 20px;
}
</style>
