<template>
  <v-form>
    <v-text-field label="E-mail" v-model="email"></v-text-field>
    <v-text-field v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'"
      name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show = !show"></v-text-field>
    <v-btn @click="submitLogin">Login</v-btn>
  </v-form>
  <router-link to="/register">Don't have an account yet? Click here to register</router-link>
  <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
</template>

<script setup lang="ts">
import { useTokenStore } from "@/stores/tokenStore";
import axios, { AxiosError } from "axios";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

defineComponent({
  name: "Login",
  components: {},
});

const router = useRouter();
const store = useTokenStore();

const email = ref("");
const password = ref("");
const show = ref(false);
const errorMessage = ref("");

const submitLogin = async () => {
  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/users/access",
      {
        email: email.value,
        password: password.value,
      },
      { withCredentials: true }
    );
    store.addToken(data.accessToken);
    axios.defaults.headers.common["authorization"] = `Bearer ${data.accessToken}`;
    setTimeout(() => {
      router.push("/");
    }, 1500);
  } catch (e) {
    const error = e as AxiosError;
    const message = error.response?.data as string;
    errorMessage.value = message;
  }
};
</script>
