import { calculateProbability } from "@/catchRate/CatchRateCalculator";
import { PokeBalls } from "@/enum/PokeBalls";
import { StatusCondition } from "@/enum/StatusCondition";
import { CatchRateInputDto } from "@/dto/CatchRateInputDto";
import { Generation } from "@/enum/Generation";

it("ensures level difference results using rattata with pokéball at full hp, no status", () => {
    const baseParams = {
        pokemon: 19,
        generation: Generation.GEN1_RB,
        pokeball: PokeBalls.POKE_BALL,
        statusCondition: StatusCondition.NONE,
        hpPercentage: 100,
        hpBarYellow: false,
        hpBarRed: false,
    } as CatchRateInputDto;

    // testing full level range to cover as many rounding and flooring scenarios as possible
    expect(calculateProbability({ ...baseParams, level: 2 })).toEqual(36.33);
    expect(calculateProbability({ ...baseParams, level: 3 })).toEqual(41.11);
    expect(calculateProbability({ ...baseParams, level: 4 })).toEqual(34.57);
    expect(calculateProbability({ ...baseParams, level: 5 })).toEqual(38.23);
    expect(calculateProbability({ ...baseParams, level: 6 })).toEqual(35.45);
    expect(calculateProbability({ ...baseParams, level: 7 })).toEqual(36.43);
    expect(calculateProbability({ ...baseParams, level: 8 })).toEqual(35.89);
    expect(calculateProbability({ ...baseParams, level: 9 })).toEqual(35.23);
    expect(calculateProbability({ ...baseParams, level: 10 })).toEqual(35.74);
    expect(calculateProbability({ ...baseParams, level: 11 })).toEqual(35.11);
    expect(calculateProbability({ ...baseParams, level: 12 })).toEqual(35.35);
    expect(calculateProbability({ ...baseParams, level: 13 })).toEqual(35.18);
    expect(calculateProbability({ ...baseParams, level: 14 })).toEqual(34.74);
    expect(calculateProbability({ ...baseParams, level: 15 })).toEqual(34.99);
    expect(calculateProbability({ ...baseParams, level: 16 })).toEqual(34.89);
    expect(calculateProbability({ ...baseParams, level: 17 })).toEqual(34.79);
    expect(calculateProbability({ ...baseParams, level: 18 })).toEqual(35.03);
    expect(calculateProbability({ ...baseParams, level: 19 })).toEqual(34.5);
    expect(calculateProbability({ ...baseParams, level: 20 })).toEqual(34.69);
    expect(calculateProbability({ ...baseParams, level: 21 })).toEqual(34.33);
    expect(calculateProbability({ ...baseParams, level: 22 })).toEqual(34.62);
    expect(calculateProbability({ ...baseParams, level: 23 })).toEqual(34.47);
    expect(calculateProbability({ ...baseParams, level: 24 })).toEqual(34.42);
    expect(calculateProbability({ ...baseParams, level: 25 })).toEqual(34.42);
    expect(calculateProbability({ ...baseParams, level: 26 })).toEqual(34.4);
    expect(calculateProbability({ ...baseParams, level: 27 })).toEqual(34.38);
    expect(calculateProbability({ ...baseParams, level: 28 })).toEqual(34.47);
    expect(calculateProbability({ ...baseParams, level: 29 })).toEqual(34.33);
    expect(calculateProbability({ ...baseParams, level: 30 })).toEqual(34.35);
    expect(calculateProbability({ ...baseParams, level: 31 })).toEqual(34.25);
    expect(calculateProbability({ ...baseParams, level: 32 })).toEqual(34.23);
    expect(calculateProbability({ ...baseParams, level: 33 })).toEqual(34.13);
    expect(calculateProbability({ ...baseParams, level: 34 })).toEqual(34.18);
    expect(calculateProbability({ ...baseParams, level: 35 })).toEqual(34.2);
    expect(calculateProbability({ ...baseParams, level: 36 })).toEqual(34.18);
    expect(calculateProbability({ ...baseParams, level: 37 })).toEqual(34.18);
    expect(calculateProbability({ ...baseParams, level: 38 })).toEqual(34.18);
    expect(calculateProbability({ ...baseParams, level: 39 })).toEqual(34.08);
    expect(calculateProbability({ ...baseParams, level: 40 })).toEqual(34.23);
    expect(calculateProbability({ ...baseParams, level: 41 })).toEqual(34.28);
    expect(calculateProbability({ ...baseParams, level: 42 })).toEqual(34.16);
    expect(calculateProbability({ ...baseParams, level: 43 })).toEqual(34.16);
    expect(calculateProbability({ ...baseParams, level: 44 })).toEqual(34.06);
    expect(calculateProbability({ ...baseParams, level: 45 })).toEqual(34.11);
    expect(calculateProbability({ ...baseParams, level: 46 })).toEqual(33.98);
    expect(calculateProbability({ ...baseParams, level: 47 })).toEqual(33.96);
    expect(calculateProbability({ ...baseParams, level: 48 })).toEqual(33.94);
    expect(calculateProbability({ ...baseParams, level: 49 })).toEqual(33.89);
    expect(calculateProbability({ ...baseParams, level: 50 })).toEqual(33.89);
    expect(calculateProbability({ ...baseParams, level: 51 })).toEqual(33.89);
    expect(calculateProbability({ ...baseParams, level: 52 })).toEqual(33.89);
    expect(calculateProbability({ ...baseParams, level: 53 })).toEqual(33.89);
    expect(calculateProbability({ ...baseParams, level: 54 })).toEqual(33.89);
    expect(calculateProbability({ ...baseParams, level: 55 })).toEqual(33.91);
    expect(calculateProbability({ ...baseParams, level: 56 })).toEqual(33.89);
    expect(calculateProbability({ ...baseParams, level: 57 })).toEqual(33.81);
    expect(calculateProbability({ ...baseParams, level: 58 })).toEqual(33.89);
    expect(calculateProbability({ ...baseParams, level: 59 })).toEqual(33.89);
    expect(calculateProbability({ ...baseParams, level: 60 })).toEqual(33.86);
    expect(calculateProbability({ ...baseParams, level: 61 })).toEqual(33.89);
    expect(calculateProbability({ ...baseParams, level: 62 })).toEqual(33.89);
    expect(calculateProbability({ ...baseParams, level: 63 })).toEqual(33.89);
    expect(calculateProbability({ ...baseParams, level: 64 })).toEqual(33.84);
    expect(calculateProbability({ ...baseParams, level: 65 })).toEqual(33.84);
    expect(calculateProbability({ ...baseParams, level: 66 })).toEqual(33.96);
    expect(calculateProbability({ ...baseParams, level: 67 })).toEqual(33.91);
    expect(calculateProbability({ ...baseParams, level: 68 })).toEqual(33.74);
    expect(calculateProbability({ ...baseParams, level: 69 })).toEqual(33.84);
    expect(calculateProbability({ ...baseParams, level: 70 })).toEqual(33.86);
});

