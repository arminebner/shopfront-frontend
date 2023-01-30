<template>
  <h1>Product Management Dashboard</h1>
  <h2>Add Product</h2>
  <product-form @form-payload="submitForm"></product-form>
  <v-alert v-if="errorMessage" type="error"> {{ errorMessage }}</v-alert>
  <h2>All Products</h2>
  <v-row v-if="isLoading"
    ><v-icon icon="mdi-loading" width="100px" class="mx-auto bg-red"></v-icon
  ></v-row>
  <product-table
    v-else
    @delete-product="deleteProduct"
    @update-product="updateProduct"
    :products="products"
  ></product-table>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import axios, { AxiosError } from "axios";
import dataFetcher from "@/utils/DataFetcher";
import ProductForm from "@/components/ProductForm.vue";
import ProductTable from "@/components/ProductTable.vue";
import type Product from "@/types/Product";

const products = ref<Product[]>([]);
const isLoading = ref(false);
const errorMessage = ref<string>("");

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

const submitForm = async (
  name: string,
  shortDescription: string,
  description: string,
  price: string,
  image: string
) => {
  try {
    await axios.post("http://localhost:5000/api/product", {
      name,
      short_description: shortDescription,
      description,
      price,
      image_url: image,
    });
    fetchProducts();
  } catch (e) {
    const error = e as AxiosError;
    const message = error.response?.data as string;
    errorMessage.value = message;
  }
};

const deleteProduct = async (id: string) => {
  try {
    await axios.delete(`http://localhost:5000/api/product/${id}`);
    products.value = products.value.filter((product) => product.id !== id);
  } catch (e) {
    const error = e as AxiosError;
    const message = error.response?.data as string;
    errorMessage.value = message;
  }
};

const updateProduct = async (
  id: string,
  name: string,
  shortDescription: string,
  description: string,
  price: string,
  image: string
) => {
  try {
    await axios.put(`http://localhost:5000/api/product`, {
      id,
      name,
      short_description: shortDescription,
      description,
      price,
      image_url: image,
    });
    fetchProducts();
  } catch (e) {
    const error = e as AxiosError;
    const message = error.response?.data as string;
    errorMessage.value = message;
  }
};
</script>
