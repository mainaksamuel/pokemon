import pokemons from './db';
import { Pokemon } from './model';

export class PokemonService {
  getAll() {
    return pokemons;
  }

  getOne(id: number): Pokemon {
    const pokemon = pokemons.find((pokemon) => pokemon.id === id);
    if (!pokemon) {
      throw Error('Pokemon not found');
    }

    return pokemon;
  }

  create(pokemon: Omit<Pokemon, 'id'>): Pokemon {
    pokemons.push({ ...pokemon, id: pokemons.length + 1 });

    return pokemons[pokemons.length - 1];
  }

  update(id: number, data: Partial<Omit<Pokemon, 'id'>>) {
    const pokemonIndex = pokemons.findIndex((pokemon) => pokemon.id === id);
    pokemons[pokemonIndex] = { ...pokemons[pokemonIndex], ...data };

    return pokemons[pokemonIndex];
  }

  deleteOne(id: number): Pokemon {
    const pokemonIndex = pokemons.findIndex((pokemon) => pokemon.id === id);
    if (pokemonIndex < 0) {
      throw Error('Could not delete Pokemon');
    }

    return pokemons.splice(pokemonIndex, 1)[0];
  }
}
export default new PokemonService();