it("ensures yellow hp bar results using pokéball", () => {
    const baseParams = {
        generation: Generation.GEN1_RB,
        pokeball: PokeBalls.POKE_BALL,
        statusCondition: StatusCondition.NONE,
        level: 50,
        hpPercentage: null,
        hpBarYellow: true,
        hpBarRed: false,
    } as CatchRateInputDto;

    // rattata for high capture rate
    expect(calculateProbability({ ...baseParams, pokemon: 19 })).toEqual(70.56);

    // // onix for medium capture rate
    expect(calculateProbability({ ...baseParams, pokemon: 95 })).toEqual(12.72);

    // mewtwo for low capture rate
    expect(calculateProbability({ ...baseParams, pokemon: 150 })).toEqual(1.09);
});

it("ensures red hp bar results using pokéball", () => {
    const baseParams = {
        generation: Generation.GEN1_RB,
        pokeball: PokeBalls.POKE_BALL,
        statusCondition: StatusCondition.NONE,
        level: 50,
        hpPercentage: null,
        hpBarYellow: false,
        hpBarRed: true,
    } as CatchRateInputDto;

    // rattata for high capture rate
    expect(calculateProbability({ ...baseParams, pokemon: 19 })).toEqual(100);

    // onix for medium capture rate
    expect(calculateProbability({ ...baseParams, pokemon: 95 })).toEqual(17.97);

    // // mewtwo for low capture rate
    expect(calculateProbability({ ...baseParams, pokemon: 150 })).toEqual(1.56);
});

