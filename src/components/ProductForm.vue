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
  <v-btn prepend-icon="mdi-plus" @click="submitForm">Add Product</v-btn>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";

const emit = defineEmits<{
  (e: "product-added"): void;
}>();

const valid = ref<boolean>(false);
const name = ref<string>("");
const image = ref<string>("");
const price = ref<string>("");

const submitForm = async () => {
  try {
    await axios.post("http://localhost:5000/api/product", {
      name: name.value,
      price: price.value,
      image_url: image.value,
    });
    emit("product-added");
  } catch (error) {
    console.log(error);
  }
};
</script>
