<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="name"
            label="Name"
            name="productName"
            clearable
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="price"
            label="Price"
            prefix="$"
            name="productPrice"
            clearable
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="image"
            label="Image"
            name="productImage"
            clearable
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  <v-btn prepend-icon="mdi-plus" @click="validateForm">Add Product</v-btn>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "formPayload", name: string, price: string, image: string): void;
}>();

const valid = ref<boolean>(true);
const name = ref<string>("");
const image = ref<string>("");
const price = ref<string>("");

const validateForm = () => {
  if (valid) {
    emit("formPayload", name.value, price.value, image.value);
  }
};
</script>
