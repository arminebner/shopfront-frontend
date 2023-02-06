<template>
  <div class="loading">
    <div class="spinner"></div>
  </div>
</template>

<style>
.loading {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
}

.loading .spinner {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border-top: 4px solid rgb(82, 82, 255);
  border-right: 4px solid blue;
  border-bottom: 4px solid rgb(144, 0, 255);
  border-left: 4px solid transparent;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
