<template>
  <div class="product-list">
    <div v-for="product in products" :key="product.id" class="product-card">
      <div
        class="product-image"
        :style="{ backgroundImage: 'url(' + product.image_url + ')' }"
      ></div>
      <div class="product-details">
        <div class="product-name">{{ product.name }}</div>
        <div class="product-description">{{ product.short_description }}</div>
        <div class="product-price">{{ product.price }}</div>
        <div class="product-actions">
          <font-awesome-icon
            class="action"
            icon="fa-solid fa-cart-shopping"
            @click="addToCart(product)"
          />
          <router-link class="action link" :to="`/product/${product.id}`">
            <font-awesome-icon icon="fa-solid fa-circle-info" />
          </router-link>
        </div>
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
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}

.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 200px;
  width: 100%;
  max-width: 300px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
}

.product-details {
  padding: 16px;
}

.product-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.product-description {
  font-size: 1rem;
  margin-bottom: 8px;
}

.product-price {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.product-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.action {
  cursor: pointer;
}

.link {
  text-decoration: none;
  color: #4d4d4d;
}
</style>
