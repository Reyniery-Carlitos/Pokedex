import { defineStore } from "pinia";
import Pokemon from "../classes/Pokemon";
import { Ref, ref } from "vue";
import { IParamsModal, IPokemon, IPokemonList, ITypes } from "../interfaces/pokemonTypes";
import { Pokemon1, Pokemon2 } from "../interfaces/pokemonListByTypes";

const usePokemon = defineStore("pokemon", () => {
  const pokemon = new Pokemon();
  const pokemonSelectedByName: Ref<IPokemon | null> = ref(null)
  const pokemonSelectedById: Ref<IPokemon | null> = ref(null);
  const pokemonList: Ref<IPokemonList | null> = ref(null);
  const loading: Ref<boolean> = ref(false)
  const loadingPokemonId: Ref<boolean> = ref(false)
  const pokemonStats: Ref<IPokemon | null> = ref(null)
  const types: Ref<ITypes | null> = ref(null)
  const allPokemonListByTypes: Ref<Pokemon2[] | null> = ref(null)
  const pokemonListByTypes: Ref<Pokemon2[] | null> = ref(null)
  const pageRef: Ref<number> = ref(1);

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
      pokemonListByTypes.value = null
      pokemonSelectedByName.value = await pokemon.getPokemonByName(name)
    } finally {
      loading.value = false
    }
  }

  async function getPokemonList(url: string) {
    loading.value = true
    try {
      pokemonSelectedByName.value = null
      pokemonListByTypes.value = null
      pokemonList.value = await pokemon.getAllPokemons(url);
    } finally {
      loading.value = false
    }
  }

  async function getStatsPokemon(options: IParamsModal) {
    const {id, url} = options
    const pokemon = new Pokemon()

    if (id) pokemonStats.value = await pokemon.getPokemonInfo(`https://pokeapi.co/api/v2/pokemon/${id}`)
    
    if (url) pokemonStats.value = await pokemon.getPokemonInfo(url)
  }

  async function getTypes() {
    const pokemon = new Pokemon()

    types.value = await pokemon.getTypes()
  }

  function getPokemonInfo(pokemonArr: Pokemon1[]) {
    const desestructuredPokemonArr: Pokemon2[] = pokemonArr.map((p) => {
      const { pokemon } = p

      return pokemon
    })
    
    pokemonSelectedByName.value = null
    pokemonList.value = null
    allPokemonListByTypes.value = desestructuredPokemonArr
    pokemonListByTypes.value = desestructuredPokemonArr.slice(0, 9)
  }

  function loadMore(page: number) {
    loading.value = true
    try {
      if (pokemonListByTypes.value && allPokemonListByTypes.value) {
        const currentLength = pokemonListByTypes.value.length
        let currentList: Pokemon2[] = []
        
        if (allPokemonListByTypes.value.length > page * 9) {
          currentList = allPokemonListByTypes.value.slice(currentLength, page * 9)
        } else {
          currentList = allPokemonListByTypes.value.slice(currentLength, allPokemonListByTypes.value.length)
        }

        pokemonListByTypes.value.push(...currentList)
        pageRef.value += 1
      }
    } finally {
      loading.value = false
    }
  }

  async function filterPokemonByType (name: string) {
    loading.value = true
    pageRef.value = 1

    try {
      const pokemon = new Pokemon()
  
      const pokemonList = await pokemon.getPokemonesByTypes(name)
      
      if (pokemonList){
        getPokemonInfo(pokemonList.pokemon)
      }
    } finally {
      loading.value = false
    }
  }

  selectPokemonById();
  getTypes();
  getPokemonList("https://pokeapi.co/api/v2/pokemon/?limit=9");

  return {
    pokemonSelectedById,
    selectPokemonById,
    pokemonList,
    getPokemonList,
    loading,
    selectPokemonByName,
    pokemonSelectedByName,
    loadingPokemonId,
    getStatsPokemon,
    pokemonStats,
    getTypes,
    types,
    filterPokemonByType,
    pokemonListByTypes,
    loadMore,
    pageRef
  };
});

export default usePokemon;
