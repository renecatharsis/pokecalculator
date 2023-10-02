import { z } from "zod";
import { Generation } from "@/enum/generation";
import { PokeBalls } from "@/enum/pokeBalls";
import { StatusCondition } from "@/enum/statusCondition";

export const catchRateInputSchema = z.object({
  pokemon: z.number().min(1).max(1017), // max supported pokémon for now
  generation: z.number().min(Generation.GEN1).max(Generation.GEN9), // 9 generations
  pokeball: z.number().min(PokeBalls.BEAST_BALL).max(PokeBalls.ULTRA_BALL), // 24 balls
  statusCondition: z
    .number()
    .min(StatusCondition.NONE)
    .max(StatusCondition.FREEZE), // 7 status conditions
  hpCurrent: z.number().min(1).nullable(),
  hpMax: z.number().min(1).nullable(),
  hpBarOrange: z.boolean(),
  hpBarRed: z.boolean(),
  darkGrass: z.boolean(),
});

export type CatchRateInputDto = z.infer<typeof catchRateInputSchema>;
