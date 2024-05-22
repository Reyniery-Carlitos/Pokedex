import { defineStore } from "pinia";
import Pokemon from "../classes/Pokemon";
import { Ref, ref } from "vue";
import { IPokemon, IPokemonList } from "../interfaces/pokemonTypes";

const usePokemon = defineStore("pokemon", () => {
  const pokemon = new Pokemon();
  const pokemonSelectedByName: Ref<IPokemon | null> = ref(null)
  const pokemonSelectedById: Ref<IPokemon | null> = ref(null);
  const pokemonList: Ref<IPokemonList | null> = ref(null);
  const loading: Ref<boolean> = ref(false)
  const loadingPokemonId: Ref<boolean> = ref<false>


  async function selectPokemonById(id: number = 1) {
    loadingPokemonId.value = true
    try {
      pokemonSelectedById.value = await pokemon.getPokemonById(id);
    } finally{
      loadingPokemonId.value = false
    }
  }

  async function selectPokemonByName(name: string) {
    loading.value = true
    try {
      pokemonList.value = null
      pokemonSelectedByName.value = await pokemon.getPokemonByName(name)
    } finally {
      loading.value = false
    }
  }

  async function getPokemonList(url: string) {
    loading.value = true
    try {
      pokemonSelectedByName.value = null
      pokemonList.value = await pokemon.getAllPokemons(url);
    } finally {
      loading.value = false
    }
  }

  selectPokemonById();
  getPokemonList("https://pokeapi.co/api/v2/pokemon/?limit=9");

  return {
    pokemonSelectedById,
    selectPokemonById,
    pokemonList,
    getPokemonList,
    loading,
    selectPokemonByName,
    pokemonSelectedByName,
    loadingPokemonId
  };
});

export default usePokemon;
