<template>
  <div class="container">
    <div class="product-image" :style="{ backgroundImage: 'url(' + product.image_url + ')' }"></div>
    <h1>{{ product.name }}</h1>
    <p>{{ product.short_description }}</p>
    <p>{{ product.description }}</p>
    <p>Price: {{ product.price }}</p>
    <basic-button @click="addToCart(product)">Add to cart</basic-button>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { useRoute } from "vue-router";
import BasicButton from "@/components/BasicButton.vue";
import dataFetcher from "@/utils/dataFetcher";
import type Product from "@/types/product";

defineComponent({
  name: "SIngleProductView",
  components: { BasicButton },
});

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
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.product-image {
  height: 400px;
  width: 400px;
  background-position: center;
  background-size: cover;
}

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
