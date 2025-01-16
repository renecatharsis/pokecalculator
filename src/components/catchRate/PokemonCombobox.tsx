import { ChangeEvent, useState } from "react";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Label } from "@headlessui/react";
import DropdownArrow from "@/components/formElements/DropdownArrow";
import { mergeClassList } from "@/util/domAttributes";
import { getPokemonList, PokemonListItem } from "@/dataProviders/PokemonProvider";
import { CatchRateInputDto } from "@/dto/CatchRateInputDto";

const MAX_RESULTS: number = 25;

export default function PokemonCombobox({
    state,
    stateHandler,
}: {
    state: CatchRateInputDto;
    stateHandler: (catchRateInputDto: CatchRateInputDto) => void;
}) {
    const pokemonData = getPokemonList();

    const [selectedPokemon, setSelectedPokemon] = useState(pokemonData[0]); // Bulbasaur
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

    function overridePokemonComboboxDisplayValue(pokemon: PokemonListItem) {
        // show pokémon thumbnail in input matching the combobox options
        // unfortunately html values are not supported, so using a background image seems like the only way to do it for now
        const element: HTMLElement | null = document.querySelector('input[name="pokemon"]');

        if (!element) {
            return;
        }

        element.style.backgroundImage = 'url("' + pokemon.thumbnail + '")';
    }

    return (
        <Combobox
            as="div"
            immediate
            value={selectedPokemon}
            onChange={(pokemon: PokemonListItem) => {
                setSelectedPokemon(pokemon);
                overridePokemonComboboxDisplayValue(pokemon);
                stateHandler({
                    ...state,
                    pokemon: pokemon.id,
                });
            }}
        >
            <Label className="block text-sm font-medium leading-6">Pokémon</Label>
            <div className="relative mt-2">
                <ComboboxInput
                    className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-gray-900 sm:text-sm sm:leading-6"
                    style={{
                        backgroundImage: "url(sprites/pokemon/1.png)",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "left",
                        backgroundSize: "contain",
                        paddingLeft: "2.5rem",
                    }}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setPokemonQuery(event.target.value)}
                    displayValue={(pokemon: PokemonListItem) => pokemon.display}
                    name="pokemon"
                />
                <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <DropdownArrow />
                </ComboboxButton>

                {filteredPokemon.length > 0 && (
                    <ComboboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredPokemon.map((pokemon: PokemonListItem) => (
                            <ComboboxOption
                                key={pokemon.id}
                                value={pokemon}
                                className={({ focus }) =>
                                    mergeClassList(
                                        "relative cursor-default select-none py-2 pl-3 pr-9",
                                        focus ? "bg-indigo-600 text-white" : "text-gray-900",
                                    )
                                }
                            >
                                {({ selected }) => (
                                    <>
                                        <div className="flex items-center">
                                            <img
                                                src={pokemon.thumbnail}
                                                alt={pokemon.display}
                                                className="h-6 w-6 flex-shrink-0 rounded-full"
                                            />
                                            <span
                                                className={mergeClassList("ml-3 truncate", selected && "font-semibold")}
                                            >
                                                {pokemon.display}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </ComboboxOption>
                        ))}
                    </ComboboxOptions>
                )}
            </div>
        </Combobox>
    );
}
