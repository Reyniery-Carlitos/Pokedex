<script setup lang="ts">
import "animate.css";
import { ref, Ref } from "vue";
import usePokemon from "../../stores/pokemon";
import { storeToRefs } from "pinia";
import Card from "./Card.vue";
import LeftArrow from "../icons/LeftArrow.vue";
import RightArrow from "../icons/RightArrow.vue";
import Skeleton from "./Skeleton.vue";
import Search from "../filters/Search.vue";
import Start from "../filters/Start.vue";
import Types from "../filters/Types.vue";
import Plus from "../icons/Plus.vue";
import ArrowUp from "../icons/ArrowUp.vue";

const pokemonStore = usePokemon();
const { pokemonList, loading, pokemonSelectedByName, pokemonListByTypes, pageRef } =
  storeToRefs(pokemonStore);
const currentPage: Ref<number> = ref(1);

function scrollToSection() {
  const section = document.getElementById("container-cards");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

function next() {
  if (pokemonList.value) {
    if (pokemonList.value.next) {
      scrollToSection();
      pokemonStore.getPokemonList(pokemonList.value.next);
      currentPage.value += 1;
    }
  }
}

function jump(q: number) {
  if (pokemonList.value) {
    scrollToSection();
    currentPage.value = q;
    pokemonStore.getPokemonList(
      `https://pokeapi.co/api/v2/pokemon/?offset=${(q - 1) * 9}&limit=9`
    );
  }
}

function previous() {
  if (pokemonList.value) {
    if (pokemonList.value.previous) {
      scrollToSection();
      pokemonStore.getPokemonList(pokemonList.value.previous);
      currentPage.value -= 1;
    }
  }
}

function loadMore(page: number) {
  pokemonStore.loadMore(page);
}
</script>

<template>
  <div
    id="container-cards"
    class="w-full xl:w-4/6 px-5 flex flex-col items-center gap-10 pt-12 lg:"
  >
    <header
      class="w-full flex flex-col gap-5 border-b-2 border-b-gray-200/20 pb-5"
    >
      <div>
        <Start :currentPage="currentPage" :scrollToSection="scrollToSection" />
      </div>
      <div
        class="grid grid-rows-2 lg:grid-rows-1 gap-3 lg:items-center lg:grid-cols-2 text-white place-items-start"
      >
        <div class="w-full flex flex-col gap-3 py-2 relative overflow-hidden">
          <h2 class="text-2xl font-semibold">Search by types</h2>
          <Types />
        </div>

        <Search class="self-end" />
      </div>
    </header>

    <div
      class="w-full h-auto flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 animate__animated animate__fadeIn animate__delay-0.5s"
      v-if="!loading"
    >
      <Card
        v-if="pokemonSelectedByName"
        :key="pokemonSelectedByName.name"
        :data="pokemonSelectedByName"
      />

      <template
        v-else-if="pokemonList && !pokemonSelectedByName && !pokemonListByTypes"
      >
        <Card
          v-for="pokemon in pokemonList.results"
          :key="pokemon.name"
          :url="pokemon.url"
        />
      </template>

      <template
        v-else-if="pokemonListByTypes && !pokemonSelectedByName && !pokemonList"
      >
        <Card
          v-for="pokemon in pokemonListByTypes"
          :key="pokemon.name"
          :url="pokemon.url"
        />
      </template>

      <div
        class="text-white h-32 font-bold col-span-2 lg:col-span-3 flex justify-center"
        v-else
      >
        <h2
          class="text-2xl mt-10 animate__animated animate__fadeIn animate__delay-0.5s"
        >
          Ooops, No data found :(
        </h2>
      </div>

      <div
        class="flex gap-5 items-center mb-10 col-span-2 lg:col-span-3 justify-center animate__animated animate__fadeIn animate__delay-0.5s"
        v-if="pokemonList"
      >
        <LeftArrow
          :color="pokemonList?.previous ? '#FFF' : '#838594'"
          class="h-8 w-8 cursor-pointer"
          @click="previous"
        />

        <div
          class="text-white text-lg flex gap-2 items-center"
          v-if="currentPage < 4"
        >
          <span
            class="py-1 font-semibold px-3 border-2 border-white rounded-lg cursor-pointer"
            :style="currentPage === 1 && { 'background-color': '#2f5bfe' }"
            @click="jump(1)"
          >
            1
          </span>
          <span
            class="py-1 font-semibold px-3 border-2 border-white rounded-lg cursor-pointer"
            :style="currentPage === 2 && { 'background-color': '#2f5bfe' }"
            @click="jump(2)"
          >
            2
          </span>
          <span
            class="py-1 font-semibold px-3 border-2 border-white rounded-lg cursor-pointer"
            :style="currentPage === 3 && { 'background-color': '#2f5bfe' }"
            @click="jump(3)"
          >
            3
          </span>
          <span class="p-2 font-semibold"> ... </span>
          <span
            class="py-1 font-semibold px-2 border-2 border-white rounded-lg cursor-pointer"
            @click="jump(10)"
          >
            10
          </span>
        </div>

        <div
          class="text-white text-lg flex gap-2 items-center"
          v-else-if="currentPage < 9"
        >
          <span
            class="py-1 font-semibold px-3 border-2 border-white rounded-lg cursor-pointer"
            @click="jump(1)"
          >
            1
          </span>
          <span class="p-2 font-semibold"> ... </span>
          <span
            class="py-1 font-semibold px-3 border-2 border-white bg-[#2f5bfe] rounded-lg cursor-pointer"
          >
            {{ currentPage }}
          </span>
          <span class="p-2 font-semibold"> ... </span>
          <span
            class="py-1 font-semibold px-2 border-2 border-white rounded-lg cursor-pointer"
            @click="jump(10)"
          >
            10
          </span>
        </div>

        <div class="text-white text-lg flex gap-2 items-center" v-else>
          <span
            class="py-1 font-semibold px-3 border-2 border-white rounded-lg cursor-pointer"
            @click="jump(1)"
          >
            1
          </span>
          <span class="p-2 font-semibold"> ... </span>
          <span
            class="py-1 font-semibold px-2 border-2 border-white bg-[#2f5bfe] rounded-lg cursor-pointer"
          >
            {{ currentPage }}
          </span>
          <span
            class="py-1 font-semibold px-2 border-2 border-white rounded-lg cursor-pointer"
            @click="jump(currentPage + 1)"
          >
            {{ currentPage + 1 }}
          </span>
          <span
            class="py-1 font-semibold px-2 border-2 border-white rounded-lg cursor-pointer"
            @click="jump(currentPage + 2)"
          >
            {{ currentPage + 2 }}
          </span>
        </div>

        <RightArrow
          :color="pokemonList?.next ? '#FFF' : '#838594'"
          class="h-8 w-8 cursor-pointer"
          @click="next"
        />
      </div>

      <div
        class="text-white flex items-center justify-center gap-4 w-full col-span-3"
        v-if="!loading && pokemonListByTypes"
      >
        <button
          class="py-2 px-4 text-md border-2 border-gray-800/75 rounded-lg bg-gradient-to-t from-[#060a29] to-slate-900/80 flex items-center gap-2 font-semibold"
          @click="loadMore(pageRef + 1)"
        >
          <Plus class="h-7 w-7" color="#FFF" />
          Show more pokemon
        </button>

        <a
          href="#container-cards"
          class="py-2 px-2 text-md transition-all border-2 border-gray-800/75 rounded-lg bg-gradient-to-t from-[#060a29] to-slate-900/80 flex items-center gap-2 font-semibold"
        >
          <ArrowUp color="#FFF" class="h-7 w-7" />
        </a>
      </div>
    </div>

    <div
      class="w-full h-auto flex flex-col md:grid md:grid-cols-2 gap-5 mb-5 lg:grid-cols-3"
      v-else-if="loading"
    >
      <Skeleton v-for="i in 3" :key="i" />
    </div>
  </div>
</template>
