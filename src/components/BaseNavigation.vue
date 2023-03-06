<template>
  <div class="top-bar">
    <div class="top-bar-left">
      <h3>A Fullstack Project</h3>
    </div>
    <div class="top-bar-right">
      <div class="cart">
        <router-link to="/cart"> cart: {{ cartCount }} </router-link>
      </div>
      <div class="user">{{ userName }}</div>
      <button class="burger-menu" @click="showMenu = !showMenu">
        <span class="burger-menu-icon" :class="{ active: showMenu }">MENU</span>
      </button>
    </div>
    <transition name="menu-slide">
      <div class="menu" v-show="showMenu">
        <v-accordion>
          <v-accordion-item :key="1" :title="'Start'">
            <router-link to="/">Start</router-link>
          </v-accordion-item>
          <v-accordion-item :key="2" :title="'Shop'">
            <router-link to="/shop">Shop</router-link>
          </v-accordion-item>
          <v-accordion-item :key="3" :title="'Login'">
            <router-link to="/login">Login</router-link>
          </v-accordion-item>
          <v-accordion-item
            v-if="isSeller"
            :key="4"
            :title="'Product Management Dashboard'"
          >
            <router-link to="/productManagementDashboard"
              >Product Management Dashboard</router-link
            >
          </v-accordion-item>
          <v-accordion-item v-if="userName" :key="5" :title="'Logout'" @click="logoutUser"
            >Logout
          </v-accordion-item>
        </v-accordion>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, ref } from "vue";
import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores/cartStore";
import { useRouter } from "vue-router";
import { useTokenStore } from "@/stores/tokenStore";
import axios from "axios";

defineComponent({
  name: "BaseNavigation",
  components: {},
});

const router = useRouter();

const tokenStore = useTokenStore();
const showMenu = ref(false);
const { userName, isSeller } = storeToRefs(tokenStore);
const cartStore = useCartStore();
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
<style scoped>
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #333;
  color: #fff;
  padding: 10px;
}

.top-bar-left h3 {
  margin: 0;
}

.top-bar-right {
  display: flex;
  align-items: center;
}

.burger-menu {
  border: none;
  background: none;
  color: #fff;
  font-size: 24px;
  margin-right: 10px;
  cursor: pointer;
}

.burger-menu-icon {
  width: 20px;
  height: 20px;
  border-top: 2px solid #fff;
  transition: transform 0.2s ease-in-out;
}

.burger-menu-icon.active {
  transform: rotate(45deg);
}

.menu {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 50px;
  right: 0;
  background-color: #333;
  color: #fff;
  width: 100%;
}

.menu-slide-enter-active {
  animation: slide-down 0.3s ease-in-out;
}

.menu-slide-leave-active {
  animation: slide-up 0.3s ease-in-out;
}

@keyframes slide-down {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  0% {
    opacity: 1;
    transform: translateY(0);
  }

  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
}
</style>
