import { calculateProbability } from "@/catchRate/CatchRateCalculator";
import type { CatchRateInputDto } from "@/dto/CatchRateInputDto";
import { Generation } from "@/enum/Generation";
import { PokeBalls } from "@/enum/PokeBalls";
import { StatusCondition } from "@/enum/StatusCondition";

it("ensures level difference results using Rattata with pokéball at full hp, no status", () => {
    const baseParams = {
        pokemon: 19,
        generation: Generation.GEN2_GS,
        pokeball: PokeBalls.POKE_BALL,
        statusCondition: StatusCondition.NONE,
        hpPercentage: 100,
        hpBarYellow: false,
        hpBarRed: false,
    } as CatchRateInputDto;

    // testing full level range to cover as many rounding and flooring scenarios as possible
    expect(calculateProbability({ ...baseParams, level: 2 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 3 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 4 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 5 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 6 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 7 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 8 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 9 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 10 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 11 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 12 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 13 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 14 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 15 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 16 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 17 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 18 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 19 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 20 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 21 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 22 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 23 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 24 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 25 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 26 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 27 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 28 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 29 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 30 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 31 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 32 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 33 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 34 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 35 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 36 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 37 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 38 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 39 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 40 })).toEqual(33.55);
    expect(calculateProbability({ ...baseParams, level: 41 })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, level: 42 })).toEqual(33.57);
    expect(calculateProbability({ ...baseParams, level: 43 })).toEqual(33.55);
    expect(calculateProbability({ ...baseParams, level: 44 })).toEqual(33.5);
    expect(calculateProbability({ ...baseParams, level: 45 })).toEqual(33.55);
    expect(calculateProbability({ ...baseParams, level: 46 })).toEqual(33.47);
    expect(calculateProbability({ ...baseParams, level: 47 })).toEqual(33.5);
    expect(calculateProbability({ ...baseParams, level: 48 })).toEqual(33.5);
    expect(calculateProbability({ ...baseParams, level: 49 })).toEqual(33.5);
    expect(calculateProbability({ ...baseParams, level: 50 })).toEqual(33.5);
    expect(calculateProbability({ ...baseParams, level: 51 })).toEqual(33.5);
    expect(calculateProbability({ ...baseParams, level: 52 })).toEqual(33.5);
    expect(calculateProbability({ ...baseParams, level: 53 })).toEqual(33.5);
    expect(calculateProbability({ ...baseParams, level: 54 })).toEqual(33.5);
    expect(calculateProbability({ ...baseParams, level: 55 })).toEqual(33.47);
    expect(calculateProbability({ ...baseParams, level: 56 })).toEqual(33.5);
    expect(calculateProbability({ ...baseParams, level: 57 })).toEqual(33.45);
    expect(calculateProbability({ ...baseParams, level: 58 })).toEqual(33.47);
    expect(calculateProbability({ ...baseParams, level: 59 })).toEqual(33.5);
    expect(calculateProbability({ ...baseParams, level: 60 })).toEqual(33.45);
    expect(calculateProbability({ ...baseParams, level: 61 })).toEqual(33.52);
    expect(calculateProbability({ ...baseParams, level: 62 })).toEqual(33.5);
    expect(calculateProbability({ ...baseParams, level: 63 })).toEqual(33.47);
    expect(calculateProbability({ ...baseParams, level: 64 })).toEqual(33.47);
    expect(calculateProbability({ ...baseParams, level: 65 })).toEqual(33.55);
    expect(calculateProbability({ ...baseParams, level: 66 })).toEqual(33.47);
    expect(calculateProbability({ ...baseParams, level: 67 })).toEqual(33.47);
    expect(calculateProbability({ ...baseParams, level: 68 })).toEqual(33.52);
    expect(calculateProbability({ ...baseParams, level: 69 })).toEqual(33.52);
    expect(calculateProbability({ ...baseParams, level: 70 })).toEqual(33.47);
});

it("ensures yellow hp bar results using pokéball", () => {
    const baseParams = {
        generation: Generation.GEN2_GS,
        pokeball: PokeBalls.POKE_BALL,
        statusCondition: StatusCondition.NONE,
        level: 50,
        hpPercentage: null,
        hpBarYellow: true,
        hpBarRed: false,
    } as CatchRateInputDto;

    // Rattata for high capture rate
    expect(calculateProbability({ ...baseParams, pokemon: 19 })).toEqual(67.53);

    // Onix for medium capture rate
    expect(calculateProbability({ ...baseParams, pokemon: 95 })).toEqual(12.11);

    // Mewtwo for low capture rate
    expect(calculateProbability({ ...baseParams, pokemon: 150 })).toEqual(1.17);
});

