<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <img :src="product.image_url" :alt="product.name" style="max-width: 100%" />
        </v-col>
        <v-col cols="12" md="6">
          <h1>{{ product.name }}</h1>
          <p>{{ product.short_description }}</p>
          <p>{{ product.description }}</p>
          <p>Price: {{ product.price }}</p>
          <v-btn color="primary" @click="addToCart(product)">Add to Cart</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import type Product from "@/types/product";
import dataFetcher from "@/utils/dataFetcher";
import { useCartStore } from "@/stores/cartStore";

onBeforeMount(() => {
  const params = useRoute().params;
  const id = params.id as string;
  fetchProduct(id);
});

const cart = useCartStore();

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
<style scoped>
h1 {
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 20px;
}

p {
  font-size: 24px;
  text-align: center;
  margin-bottom: 50px;
}
</style>
