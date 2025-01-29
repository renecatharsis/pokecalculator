import { CatchRateInputDto } from "@/dto/CatchRateInputDto";
import { PokeBalls } from "@/enum/PokeBalls";
import { Generation } from "@/enum/Generation";
import { StatusCondition } from "@/enum/StatusCondition";

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

    console.log(statusModifier);

    const hpBallFactor = input.pokeball === PokeBalls.GREAT_BALL ? 8 : 12;
    let hpFactor = /*max hp mon*/ (1000 * 255) / hpBallFactor;
    const currentHp = (1000 / 100) * (input.hpPercentage ?? 100);
    const currentHpFactor = Math.floor(currentHp / 4);
    if (currentHpFactor > 0) {
        hpFactor = Math.min(hpBallFactor / hpFactor, 255);
    }

    const ballFactor = ballModifier + 1; // amount of all possible outcomes
    const pokemonCatchRateFactor = Math.min(/*catch rate pkmn*/ 50 + 1, ballFactor - statusModifier);
    const hpFactorDivisor = (hpFactor + 1) / 256;
    const res = Math.floor(((statusModifier + pokemonCatchRateFactor) * hpFactorDivisor) / ballFactor);
    console.log(res);

    return res;

    // hp formula: HP = floor(0.01 x (2 x Base + IV + floor(0.25 x EV)) x Level) + Level + 10
}

export { HP_PERCENTAGE_CUTOFF_YELLOW, HP_PERCENTAGE_CUTOFF_RED, calculateProbability };
