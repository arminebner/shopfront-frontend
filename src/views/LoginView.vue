<template>
  <div class="container">
    <h1>Login</h1>
    <form-kit type="form" @submit="submitLogin">
      <form-kit type="email" label="Email" name="email" validation="required|email" />
      <form-kit
        type="password"
        label="Password"
        name="password"
        validation="required|length:8"
      />
    </form-kit>
    <p class="register-link">
      Don't have an account yet? Click
      <router-link to="/register">here</router-link> to register
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useTokenStore } from "@/stores/tokenStore";
import axios, { AxiosError } from "axios";
import jwt_decode from "jwt-decode";

defineComponent({
  name: "Login",
  components: {},
});

const router = useRouter();
const store = useTokenStore();
const errorMessage = ref("");

const submitLogin = async (data: any) => {
  try {
    const result = await axios.post(
      "http://localhost:5000/api/users/access",
      {
        email: data.email,
        password: data.password,
      },
      { withCredentials: true }
    );
    try {
      store.addToken(jwt_decode(result.data.accessToken));
    } catch (_) {}
    axios.defaults.headers.common["authorization"] = `Bearer ${result.data.accessToken}`;
    setTimeout(() => {
      router.push("/");
    }, 1000);
  } catch (e) {
    const error = e as AxiosError;
    const message = error.response?.data as string;
    errorMessage.value = message;
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 48px;
  font-weight: bold;
  margin-top: 50px;
  margin-bottom: 20px;
}

.register-link a {
  color: #0275ff;
}
</style>
