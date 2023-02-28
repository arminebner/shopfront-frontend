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
      <v-list-item v-if="isSeller" to="/productManagementDashboard">
        <template v-slot:prepend>
          <v-icon icon="mdi-store-plus"></v-icon>
        </template>
        <v-list-item-title>Product Management Dashboard</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="userName" @click="logoutUser"> Logout </v-list-item>
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
      <v-btn prepend-icon="mdi-cart">{{ cartCount }}</v-btn>
    </router-link>
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useTheme } from "vuetify";
import type NavLink from "@/types/navLink";
import { useCartStore } from "@/stores/cartStore";
import axios from "axios";
import { useTokenStore } from "@/stores/tokenStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

defineComponent({
  name: "BaseNavigation",
  components: {},
});

const router = useRouter();

const tokenStore = useTokenStore();
const { userName, isSeller } = storeToRefs(tokenStore);
const cartStore = useCartStore();
const theme = useTheme();
const drawerOpen = ref(false);
const navLinks = <NavLink[]>[
  { title: "Start", route: "/", icon: "mdi-home" },
  { title: "Shop", route: "/shop", icon: "mdi-store" },
  { title: "Login", route: "/login", icon: "mdi-account" },
];

const toggleTheme = () =>
  (theme.global.name.value = theme.global.current.value.dark ? "light" : "dark");

const cartCount = computed(() => {
  return cartStore.products.length;
});

const logoutUser = async () => {
  try {
    const result = await axios("http://localhost:5000/api/users/logout", {
      withCredentials: true,
    });
    if (result.status === 204) {
      tokenStore.deleteToken();
      axios.defaults.headers.common["authorization"] = ``;
    }
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  } catch (_) {}
};
</script>
