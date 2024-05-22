<script setup lang="ts">
</script>

<template>
  <div class="relative w-full h-full animate-pulse">
    <div class="pokemon-image h-40 w-40 absolute top-10 rounded-full left-32 z-10 bg-gray-200"></div>
    <div
      class="card rounded-3xl flex flex-col items-center gap-4 pt-20 mt-40 relative overflow-hidden"
    >

      <span class="h-4 w-40 rounded-md bg-gray-200"> </span>
      <h1 class="h-6 w-48 bg-gray-200 rounded-lg"> </h1>
      <div class="flex  gap-2 z-10">
        <button class="flex gap-2 py-1 px-3 bg-gray-200 h-4 w-12 rounded-lg"></button>
        <button class="flex gap-2 py-1 px-3 bg-gray-200 h-4 w-12 rounded-lg"></button>
      </div>

      <div class="grid grid-cols-2 gap-5 z-10">
        <div class="flex flex-col items-center gap-2">
          <div class="flex gap-2 items-center font-semibold">
            <span class="h-4 w-20 bg-gray-200 rounded-lg"> </span>
          </div>
          <span class="h-4 w-16 bg-gray-200 rounded-lg"> </span>
        </div>

        <div class="flex flex-col items-center gap-2">
          <div class="flex gap-2 items-center font-semibold">
            <span class="h-4 w-20 bg-gray-200 rounded-lg"> </span>
          </div>
          <span class="h-4 w-16 bg-gray-200 rounded-lg"> </span>
        </div>
      </div>

      <button
        class="flex gap-2 w-full justify-center py-3  rounded-b-3x mt-5 bg-gray-200"
      >
        <span class="bg-white rounded-lg h-4 w-24"> </span>
      </button>
    </div>
  </div>
</template>