it("ensures hp percentage results using pokéball", () => {
    const baseParams = {
        generation: Generation.GEN1_RB,
        pokeball: PokeBalls.POKE_BALL,
        statusCondition: StatusCondition.NONE,
        level: 50,
        hpBarYellow: false,
        hpBarRed: false,
    } as CatchRateInputDto;

    // rattata for high capture rate
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 1 })).toEqual(100);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 5 })).toEqual(100);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 10 })).toEqual(100);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 15 })).toEqual(100);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 20 })).toEqual(100);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 25 })).toEqual(100);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 30 })).toEqual(100);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 35 })).toEqual(98.58);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 40 })).toEqual(86.57);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 45 })).toEqual(77.32);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 50 })).toEqual(69.12);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 55 })).toEqual(62.79);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 60 })).toEqual(57.54);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 65 })).toEqual(53.1);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 70 })).toEqual(49.07);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 75 })).toEqual(45.68);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 80 })).toEqual(42.53);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 85 })).toEqual(40.23);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 90 })).toEqual(37.99);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 95 })).toEqual(35.99);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 100 })).toEqual(33.89);

    // onix for medium capture rate
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 1 })).toEqual(17.97);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 5 })).toEqual(17.97);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 10 })).toEqual(17.97);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 20 })).toEqual(17.97);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 30 })).toEqual(17.97);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 40 })).toEqual(15.74);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 50 })).toEqual(12.4);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 60 })).toEqual(10.28);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 70 })).toEqual(8.81);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 80 })).toEqual(7.64);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 90 })).toEqual(6.82);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 100 })).toEqual(6.09);

    // mewtwo for low capture rate
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 1 })).toEqual(1.56);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 5 })).toEqual(1.56);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 10 })).toEqual(1.56);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 20 })).toEqual(1.56);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 30 })).toEqual(1.56);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 40 })).toEqual(1.34);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 50 })).toEqual(1.06);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 60 })).toEqual(0.88);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 70 })).toEqual(0.76);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 80 })).toEqual(0.66);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 90 })).toEqual(0.59);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 100 })).toEqual(0.53);
});

it("ensures great ball results at different hp, no status", () => {
    const baseParams = {
        generation: Generation.GEN1_RB,
        pokeball: PokeBalls.GREAT_BALL,
        statusCondition: StatusCondition.NONE,
        hpBarYellow: false,
        hpBarRed: false,
    } as CatchRateInputDto;

    // rattata for high capture rate
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 1, level: 2 })).toEqual(100);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 50, level: 2 })).toEqual(100);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 100, level: 2 })).toEqual(54.3);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 1, level: 10 })).toEqual(100);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 50, level: 10 })).toEqual(100);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 100, level: 10 })).toEqual(53.42);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 1, level: 30 })).toEqual(100);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 50, level: 30 })).toEqual(100);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 100, level: 30 })).toEqual(51.37);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 1, level: 50 })).toEqual(100);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 50, level: 50 })).toEqual(100);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 100, level: 50 })).toEqual(50.78);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 1, level: 70 })).toEqual(100);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 50, level: 70 })).toEqual(100);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 100, level: 70 })).toEqual(50.63);

    // onix for medium capture rate
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 1, level: 2 })).toEqual(22.89);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 50, level: 2 })).toEqual(22.89);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 100, level: 2 })).toEqual(12.48);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 1, level: 10 })).toEqual(22.89);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 50, level: 10 })).toEqual(22.89);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 100, level: 10 })).toEqual(12.08);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 1, level: 30 })).toEqual(22.89);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 50, level: 30 })).toEqual(22.89);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 100, level: 30 })).toEqual(11.69);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 1, level: 50 })).toEqual(22.89);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 50, level: 50 })).toEqual(22.89);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 100, level: 50 })).toEqual(11.61);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 1, level: 70 })).toEqual(22.89);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 50, level: 70 })).toEqual(22.89);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 100, level: 70 })).toEqual(11.57);

    // mewtwo for low capture rate
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 1, level: 2 })).toEqual(1.99);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 50, level: 2 })).toEqual(1.99);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 100, level: 2 })).toEqual(1);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 1, level: 10 })).toEqual(1.99);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 50, level: 10 })).toEqual(1.99);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 100, level: 10 })).toEqual(1.04);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 1, level: 30 })).toEqual(1.99);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 50, level: 30 })).toEqual(1.99);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 100, level: 30 })).toEqual(1.01);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 1, level: 50 })).toEqual(1.99);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 50, level: 50 })).toEqual(1.99);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 100, level: 50 })).toEqual(1);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 1, level: 70 })).toEqual(1.99);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 50, level: 70 })).toEqual(1.99);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 100, level: 70 })).toEqual(1);
});

