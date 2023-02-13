<template>
  <v-navigation-drawer v-model="drawerOpen" temporary>
    <v-list nav density="compact">
      <v-list-item
        v-for="(link, i) in navLinks"
        :key="i"
        router
        :to="link.route"
        active-color="primary"
      >
        <template v-slot:prepend>
          <v-icon :icon="link.icon"></v-icon>
        </template>
        <v-list-item-title v-text="link.title"> </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar flat class="bg-primary">
    <v-app-bar-nav-icon @click="drawerOpen = !drawerOpen" />
    <v-app-bar-title>
      {{ $route.name }}
    </v-app-bar-title>
    <v-btn
      :prepend-icon="
        theme.global.name.value === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
      "
      @click="toggleTheme"
    >
    </v-btn>
    <router-link to="/cart">
      <v-btn prepend-icon="mdi-cart"></v-btn>
    </router-link>
  </v-app-bar>
</template>

<script setup lang="ts">
import { defineComponent, ref } from "vue";
import { useTheme } from "vuetify";
import type NavLink from "@/types/navLink";

defineComponent({
  name: "BaseNavigation",
  components: {},
});

const theme = useTheme();
const drawerOpen = ref(false);
const navLinks = <NavLink[]>[
  { title: "Start", route: "/", icon: "mdi-home" },
  { title: "Shop", route: "/shop", icon: "mdi-store" },
  { title: "Login", route: "/login", icon: "mdi-account" },
  {
    title: "Product Management",
    route: "/productManagementDashboard",
    icon: "mdi-store-plus",
  },
];

const toggleTheme = () =>
  (theme.global.name.value = theme.global.current.value.dark ? "light" : "dark");
</script>
