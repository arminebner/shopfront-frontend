<template>
  <div class="container">
    <h1>Product Management Dashboard</h1>
    <h2>Your Products</h2>
    <loading-spinner v-if="isLoading"></loading-spinner>
    <product-table
      v-else
      @update-product="fetchProducts"
      :user-id="userId"
      :products="products"
    ></product-table>
    <h2>Add Product</h2>
    <button class="add-product" @click="show = true">Add a new product</button>
    <div v-if="show">
      <div class="overlay" @click="show = false"></div>
      <div class="dialog">
        <div class="header">
          Add a new Product
          <button class="close" @click="show = false">X</button>
        </div>
        <div class="content">
          <product-form
            form-action="post"
            :user-id="userId"
            @product-submitted="fetchProducts"
          ></product-form>
        </div>
      </div>
    </div>
  </div>
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

const show = ref(false);
const tokenStore = useTokenStore();
const { userId } = storeToRefs(tokenStore);
const products = ref<Product[]>([]);
const isLoading = ref(false);
const errorMessage = ref("");

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
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 20px;
}

h2 {
  text-align: center;
}

.add-product {
  padding: 20px;
  border-radius: 5px;
  background-color: #0275ff;
  color: #fff;
  cursor: pointer;
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
</style>
