# PokéCalculator

Simple set of tools to help with probabilities in Pokémon games.

## Requirements
* NodeJS 20+

## Installation
* `nvm use`
* `npm install`
* `npm run dev`

## Running with docker in production
* `docker-compose up --build -d`

## Updating static Pokémon resources
Icons for Poké Balls and Pokémon provided via https://github.com/PokeAPI

Once sprites get added with a new set of games, they'll have to be added manually once.
Temporarily require their sprites repo to get the full package: `npm install github:PokeAPI/sprites`
* Adding new Poké Balls
  * copy Poké Ball sprites from `node_modules/pokemon-sprites/sprites/items` to `public/sprites/pokeballs`
  * update enum to represent new items in `enum/PokeBalls.ts` and `dataProviders/pokeBallProvider.ts`
* Adding new Pokémon
  * copy Pokémon sprites from `node_modules/pokemon-sprites/sprites/pokemon` to `public/sprites/pokemon`
  * `wget -P bin/_pokedata https://raw.githubusercontent.com/PokeAPI/pokeapi/refs/heads/master/data/v2/csv/pokemon.csv`
  * `wget -P bin/_pokedata https://raw.githubusercontent.com/PokeAPI/pokeapi/refs/heads/master/data/v2/csv/pokemon_species.csv`
  * `wget -P bin/_pokedata https://raw.githubusercontent.com/PokeAPI/pokeapi/refs/heads/master/data/v2/csv/pokemon_stats.csv`
  * `npm run create-pokemon-data` to create data for `dataProviders/PokemonProvider.ts`

## Legal information
Pokémon and Pokémon character names are trademarks of Nintendo.