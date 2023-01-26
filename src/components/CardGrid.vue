<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" sm="4" lg="3" xl="2" v-for="product in products" :key="product.id">
        <v-card flat class="bg-primary text-center ma-3">
          <v-card-item>
            <v-card-title class="mb-2">{{ product.name }}</v-card-title>
            <v-img :src="`${product.image}/200?image=${product.id * 5 + 10}`"></v-img>
            <v-card-text
              >Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
              facere?</v-card-text
            >
            <v-card-actions class="d-flex justify-space-between">
              <v-btn variant="outlined" prepend-icon="mdi-cart-arrow-down">Add</v-btn>
              <router-link :to="`/product/${product.id}`">
                <v-btn variant="outlined" prepend-icon="mdi-information-outline"
                  >Info</v-btn
                >
              </router-link>
            </v-card-actions>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type Product from "@/types/Product";

defineProps({
  products: {
    type: Array as PropType<Product[]>,
    required: true,
  },
});
</script>
