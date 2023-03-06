<template>
  <div class="container">
    <div>
      <h1>Welcome to our Webshop</h1>
      <h1 v-if="currentUser">{{ userName }}</h1>
      <p>
        We offer a wide variety of products at great prices. Check out our selection
        below!
      </p>
      <router-link :to="`/shop`">Shop Now</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from "vue";
import { storeToRefs } from "pinia";
import { useTokenStore } from "@/stores/tokenStore";
import type User from "@/types/user";

defineComponent({
  name: "Start",
  components: {},
});

const currentUser = ref<User>({
  first_name: "",
  last_name: "",
  email: "",
});
const tokenStore = useTokenStore();
const { userName } = storeToRefs(tokenStore);
</script>
<style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.container {
  display: flex;
  justify-content: center;
  height: 100vh;
  margin: 20px;
  max-width: 1200px;
}
</style>
