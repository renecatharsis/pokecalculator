import { z } from "zod";
import { Generation } from "@/enum/Generation";
import { PokeBalls } from "@/enum/PokeBalls";
import { StatusCondition } from "@/enum/StatusCondition";

export const catchRateInputSchema = z.object({
    pokemon: z.number().min(1).max(1017), // max supported pokémon for now
    generation: z.number().min(Generation.GEN1).max(Generation.GEN9), // 9 generations
    pokeball: z.number().min(PokeBalls.BEAST_BALL).max(PokeBalls.ULTRA_BALL), // 24 balls
    statusCondition: z.number().min(StatusCondition.NONE).max(StatusCondition.FREEZE), // 7 status conditions
    hpCurrent: z.number().nullable(),
    hpMax: z.number().nullable(),
    hpBarOrange: z.boolean(),
    hpBarRed: z.boolean(),
    darkGrass: z.boolean(),
});

export type CatchRateInputDto = z.infer<typeof catchRateInputSchema>;