it("ensures red hp bar results using pokéball", () => {
    const baseParams = {
        generation: Generation.GEN2_GS,
        pokeball: PokeBalls.POKE_BALL,
        statusCondition: StatusCondition.NONE,
        level: 50,
        hpPercentage: null,
        hpBarYellow: false,
        hpBarRed: true,
    } as CatchRateInputDto;

    // Rattata for high capture rate
    expect(calculateProbability({ ...baseParams, pokemon: 19 })).toEqual(87.5);

    // Onix for medium capture rate
    expect(calculateProbability({ ...baseParams, pokemon: 95 })).toEqual(15.63);

    // Mewtwo for low capture rate
    expect(calculateProbability({ ...baseParams, pokemon: 150 })).toEqual(1.17);
});

it("ensures hp percentage results using pokéball", () => {
    const baseParams = {
        generation: Generation.GEN2_GS,
        pokeball: PokeBalls.POKE_BALL,
        statusCondition: StatusCondition.NONE,
        level: 50,
        hpBarYellow: false,
        hpBarRed: false,
    } as CatchRateInputDto;

    // Rattata for high capture rate
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 1 })).toEqual(98.44);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 5 })).toEqual(97.07);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 10 })).toEqual(93.46);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 15 })).toEqual(90.04);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 20 })).toEqual(86.84);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 25 })).toEqual(83.4);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 30 })).toEqual(80.18);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 35 })).toEqual(76.71);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 40 })).toEqual(73.36);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 45 })).toEqual(70.22);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 50 })).toEqual(66.7);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 55 })).toEqual(63.33);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 60 })).toEqual(60.16);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 65 })).toEqual(56.69);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 70 })).toEqual(53.47);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 75 })).toEqual(50);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 80 })).toEqual(46.68);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 85 })).toEqual(43.41);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 90 })).toEqual(40.02);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 95 })).toEqual(36.74);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 100 })).toEqual(33.5);

    // Onix for medium capture rate
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 1 })).toEqual(17.58);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 5 })).toEqual(17.19);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 10 })).toEqual(16.68);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 20 })).toEqual(15.5);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 30 })).toEqual(14.38);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 40 })).toEqual(13.14);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 50 })).toEqual(12.01);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 60 })).toEqual(10.82);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 70 })).toEqual(9.62);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 80 })).toEqual(8.42);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 90 })).toEqual(7.28);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 100 })).toEqual(6.15);

    // Mewtwo for low capture rate
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 1 })).toEqual(1.17);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 5 })).toEqual(1.17);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 10 })).toEqual(1.17);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 20 })).toEqual(1.17);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 30 })).toEqual(1.17);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 40 })).toEqual(1.17);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 50 })).toEqual(1.07);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 60 })).toEqual(0.78);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 70 })).toEqual(0.78);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 80 })).toEqual(0.78);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 90 })).toEqual(0.78);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 100 })).toEqual(0.78);
});

it("ensures fast ball is applied to only Magnemite, Grimer and Tangela", () => {
    const baseParams = {
        generation: Generation.GEN2_GS,
        statusCondition: StatusCondition.NONE,
        level: 10,
        hpPercentage: 100,
        hpBarYellow: false,
        hpBarRed: false,
    } as CatchRateInputDto;

    // Rattata has identical rate
    expect(calculateProbability({ ...baseParams, pokemon: 19, pokeball: PokeBalls.POKE_BALL })).toEqual(33.59);
    expect(calculateProbability({ ...baseParams, pokemon: 19, pokeball: PokeBalls.FAST_BALL })).toEqual(33.59);

    // Magnemite has increased rate
    expect(calculateProbability({ ...baseParams, pokemon: 81, pokeball: PokeBalls.POKE_BALL })).toEqual(25);
    expect(calculateProbability({ ...baseParams, pokemon: 81, pokeball: PokeBalls.FAST_BALL })).toEqual(33.59);

    // Grimer has increased rate
    expect(calculateProbability({ ...baseParams, pokemon: 88, pokeball: PokeBalls.POKE_BALL })).toEqual(25);
    expect(calculateProbability({ ...baseParams, pokemon: 88, pokeball: PokeBalls.FAST_BALL })).toEqual(33.59);

    // Tangela has increased rate
    expect(calculateProbability({ ...baseParams, pokemon: 114, pokeball: PokeBalls.POKE_BALL })).toEqual(6.25);
    expect(calculateProbability({ ...baseParams, pokemon: 114, pokeball: PokeBalls.FAST_BALL })).toEqual(23.83);
});

