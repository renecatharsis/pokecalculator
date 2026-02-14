#!/usr/bin/env node

import fs from "node:fs";
import { access, constants } from "node:fs/promises";
import path from "node:path";
import { parse } from "csv-parse";

const parameters = process.argv.pop();
if (parameters === "help" || parameters === "--help") {
    console.log(`
    Creates object array of all Pokémon to use in \`src/dataProviders/PokemonProvider.ts\`.
    You only have to execute this if new Pokémon were added.

    Usage
      $ pokedata

    Options
      help    Displays this message
  `);

    process.exit(0);
}

function readCSV(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(parse({ delimiter: ",", from_line: 2 }))
            .on("data", (data) => results.push(data))
            .on("end", () => resolve(results))
            .on("error", (error) => reject(error));
    });
}

async function parsePokemon(pokemonPath, pokemonSpeciesPath, pokemonStatsPath) {
    try {
        const pokemon = await readCSV(pokemonPath);
        const pokemonSpecies = await readCSV(pokemonSpeciesPath);
        const pokemonStats = await readCSV(pokemonStatsPath);

        return pokemon
            .map((row) => {
                // skip alternate forms
                if (row[0] > 10000) {
                    return null;
                }

                const species = pokemonSpecies.find((speciesRow) => speciesRow[0] === row[0]);
                const stats = pokemonStats.find((statsRow) => statsRow[0] === row[0] && statsRow[1] === "1"); // stat id 1 = HP

                // Combine the data
                return {
                    id: parseInt(row[0], 10),
                    name:
                        row[1].charAt(0).toUpperCase() +
                        row[1].slice(1).replace(/-[a-z]/g, (match) => match.toUpperCase()),
                    captureRate: parseInt(species[9], 10),
                    baseHp: parseInt(stats[2], 10),
                    weight: parseInt(row[4], 10),
                    thumbnail: `sprites/pokemon/${row[2]}.png`,
                };
            })
            .filter((row) => row); // filter null rows for pokémon id > 10000
    } catch (error) {
        console.error("Error processing CSV files:", error);
        process.exit(1);
    }
}

// Example usage
const pokemon = path.resolve("./bin/_pokedata/pokemon.csv");
const pokemonSpecies = path.resolve("./bin/_pokedata/pokemon_species.csv");
const pokemonStats = path.resolve("./bin/_pokedata/pokemon_stats.csv");

try {
    await access(pokemon, constants.R_OK);
    await access(pokemonSpecies, constants.R_OK);
    await access(pokemonStats, constants.R_OK);
} catch (error) {
    console.error("Cannot access required CSV files:", error);
    process.exit(1);
}

const parsedData = await parsePokemon(pokemon, pokemonSpecies, pokemonStats);
console.log(
    "[" +
        parsedData.map((record) => {
            return JSON.stringify(record);
        }) +
        "]",
);
process.exit(0);
