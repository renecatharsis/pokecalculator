import { CatchRateInputDto } from "@/dto/CatchRateInputDto";
import { PokeBalls } from "@/enum/PokeBalls";
import { Generation } from "@/enum/Generation";
import { StatusCondition } from "@/enum/StatusCondition";
import { getPokemonByNumberAndGeneration, PokemonListItem } from "@/dataProviders/PokemonProvider";

const HP_PERCENTAGE_CUTOFF_YELLOW = 49;
const HP_PERCENTAGE_CUTOFF_RED = 19;
const GUARANTEED_CATCH: number = 100;
const GUARANTEED_NO_CATCH: number = 0;

function calculateProbability(input: CatchRateInputDto): number {
    // do the quickest check first
    if (input.pokeball === PokeBalls.MASTER_BALL) {
        return GUARANTEED_CATCH;
    }

    let res = GUARANTEED_NO_CATCH;

    if (input.generation === Generation.GEN1_RB || input.generation === Generation.GEN1_Y) {
        res = calculateGen1Probability(input);
    }

    return parseFloat(res.toFixed(2));
}

function calculateGen1Probability(input: CatchRateInputDto): number {
    const pokemon = getPokemonByNumberAndGeneration(input.pokemon, input.generation);
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
        input.statusCondition === StatusCondition.POISON
    ) {
        statusModifier = 12;
    }

    const hpBallFactor = input.pokeball === PokeBalls.GREAT_BALL ? 8 : 12;

    // Gen1 DVs range from 0 to 15
    let sumOfProbabilities = 0;
    for (let i = 0; i <= 15; i++) {
        sumOfProbabilities += inlineGen1(pokemon, input, i);
    }

    return Math.round(((100 * sumOfProbabilities) / 16) * 100) / 100;

    function inlineGen1(pokemon: PokemonListItem, input: CatchRateInputDto, dv: number) {
        /*
         * floating point numbers in JS are fun (example: 106 Base HP and 50% HP).
         * Math.floor(0.01 * (2 * (pokemon.baseHp + dv)) * input.level) -> 115 -> 175 Max HP
         * Math.floor((2 * (pokemon.baseHp + dv)) * input.level * 0.01) -> 116 -> 176 Max HP
         *
         * just divide by 100 instead of multiplying by 0.01 or shifting it to the end.
         */
        const maxHp = Math.floor((2 * (pokemon.baseHp + dv) * input.level) / 100) + input.level + 10;
        const hpPercentage = input.hpPercentage
            ? input.hpPercentage
            : input.hpBarRed
              ? HP_PERCENTAGE_CUTOFF_RED
              : input.hpBarYellow
                ? HP_PERCENTAGE_CUTOFF_YELLOW
                : 100;

        /*
         * floating point numbers in JS are still fun (example: 115 Max HP and 100% HP):
         * 115 / 100 * 100 -> 114.9999999999
         * 115 * 100 / 100 -> 115
         */
        const currentHp = Math.floor(maxHp * (hpPercentage / 100));
        const currentHpFactor = Math.max(Math.floor(currentHp / 4), 1);
        let hpFactor = (maxHp * 255) / hpBallFactor;

        if (currentHpFactor > 0) {
            hpFactor = Math.floor(Math.min(hpFactor / currentHpFactor, 255));
        }

        const ballFactor = ballModifier + 1; // amount of all possible outcomes
        const pokemonCatchRateFactor = Math.min(pokemon.captureRate + 1, ballFactor - statusModifier);
        const hpFactorDivisor = (hpFactor + 1) / 256;

        if (pokemon.id === 148) {
            const res = (statusModifier + pokemonCatchRateFactor * hpFactorDivisor) / ballFactor;
            console.log(`dv: ${dv}, maxHP: ${maxHp}, res: ${res}`);
        }

        return (statusModifier + pokemonCatchRateFactor * hpFactorDivisor) / ballFactor;
    }
}

export { HP_PERCENTAGE_CUTOFF_YELLOW, HP_PERCENTAGE_CUTOFF_RED, calculateProbability };