it("ensures heavy ball considers different weight categories", () => {
    const baseParams = {
        generation: Generation.GEN2_GS,
        pokeball: PokeBalls.HEAVY_BALL,
        statusCondition: StatusCondition.NONE,
        level: 10,
        hpPercentage: 100,
        hpBarYellow: false,
        hpBarRed: false,
    } as CatchRateInputDto;

    // Bulbasaur is in the lowest weight tier
    expect(calculateProbability({ ...baseParams, pokemon: 1 })).toEqual(3.52);

    // Ivysaur is in the second-lowest weight tier
    expect(calculateProbability({ ...baseParams, pokemon: 2 })).toEqual(3.52);

    // Sandslash in the middle tier
    expect(calculateProbability({ ...baseParams, pokemon: 28 })).toEqual(9.38);

    // Pidgeot is in the second-highest weight tier
    expect(calculateProbability({ ...baseParams, pokemon: 18 })).toEqual(3.52);

    // Venusaur is in the highest weight tier
    expect(calculateProbability({ ...baseParams, pokemon: 3 })).toEqual(3.52);
});

it("ensures heavy ball considers incorrect weight of Kadabra, Tauros and Sunflora", () => {
    const baseParamsGS = {
        generation: Generation.GEN2_GS,
        pokeball: PokeBalls.HEAVY_BALL,
        statusCondition: StatusCondition.NONE,
        level: 10,
        hpPercentage: 100,
        hpBarYellow: false,
        hpBarRed: false,
    } as CatchRateInputDto;

    // Kadabra
    expect(calculateProbability({ ...baseParamsGS, pokemon: 64 })).toEqual(10.55);

    // Tauros
    expect(calculateProbability({ ...baseParamsGS, pokemon: 128 })).toEqual(3.52);

    // Sunflora
    expect(calculateProbability({ ...baseParamsGS, pokemon: 192 })).toEqual(13.28);

    const baseParamsC = {
        generation: Generation.GEN2_C,
        pokeball: PokeBalls.HEAVY_BALL,
        statusCondition: StatusCondition.NONE,
        level: 10,
        hpPercentage: 100,
        hpBarYellow: false,
        hpBarRed: false,
    } as CatchRateInputDto;

    // Kadabra
    expect(calculateProbability({ ...baseParamsC, pokemon: 64 })).toEqual(18.36);

    // Tauros
    expect(calculateProbability({ ...baseParamsC, pokemon: 128 })).toEqual(11.33);

    // Sunflora
    expect(calculateProbability({ ...baseParamsC, pokemon: 192 })).toEqual(21.09);
});

it("ensures level ball considers different difference categories", () => {
    const baseParams = {
        pokemon: 150, // Mewtwo for low capture rate
        generation: Generation.GEN2_GS,
        pokeball: PokeBalls.LEVEL_BALL,
        statusCondition: StatusCondition.NONE,
        level: 10,
        hpPercentage: 100,
        hpBarYellow: false,
        hpBarRed: false,
    } as CatchRateInputDto;

    expect(calculateProbability({ ...baseParams, ownLevel: 10 })).toEqual(1.56);
    expect(calculateProbability({ ...baseParams, ownLevel: 11 })).toEqual(2.73);
    expect(calculateProbability({ ...baseParams, ownLevel: 21 })).toEqual(2.73);
    expect(calculateProbability({ ...baseParams, ownLevel: 22 })).toEqual(5.08);
    expect(calculateProbability({ ...baseParams, ownLevel: 43 })).toEqual(5.08);
    expect(calculateProbability({ ...baseParams, ownLevel: 44 })).toEqual(9.77);
    expect(calculateProbability({ ...baseParams, ownLevel: 100 })).toEqual(9.77);
});

