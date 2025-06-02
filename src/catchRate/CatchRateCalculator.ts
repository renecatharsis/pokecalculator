import { CatchRateInputDto } from "@/dto/CatchRateInputDto";
import { PokeBalls } from "@/enum/PokeBalls";
import { Generation } from "@/enum/Generation";
import { StatusCondition } from "@/enum/StatusCondition";
import { getPokemonByNumberAndGeneration, PokemonListItem } from "@/dataProviders/PokemonProvider";
import { roundSequentiallyFromEnd } from "@/util/mathFunctions";

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

    if (input.generation === Generation.GEN2_GS || input.generation === Generation.GEN2_C) {
        res = calculateGen2Probability(input);
    }

    return roundSequentiallyFromEnd(res * 100, 2);
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
    } else if (input.pokeball === PokeBalls.ULTRA_BALL || input.pokeball === PokeBalls.SAFARI_BALL) {
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

    return sumOfProbabilities / 16;

    function inlineGen1(pokemon: PokemonListItem, input: CatchRateInputDto, dv: number) {
        const maxHp = calculateMaxHp(pokemon.baseHp, dv, input.level);
        const currentHp = calculateCurrentHp(maxHp, input);
        const currentHpFactor = Math.max(Math.floor(currentHp / 4), 1);
        let hpFactor = (maxHp * 255) / hpBallFactor;

        if (currentHpFactor > 0) {
            hpFactor = Math.floor(Math.min(hpFactor / currentHpFactor, 255));
        }

        const ballFactor = ballModifier + 1; // number of all possible outcomes
        const pokemonCatchRateFactor = Math.min(pokemon.captureRate + 1, ballFactor - statusModifier);
        const hpFactorDivisor = (hpFactor + 1) / 256;

        // console.log(
        //     "dv: " +
        //         dv +
        //         " maxHp: " +
        //         maxHp +
        //         " currentHp: " +
        //         currentHp +
        //         " hpFactor: " +
        //         hpFactor +
        //         " ballFactor: " +
        //         ballFactor +
        //         " pokemonCatchRateFactor: " +
        //         pokemonCatchRateFactor +
        //         " hpFactorDivisor: " +
        //         hpFactorDivisor +
        //         " result: " +
        //         (statusModifier + pokemonCatchRateFactor * hpFactorDivisor) / ballFactor,
        // );
        return (statusModifier + pokemonCatchRateFactor * hpFactorDivisor) / ballFactor;
    }
}

function calculateGen2Probability(input: CatchRateInputDto): number {
    const pokemon = getPokemonByNumberAndGeneration(input.pokemon, input.generation);
    // technically never happening due to validation, but TS wants the safety net regardless
    if (!pokemon) {
        throw new Error("Could not map Pokémon for provided id " + input.pokemon);
    }

    // @TODO catchrate / ball
    // @TODO angel und co
    // @TODO sonderfälle catchrate raticate und co?
    // a bug in the games prevents paralysis, poison and burn to have any effect
    let statusModifier = 0;
    if (input.statusCondition === StatusCondition.FREEZE || input.statusCondition === StatusCondition.SLEEP) {
        statusModifier = 10;
    }

    let catchRateModifier = pokemon.captureRate;
    switch (input.pokeball) {
        case PokeBalls.GREAT_BALL:
            catchRateModifier = catchRateModifier * 1.5;
            break;
        case PokeBalls.ULTRA_BALL:
            catchRateModifier = catchRateModifier * 2;
            break;
        case PokeBalls.POKE_BALL:
        case PokeBalls.FRIEND_BALL:
        case PokeBalls.MOON_BALL:
        default:
            break;
    }

    catchRateModifier = Math.floor(catchRateModifier);
    // console.log("catchRateModifier: " + catchRateModifier);
    if (catchRateModifier < 1) {
        catchRateModifier = 1;
    } else if (catchRateModifier > 255) {
        catchRateModifier = 255;
    }

    // Gen2 DVs range from 0 to 15
    let sumOfProbabilities = 0;
    for (let i = 0; i <= 15; i++) {
        sumOfProbabilities += inlineGen2(pokemon, input, i);
    }

    return sumOfProbabilities / 16;

    function inlineGen2(pokemon: PokemonListItem, input: CatchRateInputDto, dv: number) {
        const maxHp = calculateMaxHp(pokemon.baseHp, dv, input.level);
        const currentHp = calculateCurrentHp(maxHp, input);
        const maxHpMultiplier = 3 * maxHp;
        const maxHpResult = maxHpMultiplier > 255 ? Math.floor(maxHpMultiplier / 4) : maxHpMultiplier;
        const currentHpMultiplier = 2 * currentHp;
        const currentHpResult = maxHpMultiplier > 255 ? Math.floor(currentHpMultiplier / 4) : currentHpMultiplier;

        // console.log("dv: " + dv);
        // console.log("maxHp: " + maxHp);
        // console.log("currentHp: " + currentHp);
        // console.log("maxHpMultiplier: " + maxHpMultiplier);
        // console.log("currentHpMultiplier: " + currentHpMultiplier);
        // console.log("maxHpResult: " + maxHpResult);
        // console.log("currentHpResult: " + currentHpResult);
        const hpModifier = Math.floor(((maxHpResult - currentHpResult) * catchRateModifier) / maxHpResult);
        const modifierResult = Math.max(hpModifier, 1) + statusModifier;

        // console.log((modifierResult + 1) / 256);
        // console.log("###");
        return (modifierResult + 1) / 256;
    }
}

function calculateMaxHp(baseHp: number, dv: number, level: number) {
    /*
     * floating point numbers in JS are fun (example: 106 Base HP and 50% HP).
     * Math.floor(0.01 * (2 * (baseHp + dv)) * level) -> 115 -> 175 Max HP
     * Math.floor((2 * (baseHp + dv)) * level * 0.01) -> 116 -> 176 Max HP
     *
     * divide by 100 instead of multiplying by 0.01 or shifting it to the end.
     */
    return Math.floor((2 * (baseHp + dv) * level) / 100) + level + 10;
}

function calculateCurrentHp(maxHp: number, input: CatchRateInputDto) {
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
    // console.log("calculateCurrentHp");
    // console.log(hpPercentage);
    // console.log(maxHp * (hpPercentage / 100));
    // console.log(Math.floor(maxHp * (hpPercentage / 100)));
    // console.log("---");
    // ensure at least 1 HP
    return Math.max(1, Math.round((maxHp * hpPercentage) / 100));
}

export { HP_PERCENTAGE_CUTOFF_YELLOW, HP_PERCENTAGE_CUTOFF_RED, calculateProbability };
