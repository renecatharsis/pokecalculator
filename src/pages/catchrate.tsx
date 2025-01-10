import UnorderedList from "@/components/list/UnorderedList";
import { CatchRateInputDto } from "@/dto/catchRateInputDto";
import { CatchRateOutputDto } from "@/dto/catchRateOutputDto";
import { mergeClassList } from "@/util/domAttributes";
import { ApiDefinition } from "@/enum/apiDefinition";
import {
    generationsList,
    GenerationListHighlightInterface,
    GenerationListInterface,
} from "@/dataProviders/generationProvider";
import { statusConditionList, StatusConditionListInterface } from "@/dataProviders/statusConditionProvider";
import { pokeballList, PokeballListInterface } from "@/dataProviders/pokeballProvider";
import {
    Listbox,
    Transition,
    Combobox,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
    Label,
    ComboboxButton,
} from "@headlessui/react";
import { BaseSyntheticEvent, ChangeEvent, FormEvent, Fragment, useEffect, useState } from "react";
import PokemonCombobox from "@/components/formElements/PokemonCombobox";

export default function CatchRate() {
    // const generations = generationsList();
    // const pokeballs = pokeballList();
    // const statusConditions = statusConditionList();

    const [hasBackendError, setHasBackendError] = useState(false);
    // const [selectedPokeball, setSelectedPokeball] = useState(pokeballs[17]); // regular poké ball
    // const [selectedGeneration, setSelectedGeneration] = useState(generations[0]); // gen 1
    // const [selectedStatusCondition, setSelectedStatusCondition] = useState(statusConditions[0]); // none

    const [catchRate, setCatchRate] = useState(0.0);
    const [catchRateInput, setCatchRateInput] = useState<CatchRateInputDto>({
        generation: 1,
        pokeball: 0,
        pokemon: 1,
        statusCondition: 0,
        darkGrass: false,
        hpCurrent: null,
        hpMax: null,
        hpBarOrange: false,
        hpBarRed: false,
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
                setCatchRate(responseBody.probability);
            })
            .catch(() => setHasBackendError(true));
    }, [catchRateInput]);

    // function updatedSelectedPokemon(pokemon: PokemonListInterface) {
    //     setSelectedPokemon(pokemon);
    //     setCatchRateInput({
    //         ...catchRateInput,
    //         pokemon: pokemon.id,
    //     });
    // }
    //
    // function updatedSelectedGeneration(generation: GenerationListInterface) {
    //     setSelectedGeneration(generation);
    //     setCatchRateInput({
    //         ...catchRateInput,
    //         generation: generation.id,
    //     });
    // }
    //
    // function updatedSelectedPokeball(pokeball: PokeballListInterface) {
    //     setSelectedPokeball(pokeball);
    //     setCatchRateInput({
    //         ...catchRateInput,
    //         pokeball: pokeball.id,
    //     });
    // }
    //
    // function updatedSelectedStatusCondition(statusCondition: StatusConditionListInterface) {
    //     setSelectedStatusCondition(statusCondition);
    //     setCatchRateInput({
    //         ...catchRateInput,
    //         statusCondition: statusCondition.id,
    //     });
    // }
    //
    // function updateCatchRateInput(event: BaseSyntheticEvent) {
    //     setCatchRateInput({
    //         ...catchRateInput,
    //         [event.target.name]: parseInt(event.target.value),
    //     });
    // }
    //
    // function updateCatchRateInputCheckbox(event: BaseSyntheticEvent) {
    //     setCatchRateInput({
    //         ...catchRateInput,
    //         [event.target.name]: event.target.checked,
    //     });
    // }
    //

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
                                </a>
                                .
                            </p>

                            <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                    <div className="mt-2">
                                        <PokemonCombobox state={catchRateInput} stateHandler={setCatchRateInput} />
                                    </div>
                                </div>

                                {/*<div className="sm:col-span-2">*/}
                                {/*    <Listbox value={selectedGeneration} onChange={updatedSelectedGeneration}>*/}
                                {/*        {({ open }) => (*/}
                                {/*            <>*/}
                                {/*                <Listbox.Label className="block text-sm font-medium leading-6">*/}
                                {/*                    Generation*/}
                                {/*                </Listbox.Label>*/}
                                {/*                <div className="relative mt-2">*/}
                                {/*                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">*/}
                                {/*                        <span className="flex items-center">*/}
                                {/*                            <span className="block truncate mr-3">*/}
                                {/*                                {selectedGeneration.displayName}*/}
                                {/*                            </span>*/}
                                {/*                            {selectedGeneration.classAppendix.map(*/}
                                {/*                                (appendix: GenerationListHighlightInterface) => {*/}
                                {/*                                    return (*/}
                                {/*                                        <span*/}
                                {/*                                            key={appendix.displayShortcut}*/}
                                {/*                                            className={mergeClassList(*/}
                                {/*                                                "generation_box",*/}
                                {/*                                                "generation_box--" +*/}
                                {/*                                                    appendix.classNameAppendix,*/}
                                {/*                                            )}*/}
                                {/*                                        >*/}
                                {/*                                            {appendix.displayShortcut}*/}
                                {/*                                        </span>*/}
                                {/*                                    );*/}
                                {/*                                },*/}
                                {/*                            )}*/}
                                {/*                        </span>*/}
                                {/*                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">*/}
                                {/*                            <DropdownArrow />*/}
                                {/*                        </span>*/}
                                {/*                    </Listbox.Button>*/}

                                {/*                    <Transition*/}
                                {/*                        show={open}*/}
                                {/*                        as={Fragment}*/}
                                {/*                        leave="transition ease-in duration-100"*/}
                                {/*                        leaveFrom="opacity-100"*/}
                                {/*                        leaveTo="opacity-0"*/}
                                {/*                    >*/}
                                {/*                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">*/}
                                {/*                            {generations.map((generation: GenerationListInterface) => (*/}
                                {/*                                <Listbox.Option*/}
                                {/*                                    key={generation.id}*/}
                                {/*                                    className={({ active }) =>*/}
                                {/*                                        mergeClassList(*/}
                                {/*                                            active*/}
                                {/*                                                ? "bg-indigo-600 text-white"*/}
                                {/*                                                : "text-gray-900",*/}
                                {/*                                            "relative cursor-default select-none py-2 pl-3 pr-9",*/}
                                {/*                                        )*/}
                                {/*                                    }*/}
                                {/*                                    value={generation}*/}
                                {/*                                >*/}
                                {/*                                    {() => (*/}
                                {/*                                        <>*/}
                                {/*                                            <div className="flex items-center">*/}
                                {/*                                                <span className="mr-3">*/}
                                {/*                                                    {generation.displayName}*/}
                                {/*                                                </span>*/}
                                {/*                                                {generation.classAppendix.map(*/}
                                {/*                                                    (*/}
                                {/*                                                        appendix: GenerationListHighlightInterface,*/}
                                {/*                                                    ) => {*/}
                                {/*                                                        return (*/}
                                {/*                                                            <span*/}
                                {/*                                                                key={*/}
                                {/*                                                                    appendix.displayShortcut*/}
                                {/*                                                                }*/}
                                {/*                                                                className={mergeClassList(*/}
                                {/*                                                                    "generation_box",*/}
                                {/*                                                                    "generation_box--" +*/}
                                {/*                                                                        appendix.classNameAppendix,*/}
                                {/*                                                                )}*/}
                                {/*                                                            >*/}
                                {/*                                                                {*/}
                                {/*                                                                    appendix.displayShortcut*/}
                                {/*                                                                }*/}
                                {/*                                                            </span>*/}
                                {/*                                                        );*/}
                                {/*                                                    },*/}
                                {/*                                                )}*/}
                                {/*                                            </div>*/}
                                {/*                                        </>*/}
                                {/*                                    )}*/}
                                {/*                                </Listbox.Option>*/}
                                {/*                            ))}*/}
                                {/*                        </Listbox.Options>*/}
                                {/*                    </Transition>*/}
                                {/*                </div>*/}
                                {/*            </>*/}
                                {/*        )}*/}
                                {/*    </Listbox>*/}
                                {/*</div>*/}

                                {/*<div className="sm:col-span-2">*/}
                                {/*    <Listbox value={selectedPokeball} onChange={updatedSelectedPokeball}>*/}
                                {/*        {({ open }) => (*/}
                                {/*            <>*/}
                                {/*                <Listbox.Label className="block text-sm font-medium leading-6">*/}
                                {/*                    Poké Ball*/}
                                {/*                </Listbox.Label>*/}
                                {/*                <div className="relative mt-2">*/}
                                {/*                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">*/}
                                {/*                        <span className="flex items-center">*/}
                                {/*                            <img*/}
                                {/*                                src={selectedPokeball.thumbnail}*/}
                                {/*                                alt={selectedPokeball.display}*/}
                                {/*                                className="h-5 w-5 flex-shrink-0 rounded-full"*/}
                                {/*                            />*/}
                                {/*                            <span className="ml-3 block truncate">*/}
                                {/*                                {selectedPokeball.display}*/}
                                {/*                            </span>*/}
                                {/*                        </span>*/}
                                {/*                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">*/}
                                {/*                            <DropdownArrow />*/}
                                {/*                        </span>*/}
                                {/*                    </Listbox.Button>*/}

                                {/*                    <Transition*/}
                                {/*                        show={open}*/}
                                {/*                        as={Fragment}*/}
                                {/*                        leave="transition ease-in duration-100"*/}
                                {/*                        leaveFrom="opacity-100"*/}
                                {/*                        leaveTo="opacity-0"*/}
                                {/*                    >*/}
                                {/*                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">*/}
                                {/*                            {pokeballs.map((pokeball: PokeballListInterface) => (*/}
                                {/*                                <Listbox.Option*/}
                                {/*                                    key={pokeball.id}*/}
                                {/*                                    className={({ active }) =>*/}
                                {/*                                        mergeClassList(*/}
                                {/*                                            active*/}
                                {/*                                                ? "bg-indigo-600 text-white"*/}
                                {/*                                                : "text-gray-900",*/}
                                {/*                                            "relative cursor-default select-none py-2 pl-3 pr-9",*/}
                                {/*                                        )*/}
                                {/*                                    }*/}
                                {/*                                    value={pokeball}*/}
                                {/*                                >*/}
                                {/*                                    {() => (*/}
                                {/*                                        <>*/}
                                {/*                                            <div className="flex items-center">*/}
                                {/*                                                <img*/}
                                {/*                                                    src={pokeball.thumbnail}*/}
                                {/*                                                    alt=""*/}
                                {/*                                                    className="h-5 w-5 mr-4 flex-shrink-0 rounded-full"*/}
                                {/*                                                />*/}
                                {/*                                                <span>{pokeball.display}</span>*/}
                                {/*                                            </div>*/}
                                {/*                                        </>*/}
                                {/*                                    )}*/}
                                {/*                                </Listbox.Option>*/}
                                {/*                            ))}*/}
                                {/*                        </Listbox.Options>*/}
                                {/*                    </Transition>*/}
                                {/*                </div>*/}
                                {/*            </>*/}
                                {/*        )}*/}
                                {/*    </Listbox>*/}
                                {/*</div>*/}

                                {/*<div className="sm:col-span-2">*/}
                                {/*    <Listbox value={selectedStatusCondition} onChange={updatedSelectedStatusCondition}>*/}
                                {/*        {({ open }) => (*/}
                                {/*            <>*/}
                                {/*                <Listbox.Label className="block text-sm font-medium leading-6">*/}
                                {/*                    Status Condition*/}
                                {/*                </Listbox.Label>*/}
                                {/*                <div className="relative mt-2">*/}
                                {/*                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">*/}
                                {/*                        <span className="flex items-center">*/}
                                {/*                            <span className="block truncate mr-3">*/}
                                {/*                                {selectedStatusCondition.display}*/}
                                {/*                            </span>*/}
                                {/*                        </span>*/}
                                {/*                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">*/}
                                {/*                            <DropdownArrow />*/}
                                {/*                        </span>*/}
                                {/*                    </Listbox.Button>*/}

                                {/*                    <Transition*/}
                                {/*                        show={open}*/}
                                {/*                        as={Fragment}*/}
                                {/*                        leave="transition ease-in duration-100"*/}
                                {/*                        leaveFrom="opacity-100"*/}
                                {/*                        leaveTo="opacity-0"*/}
                                {/*                    >*/}
                                {/*                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">*/}
                                {/*                            {statusConditions.map(*/}
                                {/*                                (statusCondition: StatusConditionListInterface) => (*/}
                                {/*                                    <Listbox.Option*/}
                                {/*                                        key={statusCondition.id}*/}
                                {/*                                        className={({ active }) =>*/}
                                {/*                                            mergeClassList(*/}
                                {/*                                                active*/}
                                {/*                                                    ? "bg-indigo-600 text-white"*/}
                                {/*                                                    : "text-gray-900",*/}
                                {/*                                                "relative cursor-default select-none py-2 pl-3 pr-9",*/}
                                {/*                                            )*/}
                                {/*                                        }*/}
                                {/*                                        value={statusCondition}*/}
                                {/*                                    >*/}
                                {/*                                        {() => (*/}
                                {/*                                            <>*/}
                                {/*                                                <div className="flex items-center">*/}
                                {/*                                                    <span className="mr-3">*/}
                                {/*                                                        {statusCondition.display}*/}
                                {/*                                                    </span>*/}
                                {/*                                                </div>*/}
                                {/*                                            </>*/}
                                {/*                                        )}*/}
                                {/*                                    </Listbox.Option>*/}
                                {/*                                ),*/}
                                {/*                            )}*/}
                                {/*                        </Listbox.Options>*/}
                                {/*                    </Transition>*/}
                                {/*                </div>*/}
                                {/*            </>*/}
                                {/*        )}*/}
                                {/*    </Listbox>*/}
                                {/*</div>*/}

                                {/*<div className="sm:col-span-2 sm:col-start-1">*/}
                                {/*    <label htmlFor="hpCurrent" className="block text-sm font-medium leading-6">*/}
                                {/*        Current HP*/}
                                {/*    </label>*/}
                                {/*    <div className="mt-2">*/}
                                {/*        <input*/}
                                {/*            type="number"*/}
                                {/*            name="hpCurrent"*/}
                                {/*            id="hpCurrent"*/}
                                {/*            placeholder="Use orange/red bar if unsure"*/}
                                {/*            onChange={updateCatchRateInput}*/}
                                {/*            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                {/*<div className="sm:col-span-2">*/}
                                {/*    <label htmlFor="hpMax" className="block text-sm font-medium leading-6">*/}
                                {/*        Max HP*/}
                                {/*    </label>*/}
                                {/*    <div className="mt-2">*/}
                                {/*        <input*/}
                                {/*            type="number"*/}
                                {/*            name="hpMax"*/}
                                {/*            id="hpMax"*/}
                                {/*            placeholder="Use orange/red bar if unsure"*/}
                                {/*            onChange={updateCatchRateInput}*/}
                                {/*            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                {/*<div className="sm:col-span-2 sm:col-start-1">*/}
                                {/*    <label htmlFor="hpBarOrange" className="block text-sm font-medium leading-6">*/}
                                {/*        Orange HP bar*/}
                                {/*    </label>*/}
                                {/*    <div className="mt-2">*/}
                                {/*        <input*/}
                                {/*            id="hpBarOrange"*/}
                                {/*            name="hpBarOrange"*/}
                                {/*            type="checkbox"*/}
                                {/*            onChange={updateCatchRateInputCheckbox}*/}
                                {/*            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                {/*<div className="sm:col-span-2">*/}
                                {/*    <label htmlFor="hpBarRed" className="block text-sm font-medium leading-6">*/}
                                {/*        Red HP bar*/}
                                {/*    </label>*/}
                                {/*    <div className="mt-2">*/}
                                {/*        <input*/}
                                {/*            id="hpBarRed"*/}
                                {/*            name="hpBarRed"*/}
                                {/*            type="checkbox"*/}
                                {/*            onChange={updateCatchRateInputCheckbox}*/}
                                {/*            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                {/*<div className="sm:col-span-3 sm:col-start-1">*/}
                                {/*    <label htmlFor="status" className="block text-sm font-medium leading-6">*/}
                                {/*        Dark grass*/}
                                {/*    </label>*/}
                                {/*    <div className="mt-2">*/}
                                {/*        <input*/}
                                {/*            id="darkGrass"*/}
                                {/*            name="darkGrass"*/}
                                {/*            type="checkbox"*/}
                                {/*            onChange={updateCatchRateInputCheckbox}*/}
                                {/*            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*</div>*/}

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

                    <div className="pt-6 pb-6 border-t border-b md:border-b-0 border-gray-900/10 ">
                        <p className="text-base font-semibold leading-7">
                            Catch rate probability: <span className="text-orange-500">{catchRate}%</span>
                        </p>
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
