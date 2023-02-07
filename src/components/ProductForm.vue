<template>
  <v-form ref="form" v-model="isFormValid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="name"
            :rules="ProductRules.name"
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
            v-model="shortDescription"
            :rules="ProductRules.shortDescription"
            label="ShortDescription"
            name="shortDescription"
            clearable
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="description"
            :rules="ProductRules.description"
            label="Description"
            name="description"
            clearable
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="price"
            :rules="ProductRules.price"
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
          <v-file-input
            name="fileUpload"
            accept="image/*"
            label="File input"
            @change="addFile"
          ></v-file-input>
        </v-col>
      </v-row>
    </v-container>
    <v-btn prepend-icon="mdi-plus" :disabled="!isFormValid" @click="sanitizeForm"
      >Add Product</v-btn
    >
  </v-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ProductRules from "../validation/productValidation";

const emit = defineEmits<{
  (
    e: "formPayload",
    name: string,
    shortDescription: string,
    description: string,
    price: string,
    image: string
  ): void;
}>();

const isFormValid = ref<boolean>(false);
const name = ref<string>("");
const shortDescription = ref<string>("");
const description = ref<string>("");
const image = ref<string>("");
const price = ref<string>("");
const form: any = ref(null);

function customEncodeURIComponent(str: string) {
  return encodeURIComponent(str).replace(/%3A%20/g, ": ");
}

function addFile(event: any) {
  image.value = event.target.files[0];
}

const sanitizeForm = () => {
  if (isFormValid.value) {
    name.value = customEncodeURIComponent(name.value);
    price.value = customEncodeURIComponent(price.value);

    emit(
      "formPayload",
      name.value,
      shortDescription.value,
      description.value,
      price.value,
      image.value
    );

    form.value.reset();
  }
};
</script>
