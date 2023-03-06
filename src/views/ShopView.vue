<template>
  <div class="container">
    <h1>Products</h1>
    <p class="mb-10 text-center">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima ad nobis ab quae
      consequatur eius? Commodi repellendus iure id rem?
    </p>
    <form-kit
      type="select"
      @change="fetchProducts($event)"
      label="Category"
      name="category"
      :options="['All', 'Category1', 'Category2', 'Category3']"
    />
    <loading-spinner v-if="isLoading"></loading-spinner>
    <card-grid v-else :products="products"></card-grid>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import axios from "axios";
import CardGrid from "@/components/CardGrid.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import type Product from "@/types/product";

onBeforeMount(() => {
  fetchProducts("_");
});

const products = ref<Product[]>([]);
const isLoading = ref(false);

const fetchProducts = async (event: any) => {
  const query = event.target ? event.target.value : "All";
  try {
    isLoading.value = true;
    const result = await axios.post(`http://localhost:5000/api/products/filtered`, {
      category: query,
    });
    products.value = result.data;
  } catch (error) {
    console.log(error);
  }
  isLoading.value = false;
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 75%;
  margin: 0 auto;
}

h1 {
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 20px;
}
</style>
