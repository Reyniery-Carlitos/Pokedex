<script setup lang="ts">
import Weight from "../icons/Weight.vue";
import Height from "../icons/Height.vue";
import Electric from "../icons/Electric.vue";
import Fire from "../icons/Fire.vue";

import { onMounted, Ref, ref } from "vue";
import { IPokemon } from "../../interfaces/pokemonTypes";
import Pokemon from "../../classes/Pokemon";
import { types } from "../../consts/pokeTypes";

const props = defineProps<{
  url?: string,
  data?: IPokemon
}>()

const currentPokemon: Ref<IPokemon | null> = ref(null)

async function loadPokemonInfo () {
  const pokemon = new Pokemon()
  if (props.url) {
    currentPokemon.value = await pokemon.getPokemonInfo(props.url)
  }
}

onMounted(() => {
  loadPokemonInfo()  
})

</script>

<template>
  <div class="relative w-full h-full mt-5" v-if="currentPokemon && !data">
    <img
      :src="currentPokemon.sprites.other.home.front_default"
      alt="Pokemon Image"
      class="pokemon-image h-64 w-64 absolute -top-12 left-20 z-10"
    />
    <div
      class="card rounded-3xl flex flex-col items-center gap-4 text-white bg-black bg-opacity-15 pt-20 border-2 mt-40 border-slate-200/15 relative overflow-hidden"
    >
      <div class="h-52 w-52 blur-[128px] absolute top-0" :style="{'background-color': types[currentPokemon.types[0].type.name].bg}"></div>

      <span class="text-xl font-bold text-white z-10"> #{{ currentPokemon.id }} </span>
      <h1 class="text-3xl font-bold text-white z-10"> {{ currentPokemon.name }} </h1>
      <div class="flex  gap-2 z-10">
        <button class="flex gap-2 py-1 px-3 bg-[#ff9801] text-white rounded-lg" v-for="t in currentPokemon.types" :style="{'background-color': types[t.type.name].bg}">
          <Fire color="#fff" class="h-5 w-5" />
          {{ t.type.name }}
        </button>
      </div>

      <div class="grid grid-cols-2 gap-5 z-10">
        <div class="flex flex-col items-center">
          <div class="flex gap-2 items-center font-semibold">
            <Weight color="#FFF" class="h-5 w-5" />
            <span> {{ currentPokemon.weight }}kg </span>
          </div>
          <span> Weight </span>
        </div>

        <div class="flex flex-col items-center">
          <div class="flex gap-2 items-center font-semibold">
            <Height color="#FFF" class="h-5 w-5" />
            <span> {{ currentPokemon.height }}m </span>
          </div>
          <span> Height </span>
        </div>
      </div>

      <button
        class="flex gap-2 w-full justify-center py-2 font-bold rounded-b-3x mt-5"
        :style="{'background-color': types[currentPokemon.types[0].type.name].bg}"
      >
        <Electric color="#FFF" />
        <span> More details </span>
      </button>
    </div>
  </div>

  <div class="relative w-full h-full" v-else-if="data && !url">
    <img
      :src="data.sprites.other.home.front_default"
      alt="Pokemon Image"
      class="pokemon-image h-64 w-64 absolute -top-12 left-20 z-10"
    />
    <div
      class="card rounded-3xl flex flex-col items-center gap-4 text-white bg-black bg-opacity-15 pt-20 border-2 mt-32 border-slate-200/15 relative overflow-hidden"
    >
      <div class="h-52 w-52 blur-[128px] absolute top-0" :style="{'background-color': types[data.types[0].type.name].bg}"></div>

      <span class="text-xl font-bold text-white z-10"> #{{ data.id }} </span>
      <h1 class="text-3xl font-bold text-white z-10"> {{ data.name }} </h1>
      <div class="flex  gap-2 z-10">
        <button class="flex gap-2 py-1 px-3 bg-[#ff9801] text-white rounded-lg" v-for="t in data.types" :style="{'background-color': types[t.type.name].bg}">
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

      <button
        class="flex gap-2 w-full justify-center py-2 font-bold rounded-b-3x mt-5"
        :style="{'background-color': types[data.types[0].type.name].bg}"
      >
        <Electric color="#FFF" />
        <span> More details </span>
      </button>
    </div>
  </div>
</template>