it("ensures ultra ball results at different hp, no status", () => {
    const baseParams = {
        generation: Generation.GEN1_RB,
        pokeball: PokeBalls.ULTRA_BALL,
        statusCondition: StatusCondition.NONE,
        hpBarYellow: false,
        hpBarRed: false,
    } as CatchRateInputDto;

    // rattata for high capture rate
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 1, level: 2 })).toEqual(100);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 50, level: 2 })).toEqual(100);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 100, level: 2 })).toEqual(36.33);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 1, level: 10 })).toEqual(100);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 50, level: 10 })).toEqual(75.34);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 100, level: 10 })).toEqual(35.74);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 1, level: 30 })).toEqual(100);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 50, level: 30 })).toEqual(70.34);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 100, level: 30 })).toEqual(34.35);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 1, level: 50 })).toEqual(100);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 50, level: 50 })).toEqual(69.12);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 100, level: 50 })).toEqual(33.89);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 1, level: 70 })).toEqual(100);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 50, level: 70 })).toEqual(68.48);
    expect(calculateProbability({ ...baseParams, pokemon: 19, hpPercentage: 100, level: 70 })).toEqual(33.86);

    // onix for medium capture rate
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 1, level: 2 })).toEqual(30.46);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 50, level: 2 })).toEqual(30.46);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 100, level: 2 })).toEqual(11.12);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 1, level: 10 })).toEqual(30.46);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 50, level: 10 })).toEqual(23.78);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 100, level: 10 })).toEqual(10.76);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 1, level: 30 })).toEqual(30.46);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 50, level: 30 })).toEqual(21.52);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 100, level: 30 })).toEqual(10.4);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 1, level: 50 })).toEqual(30.46);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 50, level: 50 })).toEqual(21.02);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 100, level: 50 })).toEqual(10.32);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 1, level: 70 })).toEqual(30.46);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 50, level: 70 })).toEqual(20.77);
    expect(calculateProbability({ ...baseParams, pokemon: 95, hpPercentage: 100, level: 70 })).toEqual(10.29);

    // mewtwo for low capture rate
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 1, level: 2 })).toEqual(2.65);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 50, level: 2 })).toEqual(1.77);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 100, level: 2 })).toEqual(0.89);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 1, level: 10 })).toEqual(2.65);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 50, level: 10 })).toEqual(1.87);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 100, level: 10 })).toEqual(0.93);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 1, level: 30 })).toEqual(2.65);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 50, level: 30 })).toEqual(1.82);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 100, level: 30 })).toEqual(0.9);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 1, level: 50 })).toEqual(2.65);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 50, level: 50 })).toEqual(1.8);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 100, level: 50 })).toEqual(0.89);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 1, level: 70 })).toEqual(2.65);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 50, level: 70 })).toEqual(1.79);
    expect(calculateProbability({ ...baseParams, pokemon: 150, hpPercentage: 100, level: 70 })).toEqual(0.89);
});

