<script setup lang="ts">
import Electric from "../icons/Electric.vue";
import InfoCard from "./InfoCard.vue";

import { onMounted, Ref, ref } from "vue";
import { IParamsModal, IPokemon } from "../../interfaces/pokemonTypes";
import Pokemon from "../../classes/Pokemon";
import { types } from "../../consts/pokeTypes";
import useModal from "../../stores/modal";
import usePokemon from "../../stores/pokemon";

const props = defineProps<{
  url?: string;
  data?: IPokemon;
}>();

const pokemonStore = usePokemon();
const modalStore = useModal();

const currentPokemon: Ref<IPokemon | null> = ref(null);

async function toggleModal(options: IParamsModal) {
  const { id, url } = options;

  if (id) pokemonStore.getStatsPokemon({ id });

  if (url) pokemonStore.getStatsPokemon({ url });

  modalStore.toggleModal();
}

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
  <template v-if="currentPokemon && !data && props.url">
    <InfoCard :data="currentPokemon">
      <button
        @click="toggleModal({ url: props.url })"
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

  <template v-else-if="data && !url">
    <InfoCard :data="data">
      <button
        @click="toggleModal({ id: data.id })"
        class="flex gap-2 w-full justify-center py-2 font-bold rounded-b-3x mt-5"
        :style="{ 'background-color': types[data.types[0].type.name].bg }"
      >
        <Electric color="#FFF" />
        <span> More details </span>
      </button>
    </InfoCard>
  </template>
</template>
