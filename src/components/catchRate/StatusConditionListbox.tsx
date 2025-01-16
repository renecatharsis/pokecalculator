import { useState } from "react";
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CatchRateInputDto } from "@/dto/CatchRateInputDto";
import { mergeClassList } from "@/util/domAttributes";
import DropdownArrow from "@/components/formElements/DropdownArrow";
import { getStatusConditionList, StatusConditionListItem } from "@/dataProviders/StatusConditionProvider";

export default function StatusConditionListbox({
    state,
    stateHandler,
}: {
    state: CatchRateInputDto;
    stateHandler: (catchRateInputDto: CatchRateInputDto) => void;
}) {
    const statusConditions = getStatusConditionList();
    const [selectedStatusCondition, setSelectedStatusCondition] = useState(statusConditions[0]); // none

    return (
        <Listbox
            value={selectedStatusCondition}
            onChange={(statusCondition: StatusConditionListItem) => {
                setSelectedStatusCondition(statusCondition);
                stateHandler({
                    ...state,
                    statusCondition: statusCondition.id,
                });
            }}
        >
            <Label className="block text-sm font-medium leading-6">Status Condition</Label>
            <div className="relative mt-2">
                <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                    <span className="flex items-center">
                        <span className="block truncate mr-3">{selectedStatusCondition.display}</span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <DropdownArrow />
                    </span>
                </ListboxButton>

                <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {statusConditions.map((statusCondition: StatusConditionListItem) => (
                        <ListboxOption
                            key={statusCondition.id}
                            className={({ focus }) =>
                                mergeClassList(
                                    focus ? "bg-indigo-600 text-white" : "text-gray-900",
                                    "relative cursor-default select-none py-2 pl-3 pr-9",
                                )
                            }
                            value={statusCondition}
                        >
                            {() => (
                                <>
                                    <div className="flex items-center">
                                        <span className="mr-3">{statusCondition.display}</span>
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
