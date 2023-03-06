<template>
  <div class="container">
    <h1>Registration</h1>
    <form-kit type="form" @submit="submitRegistration">
      <form-kit type="text" label="First Name" name="firstName" validation="required" />
      <form-kit type="text" label="Last Name" name="lastName" validation="required" />
      <form-kit type="email" label="Email" name="email" validation="required|email" />
      <form-kit
        type="password"
        label="Password"
        name="password"
        validation="required|length:8"
      />
      <form-kit
        type="password"
        label="Confirm Password"
        name="password_confirm"
        validation="required|confirm"
      />
      <form-kit type="checkbox" label="Register as seller?" name="isSeller" />
    </form-kit>
    <p class="login-link">
      Already have an account? Back to <router-link to="/login">login</router-link>
    </p>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import axios, { AxiosError } from "axios";

defineComponent({
  name: "Register",
  components: {},
});

const router = useRouter();
const errorMessage = ref("");

const submitRegistration = async (data: any) => {
  try {
    await axios.post("http://localhost:5000/api/users/register", {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      seller: data.isSeller,
    });
    // TODO add toast message
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  } catch (e) {
    const error = e as AxiosError;
    const message = error.response?.data as string;
    // TODO add toast message
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
  text-align: center;
  margin-top: 50px;
  margin-bottom: 20px;
}

.login-link a {
  text-decoration: none;
  color: #0275ff;
}
</style>
