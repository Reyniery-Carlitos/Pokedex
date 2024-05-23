<script setup lang="ts">
import Fire from "../icons/Fire.vue";

import Electric from "../icons/Electric.vue";
import { types } from "../../consts/pokeTypes";

import usePokemon from "../../stores/pokemon";
import { storeToRefs } from "pinia";
import { IParamsModal } from "../../interfaces/pokemonTypes";
import useModal from "../../stores/modal";

const pokemonStore = usePokemon();
const modalStore = useModal()
const { pokemonSelectedById } = storeToRefs(pokemonStore);

function toggleModal(options: IParamsModal) {
  const { id } = options
  if (id) pokemonStore.getStatsPokemon({id})

  modalStore.toggleModal()
}

</script>

<template>
  <div class="w-full px-5">
    <div
      class="flex flex-col gap-5 w-full items-center"
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

      <h1 class="text-5xl font-bold text-white uppercase">
        {{ pokemonSelectedById.name }}
      </h1>
      
      <button
        class="details-button flex items-center gap-2 justify-center w-full text-lg font-semibold bg-white p-2 rounded-md"
        @click="toggleModal({id: pokemonSelectedById.id})"
      >
        <Electric color="#000" />
        More Details
      </button>
    </div>
  </div>
</template>
