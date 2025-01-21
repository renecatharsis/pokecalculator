import { calculateProbability } from "@/catchRate/CatchRateCalculator";
import { PokeBalls } from "@/enum/PokeBalls";
import { StatusCondition } from "@/enum/StatusCondition";
import { CatchRateInputDto } from "@/dto/CatchRateInputDto";

it("returns a guaranteed catch with master ball", () => {
    const params = {
        pokemon: 1,
        generation: 1,
        pokeball: PokeBalls.MASTER_BALL,
        statusCondition: StatusCondition.SLEEP,
        hpPercentage: 100,
        hpBarOrange: true,
        hpBarRed: true,
    } as CatchRateInputDto;

    expect(calculateProbability(params)).toEqual(100);
});

it("returns a guaranteed catch with master ball even on otherwise low probability settings", () => {
    const params = {
        pokemon: 150, // mewtwo, lowest catch rate
        generation: 1,
        pokeball: PokeBalls.MASTER_BALL,
        statusCondition: StatusCondition.NONE,
        hpPercentage: 100,
        hpBarOrange: false,
        hpBarRed: false,
        darkGrass: false,
    } as CatchRateInputDto;

    expect(calculateProbability(params)).toEqual(100);
});
