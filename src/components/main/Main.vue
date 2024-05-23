<script setup lang="ts">
import usePokemon from "../../stores/pokemon";
import { storeToRefs } from "pinia";
import Header from "../header/Header.vue";
import Info from "./Info.vue";
import LeftArrow from "../icons/LeftArrow.vue";
import RightArrow from "../icons/RightArrow.vue";
import { types } from "../../consts/pokeTypes";

const pokemonStore = usePokemon();
const { pokemonSelectedById } = storeToRefs(pokemonStore);

function selectPokemon(val: number) {
  if (pokemonSelectedById.value) {
    pokemonStore.selectPokemonById(pokemonSelectedById.value.id + val)
  }
}
</script>

<template>
  <main
  v-if="pokemonSelectedById"
  :style="{'background': `linear-gradient(360deg, ${types[pokemonSelectedById.types[0].type.name].from} 0%, ${types[pokemonSelectedById.types[0].type.name].to}`}"
  class="main-container h-auto w-full flex flex-col items-center relative overflow-hidden pb-12 bg-gradient-to-b from-white to-transparent"
  >
    <Header class="w-full lg:w-4/6 p-5 h-28 flex items-center" />

    <LeftArrow
      color="#FFF"
      class="h-12 w-12 top-[calc(50%+24px)] left-10 absolute cursor-pointer z-10"
      v-if="pokemonSelectedById && pokemonSelectedById.id !== 1"
      @click="selectPokemon(-1)"
    />

    <div class="w-full h-full flex justify-center">
      <Info />
    </div>

    <RightArrow
      color="#FFF"
      class="h-12 w-12 top-[calc(50%+24px)] right-10 absolute cursor-pointer z-10"
      @click="selectPokemon(1)"
    />
    <!-- <img src="/src/assets/waves.svg" class="absolute -bottom-[400px]" /> -->
  </main>
</template>

<style>
.main-container::before {
  content: "";
  background: url("/src/assets/pokebola.svg");
  display: block;
  width: 400px;
  height: 400px;
  top: calc(50% - 150px);
  left: -200px;
  position: absolute;
}

.main-container::after {
  position: absolute;
  content: "";
  background: url("/src/assets/pokebola.svg");
  display: block;
  width: 400px;
  height: 400px;
  top: calc(50% - 150px);
  right: -200px;
}
</style>
