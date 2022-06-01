import pokemons from './db';
import pokemonService from './service';
import { Pokemon } from './model';

describe('PokemonService', () => {
  beforeEach(() => {});

  test('getAll', () => {
    expect(pokemonService.getAll().length).toEqual(pokemons.length);
  });

  test('getOne happy path', () => {
    const pokemon = pokemonService.getOne(1);
    expect(pokemon.name).toContain('Bulbizarre');
  });

  test('getOne sad path', () => {
    expect(() => {
      pokemonService.getOne(100);
    }).toThrowError('Pokemon not found');
  });

  test('create pokemon', () => {
    const data = {
      name: 'Samuel',
      hp: 100,
      cp: 100,
      picture: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png',
      types: ['Poison'],
    };
    expect(pokemons.length).toBe(10);
    pokemonService.create(data);
    expect(pokemons.length).toBe(11);
  });

  test('delete pokemon happy path', () => {
    expect(pokemons.length).toBe(11);

    const deletedPokemon = pokemonService.deleteOne(1);
    expect(pokemons.length).toBe(10);

    // make sure that deleted pokemon cannot be found.
    expect(() => {
      pokemonService.getOne(deletedPokemon.id);
    }).toThrowError('Pokemon not found');
  });

  test('delete pokemon sad path', () => {
    expect(() => {
      pokemonService.deleteOne(100);
    }).toThrowError('Could not delete Pokemon');
  });
});
