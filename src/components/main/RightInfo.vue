<script setup lang="ts">
import usePokemon from "../../stores/pokemon";
import { storeToRefs } from "pinia";

const pokemonStore = usePokemon();
const { pokemonSelectedById } = storeToRefs(pokemonStore);
</script>

<template>
  <div class="flex w-full px-5 items-center justify-center">
    <img
      v-if="pokemonSelectedById"
      class=""
      :src="pokemonSelectedById.sprites.other.home.front_default"
    />
  </div>
</template>
