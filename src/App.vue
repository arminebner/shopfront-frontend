<template>
  <v-app>
    <base-navigation />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import BaseNavigation from "./components/BaseNavigation.vue";
</script>

<style scoped></style>
