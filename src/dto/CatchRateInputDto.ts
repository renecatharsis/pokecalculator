import { z } from "zod";
import { Generation } from "@/enum/Generation";
import { PokeBalls } from "@/enum/PokeBalls";
import { StatusCondition } from "@/enum/StatusCondition";

export const catchRateInputSchema = z.object({
    pokemon: z.number().min(1).max(1025), // max supported pokémon for now
    generation: z.nativeEnum(Generation),
    pokeball: z.nativeEnum(PokeBalls),
    statusCondition: z.nativeEnum(StatusCondition),
    hpPercentage: z.number().min(1).max(100).nullable(),
    hpBarYellow: z.boolean(),
    hpBarRed: z.boolean(),
    darkGrass: z.boolean(),
});

export type CatchRateInputDto = z.infer<typeof catchRateInputSchema>;
