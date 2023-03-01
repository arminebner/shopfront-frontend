<template>
  <v-container class="my-5">
    <h1 v-if="currentUser" class="mb-10 text-center">Welcome {{ userName }}!</h1>
    <h1 v-else class="mb-10 text-center">Welcome!</h1>
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
    <router-link :to="`/shop`">SHOP</router-link>
  </v-container>
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
