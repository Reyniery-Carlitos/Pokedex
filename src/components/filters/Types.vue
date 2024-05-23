<script setup lang="ts">
import usePokemon from "../../stores/pokemon";
import { storeToRefs } from "pinia";
import LeftArrow from "../icons/LeftArrow.vue";
import RightArrow from "../icons/RightArrow.vue";
import Fire from "../icons/Fire.vue";
import { types as tTypes } from "../../consts/pokeTypes";
import { ref, onMounted, watch } from "vue";

const pokemonStore = usePokemon();
const { types } = storeToRefs(pokemonStore);

const currentIndex = ref(0);
const translateX = ref(0);
const containerWidth = ref(0);
const itemWidth = 100;

function filterByType(name: string) {
  pokemonStore.filterPokemonByType(name);
}

function updateTranslateX() {
  translateX.value = -currentIndex.value * itemWidth;
}

function scrollLeft() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
  updateTranslateX();
}

function scrollRight() {
  if (types.value && currentIndex.value < types.value.results.length - 6) {
    currentIndex.value++;
  }
  updateTranslateX();
}

onMounted(() => {
  const container = document.getElementById("container-buttons");
  if (container) {
    containerWidth.value = container.clientWidth;
  }
});

watch(currentIndex, updateTranslateX);
</script>

<template>
  <div class="flex w-full gap-5 items-center" v-if="types">
    <LeftArrow
      :color="currentIndex > 0 ? '#FFF' : '#838495'"
      class="h-5 w-5 top-14"
      @click="scrollLeft"
    />
    <div class="flex items-center justify-center gap-2 w-full overflow-hidden">
      <div
        id="container-buttons"
        class="w-full flex gap-2 transition-transform duration-300 ease-in-ou"
        :style="{ transform: `translateX(${translateX}px)` }"
      >
        <template v-for="t in types.results">
          <button
            class="flex items-center gap-1 py-1 px-2 w-24 rounded-lg"
            v-if="tTypes[t.name]"
            :style="{ 'background-color': tTypes[t.name].bg }"
            :key="t.name"
            @click="filterByType(t.name)"
          >
            <Fire color="#FFF" class="h-4 w-4" />
            {{ t.name }}
          </button>
        </template>
      </div>
    </div>
    <RightArrow
      :color="currentIndex < types.results.length - 6 ? '#FFF' : '#838495'"
      class="h-5 w-5"
      @click="scrollRight"
    />
  </div>
</template>
