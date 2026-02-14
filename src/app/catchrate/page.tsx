"use client";

import { type BaseSyntheticEvent, useEffect, useState } from "react";
import PokeballListbox from "@/components/catchRate/PokeballListbox";
import PokemonCombobox from "@/components/catchRate/PokemonCombobox";
import PokemonGenerationListbox from "@/components/catchRate/PokemonGenerationListbox";
import StatusConditionListbox from "@/components/catchRate/StatusConditionListbox";
import HeadlessUiCheckbox from "@/components/formElements/HeadlessUiCheckbox";
import HeadlessUiErrors from "@/components/formElements/HeadlessUiErrors";
import HeadlessUiNoticesAlert from "@/components/formElements/HeadlessUiNoticesAlert";
import UnorderedList from "@/components/list/UnorderedList";
import type { CatchRateInputDto } from "@/dto/CatchRateInputDto";
import type { CatchRateOutputDto } from "@/dto/CatchRateOutputDto";
import { ApiDefinition } from "@/enum/ApiDefinition";
import { Generation } from "@/enum/Generation";
import { PokeBalls } from "@/enum/PokeBalls";
import { StatusCondition } from "@/enum/StatusCondition";

export default function CatchRate() {
    const [hasBackendError, setHasBackendError] = useState<boolean>(false);
    const [catchRate, setCatchRate] = useState<CatchRateOutputDto>({
        probability: 0,
        notices: [],
    });
    const [catchRateInput, setCatchRateInput] = useState<CatchRateInputDto>({
        pokemon: 1,
        generation: Generation.GEN1_RB,
        pokeball: PokeBalls.POKE_BALL,
        statusCondition: StatusCondition.NONE,
        level: 2,
        hpPercentage: 100,
        hpBarYellow: false,
        hpBarRed: false,
        darkGrass: false,
        fishing: false,
        sameSpecies: false,
        sameSex: false,
        ownLevel: 100,
    });

    useEffect(() => {
        const handler = setTimeout(() => {
            fetch(ApiDefinition.CATCHRATE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(catchRateInput),
            })
                .then((response) => {
                    if (response.status === 422) {
                        throw new Error("Invalid parameters provided");
                    }

                    return response.json();
                })
                .then((responseBody: CatchRateOutputDto) => {
                    setHasBackendError(false);
                    setCatchRate(responseBody);
                })
                .catch(() => setHasBackendError(true));
        }, 200);

        return () => clearTimeout(handler);
    }, [catchRateInput]);

    function updateCatchRateInput(event: BaseSyntheticEvent) {
        let value = parseInt(event.target.value, 10);

        if (event.target.type === "number") {
            const min = event.target.getAttribute("min") ? parseInt(event.target.getAttribute("min"), 10) : null;
            const max = event.target.getAttribute("max") ? parseInt(event.target.getAttribute("max"), 10) : null;

            if (min !== null && min > value) {
                event.target.value = value = min;
            }
            if (max !== null && max < value) {
                event.target.value = value = max;
            }
        }

        setCatchRateInput({
            ...catchRateInput,
            [event.target.name]: value,
        });
    }

    function updateCatchRateInputCheckbox(name: string, checked: boolean) {
        setCatchRateInput({
            ...catchRateInput,
            [name]: checked,
        });
    }

    return (
        <div className="min-h-screen md:w-3/5">
            <div className="flex flex-wrap sm:flex-none md:flex-nowrap md:space-x-10 gap-y-5">
                <div className="md:basis-3/4 pt-5 p-5 border border-gray-200 bg-secondary shadow-xs rounded-lg">
                    <form autoComplete="off">
                        <div className="pb-8">
                            <h2 className="text-base font-semibold leading-7">Check your approximate catch rate.</h2>
                            <p className="mt-1 text-sm leading-6">
                                Edge cases or unexpected behaviour will be listed together with the results.
                                <br />
                                Check out our{" "}
                                <a className="font-bold underline" href="/maths">
                                    more in depth page
                                </a>{" "}
                                for an explanation on inaccuracies and why real hardware can stray away from our
                                results.
                            </p>

                            <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                                <div className="sm:col-span-5">
                                    <PokemonCombobox state={catchRateInput} stateHandler={setCatchRateInput} />
                                </div>

                                <div className="sm:col-span-1">
                                    <label htmlFor="level" className="block text-sm font-medium leading-6">
                                        Level ( 2 - 70 )
                                    </label>
                                    <div className="mt-2 md:col-span-4 flex items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <input
                                            type="number"
                                            name="level"
                                            id="level"
                                            defaultValue="2"
                                            min="2"
                                            max="70"
                                            onChange={updateCatchRateInput}
                                            className="block min-w-0 grow py-1.5 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-solid focus:outline-0 sm:text-sm/6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <PokemonGenerationListbox state={catchRateInput} stateHandler={setCatchRateInput} />
                                </div>

                                <div className="sm:col-span-3">
                                    <PokeballListbox state={catchRateInput} stateHandler={setCatchRateInput} />
                                </div>

                                <div className="sm:col-span-2">
                                    <StatusConditionListbox state={catchRateInput} stateHandler={setCatchRateInput} />
                                </div>

                                <div className="sm:col-span-6 sm:col-start-1">
                                    <label htmlFor="hpCurrent" className="block text-sm font-medium leading-6">
                                        HP percentage (use checkboxes instead if you can&#39;t tell)
                                    </label>
                                    <div className="flex justify-start flex-col md:flex-row gap-x-6">
                                        <div className="mt-2 md:col-span-4 flex items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                            <input
                                                type="number"
                                                name="hpPercentage"
                                                id="hpPercentage"
                                                defaultValue="100"
                                                min="1"
                                                max="100"
                                                onChange={updateCatchRateInput}
                                                className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-solid focus:outline-0 sm:text-sm/6"
                                            />
                                            <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
                                                %
                                            </div>
                                        </div>

                                        <div className="mt-3">
                                            <HeadlessUiCheckbox
                                                name="hpBarYellow"
                                                label="HP Bar Yellow?"
                                                stateHandler={updateCatchRateInputCheckbox}
                                            />
                                        </div>

                                        <div className="mt-3">
                                            <HeadlessUiCheckbox
                                                name="hpBarRed"
                                                label="HP Red Bar?"
                                                stateHandler={updateCatchRateInputCheckbox}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {catchRateInput.generation !== Generation.GEN1_RB &&
                                    catchRateInput.generation !== Generation.GEN1_Y &&
                                    catchRateInput.pokeball === PokeBalls.LURE_BALL && (
                                        <div className="sm:col-span-6 sm:col-start-1">
                                            <HeadlessUiCheckbox
                                                name="fishing"
                                                label="Are you fishing?"
                                                stateHandler={updateCatchRateInputCheckbox}
                                            />
                                        </div>
                                    )}

                                {catchRateInput.generation !== Generation.GEN1_RB &&
                                    catchRateInput.generation !== Generation.GEN1_Y &&
                                    catchRateInput.pokeball === PokeBalls.LOVE_BALL && (
                                        <div className="sm:col-span-6 sm:col-start-1">
                                            <HeadlessUiCheckbox
                                                name="sameSpecies"
                                                label="Is your Pokémon the same species?"
                                                stateHandler={updateCatchRateInputCheckbox}
                                            />
                                        </div>
                                    )}
                                {catchRateInput.generation !== Generation.GEN1_RB &&
                                    catchRateInput.generation !== Generation.GEN1_Y &&
                                    catchRateInput.pokeball === PokeBalls.LOVE_BALL && (
                                        <div className="sm:col-span-6 sm:col-start-1">
                                            <HeadlessUiCheckbox
                                                name="sameSex"
                                                label="Is your Pokémon of the same sex?"
                                                stateHandler={updateCatchRateInputCheckbox}
                                            />
                                        </div>
                                    )}

                                {catchRateInput.generation !== Generation.GEN1_RB &&
                                    catchRateInput.generation !== Generation.GEN1_Y &&
                                    catchRateInput.pokeball === PokeBalls.LEVEL_BALL && (
                                        <div className="sm:col-span-2 sm:col-start-1">
                                            <label htmlFor="ownLevel" className="block text-sm font-medium leading-6">
                                                Your Pokémon&#39;s level ( 1 - 100 )
                                            </label>
                                            <div className="mt-2 md:col-span-4 flex items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                                <input
                                                    type="number"
                                                    name="ownLevel"
                                                    id="ownLevel"
                                                    defaultValue="100"
                                                    min="1"
                                                    max="100"
                                                    onChange={updateCatchRateInput}
                                                    className="block min-w-0 grow py-1.5 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-solid focus:outline-0 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </form>

                    <div className="pt-6 pb-6 border-t border-t-white ">
                        <p className="text-base font-semibold leading-7">
                            Catch rate probability: <span className="text-orange-500">{catchRate.probability}%</span>
                        </p>
                        {catchRate.notices && catchRate.notices.length > 0 && (
                            <HeadlessUiNoticesAlert messages={catchRate.notices} />
                        )}
                        {hasBackendError && (
                            <HeadlessUiErrors
                                messages={[
                                    "Unfortunately, something went wrong there.",
                                    "Please let us know, so we can look into it!",
                                ]}
                            />
                        )}
                    </div>
                </div>

                <div className="md:basis-1/3 pt-5 p-5 border border-gray-200 bg-secondary shadow-xs rounded-lg">
                    <h2 className="text-base font-semibold leading-7">Good to know:</h2>
                    <ul className="mt-2">
                        <UnorderedList text="No support for Shadow Pokémon" />
                        <UnorderedList text="No support for Pokémon Legends Arceus & Let's Go Eevee / Pikachu" />
                        <UnorderedList text="No support for Safari Zones or parks" />
                    </ul>
                </div>
            </div>
        </div>
    );
}
