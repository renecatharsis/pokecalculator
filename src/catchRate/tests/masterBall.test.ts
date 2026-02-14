import { calculateProbability } from "@/catchRate/CatchRateCalculator";
import type { CatchRateInputDto } from "@/dto/CatchRateInputDto";
import { Generation } from "@/enum/Generation";
import { PokeBalls } from "@/enum/PokeBalls";
import { StatusCondition } from "@/enum/StatusCondition";

it("returns a guaranteed catch with master ball", () => {
    const params = {
        pokemon: 1,
        generation: Generation.GEN1_RB,
        pokeball: PokeBalls.MASTER_BALL,
        statusCondition: StatusCondition.SLEEP,
        hpPercentage: 100,
        hpBarYellow: true,
        hpBarRed: true,
    } as CatchRateInputDto;

    expect(calculateProbability(params)).toEqual(100);
});

it("returns a guaranteed catch with master ball even on otherwise low probability settings", () => {
    const params = {
        pokemon: 150, // mewtwo, lowest catch rate
        generation: Generation.GEN1_RB,
        pokeball: PokeBalls.MASTER_BALL,
        statusCondition: StatusCondition.NONE,
        hpPercentage: 100,
        hpBarYellow: false,
        hpBarRed: false,
        darkGrass: false,
    } as CatchRateInputDto;

    expect(calculateProbability(params)).toEqual(100);
});