it("ensures that love ball increases catch rate when catching Pokémon of the same sex", () => {
    const baseParams = {
        pokemon: 3,
        generation: Generation.GEN2_GS,
        pokeball: PokeBalls.LOVE_BALL,
        statusCondition: StatusCondition.NONE,
        level: 10,
        hpPercentage: 100,
        hpBarYellow: false,
        hpBarRed: false,
    } as CatchRateInputDto;

    // catching a Venusaur with the same species and same sex
    expect(calculateProbability({ ...baseParams, sameSpecies: true, sameSex: true })).toEqual(33.59);

    // catching a Venusaur with the same species and opposite sex
    expect(calculateProbability({ ...baseParams, sameSpecies: true, sameSex: false })).toEqual(6.25);

    // catching a Venusaur with a different species and same sex
    expect(calculateProbability({ ...baseParams, sameSpecies: false, sameSex: true })).toEqual(6.25);

    // catching a Venusaur with a different species and opposite sex
    expect(calculateProbability({ ...baseParams, sameSpecies: false, sameSex: false })).toEqual(6.25);
});

it("ensures that lure ball increases catch rate when fishing", () => {
    const baseParams = {
        pokemon: 118,
        generation: Generation.GEN2_GS,
        pokeball: PokeBalls.LURE_BALL,
        statusCondition: StatusCondition.NONE,
        level: 10,
        hpPercentage: 100,
        hpBarYellow: false,
        hpBarRed: false,
    } as CatchRateInputDto;

    // Goldeen while surfing
    expect(calculateProbability({ ...baseParams, fishing: false })).toEqual(29.69);

    // Goldeen while fishing
    expect(calculateProbability({ ...baseParams, fishing: true })).toEqual(33.59);
});

it("ensures status results increase catch rate with how limited they are in Gen 2", () => {
    const baseParams = {
        pokemon: 19,
        generation: Generation.GEN2_GS,
        pokeball: PokeBalls.POKE_BALL,
        level: 70,
        hpPercentage: 100,
        hpBarYellow: false,
        hpBarRed: false,
    } as CatchRateInputDto;

    expect(calculateProbability({ ...baseParams, statusCondition: StatusCondition.NONE })).toEqual(33.47);
    expect(calculateProbability({ ...baseParams, statusCondition: StatusCondition.BAD_POISON })).toEqual(33.47);
    expect(calculateProbability({ ...baseParams, statusCondition: StatusCondition.POISON })).toEqual(33.47);
    expect(calculateProbability({ ...baseParams, statusCondition: StatusCondition.PARALYSIS })).toEqual(33.47);
    expect(calculateProbability({ ...baseParams, statusCondition: StatusCondition.BURN })).toEqual(33.47);
    expect(calculateProbability({ ...baseParams, statusCondition: StatusCondition.SLEEP })).toEqual(37.38);
    expect(calculateProbability({ ...baseParams, statusCondition: StatusCondition.FREEZE })).toEqual(37.38);
});

it("ensures different catch rate of Raticate is considered before gen 3", () => {
    const baseParamsGS = {
        pokemon: 20,
        generation: Generation.GEN2_GS,
        pokeball: PokeBalls.POKE_BALL,
        statusCondition: StatusCondition.NONE,
        hpPercentage: 100,
        hpBarYellow: false,
        hpBarRed: false,
    } as CatchRateInputDto;

    expect(calculateProbability({ ...baseParamsGS, level: 2 })).toEqual(12.11);
    expect(calculateProbability({ ...baseParamsGS, level: 10 })).toEqual(12.11);
    expect(calculateProbability({ ...baseParamsGS, level: 30 })).toEqual(12.11);
    expect(calculateProbability({ ...baseParamsGS, level: 50 })).toEqual(12.01);
    expect(calculateProbability({ ...baseParamsGS, level: 70 })).toEqual(12.01);

    const baseParamsC = {
        pokemon: 20,
        generation: Generation.GEN2_C,
        pokeball: PokeBalls.POKE_BALL,
        statusCondition: StatusCondition.NONE,
        hpPercentage: 100,
        hpBarYellow: false,
        hpBarRed: false,
    } as CatchRateInputDto;

    expect(calculateProbability({ ...baseParamsC, level: 2 })).toEqual(12.11);
    expect(calculateProbability({ ...baseParamsC, level: 10 })).toEqual(12.11);
    expect(calculateProbability({ ...baseParamsC, level: 30 })).toEqual(12.11);
    expect(calculateProbability({ ...baseParamsC, level: 50 })).toEqual(12.01);
    expect(calculateProbability({ ...baseParamsC, level: 70 })).toEqual(12.01);
});
