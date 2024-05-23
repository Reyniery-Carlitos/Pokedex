<script setup lang="ts">
import Search from "../icons/Search.vue";

import usePokemon from "../../stores/pokemon";
import { Ref, ref } from "vue";

const pokemonStore = usePokemon()
const name: Ref<string> = ref('') 

function search (name: string) {
  if (name !== '') {
    pokemonStore.selectPokemonByName(name)
  }
}
</script>

<template>
  <form class="search flex h-14 w-full rounded-lg" @submit.prevent="search(name)">
    <input
      v-model="name"
      type="text"
      class="border-2 w-full bg-transparent py-1 pl-3 rounded-l-lg outline-none border-[#2f5bfe] text-white"
      placeholder="Search Pokemon"
    />
    <button class="flex bg-[#2f5bfe] rounded-r-lg items-center h-14 w-14">
      <Search color="#FFF" class="h-3/6" />
    </button>
  </form>
</template>

<style>
.search:hover{
  -webkit-box-shadow: 0px 0px 10px 0px rgba(47, 91, 254, 1);
  -moz-box-shadow: 0px 0px 10px 0px rgba(47, 91, 254, 1);
  box-shadow: 0px 0px 10px 0px rgba(47, 91, 254, 1);
}

.search {
  transition: ease 1s all;
}
</style>
