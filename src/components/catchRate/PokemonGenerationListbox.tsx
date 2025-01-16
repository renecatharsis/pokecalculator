import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { useState } from "react";
import DropdownArrow from "@/components/formElements/DropdownArrow";
import { CatchRateInputDto } from "@/dto/CatchRateInputDto";
import { mergeClassList } from "@/util/domAttributes";
import {
    GenerationListItem,
    GenerationListItemHighlight,
    getGenerationsList,
} from "@/dataProviders/GenerationProvider";

export default function PokemonGenerationListbox({
    state,
    stateHandler,
}: {
    state: CatchRateInputDto;
    stateHandler: (catchRateInputDto: CatchRateInputDto) => void;
}) {
    const generations = getGenerationsList();
    const [selectedGeneration, setSelectedGeneration] = useState(generations[0]); // Gen 1

    return (
        <Listbox
            value={selectedGeneration}
            onChange={(generation: GenerationListItem) => {
                setSelectedGeneration(generation);
                stateHandler({
                    ...state,
                    generation: generation.id,
                });
            }}
        >
            <Label className="block text-sm font-medium leading-6">Generation</Label>
            <div className="relative mt-2">
                <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                    <span className="flex items-center">
                        <span className="block truncate mr-3">{selectedGeneration.displayName}</span>
                        {selectedGeneration.classAppendix.map((appendix: GenerationListItemHighlight) => {
                            return (
                                <span
                                    key={appendix.displayShortcut}
                                    className={mergeClassList(
                                        "generation_box",
                                        "generation_box--" + appendix.classNameAppendix,
                                    )}
                                >
                                    {appendix.displayShortcut}
                                </span>
                            );
                        })}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <DropdownArrow />
                    </span>
                </ListboxButton>

                <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                    {generations.map((generation: GenerationListItem) => (
                        <ListboxOption
                            key={generation.id}
                            className={({ focus }) =>
                                mergeClassList(
                                    focus ? "bg-indigo-600 text-white" : "text-gray-900",
                                    "relative cursor-default select-none py-2 pl-3 pr-9",
                                )
                            }
                            value={generation}
                        >
                            {() => (
                                <>
                                    <div className="flex items-center">
                                        <span className="mr-3">{generation.displayName}</span>
                                        {generation.classAppendix.map((appendix: GenerationListItemHighlight) => {
                                            return (
                                                <span
                                                    key={appendix.displayShortcut}
                                                    className={mergeClassList(
                                                        "generation_box",
                                                        "generation_box--" + appendix.classNameAppendix,
                                                    )}
                                                >
                                                    {appendix.displayShortcut}
                                                </span>
                                            );
                                        })}
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
