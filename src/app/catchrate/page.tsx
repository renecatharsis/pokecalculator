"use client";

import { BaseSyntheticEvent, useEffect, useState } from "react";
import UnorderedList from "@/components/list/UnorderedList";
import PokemonCombobox from "@/components/catchRate/PokemonCombobox";
import PokemonGenerationListbox from "@/components/catchRate/PokemonGenerationListbox";
import { CatchRateInputDto } from "@/dto/CatchRateInputDto";
import { CatchRateOutputDto } from "@/dto/CatchRateOutputDto";
import { ApiDefinition } from "@/enum/ApiDefinition";
import { mergeClassList } from "@/util/domAttributes";
import PokeballListbox from "@/components/catchRate/PokeballListbox";
import StatusConditionListbox from "@/components/catchRate/StatusConditionListbox";
import HeadlessUiCheckbox from "@/components/formElements/HeadlessUiCheckbox";
import HeadlessUiAlert from "@/components/formElements/HeadlessUiAlert";
import { StatusCondition } from "@/enum/StatusCondition";
import { PokeBalls } from "@/enum/PokeBalls";
import { Generation } from "@/enum/Generation";

export default function CatchRate() {
    const [hasBackendError, setHasBackendError] = useState<boolean>(false);
    const [catchRate, setCatchRate] = useState<CatchRateOutputDto>({
        probability: 0,
        notices: [],
    });
    const [catchRateInput, setCatchRateInput] = useState<CatchRateInputDto>({
        pokemon: 1,
        generation: Generation.GEN1,
        pokeball: PokeBalls.POKE_BALL,
        statusCondition: StatusCondition.NONE,
        hpPercentage: 100,
        hpBarOrange: false,
        hpBarRed: false,
        darkGrass: false,
    });

    useEffect(() => {
        fetch(ApiDefinition.CATCHRATE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(catchRateInput),
        })
            .then((response) => response.json())
            .then((responseBody: CatchRateOutputDto) => {
                setHasBackendError(false);
                setCatchRate(responseBody);
            })
            .catch(() => setHasBackendError(true));
    }, [catchRateInput]);

    function updateCatchRateInput(event: BaseSyntheticEvent) {
        setCatchRateInput({
            ...catchRateInput,
            [event.target.name]: parseInt(event.target.value),
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
                <div className="md:basis-3/4 pt-5 p-5 border border-gray-200 bg-secondary shadow-sm rounded-lg">
                    <form autoComplete="off">
                        <div className="pb-8">
                            <h2 className="text-base font-semibold leading-7">Check your approximate catch rate.</h2>
                            <p className="mt-1 text-sm leading-6">
                                This works primarily for the main line games, some edge cases excluded.
                                <br />
                                Calculations are based on formulas and information from{" "}
                                <a
                                    href="https://www.pokewiki.de/Fangchance"
                                    target="_blank"
                                    rel="noopener"
                                    className="underline"
                                >
                                    PokéWiki
                                </a>{" "}
                                and{" "}
                                <a
                                    href="https://bulbapedia.bulbagarden.net/wiki/Catch_rate"
                                    target="_blank"
                                    rel="noopener"
                                    className="underline"
                                >
                                    Bulbapedia
                                </a>
                                .
                            </p>

                            <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                    <div className="mt-2">
                                        <PokemonCombobox state={catchRateInput} stateHandler={setCatchRateInput} />
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
                                        HP percentage (use checkboxes if you can&#39;t tell)
                                    </label>
                                    <div className="flex justify-start flex-col md:flex-row gap-x-6">
                                        <div className="mt-2 md:col-span-2 flex items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                            <input
                                                type="number"
                                                name="hpPercentage"
                                                id="hpPercentage"
                                                placeholder="100"
                                                onChange={updateCatchRateInput}
                                                className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                            />
                                            <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
                                                %
                                            </div>
                                        </div>

                                        <div className="mt-3">
                                            <HeadlessUiCheckbox
                                                name={"hpBarOrange"}
                                                label={"HP Bar Orange?"}
                                                stateHandler={updateCatchRateInputCheckbox}
                                            />
                                        </div>

                                        <div className="mt-3">
                                            <HeadlessUiCheckbox
                                                name={"hpBarRed"}
                                                label={"HP Red Bar?"}
                                                stateHandler={updateCatchRateInputCheckbox}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <p
                                    className={
                                        (mergeClassList("sm:col-start-1 sm:col-span-2"),
                                        !hasBackendError ? "hidden" : "")
                                    }
                                >
                                    <span className={!hasBackendError ? "hidden" : ""}>Something went wrong :-/</span>
                                </p>
                            </div>
                        </div>
                    </form>

                    <div className="pt-6 pb-6 border-t border-t-white ">
                        <p className="text-base font-semibold leading-7">
                            Catch rate probability: <span className="text-orange-500">{catchRate.probability}%</span>
                        </p>
                        {catchRate.notices.length > 0 && <HeadlessUiAlert messages={catchRate.notices} />}
                    </div>
                </div>

                <div className="md:basis-1/3 pt-5 p-5 border border-gray-200 bg-secondary shadow-sm rounded-lg">
                    <h2 className="text-base font-semibold leading-7">Good to know:</h2>
                    <ul className="mt-2">
                        <UnorderedList text="No support for Shadow Pokémon" />
                        <UnorderedList text="No support for Pokémon Legends Arceus & Let's Go Eevee / Pikachu" />
                        <UnorderedList text="No support for Safari Zones or parks" />
                        <UnorderedList text="Be mindful of weird results due to in-game bugs (e.g. Bad Poison before Gen4)" />
                    </ul>
                </div>
            </div>
        </div>
    );
}