it("ensures status results with different pokémon at different hp", () => {
    const baseParamsRattata = {
        pokemon: 19,
        generation: Generation.GEN1_RB,
        pokeball: PokeBalls.POKE_BALL,
        level: 70,
        hpPercentage: 100,
        hpBarYellow: false,
        hpBarRed: false,
    } as CatchRateInputDto;

    expect(calculateProbability({ ...baseParamsRattata, statusCondition: StatusCondition.NONE })).toEqual(33.86);
    expect(calculateProbability({ ...baseParamsRattata, statusCondition: StatusCondition.BAD_POISON })).toEqual(33.86);
    expect(calculateProbability({ ...baseParamsRattata, statusCondition: StatusCondition.POISON })).toEqual(36.96);
    expect(calculateProbability({ ...baseParamsRattata, statusCondition: StatusCondition.PARALYSIS })).toEqual(36.96);
    expect(calculateProbability({ ...baseParamsRattata, statusCondition: StatusCondition.BURN })).toEqual(36.96);
    expect(calculateProbability({ ...baseParamsRattata, statusCondition: StatusCondition.SLEEP })).toEqual(40.32);
    expect(calculateProbability({ ...baseParamsRattata, statusCondition: StatusCondition.FREEZE })).toEqual(40.32);

    const baseParamsOnix = {
        pokemon: 95,
        generation: Generation.GEN1_RB,
        pokeball: PokeBalls.GREAT_BALL,
        level: 50,
        hpPercentage: 50,
        hpBarYellow: false,
        hpBarRed: false,
    } as CatchRateInputDto;

    expect(calculateProbability({ ...baseParamsOnix, statusCondition: StatusCondition.NONE })).toEqual(22.89);
    expect(calculateProbability({ ...baseParamsOnix, statusCondition: StatusCondition.BAD_POISON })).toEqual(22.89);
    expect(calculateProbability({ ...baseParamsOnix, statusCondition: StatusCondition.POISON })).toEqual(28.86);
    expect(calculateProbability({ ...baseParamsOnix, statusCondition: StatusCondition.PARALYSIS })).toEqual(28.86);
    expect(calculateProbability({ ...baseParamsOnix, statusCondition: StatusCondition.BURN })).toEqual(28.86);
    expect(calculateProbability({ ...baseParamsOnix, statusCondition: StatusCondition.SLEEP })).toEqual(35.32);
    expect(calculateProbability({ ...baseParamsOnix, statusCondition: StatusCondition.FREEZE })).toEqual(35.32);

    const baseParamsMewto = {
        pokemon: 150,
        generation: Generation.GEN1_RB,
        pokeball: PokeBalls.ULTRA_BALL,
        level: 30,
        hpPercentage: 30,
        hpBarYellow: false,
        hpBarRed: false,
    } as CatchRateInputDto;

    expect(calculateProbability({ ...baseParamsMewto, statusCondition: StatusCondition.NONE })).toEqual(2.65);
    expect(calculateProbability({ ...baseParamsMewto, statusCondition: StatusCondition.BAD_POISON })).toEqual(2.65);
    expect(calculateProbability({ ...baseParamsMewto, statusCondition: StatusCondition.POISON })).toEqual(10.6);
    expect(calculateProbability({ ...baseParamsMewto, statusCondition: StatusCondition.PARALYSIS })).toEqual(10.6);
    expect(calculateProbability({ ...baseParamsMewto, statusCondition: StatusCondition.BURN })).toEqual(10.6);
    expect(calculateProbability({ ...baseParamsMewto, statusCondition: StatusCondition.SLEEP })).toEqual(19.21);
    expect(calculateProbability({ ...baseParamsMewto, statusCondition: StatusCondition.FREEZE })).toEqual(19.21);
});

