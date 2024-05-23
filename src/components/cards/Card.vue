<script setup lang="ts">
import Electric from "../icons/Electric.vue";
import InfoCard from "./InfoCard.vue";

import { onMounted, Ref, ref } from "vue";
import { IPokemon } from "../../interfaces/pokemonTypes";
import Pokemon from "../../classes/Pokemon";
import { types } from "../../consts/pokeTypes";

const props = defineProps<{
  url?: string;
  data?: IPokemon;
}>();

const currentPokemon: Ref<IPokemon | null> = ref(null);

async function loadPokemonInfo() {
  const pokemon = new Pokemon();
  if (props.url) {
    currentPokemon.value = await pokemon.getPokemonInfo(props.url);
  }
}

onMounted(() => {
  loadPokemonInfo();
});

</script>

<template>
  <!-- <div class="relative bg-blue-500 w-full h-full mt-5" v-if="currentPokemon && !data"> -->
    <template v-if="currentPokemon && !data">
      <InfoCard :data="currentPokemon"> 
        <button
          class="flex gap-2 w-full justify-center py-2 font-bold rounded-b-3x mt-5"
          :style="{
            'background-color': types[currentPokemon.types[0].type.name].bg,
          }"
        >
          <Electric color="#FFF" />
          <span> More details </span>
        </button>
      </InfoCard>
    </template>

  <!-- </div> -->

  <!-- <div class="relative w-full h-full" v-else-if="data && !url"> -->
    <template v-else-if="data && !url">
      <InfoCard :data="data">
        <button
          class="flex gap-2 w-full justify-center py-2 font-bold rounded-b-3x mt-5"
          :style="{ 'background-color': types[data.types[0].type.name].bg }"
        >
          <Electric color="#FFF" />
          <span> More details </span>
        </button>
      </InfoCard>
    </template>
  <!-- </div> -->
</template>
