<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        <v-form ref="form" v-model="isFormValid">
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="name" :rules="ProductRules.name" label="Name" name="productName" clearable
                required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea v-model="shortDescription" :rules="ProductRules.shortDescription" label="ShortDescription"
                name="shortDescription" clearable required></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea v-model="description" :rules="ProductRules.description" label="Description" name="description"
                clearable required></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-select label="Category" name="category" :items="['Category1', 'Category2', 'Category3']"
                v-model="category"></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="quantity" :rules="ProductRules.quantity" label="Quantity" name="quantity" clearable
                required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="price" :rules="ProductRules.price" label="Price" prefix="$" name="productPrice"
                clearable required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn prepend-icon="mdi-plus" :disabled="!isFormValid" @click="sanitizeForm">{{ buttonAction }}</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col cols="12" md="4">
        <v-img v-if="preview" :src="preview" height="200px"></v-img>
        <v-row>
          <v-file-input name="fileUpload" accept="image/*" label="File input" @change="addFile"></v-file-input>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, type PropType } from "vue";
import customEncodeURIComponent from "@/utils/customUrlEncode";
import ProductRules from "../validation/productValidation";
import type Product from "@/types/product";

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
  },
  buttonAction: {
    type: String,
    required: true,
    default: "Default"
  }
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

const preview = ref(props.product ? props.product.image_url : "");
const isFormValid = ref(false);
const id = ref(props.product ? props.product.id : "")
const name = ref(props.product ? props.product.name : "");
const shortDescription = ref(props.product ? props.product.short_description : "");
const description = ref(props.product ? props.product.description : "");
const image = ref(props.product ? props.product.image_url : "");
const price = ref(props.product ? props.product.price : "");
const form: any = ref(null);
const category = ref(props.product ? props.product.category : "");
const quantity = ref(props.product ? props.product.quantity : "");

function addFile(event: any) {
  image.value = event.target.files[0];
  preview.value = URL.createObjectURL(event.target.files[0]);
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
