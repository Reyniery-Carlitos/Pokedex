<script setup lang="ts">
import Home from '../icons/Home.vue';
import usePokemon from '../../stores/pokemon';

const props = defineProps<{
  currentPage: number,
  scrollToSection: () => void
}>()

const pokemonStore = usePokemon()

function getPokemonList() {
  props.scrollToSection()
  pokemonStore.getPokemonList(`https://pokeapi.co/api/v2/pokemon/?offset=${(props.currentPage - 1) * 9}&limit=9`)
}
</script>

<template>
  <div class="flex gap-2 justify-center items-center py-2 border-2 border-slate-200/25 w-28 rounded-lg cursor-pointer" @click="getPokemonList">
    <Home color="#FFF" class="h-7 w-7" />
    <span class="font-semibold text-white text-lg"> Start</span>
  </div>
</template>