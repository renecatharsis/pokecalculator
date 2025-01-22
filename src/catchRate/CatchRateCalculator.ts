import { CatchRateInputDto } from "@/dto/CatchRateInputDto";
import { PokeBalls } from "@/enum/PokeBalls";
import { Generation } from "@/enum/Generation";

const HP_PERCENTAGE_CUTOFF_YELLOW = 50;
const HP_PERCENTAGE_CUTOFF_RED = 20;
const GUARANTEED_CATCH: number = 100;
// const GUARANTEED_NO_CATCH: number = 0;

const calculateProbability = function (input: CatchRateInputDto): number {
    // do the quickest check first
    if (input.pokeball === PokeBalls.MASTER_BALL) {
        return GUARANTEED_CATCH;
    }

    if (input.generation === Generation.GEN1) {
        // return calculateGen1Probability(input);
    }

    return Math.floor(Math.random() * 100);
};

// function calculateGen1Probability(input: CatchRateInputDto): number {}

export { HP_PERCENTAGE_CUTOFF_YELLOW, HP_PERCENTAGE_CUTOFF_RED, calculateProbability };
