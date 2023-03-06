<template>
  <div class="top-bar">
    <div class="top-bar-left">
      <h3><router-link class="start-link" to="/"> A Fullstack Project</router-link></h3>
    </div>
    <div class="top-bar-right">
      <div class="user">{{ userName }}</div>
      <div class="cart">
        <router-link to="/cart"
          ><font-awesome-icon icon="fa-solid fa-cart-shopping" />{{ cartCount }}
        </router-link>
      </div>
      <button class="burger-menu" :class="{ active: isActive }" @click="activateMenu">
        <font-awesome-icon icon="fa-solid fa-bars" />
      </button>
    </div>
    <transition name="menu-slide">
      <div class="menu" v-show="showMenu">
        <div>
          <router-link to="/">Start</router-link>
        </div>
        <div>
          <router-link to="/shop">Shop</router-link>
        </div>
        <div>
          <router-link to="/login">Login</router-link>
        </div>
        <div v-if="isSeller">
          <router-link to="/productManagementDashboard"
            >Product Management Dashboard</router-link
          >
        </div>
        <div v-if="userName" :key="5" :title="'Logout'" @click="logoutUser">Logout</div>
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

const isActive = ref(false);
const tokenStore = useTokenStore();
const showMenu = ref(false);
const { userName, isSeller } = storeToRefs(tokenStore);
const cartStore = useCartStore();
const cartCount = computed(() => {
  return cartStore.products.length;
});

const activateMenu = () => {
  isActive.value = !isActive.value;
  showMenu.value = !showMenu.value;
};

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
    }, 500);
  } catch (_) {}
};
</script>
<style scoped>
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #0275ff;
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
  width: 100%;
}

.menu div {
  border-bottom: 1px solid #fff;
  padding: 5px 0 5px 0;
}

.menu a {
  text-decoration: none;
  color: #fff;
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
