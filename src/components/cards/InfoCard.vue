<script setup lang="ts">
import { IPokemon } from "../../interfaces/pokemonTypes";
import { types } from "../../consts/pokeTypes";
import Weight from "../icons/Weight.vue";
import Height from "../icons/Height.vue";
import Fire from "../icons/Fire.vue";

defineProps<{
  data: IPokemon;
}>();
</script>

<template>
  <div class="relative w-full flex justify-center mt-40">
    <img
      :src="data.sprites.other.home.front_default"
      alt="Pokemon Image"
      class="pokemon-image h-64 w-64 my-0 mx-auto absolute -top-48 z-10"
    />
    <div
      class="w-full rounded-3xl flex flex-col items-center gap-4 text-white bg-black bg-opacity-15 pt-20 border-2 border-slate-200/15 relative overflow-hidden"
    >
      <div
        class="h-52 w-52 blur-[128px] absolute top-0"
        :style="{ 'background-color': types[data.types[0].type.name].bg }"
      ></div>

      <span class="text-xl font-bold text-white z-10"> #{{ data.id }} </span>
      <h1 class="px-4 text-3xl font-bold text-white z-10">{{ data.name }}</h1>
      <div class="flex gap-2 z-10">
        <button
          class="flex gap-2 py-1 px-3 bg-[#ff9801] text-white rounded-lg"
          v-for="t in data.types"
          :style="{ 'background-color': types[t.type.name].bg }"
        >
          <Fire color="#fff" class="h-5 w-5" />
          {{ t.type.name }}
        </button>
      </div>

      <div class="grid grid-cols-2 gap-5 z-10">
        <div class="flex flex-col items-center">
          <div class="flex gap-2 items-center font-semibold">
            <Weight color="#FFF" class="h-5 w-5" />
            <span> {{ data.weight }}kg </span>
          </div>
          <span> Weight </span>
        </div>

        <div class="flex flex-col items-center">
          <div class="flex gap-2 items-center font-semibold">
            <Height color="#FFF" class="h-5 w-5" />
            <span> {{ data.height }}m </span>
          </div>
          <span> Height </span>
        </div>
      </div>

      <slot />
    </div>
  </div>
</template>
