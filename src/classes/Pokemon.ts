import { IPokemonsByType } from "../interfaces/pokemonListByTypes";
import { IPokemon, IPokemonList, ITypes } from "../interfaces/pokemonTypes";

export default class Pokemon {
  async getPokemonById(id: number): Promise<IPokemon | null> {
    let pokemonInfo: IPokemon | null = null;

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();

      pokemonInfo = data;
    } catch (err) {
      console.error(err);
    }

    return pokemonInfo;
  }

  async getPokemonByName(name: string): Promise<IPokemon | null> {
    let pokemonInfo: IPokemon | null = null;

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();

      if (data) {
        pokemonInfo = data
      }
    } catch (err) {
      console.error(err);
    }

    return pokemonInfo;
  }

  async getAllPokemons(url: string): Promise<IPokemonList | null> {
    let pokemonList: IPokemonList | null = null;
    try {
      const response = await fetch(url);
      const data = await response.json();

      pokemonList = data;
    } catch (err) {
      console.error(err);
    }

    return pokemonList;
  }

  async getPokemonInfo(url: string): Promise<IPokemon | null> {
    let currentPokemon: IPokemon | null = null;
      const response = await fetch(url)
      const data = await response.json()

      currentPokemon = data
    try {
    } catch (err) {
      console.error(err);
    }

    return currentPokemon
  }

  async getTypes(): Promise<ITypes | null> {
    const response = await fetch('https://pokeapi.co/api/v2/type/')
    const data = await response.json()

    return data
  }

  async getPokemonesByTypes(name: string): Promise<IPokemonsByType | null> {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${name}`)
    const data = await response.json()

    return data
  }
}
