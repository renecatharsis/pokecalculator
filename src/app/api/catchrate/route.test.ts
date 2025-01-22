/**
 * @jest-environment node
 */
import { POST } from "./route";
import { NextRequest } from "next/server";
import { Generation } from "@/enum/Generation";
import { PokeBalls } from "@/enum/PokeBalls";
import { StatusCondition } from "@/enum/StatusCondition";
import { CatchRateOutputDto, CatchRateOutputNoticeDto } from "@/dto/CatchRateOutputDto";

it("should return error 400 on empty json body", async () => {
    const requestObj = {
        json: async () => ({}),
    } as NextRequest;

    const response = await POST(requestObj);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.length).toBe(8);
});

it("should return error 400 on invalid types", async () => {
    const requestObj = {
        json: async () => ({
            pokemon: "foo",
            generation: "foo",
            pokeball: "foo",
            statusCondition: "foo",
            darkGrass: "foo",
            hpPercentage: "foo",
            hpBarYellow: "foo",
            hpBarRed: "foo",
        }),
    } as NextRequest;

    const response = await POST(requestObj);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.length).toBe(8);
});

it("should return warning when providing hp percentage and yellow bar", async () => {
    const requestObj = {
        json: async () => ({
            pokemon: 1,
            generation: Generation.GEN1,
            pokeball: PokeBalls.POKE_BALL,
            statusCondition: StatusCondition.NONE,
            darkGrass: false,
            hpPercentage: 100,
            hpBarYellow: true,
            hpBarRed: false,
        }),
    } as NextRequest;

    const response = await POST(requestObj);
    const body = (await response.json()) as CatchRateOutputDto;

    expect(response.status).toBe(200);
    expect(body.probability).toBeGreaterThanOrEqual(0);
    expect(body.probability).toBeLessThanOrEqual(100);
    expect(body.notices.length).toBe(1);
    expect(body.notices).toContainEqual({
        path: "hpPercentage",
        message: "HP percentage provided, ignoring yellow and red bar settings.",
    } as CatchRateOutputNoticeDto);
});

it("should return warning when providing hp percentage and red bar", async () => {
    const requestObj = {
        json: async () => ({
            pokemon: 1,
            generation: Generation.GEN1,
            pokeball: PokeBalls.POKE_BALL,
            statusCondition: StatusCondition.NONE,
            darkGrass: false,
            hpPercentage: 100,
            hpBarYellow: false,
            hpBarRed: true,
        }),
    } as NextRequest;

    const response = await POST(requestObj);
    const body = (await response.json()) as CatchRateOutputDto;

    expect(response.status).toBe(200);
    expect(body.probability).toBeGreaterThanOrEqual(0);
    expect(body.probability).toBeLessThanOrEqual(100);
    expect(body.notices.length).toBe(1);
    expect(body.notices).toContainEqual({
        path: "hpPercentage",
        message: "HP percentage provided, ignoring yellow and red bar settings.",
    } as CatchRateOutputNoticeDto);
});

it("should return warning when providing hp percentage and yellow & red bar", async () => {
    const requestObj = {
        json: async () => ({
            pokemon: 1,
            generation: Generation.GEN1,
            pokeball: PokeBalls.POKE_BALL,
            statusCondition: StatusCondition.NONE,
            darkGrass: false,
            hpPercentage: 100,
            hpBarYellow: true,
            hpBarRed: true,
        }),
    } as NextRequest;

    const response = await POST(requestObj);
    const body = (await response.json()) as CatchRateOutputDto;

    expect(response.status).toBe(200);
    expect(body.probability).toBeGreaterThanOrEqual(0);
    expect(body.probability).toBeLessThanOrEqual(100);
    expect(body.notices.length).toBe(1);
    expect(body.notices).toContainEqual({
        path: "hpPercentage",
        message: "HP percentage provided, ignoring yellow and red bar settings.",
    } as CatchRateOutputNoticeDto);
});

it("should return warning when providing no hp percentage and yellow & red bar", async () => {
    const requestObj = {
        json: async () => ({
            pokemon: 1,
            generation: Generation.GEN1,
            pokeball: PokeBalls.POKE_BALL,
            statusCondition: StatusCondition.NONE,
            darkGrass: false,
            hpPercentage: null,
            hpBarYellow: true,
            hpBarRed: true,
        }),
    } as NextRequest;

    const response = await POST(requestObj);
    const body = (await response.json()) as CatchRateOutputDto;

    expect(response.status).toBe(200);
    expect(body.probability).toBeGreaterThanOrEqual(0);
    expect(body.probability).toBeLessThanOrEqual(100);
    expect(body.notices.length).toBe(1);
    expect(body.notices).toContainEqual({
        path: "hpPercentage",
        message: "Using red bar cutoff for HP percentage.",
    } as CatchRateOutputNoticeDto);
});

it("should return warning when providing no hp percentage, no yellow & no red bar", async () => {
    const requestObj = {
        json: async () => ({
            pokemon: 1,
            generation: Generation.GEN1,
            pokeball: PokeBalls.POKE_BALL,
            statusCondition: StatusCondition.NONE,
            darkGrass: false,
            hpPercentage: null,
            hpBarYellow: false,
            hpBarRed: false,
        }),
    } as NextRequest;

    const response = await POST(requestObj);
    const body = (await response.json()) as CatchRateOutputDto;

    expect(response.status).toBe(200);
    expect(body.probability).toBeGreaterThanOrEqual(0);
    expect(body.probability).toBeLessThanOrEqual(100);
    expect(body.notices.length).toBe(1);
    expect(body.notices).toContainEqual({
        path: "hpPercentage",
        message: "Assuming full HP.",
    } as CatchRateOutputNoticeDto);
});

it("should return warnings on invalid settings for gen1", async () => {
    const requestObj = {
        json: async () => ({
            generation: Generation.GEN1,
            pokeball: PokeBalls.TIMER_BALL, // not available in gen1
            pokemon: 250, // not available in gen1
            statusCondition: StatusCondition.NONE,
            darkGrass: false,
            hpPercentage: 100,
            hpBarYellow: false,
            hpBarRed: false,
        }),
    } as NextRequest;

    const response = await POST(requestObj);
    const body = (await response.json()) as CatchRateOutputDto;

    expect(response.status).toBe(200);
    expect(body.probability).toBeGreaterThanOrEqual(0);
    expect(body.probability).toBeLessThanOrEqual(100);
    expect(body.notices.length).toBe(2);
    expect(body.notices).toContainEqual({
        path: "pokeball",
        message: "Selected ball is not available in Gen 1, defaulting to Poké Ball.",
    } as CatchRateOutputNoticeDto);
    expect(body.notices).toContainEqual({
        path: "pokemon",
        message: "Selected Pokémon is not available in Gen 1, defaulting to Bulbasaur.",
    } as CatchRateOutputNoticeDto);
});
