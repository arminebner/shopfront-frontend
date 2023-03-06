<template>
  <div class="product-grid-container">
    <div v-for="product in products" :key="product.id" class="product-grid-item">
      <h2 class="product-name">{{ product.name }}</h2>
      <img :src="product.image_url" class="product-image" alt="" />
      <p class="product-description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, facere?
      </p>
      <div class="product-actions">
        <button class="add-to-cart-button" @click="addToCart(product)">
          <span>Add to Cart</span>
        </button>
        <router-link :to="`/product/${product.id}`" class="info-button">
          <span>Info</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type Product from "@/types/product";
import { useCartStore } from "@/stores/cartStore";

defineProps({
  products: {
    type: Array as PropType<Product[]>,
    required: true,
  },
});

const store = useCartStore();

const addToCart = (product: Product) => {
  store.addItem(product);
};
</script>

<style scoped>
.product-grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 1rem;
  margin: 0 -0.5rem;
}

.product-grid-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #1976d2;
  color: #fff;
  padding: 1rem;
  box-sizing: border-box;
  height: 100%;
}

.product-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
}

.product-image {
  max-width: 100%;
  height: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.product-description {
  margin: 0;
}

.product-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.add-to-cart-button {
  display: flex;
  align-items: center;
  background-color: #fff;
  color: #1976d2;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  text-transform: uppercase;
  cursor: pointer;
}

.info-button {
  display: flex;
  align-items: center;
  background-color: transparent;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  text-transform: uppercase;
  text-decoration: none;
}

@media (max-width: 599px) {
  .product-grid-container {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  }

  .product-name {
    font-size: 1rem;
  }

  .product-image {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .product-description {
    font-size: 0.8rem;
  }
}
</style>
