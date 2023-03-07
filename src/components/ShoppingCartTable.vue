<template>
  <table>
    <thead>
      <tr>
        <th class="text-left caption" scope="col">Quantity</th>
        <th class="text-left caption" scope="col">Name</th>
        <th class="text-left caption" scope="col">Description</th>
        <th class="text-left caption" scope="col">Price</th>
        <th class="text-left caption" scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>
          {{ product.quantity }}
        </td>
        <td>
          <div class="subtitle-1">{{ product.name }}</div>
        </td>
        <td>
          <div class="caption">{{ product.short_description }}</div>
        </td>
        <td>
          <div class="subtitle-1">
            {{ (parseFloat(product.price) * product.quantity).toFixed(2) }}
          </div>
        </td>
        <td>
          <button @click="increaseAmount(product)">
            <font-awesome-icon icon="fa-solid fa-plus" />
          </button>
          <button @click="decreaseAmount(product)">
            <font-awesome-icon icon="fa-solid fa-minus" />
          </button>
          <button @click="removeFromCart(product)">
            <font-awesome-icon icon="fa-solid fa-trash" />
          </button>
        </td>
      </tr>
      <tr v-if="products.length > 0">
        <td></td>
        <td></td>
        <td></td>
        <td>
          <div class="subtitle-1 font-weight-bold">Total: {{ totalAmount }}</div>
        </td>
        <td>
          <basic-button @click="startOrderingProcess">Buy now!</basic-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { computed, defineComponent, type PropType } from "vue";
import BasicButton from "./BasicButton.vue";
import type CartItem from "@/types/cartItem";
import { ca } from "@formkit/i18n";

defineComponent({
  name: "ShoppingCartTable",
  components: { BasicButton },
});

const props = defineProps({
  products: {
    type: Array as PropType<CartItem[]>,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "removeFromCart", cartItem: CartItem): void;
  (e: "increaseAmount", cartItem: CartItem): void;
  (e: "decreaseAmount", cartItem: CartItem): void
}>();

const totalAmount = computed(() => {
  const total = props.products.reduce((acc: any, product: CartItem) => {
    return acc + (parseFloat(product.price) * product.quantity)
  }, 0)
  return total.toFixed(2)
})

const startOrderingProcess = () => {
  console.log("started ordering process");
};

const removeFromCart = (cartItem: CartItem) => {
  emit("removeFromCart", cartItem)
}

const increaseAmount = (cartItem: CartItem) => {
  emit("increaseAmount", cartItem)
}
const decreaseAmount = (cartItem: CartItem) => {
  emit("decreaseAmount", cartItem)
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:last-child td {
  border-bottom: none;
}
</style>
