import { CatchRateInputDto } from "@/dto/CatchRateInputDto";
import { PokeBalls } from "@/enum/PokeBalls";
import { Generation } from "@/enum/Generation";
import { StatusCondition } from "@/enum/StatusCondition";
import { getPokemonList } from "@/dataProviders/PokemonProvider";

const HP_PERCENTAGE_CUTOFF_YELLOW = 50;
const HP_PERCENTAGE_CUTOFF_RED = 20;
const GUARANTEED_CATCH: number = 100;
const GUARANTEED_NO_CATCH: number = 0;

const calculateProbability = function (input: CatchRateInputDto): number {
    // do the quickest check first
    if (input.pokeball === PokeBalls.MASTER_BALL) {
        return GUARANTEED_CATCH;
    }

    if (input.generation === Generation.GEN1) {
        return calculateGen1Probability(input);
    }

    return GUARANTEED_NO_CATCH;
};

function calculateGen1Probability(input: CatchRateInputDto): number {
    const pokemon = getPokemonList().find((pokemonListItem) => {
        return pokemonListItem.id === input.pokemon;
    });

    // technically never happening due to validation, but TS wants the safety net regardless
    if (!pokemon) {
        throw new Error("Could not map Pokémon for provided id " + input.pokemon);
    }

    let ballModifier = 255;
    if (input.pokeball === PokeBalls.GREAT_BALL) {
        ballModifier = 200;
    } else if (input.pokeball === PokeBalls.ULTRA_BALL) {
        ballModifier = 150;
    }

    let statusModifier = 0;
    if (input.statusCondition === StatusCondition.FREEZE || input.statusCondition === StatusCondition.SLEEP) {
        statusModifier = 25;
    } else if (
        input.statusCondition === StatusCondition.PARALYSIS ||
        input.statusCondition === StatusCondition.BURN ||
        input.statusCondition === StatusCondition.POISON ||
        input.statusCondition === StatusCondition.BAD_POISON
    ) {
        statusModifier = 12;
    }

    const hpBallFactor = input.pokeball === PokeBalls.GREAT_BALL ? 8 : 12;

    // full HP formula: floor(0.01 x (2 x Base + IV + floor(0.25 x EV)) x Level) + Level + 10
    // assuming an average of 8 DV for HP and no EVs on wild encounters
    const baseLevelHp = Math.floor(0.01 * (2 * pokemon.baseHp + 8) * input.level) + input.level + 10;

    let hpFactor = (baseLevelHp * 255) / hpBallFactor;

    const currentHp = (baseLevelHp / 100) * (input.hpPercentage ?? 100);
    const currentHpFactor = currentHp / 4;
    if (currentHpFactor > 0) {
        hpFactor = Math.min(hpFactor / currentHpFactor, 255);
    }

    const ballFactor = ballModifier + 1; // amount of all possible outcomes
    const pokemonCatchRateFactor = Math.min(pokemon.captureRate + 1, ballFactor - statusModifier);
    const hpFactorDivisor = (hpFactor + 1) / 256;
    const res = (statusModifier + pokemonCatchRateFactor * hpFactorDivisor) / ballFactor;
    const res2 = statusModifier / ballFactor + (pokemonCatchRateFactor / ballFactor) * hpFactorDivisor;

    // console.log("res: " + res);
    // console.log("res2: " + res2);
    /*
     * Usecase: Rattata, level 2, gen 1, pokéball, no status, 100% hp
     * expected: 36,33%
     * actual: 33,59%
     */
    console.log(res);
    return Math.min(Math.round(res * 100 * 100) / 100, 100);
}

export { HP_PERCENTAGE_CUTOFF_YELLOW, HP_PERCENTAGE_CUTOFF_RED, calculateProbability };
