<script setup lang="ts">
</script>

<template>
  <div class="fade-container" :class="{ 'fade-in': showContent }">
    <h1>Hello</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showContent: false,
    };
  },
  mounted() {
    this.showContent = true;
  },
};
</script>

<style scoped>
.fade-container {
  opacity: 0;
  transition: opacity 0.25s ease;
}

.fade-in {
  opacity: 1;
}
</style>