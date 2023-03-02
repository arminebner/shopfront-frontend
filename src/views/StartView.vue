<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <h1>Welcome to our Webshop</h1>
          <h1 v-if="currentUser" class="mb-10 text-center">{{ userName }}</h1>
          <p>
            We offer a wide variety of products at great prices. Check out our selection
            below!
          </p>
          <router-link :to="`/shop`">Shop Now</router-link>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
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
