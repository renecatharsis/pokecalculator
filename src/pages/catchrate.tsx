import UnorderedList from "@/components/list/unorderedList";
import DropdownArrow from "@/components/form/dropdownArrow";
import { CatchRateInputDto, catchRateInputSchema } from "@/dto/catchRateInputDto";
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
import { pokemonList, PokemonListInterface } from "@/dataProviders/pokemonProvider";
import { Listbox, Transition, Combobox } from "@headlessui/react";
import { ZodIssue } from "zod";
import { BaseSyntheticEvent, ChangeEvent, FormEvent, Fragment, useState } from "react";

const MAX_RESULTS: number = 25;

export default function CatchRate() {
    const generations = generationsList();
    const pokemonData = pokemonList();
    const pokeballs = pokeballList();
    const statusConditions = statusConditionList();

    const [hasBackendError, setHasBackendError] = useState(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [selectedPokemon, setSelectedPokemon] = useState(pokemonData[0]); // bulbasaur
    const [selectedPokeball, setSelectedPokeball] = useState(pokeballs[17]); // regular poké ball
    const [selectedGeneration, setSelectedGeneration] = useState(generations[0]); // gen 1
    const [selectedStatusCondition, setSelectedStatusCondition] = useState(statusConditions[0]); // none
    const [pokemonQuery, setPokemonQuery] = useState("");
    const filteredPokemon =
        pokemonQuery === ""
            ? pokemonData.filter((pokemon) => {
                  return pokemon.id < MAX_RESULTS;
              })
            : pokemonData
                  .filter((pokemon) => {
                      return pokemon.display.toLowerCase().includes(pokemonQuery.toLowerCase());
                  })
                  .slice(0, MAX_RESULTS);

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

    function updatedSelectedPokemon(pokemon: PokemonListInterface) {
        setSelectedPokemon(pokemon);
        setCatchRateInput({
            ...catchRateInput,
            pokemon: pokemon.id,
        });
    }

    function updatedSelectedGeneration(generation: GenerationListInterface) {
        setSelectedGeneration(generation);
        setCatchRateInput({
            ...catchRateInput,
            generation: generation.id,
        });
    }

    function updatedSelectedPokeball(pokeball: PokeballListInterface) {
        setSelectedPokeball(pokeball);
        setCatchRateInput({
            ...catchRateInput,
            pokeball: pokeball.id,
        });
    }

    function updatedSelectedStatusCondition(statusCondition: StatusConditionListInterface) {
        setSelectedStatusCondition(statusCondition);
        setCatchRateInput({
            ...catchRateInput,
            statusCondition: statusCondition.id,
        });
    }

    function updateCatchRateInput(event: BaseSyntheticEvent) {
        setCatchRateInput({
            ...catchRateInput,
            [event.target.name]: parseInt(event.target.value),
        });
    }

    function updateCatchRateInputCheckbox(event: BaseSyntheticEvent) {
        setCatchRateInput({
            ...catchRateInput,
            [event.target.name]: event.target.checked,
        });
    }

    function overridePokemonComboboxDisplayValue(pokemon: PokemonListInterface) {
        // show pokémon thumbnail in input matching the combobox options
        // unfortunately html values are not supported, so using a background image seems like the only way to do it for now
        const element: HTMLElement | null = document.querySelector('input[name="pokemon"]');

        if (!element) {
            return;
        }

        element.style.backgroundImage = 'url("' + pokemon.thumbnail + '")';
    }

    async function onChange(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setValidationErrors([]);
        setHasBackendError(false);

        const validatedData = catchRateInputSchema.safeParse(catchRateInput);
        if (!validatedData.success) {
            const newErrors: string[] = [];
            validatedData.error.issues.map((error: ZodIssue) => {
                newErrors.push(error.path.join(", "));
            });

            setValidationErrors(
                [...validationErrors, ...newErrors].filter((value, index, array) => array.indexOf(value) === index),
            );

            return;
        }

        const response = await fetch(ApiDefinition.CATCHRATE, {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(validatedData.data),
        });

        if (response.status === 200) {
            const responseBody: CatchRateOutputDto = await response.json();

            setCatchRate(responseBody.probability);
        } else {
            setHasBackendError(true);
        }
    }

    return (
        <div className="min-h-screen md:w-3/5">
            <div className="flex flex-wrap sm:flex-none md:flex-nowrap md:space-x-10 gap-y-5">
                <div className="md:basis-3/4 pt-5 p-5 border border-gray-200 bg-secondary shadow-sm rounded-lg">
                    <form onChange={onChange} autoComplete="off">
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
                                        <Combobox
                                            as="div"
                                            value={selectedPokemon}
                                            onChange={(pokemon: PokemonListInterface) => {
                                                updatedSelectedPokemon(pokemon);
                                                overridePokemonComboboxDisplayValue(pokemon);
                                            }}
                                        >
                                            <Combobox.Label className="block text-sm font-medium leading-6">
                                                Pokémon
                                            </Combobox.Label>
                                            <div className="relative mt-2">
                                                <Combobox.Input
                                                    className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-gray-900 sm:text-sm sm:leading-6"
                                                    style={{
                                                        backgroundImage: "url(sprites/pokemon/1.png)",
                                                        backgroundRepeat: "no-repeat",
                                                        backgroundPosition: "left",
                                                        backgroundSize: "contain",
                                                        paddingLeft: "2.5rem",
                                                    }}
                                                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                                        setPokemonQuery(event.target.value)
                                                    }
                                                    displayValue={(pokemon: PokemonListInterface) => pokemon.display}
                                                    name="pokemon"
                                                />
                                                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                                    <DropdownArrow />
                                                </Combobox.Button>

                                                {filteredPokemon.length > 0 && (
                                                    <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                        {filteredPokemon.map((pokemon: PokemonListInterface) => (
                                                            <Combobox.Option
                                                                key={pokemon.id}
                                                                value={pokemon}
                                                                className={({ active }) =>
                                                                    mergeClassList(
                                                                        "relative cursor-default select-none py-2 pl-3 pr-9",
                                                                        active
                                                                            ? "bg-indigo-600 text-white"
                                                                            : "text-gray-900",
                                                                    )
                                                                }
                                                            >
                                                                {({ selected }) => (
                                                                    <>
                                                                        <div className="flex items-center">
                                                                            <img
                                                                                src={pokemon.thumbnail}
                                                                                alt=""
                                                                                className="h-6 w-6 flex-shrink-0 rounded-full"
                                                                            />
                                                                            <span
                                                                                className={mergeClassList(
                                                                                    "ml-3 truncate",
                                                                                    selected && "font-semibold",
                                                                                )}
                                                                            >
                                                                                {pokemon.display}
                                                                            </span>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </Combobox.Option>
                                                        ))}
                                                    </Combobox.Options>
                                                )}
                                            </div>
                                        </Combobox>
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <Listbox value={selectedGeneration} onChange={updatedSelectedGeneration}>
                                        {({ open }) => (
                                            <>
                                                <Listbox.Label className="block text-sm font-medium leading-6">
                                                    Generation
                                                </Listbox.Label>
                                                <div className="relative mt-2">
                                                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                                        <span className="flex items-center">
                                                            <span className="block truncate mr-3">
                                                                {selectedGeneration.displayName}
                                                            </span>
                                                            {selectedGeneration.classAppendix.map(
                                                                (appendix: GenerationListHighlightInterface) => {
                                                                    return (
                                                                        <span
                                                                            key={appendix.displayShortcut}
                                                                            className={mergeClassList(
                                                                                "generation_box",
                                                                                "generation_box--" +
                                                                                    appendix.classNameAppendix,
                                                                            )}
                                                                        >
                                                                            {appendix.displayShortcut}
                                                                        </span>
                                                                    );
                                                                },
                                                            )}
                                                        </span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                            <DropdownArrow />
                                                        </span>
                                                    </Listbox.Button>

                                                    <Transition
                                                        show={open}
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {generations.map((generation: GenerationListInterface) => (
                                                                <Listbox.Option
                                                                    key={generation.id}
                                                                    className={({ active }) =>
                                                                        mergeClassList(
                                                                            active
                                                                                ? "bg-indigo-600 text-white"
                                                                                : "text-gray-900",
                                                                            "relative cursor-default select-none py-2 pl-3 pr-9",
                                                                        )
                                                                    }
                                                                    value={generation}
                                                                >
                                                                    {() => (
                                                                        <>
                                                                            <div className="flex items-center">
                                                                                <span className="mr-3">
                                                                                    {generation.displayName}
                                                                                </span>
                                                                                {generation.classAppendix.map(
                                                                                    (
                                                                                        appendix: GenerationListHighlightInterface,
                                                                                    ) => {
                                                                                        return (
                                                                                            <span
                                                                                                key={
                                                                                                    appendix.displayShortcut
                                                                                                }
                                                                                                className={mergeClassList(
                                                                                                    "generation_box",
                                                                                                    "generation_box--" +
                                                                                                        appendix.classNameAppendix,
                                                                                                )}
                                                                                            >
                                                                                                {
                                                                                                    appendix.displayShortcut
                                                                                                }
                                                                                            </span>
                                                                                        );
                                                                                    },
                                                                                )}
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </>
                                        )}
                                    </Listbox>
                                </div>

                                <div className="sm:col-span-2">
                                    <Listbox value={selectedPokeball} onChange={updatedSelectedPokeball}>
                                        {({ open }) => (
                                            <>
                                                <Listbox.Label className="block text-sm font-medium leading-6">
                                                    Poké Ball
                                                </Listbox.Label>
                                                <div className="relative mt-2">
                                                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                                        <span className="flex items-center">
                                                            <img
                                                                src={selectedPokeball.thumbnail}
                                                                alt={selectedPokeball.display}
                                                                className="h-5 w-5 flex-shrink-0 rounded-full"
                                                            />
                                                            <span className="ml-3 block truncate">
                                                                {selectedPokeball.display}
                                                            </span>
                                                        </span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                            <DropdownArrow />
                                                        </span>
                                                    </Listbox.Button>

                                                    <Transition
                                                        show={open}
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {pokeballs.map((pokeball: PokeballListInterface) => (
                                                                <Listbox.Option
                                                                    key={pokeball.id}
                                                                    className={({ active }) =>
                                                                        mergeClassList(
                                                                            active
                                                                                ? "bg-indigo-600 text-white"
                                                                                : "text-gray-900",
                                                                            "relative cursor-default select-none py-2 pl-3 pr-9",
                                                                        )
                                                                    }
                                                                    value={pokeball}
                                                                >
                                                                    {() => (
                                                                        <>
                                                                            <div className="flex items-center">
                                                                                <img
                                                                                    src={pokeball.thumbnail}
                                                                                    alt=""
                                                                                    className="h-5 w-5 mr-4 flex-shrink-0 rounded-full"
                                                                                />
                                                                                <span>{pokeball.display}</span>
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </>
                                        )}
                                    </Listbox>
                                </div>

                                <div className="sm:col-span-2">
                                    <Listbox value={selectedStatusCondition} onChange={updatedSelectedStatusCondition}>
                                        {({ open }) => (
                                            <>
                                                <Listbox.Label className="block text-sm font-medium leading-6">
                                                    Status Condition
                                                </Listbox.Label>
                                                <div className="relative mt-2">
                                                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                                        <span className="flex items-center">
                                                            <span className="block truncate mr-3">
                                                                {selectedStatusCondition.display}
                                                            </span>
                                                        </span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                            <DropdownArrow />
                                                        </span>
                                                    </Listbox.Button>

                                                    <Transition
                                                        show={open}
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {statusConditions.map(
                                                                (statusCondition: StatusConditionListInterface) => (
                                                                    <Listbox.Option
                                                                        key={statusCondition.id}
                                                                        className={({ active }) =>
                                                                            mergeClassList(
                                                                                active
                                                                                    ? "bg-indigo-600 text-white"
                                                                                    : "text-gray-900",
                                                                                "relative cursor-default select-none py-2 pl-3 pr-9",
                                                                            )
                                                                        }
                                                                        value={statusCondition}
                                                                    >
                                                                        {() => (
                                                                            <>
                                                                                <div className="flex items-center">
                                                                                    <span className="mr-3">
                                                                                        {statusCondition.display}
                                                                                    </span>
                                                                                </div>
                                                                            </>
                                                                        )}
                                                                    </Listbox.Option>
                                                                ),
                                                            )}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </>
                                        )}
                                    </Listbox>
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="hpCurrent" className="block text-sm font-medium leading-6">
                                        Current HP
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            name="hpCurrent"
                                            id="hpCurrent"
                                            placeholder="Use orange/red bar if unsure"
                                            onChange={updateCatchRateInput}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="hpMax" className="block text-sm font-medium leading-6">
                                        Max HP
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            name="hpMax"
                                            id="hpMax"
                                            placeholder="Use orange/red bar if unsure"
                                            onChange={updateCatchRateInput}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="hpBarOrange" className="block text-sm font-medium leading-6">
                                        Orange HP bar
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="hpBarOrange"
                                            name="hpBarOrange"
                                            type="checkbox"
                                            onChange={updateCatchRateInputCheckbox}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="hpBarRed" className="block text-sm font-medium leading-6">
                                        Red HP bar
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="hpBarRed"
                                            name="hpBarRed"
                                            type="checkbox"
                                            onChange={updateCatchRateInputCheckbox}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3 sm:col-start-1">
                                    <label htmlFor="status" className="block text-sm font-medium leading-6">
                                        Dark grass
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="darkGrass"
                                            name="darkGrass"
                                            type="checkbox"
                                            onChange={updateCatchRateInputCheckbox}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                </div>

                                <p
                                    className={
                                        (mergeClassList("sm:col-start-1 sm:col-span-2"),
                                        !hasBackendError && validationErrors.length === 0 ? "hidden" : "")
                                    }
                                >
                                    <span className={!hasBackendError ? "hidden" : ""}>Something went wrong :-/</span>
                                    <br />
                                    <span className={validationErrors.length === 0 ? "hidden" : ""}>
                                        {validationErrors.map((error) => {
                                            return <span key={error}>Check {error}</span>;
                                        })}
                                        ;
                                    </span>
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
