<template>
  <div class="container">
    <form-kit type="form" :value="formData" @submit="submit">
      <form-kit type="text" label="Product name" name="name" validation="required" />
      <form-kit type="textarea" label="Short description" name="shortDescription" rows="2" validation="required" />
      <form-kit type="textarea" label="Description" name="description" rows="10" validation="required" />
      <form-kit type="select" label="Select the category" name="category" placeholder="Select a category"
        :options="['Category1', 'Category2', 'Category3']" />
      <form-kit type="number" label="Quantity" name="quantity" validation="required" />
      <form-kit type="text" label="Price" name="price" validation="required|matches:/^\d+\.\d+?$/" />
      <form-kit type="file" label="Productmage" name="productImage" accept=".jpeg,.jpg,.png"
        help="Select a product image." multiple="false" validation="required" />
    </form-kit>
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from "vue";
import type Product from "@/types/product";
import axios, { AxiosError } from "axios";

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
  },
  userId: {
    type: String,
    required: true,
    default: "Default"
  },
  formAction: {
    type: String,
    required: true,
    default: 'post'
  }
});

const emit = defineEmits<{
  (e: "product-submitted"): void;
}>();

const id = ref(props.product ? props.product.id : '')
const errorMessage = ref("")
const formData = ref({
  name: props.product ? props.product.name : '',
  shortDescription: props.product ? props.product.short_description : '',
  description: props.product ? props.product.description : '',
  category: props.product ? props.product.category : '',
  quantity: props.product ? props.product.quantity : '',
  price: props.product ? props.product.price : '',
})

const submit = async (data: any) => {
  if (props.formAction === 'post') {
    try {
      await axios.post(
        "http://localhost:5000/api/product",
        {
          id: id.value,
          name: data.name,
          short_description: data.shortDescription,
          description: data.description,
          category: data.category,
          quantity: data.quantity,
          price: data.price,
          image_url: data.productImage[0].file,
          user_id: props.userId,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      emit('product-submitted')
    } catch (e) {
      const error = e as AxiosError;
      const message = error.response?.data as string;
      errorMessage.value = message;
    }
  }
  else if (props.formAction === 'put') {
    try {
      await axios.put(
        "http://localhost:5000/api/product",
        {
          id: id.value,
          name: data.name,
          short_description: data.shortDescription,
          description: data.description,
          category: data.category,
          quantity: data.quantity,
          price: data.price,
          image_url: data.productImage[0].file,
          user_id: props.userId,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      emit('product-submitted')
    } catch (e) {
      const error = e as AxiosError;
      const message = error.response?.data as string;
      errorMessage.value = message;
    }
  }
};
</script>
