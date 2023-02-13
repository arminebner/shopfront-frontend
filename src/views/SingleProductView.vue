<template>
  <v-card class="mx-auto" max-width="344">
    <v-img :src="product.image_url" aspect-ratio="1"></v-img>
    <v-card-title class="font-weight-light">{{ product.name }}</v-card-title>
    <v-card-subtitle class="font-weight-light">{{ product.price }}</v-card-subtitle>
    <v-card-actions>
      <v-btn color="primary" @click="addToCart(product)">Add to Cart</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import type Product from "@/types/product";
import dataFetcher from "@/utils/dataFetcher";
import { cartStore } from "@/stores/cartStore";

onBeforeMount(() => {
  const params = useRoute().params;
  const id = params.id as string;
  fetchProduct(id);
});

const cart = cartStore();

const product = ref<Product>({
  name: "placeholder",
  price: "0",
  image_url: "placeholder",
  id: "1",
  short_description: "",
  description: "",
});

const fetchProduct = async (id: string) => {
  try {
    product.value = await dataFetcher(`product/${id}`);
  } catch (error) {
    console.log(error);
  }
};

const addToCart = (product: Product) => {
  cart.addItem(product);
};
</script>
