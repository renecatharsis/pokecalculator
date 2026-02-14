import { z } from "zod";
import { Generation } from "@/enum/Generation";
import { PokeBalls } from "@/enum/PokeBalls";
import { StatusCondition } from "@/enum/StatusCondition";

export const catchRateInputLogicSchema = z
    .object({
        pokemon: z.number(),
        generation: z.enum(Generation),
        pokeball: z.enum(PokeBalls),
        statusCondition: z.enum(StatusCondition),
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
            pokeball !== PokeBalls.POKE_BALL &&
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
    // gen 2 custom rules
    .superRefine(({ pokemon, generation, pokeball, statusCondition }, refinementContext) => {
        if (generation !== Generation.GEN2_GS && generation !== Generation.GEN2_C) {
            return;
        }

        if (pokemon > 251) {
            refinementContext.addIssue({
                path: ["pokemon"],
                code: "custom",
                message: "Selected Pokémon is not available in Gen 2.",
            });
        }

        if (
            pokeball !== PokeBalls.POKE_BALL &&
            pokeball !== PokeBalls.GREAT_BALL &&
            pokeball !== PokeBalls.ULTRA_BALL &&
            pokeball !== PokeBalls.MASTER_BALL &&
            pokeball !== PokeBalls.LURE_BALL &&
            pokeball !== PokeBalls.HEAVY_BALL &&
            pokeball !== PokeBalls.MOON_BALL &&
            pokeball !== PokeBalls.LEVEL_BALL &&
            pokeball !== PokeBalls.FAST_BALL &&
            pokeball !== PokeBalls.FRIEND_BALL &&
            pokeball !== PokeBalls.LOVE_BALL
        ) {
            refinementContext.addIssue({
                path: ["pokeball"],
                code: "custom",
                message: "Selected ball is not available in Gen 2.",
            });
        }

        // fast ball only works for Magnemite, Grimer and Tangela
        if (pokeball === PokeBalls.FAST_BALL && ![81, 88, 114].includes(pokemon)) {
            refinementContext.addIssue({
                path: ["pokeball"],
                code: "custom",
                message:
                    "This ball is bugged and improves the catch rate only for Magnemite, Grimer and Tangela in Gen 2.",
            });
        }

        if (pokeball === PokeBalls.LOVE_BALL) {
            refinementContext.addIssue({
                path: ["pokeball"],
                code: "custom",
                message: "This ball is bugged and works oppositive of what it says in Gen 2.",
            });
        }

        if (pokeball === PokeBalls.MOON_BALL) {
            refinementContext.addIssue({
                path: ["pokeball"],
                code: "custom",
                message: "This ball is bugged and works just like a regular Pokéball in Gen 2.",
            });
        }

        if (
            [
                StatusCondition.BURN,
                StatusCondition.PARALYSIS,
                StatusCondition.POISON,
                StatusCondition.BAD_POISON,
            ].includes(statusCondition)
        ) {
            refinementContext.addIssue({
                path: ["status"],
                code: "custom",
                message: "This status does not have any effect on catch rate in Gen 2.",
            });
        }
    })
    // ditto capture rate copy prior to gen 5
    .superRefine(({ pokemon, generation }, refinementContext) => {
        if (
            [
                Generation.GEN1_RB,
                Generation.GEN1_Y,
                Generation.GEN2_GS,
                Generation.GEN2_C,
                Generation.GEN3,
                Generation.GEN4,
            ].find((gen) => gen === generation) !== undefined &&
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
