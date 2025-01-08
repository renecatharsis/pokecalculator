import { CatchRateInputDto } from "@/dto/catchRateInputDto";
import { PokeBalls } from "@/enum/pokeBalls";

const GUARANTEED_CATCH: number = 100;
const GUARANTEED_NO_CATCH: number = 0;

const calculateProbability = function (input: CatchRateInputDto): number {
    if (input.pokeball === PokeBalls.MASTER_BALL) {
        return GUARANTEED_CATCH;
    }

    return GUARANTEED_NO_CATCH;
};

export { calculateProbability };
