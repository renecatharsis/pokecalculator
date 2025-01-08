import { expect, test } from "vitest";
import { calculateProbability } from "@/catchRate/catchRateCalculator";
import { PokeBalls } from "@/enum/pokeBalls";
import { StatusCondition } from "@/enum/statusCondition";
import { CatchRateInputDto } from "@/dto/catchRateInputDto";

test("MasterBallGuaranteesSuccessWithGenerallyHighProbability", () => {
    const params = {
        pokemon: 1,
        generation: 1,
        pokeball: PokeBalls.MASTER_BALL,
        statusCondition: StatusCondition.SLEEP,
        hpBarRed: true,
    } as CatchRateInputDto;

    expect(calculateProbability(params)).toEqual(100);
});

test("MasterBallGuaranteesSuccessWithGenerallyLowProbability", () => {
    const params = {
        pokemon: 150, // mewtwo, lowest catch rate
        generation: 1,
        pokeball: PokeBalls.MASTER_BALL,
        statusCondition: StatusCondition.NONE,
        hpBarOrange: false,
        hpBarRed: false,
        darkGrass: false,
    } as CatchRateInputDto;

    expect(calculateProbability(params)).toEqual(100);
});
