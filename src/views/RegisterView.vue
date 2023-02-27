<template>
  Registration
  <v-form v-model="isFormValid">
    <v-text-field v-model="firstName" :rules="userRules.name" label="First Name" name="firstName" clearable
      required></v-text-field>
    <v-text-field v-model="lastName" :rules="userRules.name" label="Last Name" name="lastName" clearable
      required></v-text-field>
    <v-text-field label="E-mail" v-model="email" :rules="userRules.email"></v-text-field>
    <v-text-field v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'"
      name="password" label="Password" hint="At least 8 characters" counter @click:append="show = !show"></v-text-field>
    <v-text-field v-model="password2" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'"
      name="password2" label="Compare Password" hint="Please repeat your password again here" counter
      @click:append="show = !show"></v-text-field>
    <v-checkbox label="I want to register as a seller!" v-model="isSeller"></v-checkbox>
    <v-btn :disabled="!isFormValid" @click="submitRegistration">Register</v-btn>
  </v-form>
  <v-alert v-if="result" type="success">Registration sent successfully!</v-alert>
  <v-alert v-if="!comparePasswords" type="error">Passwords do not match!</v-alert>
</template>
<script setup lang="ts">
import { computed, defineComponent, ref } from "vue";
import axios, { AxiosError } from "axios";
import { useRouter } from "vue-router";
import userRules from "@/validation/userValidation";
import customEncodeURIComponent from "@/utils/customUrlEncode";

defineComponent({
  name: "Register",
  components: {},
});

const router = useRouter();

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const password2 = ref("");
const show = ref(false);
const result = ref("");
const errorMessage = ref("");
const isFormValid = ref(false);
const isSeller = ref(false);

const comparePasswords = computed(() => {
  return password.value === password2.value;
});

const submitRegistration = async () => {
  if (isFormValid.value) {
    firstName.value = customEncodeURIComponent(firstName.value);
    lastName.value = customEncodeURIComponent(lastName.value);
  }
  try {
    result.value = await axios.post("http://localhost:5000/api/users/register", {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      seller: isSeller.value,
    });
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  } catch (e) {
    const error = e as AxiosError;
    const message = error.response?.data as string;
    errorMessage.value = message;
  }
};
</script>
