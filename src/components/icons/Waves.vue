<script setup lang="ts">
defineProps<{
  color: string,
}>()
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path
      :fill="color"
      fill-opacity="1"
      d="M0,160L48,170.7C96,181,192,203,288,176C384,149,480,75,576,58.7C672,43,768,85,864,112C960,139,1056,149,1152,149.3C1248,149,1344,139,1392,133.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
    ></path>
  </svg>
</template>
