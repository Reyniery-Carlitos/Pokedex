<script setup lang="ts">
import "animate.css";
import { IPokemon } from "../../interfaces/pokemonTypes";
import { types } from "../../consts/pokeTypes";
import Height from "../icons/Height.vue";
import Weight from "../icons/Weight.vue";
import Fire from "../icons/Fire.vue";

import useModal from "../../stores/modal";
import { storeToRefs } from "pinia";
import Close from "../icons/Close.vue";
import Pokebola from "../icons/Pokebola.vue";

const modalStore = useModal();
const { showModal } = storeToRefs(modalStore);
interface IStats {
  [key: string]: string;
}
const options: IStats = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

function toggleModal() {
  modalStore.toggleModal();
}

defineProps<{
  data: IPokemon;
}>();
</script>

<template>
  <div
    class="w-screen h-screen fixed top-0 left-0 flex flex-col items-center justify-center pt-[380px] pb-10 md:pt-20 z-20 text-white bg-black/50 overflow-y-scroll"
    v-if="showModal"
  >
    <div
      class="lg:w-3/5 w-11/12 h-auto grid lg:grid-cols-3 rounded-3xl animate__animated animate__zoomIn bg-black bg-opacity-50 backdrop-filter backdrop-blur-xl backdrop-saturate-150 z-20"
    >
      <div class="relative flex items-center flex-col h-full md:h-[22rem] rounded-l-3xl pt-5 lg:pt-0 z-21">
        <img
          :src="data.sprites.other.home.front_default"
          class="pokemon-image h-64 w-64 my-0 mx-auto absolute -top-40 z-20"
          alt=""
        />

        <div
          class="w-full h-full rounded-t-3xl rounded-l-3xl lg:rounded-l-3xl flex flex-col items-center justify-end pb-10 gap-4 text-white pt-20 relative overflow-hidden"
        >
          <div
            class="h-52 w-52 blur-[128px] absolute top-0"
            :style="{ 'background-color': types[data.types[0].type.name].bg }"
          ></div>

          <span class="text-xl font-bold text-white z-10">
            #{{ data.id }}
          </span>
          <h1 class="text-3xl font-bold text-white z-10">{{ data.name }}</h1>
          <div class="flex gap-2 z-10">
            <button
              class="flex gap-2 py-1 px-3 bg-[#ff9801] text-white rounded-lg"
              v-for="t in data.types"
              :style="{ 'background-color': types[t.type.name].bg }"
            >
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

          <slot />
        </div>
      </div>

      <!-- <img src="/src/assets/pokebola.svg" class="h-16 w-16 absolute top-[calc(50%-1.5rem)] left-[290px] z-20" alt="Pokebola image"> -->

      <div class="lg:col-span-2 flex flex-col items-center relative">
        <div class="pokebola -top-8 flex lg:flex-col lg:-left-8 lg:top-5 items-center absolute z-20">
          <Pokebola color="#545455" class="h-16 w-16" />
        </div>

        <header class="flex justify-between w-5/6 h-24 items-center">
          <h3 class="text-3xl">Stats</h3>
          <Close color="white" class="h-10 w-10" @click="toggleModal" />
        </header>

        <main class="w-5/6 flex flex-col gap-3 pb-5 justify-between h-3/5 text-lg">
          <div
            class="flex justify-between items-center gap-5 flex-wrap"
            v-for="s in data.stats"
            :key="s.stat.name"
          >
            <p class="w-28">{{ options[s.stat.name] }}</p>
            <span class="w-14 font-bold"> {{ s.base_stat }} </span>
            <div class="w-80 flex h-2 rounded-full bg-[#545455]">
              <span
                class="rounded-full h-2"
                :class="s.base_stat < 60 ? 'bg-[#fe374e]' : 'bg-[#1cd90f]'"
                :style="{ width: `${s.base_stat}%` }"
              >
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style>
.pokebola::before {
  content: "";
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgb(255, 255, 255) 100%
  );
  display: block;
  height: 2px;
  width: 9rem;
  margin: 0px auto;
}

.pokebola::after {
  content: "";
  background: linear-gradient(
    90deg,
    rgb(255, 255, 255) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  display: block;
  width: 9rem;
  height: 2px;
}

@media only screen and (min-width: 1024px) {
  .pokebola::before {
    content: "";
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgb(255, 255, 255) 100%
    );
    display: block;
    height: 8rem;
    width: 2px;
    margin: 0px auto;
  }

  .pokebola::after {
    content: "";
    background: linear-gradient(
      180deg,
      rgb(255, 255, 255) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    display: block;
    width: 2px;
    height: 8rem;
  }
}
</style>
