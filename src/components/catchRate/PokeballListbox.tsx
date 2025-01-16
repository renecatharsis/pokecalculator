import { useState } from "react";
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CatchRateInputDto } from "@/dto/CatchRateInputDto";
import { getPokeballList, PokeballListItem } from "@/dataProviders/PokeballProvider";
import { mergeClassList } from "@/util/domAttributes";
import DropdownArrow from "@/components/formElements/DropdownArrow";

export default function PokeballListbox({
    state,
    stateHandler,
}: {
    state: CatchRateInputDto;
    stateHandler: (catchRateInputDto: CatchRateInputDto) => void;
}) {
    const pokeballs = getPokeballList();
    const [selectedPokeball, setSelectedPokeball] = useState(pokeballs[17]); // regular Poké Ball

    return (
        <Listbox
            value={selectedPokeball}
            onChange={(pokeball: PokeballListItem) => {
                setSelectedPokeball(pokeball);
                stateHandler({
                    ...state,
                    pokeball: pokeball.id,
                });
            }}
        >
            <Label className="block text-sm font-medium leading-6">Poké Ball</Label>
            <div className="relative mt-2">
                <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                    <span className="flex items-center">
                        <img
                            src={selectedPokeball.thumbnail}
                            alt={selectedPokeball.display}
                            className="h-5 w-5 flex-shrink-0 rounded-full"
                        />
                        <span className="ml-3 block truncate">{selectedPokeball.display}</span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <DropdownArrow />
                    </span>
                </ListboxButton>

                <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {pokeballs.map((pokeball: PokeballListItem) => (
                        <ListboxOption
                            key={pokeball.id}
                            className={({ focus }) =>
                                mergeClassList(
                                    focus ? "bg-indigo-600 text-white" : "text-gray-900",
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
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    );
}
