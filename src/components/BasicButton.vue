<template>
    <button class="basic-button">
        <slot>Button Action</slot>
    </button>
</template>
<script setup lang="ts">
import { defineComponent } from "vue";

defineComponent({
    name: "BasicButton",
    components: {},
});
</script>
<style scoped>
.basic-button {
    padding: 20px;
    border-radius: 5px;
    background-color: #0275ff;
    color: #fff;
    cursor: pointer;
}
</style>
