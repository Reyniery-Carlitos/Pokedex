<script setup lang="ts">
import Main from './components/main/Main.vue';
import Container from './components/cards/Container.vue'
import Footer from './components/footer/Footer.vue';
import Stats from './components/modal/Stats.vue';

import usePokemon from './stores/pokemon';
import useModal from './stores/modal';
import { storeToRefs } from 'pinia';

const pokemonStore = usePokemon()
const modalStore = useModal()

const { pokemonStats } = storeToRefs(pokemonStore)
const { showModal } = storeToRefs(modalStore)
</script>

<template>
  <Main />
  <Container />
  <Footer />
  <Stats :data="pokemonStats" v-if="pokemonStats && showModal" />
</template>
