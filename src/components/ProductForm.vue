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
          <v-select
            label="Category"
            name="category"
            :items="['Category1', 'Category2', 'Category3']"
            v-model="category"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="quantity"
            :rules="ProductRules.quantity"
            label="Quantity"
            name="quantity"
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
import type Product from "@/types/product";
import { ref, type PropType } from "vue";
import ProductRules from "../validation/productValidation";

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    default: "",
  },
});

const emit = defineEmits<{
  (
    e: "formPayload",
    id: string,
    name: string,
    shortDescription: string,
    description: string,
    category: string,
    quantity: string,
    price: string,
    image: string
  ): void;
}>();

const isFormValid = ref<boolean>(false);
const id = ref<string>(props.product.id)
const name = ref<string>(props.product.name);
const shortDescription = ref<string>(props.product.short_description);
const description = ref<string>(props.product.description);
const image = ref<string>(props.product.image_url);
const price = ref<string>(props.product.price);
const form: any = ref(null);
const category = ref(props.product.category);
const quantity = ref(props.product.quantity);

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
      id.value,
      name.value,
      shortDescription.value,
      description.value,
      category.value,
      quantity.value,
      price.value,
      image.value
    );

    form.value.reset();
  }
};
</script>
