<template>
  <v-container class="my-5">
    <h1 class="mb-10 text-center">Welcome to Amandarando!</h1>
    <p class="mb-10 text-center">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima ad nobis ab quae
      consequatur eius? Commodi repellendus iure id rem?
    </p>
    <p class="ml-7">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui expedita provident
      nulla minima eius eveniet ut tenetur nam impedit reprehenderit eaque quidem quos
      adipisci recusandae laudantium maiores, quod repudiandae. Architecto, nihil ex
      accusamus sapiente laborum quis illo sit recusandae ipsam quam facere consequuntur
      eos saepe, assumenda soluta? Enim, alias vero?
    </p>
    <v-row v-if="isLoading"
      ><v-icon icon="mdi-loading" width="100px" class="mx-auto bg-red"></v-icon
    ></v-row>
    <card-grid v-else :products="products"></card-grid>
  </v-container>
</template>

<script setup lang="ts">
import CardGrid from "@/components/CardGrid.vue";
import { onBeforeMount, ref } from "vue";
import dataFetcher from "@/utils/dataFetcher";
import type Product from "@/types/product";

onBeforeMount(() => {
  fetchProducts();
});

const products = ref<Product[]>([]);
const isLoading = ref(false);

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
