import { useState } from "react";
import { Checkbox, Field, Label } from "@headlessui/react";

export default function HeadlessUiCheckbox({
    name,
    label,
    stateHandler,
}: {
    name: string;
    label: string;
    stateHandler: (name: string, state: boolean) => void;
}) {
    const [enabled, setEnabled] = useState<boolean>(false);

    return (
        <Field className="flex items-center gap-2">
            <Checkbox
                checked={enabled}
                onChange={(checked: boolean) => {
                    setEnabled(checked);
                    stateHandler(name, checked);
                }}
                className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
            >
                <svg
                    className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                    viewBox="0 0 14 14"
                    fill="none"
                >
                    <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </Checkbox>
            <Label>{label}</Label>
        </Field>
    );
}
