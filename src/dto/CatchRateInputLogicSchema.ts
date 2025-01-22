import { z } from "zod";
import { Generation } from "@/enum/Generation";
import { PokeBalls } from "@/enum/PokeBalls";

export const catchRateInputLogicSchema = z
    .object({
        pokemon: z.number().min(1).max(1017), // max supported pokémon for now
        generation: z.number().min(Generation.GEN1).max(Generation.GEN9), // 9 generations
        pokeball: z.nativeEnum(PokeBalls),
        hpPercentage: z.number().nullable(),
        hpBarYellow: z.boolean(),
        hpBarRed: z.boolean(),
    })
    // HP bar cutoffs
    .superRefine(({ hpPercentage, hpBarYellow, hpBarRed }, refinementContext) => {
        if (hpPercentage !== null && (hpBarYellow || hpBarRed)) {
            refinementContext.addIssue({
                path: ["hpPercentage"],
                code: "custom",
                message: "HP percentage provided, ignoring yellow and red bar settings.",
            });
        }

        if (hpPercentage === null && hpBarYellow && hpBarRed) {
            refinementContext.addIssue({
                path: ["hpPercentage"],
                code: "custom",
                message: "Using red bar cutoff for HP percentage.",
            });
        }

        if (hpPercentage === null && !hpBarYellow && !hpBarRed) {
            refinementContext.addIssue({
                path: ["hpPercentage"],
                code: "custom",
                message: "Assuming full HP.",
            });
        }
    })
    // gen 1 custom rules
    .superRefine(({ pokemon, generation, pokeball }, refinementContext) => {
        if (generation !== Generation.GEN1) {
            return;
        }

        if (pokemon > 151) {
            refinementContext.addIssue({
                path: ["pokemon"],
                code: "custom",
                message: "Selected Pokémon is not available in Gen 1, defaulting to Bulbasaur.",
            });
        }

        if (
            pokeball != PokeBalls.POKE_BALL &&
            pokeball !== PokeBalls.GREAT_BALL &&
            pokeball !== PokeBalls.ULTRA_BALL &&
            pokeball !== PokeBalls.MASTER_BALL
        ) {
            refinementContext.addIssue({
                path: ["pokeball"],
                code: "custom",
                message: "Selected ball is not available in Gen 1, defaulting to Poké Ball.",
            });
        }
    });

export type CatchRateInputLogicDto = z.infer<typeof catchRateInputLogicSchema>;
