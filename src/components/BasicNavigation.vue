<template>
  <div class="top-bar">
    <div class="top-bar-left">
      <h3>
        <router-link @click="showMenu = false" class="start-link" to="/">
          A Fullstack Project</router-link
        >
      </h3>
    </div>
    <div class="top-bar-right">
      <div class="user">{{ userName }}</div>
      <div class="cart">
        <router-link @click="showMenu = false" to="/cart"
          ><font-awesome-icon icon="fa-solid fa-cart-shopping" />{{ cartCount }}
        </router-link>
      </div>
      <button
        class="burger-menu"
        :class="{ active: showMenu }"
        @click="showMenu = !showMenu"
      >
        <font-awesome-icon icon="fa-solid fa-bars" />
      </button>
    </div>
    <transition name="menu-slide">
      <div class="menu" v-show="showMenu">
        <div>
          <router-link class="link" @click="showMenu = false" to="/">Start</router-link>
        </div>
        <div>
          <router-link class="link" @click="showMenu = false" to="/shop"
            >Shop</router-link
          >
        </div>
        <div>
          <router-link class="link" @click="showMenu = false" to="/login"
            >Login</router-link
          >
        </div>
        <div v-if="isSeller">
          <router-link
            class="link"
            @click="showMenu = false"
            to="/productManagementDashboard"
            >Product Management Dashboard</router-link
          >
        </div>
        <div v-if="userName" class="link" @click="logoutUser">Logout</div>
      </div>
    </transition>
  </div>
  <div v-show="showMenu" class="overlay" @click="showMenu = false"></div>
</template>

<script setup lang="ts">
import { computed, defineComponent, ref } from "vue";
import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores/cartStore";
import { useRouter } from "vue-router";
import { useTokenStore } from "@/stores/tokenStore";
import axios from "axios";

defineComponent({
  name: "BasicNavigation",
  components: {},
});

const router = useRouter();

const tokenStore = useTokenStore();
const showMenu = ref(false);
const { userName, isSeller } = storeToRefs(tokenStore);
const cartStore = useCartStore();
const cartCount = computed(() => {
  return cartStore.productCount;
});

const logoutUser = async () => {
  showMenu.value = false;
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
    }, 500);
  } catch (_) {}
};
</script>
<style scoped>
.top-bar {
  position: sticky;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #0275ff;
  color: #fff;
  padding: 10px;
  z-index: 1000 !important;
}

.top-bar-left h3 {
  margin: 0;
}

.top-bar-right {
  display: flex;
  align-items: center;
}

.start-link {
  text-decoration: none;
  color: #fff;
}

.cart {
  padding: 15px;
}

.user {
  padding: 5px;
}

.burger-menu {
  border: none;
  background: none;
  color: #fff;
  font-size: 24px;
  margin-right: 10px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.burger-menu.active {
  transform: rotate(90deg);
}

.cart a {
  color: #fff;
  text-decoration: none;
}

.menu {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 150px !important;
  top: 75px;
  right: 0;
  background-color: #0275ff;
  color: #fff;
  z-index: 1000;
}

.menu div {
  border-bottom: 1px solid #fff;
  padding: 5px 0 5px 0;
}

.link {
  display: block;
  padding-left: 1rem;
  text-decoration: none;
  color: #fff;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
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
