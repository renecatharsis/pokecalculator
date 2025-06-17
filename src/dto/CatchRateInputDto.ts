import { z } from "zod";
import { Generation } from "@/enum/Generation";
import { PokeBalls } from "@/enum/PokeBalls";
import { StatusCondition } from "@/enum/StatusCondition";

export const catchRateInputSchema = z.object({
    pokemon: z.number().min(1).max(1025), // max supported pokémon for now
    generation: z.nativeEnum(Generation),
    pokeball: z.nativeEnum(PokeBalls),
    statusCondition: z.nativeEnum(StatusCondition),
    level: z.number().min(2).max(70), // official games' level ranges for wild pokémon
    hpPercentage: z.number().min(1).max(100).nullable(),
    hpBarYellow: z.boolean(),
    hpBarRed: z.boolean(),
    darkGrass: z.boolean(),
    fishing: z.boolean(),
    sameSpecies: z.boolean(),
    sameSex: z.boolean(),
    ownLevel: z.number().min(1).max(100),
});

export type CatchRateInputDto = z.infer<typeof catchRateInputSchema>;
