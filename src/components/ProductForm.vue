<template>
  <v-form ref="form" v-model="isFormValid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="name"
            :rules="nameRules"
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
            :rules="shortDescriptionRules"
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
            :rules="descriptionRules"
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
            :rules="priceRules"
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
    <v-btn prepend-icon="mdi-plus" :disabled="!isFormValid" @click="sanitizeForm"
      >Add Product</v-btn
    >
  </v-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ProductRules from "../validation/product.validation";

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

const nameRules = ProductRules.name;
const shortDescriptionRules = ProductRules.shortDescription;
const descriptionRules = ProductRules.description;
const priceRules = ProductRules.price;

function customEncodeURIComponent(str: string) {
  return encodeURIComponent(str).replace(/%3A%20/g, ": ");
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
