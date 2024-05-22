<script setup lang="ts">
import Fire from "../icons/Fire.vue";

import Electric from "../icons/Electric.vue";
import { types } from "../../consts/pokeTypes";

import usePokemon from "../../stores/pokemon";
import { storeToRefs } from "pinia";

const pokemonStore = usePokemon();
const { pokemonSelectedById } = storeToRefs(pokemonStore);
</script>

<template>
  <div class="w-3/6">
    <div
      class="flex flex-col gap-3 w-4/6 text-justify"
      v-if="pokemonSelectedById"
    >
      <span class="text-white font-bold text-2xl">
        #{{ pokemonSelectedById.id }}
      </span>

      <div class="flex gap-2">
        <button
          v-for="pokemon in pokemonSelectedById.types"
          class="flex items-center gap-1 text-lg text-white py-1 px-2 w-auto rounded-md"
          :style="{'background-color': types[pokemon.type.name].bg}"
        >
          <Fire class="w-4 h-4" color="#FFF" />
          {{ pokemon.type.name }}
        </button>
      </div>

      <h1 class="text-6xl font-bold text-white uppercase">
        {{ pokemonSelectedById.name }}
      </h1>
      <p class="text-lg text-white">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab eveniet
        harum tempore exercitationem possimus molestias rerum vel modi, esse id
        omnis repudiandae enim consequuntur ullam. Necessitatibus dolorum
        ratione ipsum officiis!
      </p>
      <button
        class="flex items-center gap-2 justify-center w-full text-lg font-semibold bg-white p-2 rounded-md"
      >
        <Electric color="#000" />
        More Details
      </button>
    </div>
  </div>
</template>
