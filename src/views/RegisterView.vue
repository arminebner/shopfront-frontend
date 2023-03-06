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
  </div>
</template>
<script setup lang="ts">
import { defineComponent, ref } from "vue";
import axios, { AxiosError } from "axios";
import { useRouter } from "vue-router";

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
    }, 1500);
  } catch (e) {
    const error = e as AxiosError;
    const message = error.response?.data as string;
    // TODO add toast message
    errorMessage.value = message;
  }
};
</script>
<style scoped>
h1 {
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 20px;
}
</style>
