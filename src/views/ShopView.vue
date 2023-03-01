<template>
  <v-container class="my-5">
    <h1 class="mb-10 text-center">Shop!</h1>
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
    <v-select @update:model-value="fetchProducts($event)" label="Category" name="category"
      :items="['All', 'Category1', 'Category2', 'Category3']" v-model="category"></v-select>
    <loading-spinner v-if="isLoading"></loading-spinner>
    <card-grid v-else :products="products"></card-grid>
  </v-container>
</template>

<script setup lang="ts">
import CardGrid from "@/components/CardGrid.vue";
import { onBeforeMount, ref } from "vue";
import dataFetcher from "@/utils/dataFetcher";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import type Product from "@/types/product";

onBeforeMount(() => {
  fetchProducts("All");
});

const products = ref<Product[]>([]);
const isLoading = ref(false);
const category = ref("All");

const fetchProducts = async (selectedValue: any) => {
  try {
    isLoading.value = true;
    products.value = await dataFetcher(`products/category/${selectedValue}`);
  } catch (error) {
    console.log(error);
  }
  isLoading.value = false;
};
</script>