it("ensures different catch rate of raticate is considered before gen 3", () => {
    const baseParamsRB = {
        pokemon: 20,
        generation: Generation.GEN1_RB,
        pokeball: PokeBalls.POKE_BALL,
        statusCondition: StatusCondition.NONE,
        hpPercentage: 100,
        hpBarYellow: false,
        hpBarRed: false,
    } as CatchRateInputDto;

    expect(calculateProbability({ ...baseParamsRB, level: 2 })).toEqual(13.89);
    expect(calculateProbability({ ...baseParamsRB, level: 10 })).toEqual(12.46);
    expect(calculateProbability({ ...baseParamsRB, level: 30 })).toEqual(12.13);
    expect(calculateProbability({ ...baseParamsRB, level: 50 })).toEqual(12.05);
    expect(calculateProbability({ ...baseParamsRB, level: 70 })).toEqual(11.99);

    const baseParamsY = {
        pokemon: 20,
        generation: Generation.GEN1_Y,
        pokeball: PokeBalls.POKE_BALL,
        statusCondition: StatusCondition.NONE,
        hpPercentage: 100,
        hpBarYellow: false,
        hpBarRed: false,
    } as CatchRateInputDto;

    expect(calculateProbability({ ...baseParamsY, level: 2 })).toEqual(13.89);
    expect(calculateProbability({ ...baseParamsY, level: 10 })).toEqual(12.46);
    expect(calculateProbability({ ...baseParamsY, level: 30 })).toEqual(12.13);
    expect(calculateProbability({ ...baseParamsY, level: 50 })).toEqual(12.05);
    expect(calculateProbability({ ...baseParamsY, level: 70 })).toEqual(11.99);
});

it("ensures different catch rate of dragonair and dragonite is considered in yellow", () => {
    const baseParamsRB = {
        generation: Generation.GEN1_RB,
        pokeball: PokeBalls.POKE_BALL,
        statusCondition: StatusCondition.NONE,
        hpPercentage: 50,
        hpBarYellow: false,
        hpBarRed: false,
    } as CatchRateInputDto;

    // Dragonair at 50% HP to force differences
    expect(calculateProbability({ ...baseParamsRB, pokemon: 148, level: 2 })).toEqual(17.97);
    expect(calculateProbability({ ...baseParamsRB, pokemon: 148, level: 10 })).toEqual(12.46);
    expect(calculateProbability({ ...baseParamsRB, pokemon: 148, level: 30 })).toEqual(12.56);
    expect(calculateProbability({ ...baseParamsRB, pokemon: 148, level: 50 })).toEqual(12.31);
    expect(calculateProbability({ ...baseParamsRB, pokemon: 148, level: 70 })).toEqual(12.22);

    // Dragonite at 50% HP to force differences
    expect(calculateProbability({ ...baseParamsRB, pokemon: 149, level: 2 })).toEqual(15.36);
    expect(calculateProbability({ ...baseParamsRB, pokemon: 149, level: 10 })).toEqual(13.39);
    expect(calculateProbability({ ...baseParamsRB, pokemon: 149, level: 30 })).toEqual(12.5);
    expect(calculateProbability({ ...baseParamsRB, pokemon: 149, level: 50 })).toEqual(12.25);
    expect(calculateProbability({ ...baseParamsRB, pokemon: 149, level: 70 })).toEqual(12.16);

    const baseParamsY = {
        generation: Generation.GEN1_Y,
        pokeball: PokeBalls.POKE_BALL,
        statusCondition: StatusCondition.NONE,
        hpPercentage: 50,
        hpBarYellow: false,
        hpBarRed: false,
    } as CatchRateInputDto;

    // Dragonair at 50% HP to force differences
    expect(calculateProbability({ ...baseParamsY, pokemon: 148, level: 2 })).toEqual(10.94);
    expect(calculateProbability({ ...baseParamsY, pokemon: 148, level: 10 })).toEqual(7.59);
    expect(calculateProbability({ ...baseParamsY, pokemon: 148, level: 30 })).toEqual(7.65);
    expect(calculateProbability({ ...baseParamsY, pokemon: 148, level: 50 })).toEqual(7.49);
    expect(calculateProbability({ ...baseParamsY, pokemon: 148, level: 70 })).toEqual(7.44);

    // Dragonite at 50% HP to force differences
    expect(calculateProbability({ ...baseParamsY, pokemon: 149, level: 2 })).toEqual(3.34);
    expect(calculateProbability({ ...baseParamsY, pokemon: 149, level: 10 })).toEqual(2.91);
    expect(calculateProbability({ ...baseParamsY, pokemon: 149, level: 30 })).toEqual(2.72);
    expect(calculateProbability({ ...baseParamsY, pokemon: 149, level: 50 })).toEqual(2.66);
    expect(calculateProbability({ ...baseParamsY, pokemon: 149, level: 70 })).toEqual(2.64);
});
