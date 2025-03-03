import { z } from "zod";
import { Generation } from "@/enum/Generation";
import { PokeBalls } from "@/enum/PokeBalls";

export const catchRateInputLogicSchema = z
    .object({
        pokemon: z.number(),
        generation: z.nativeEnum(Generation),
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
        if (generation !== Generation.GEN1_RB && generation !== Generation.GEN1_Y) {
            return;
        }

        if (pokemon > 151) {
            refinementContext.addIssue({
                path: ["pokemon"],
                code: "custom",
                message: "Selected Pokémon is not available in Gen 1.",
            });
        }

        if (
            pokeball != PokeBalls.POKE_BALL &&
            pokeball !== PokeBalls.SAFARI_BALL &&
            pokeball !== PokeBalls.GREAT_BALL &&
            pokeball !== PokeBalls.ULTRA_BALL &&
            pokeball !== PokeBalls.MASTER_BALL
        ) {
            refinementContext.addIssue({
                path: ["pokeball"],
                code: "custom",
                message: "Selected ball is not available in Gen 1.",
            });
        }
    })
    // ditto capture rate copy prior to gen 5
    .superRefine(({ pokemon, generation }, refinementContext) => {
        if (
            [Generation.GEN1_RB, Generation.GEN1_Y, Generation.GEN2, Generation.GEN3, Generation.GEN4].find(
                (gen) => gen === generation,
            ) !== undefined &&
            pokemon === 132
        ) {
            refinementContext.addIssue({
                path: ["pokemon"],
                code: "custom",
                message: "Prior to Gen 5, Ditto also copies the capture rate of the Pokémon it transforms into.",
            });
        }
    });

export type CatchRateInputLogicDto = z.infer<typeof catchRateInputLogicSchema>;
