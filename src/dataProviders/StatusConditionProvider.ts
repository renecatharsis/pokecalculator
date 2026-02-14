import { StatusCondition } from "@/enum/StatusCondition";

interface StatusConditionListItem {
    id: number;
    display: string;
}

const getStatusConditionList = (): StatusConditionListItem[] => [
    {
        id: StatusCondition.NONE,
        display: "None",
    },
    {
        id: StatusCondition.PARALYSIS,
        display: "Paralysis",
    },
    {
        id: StatusCondition.SLEEP,
        display: "Sleep",
    },
    {
        id: StatusCondition.POISON,
        display: "Poison",
    },
    {
        id: StatusCondition.BAD_POISON,
        display: "Bad Poison",
    },
    {
        id: StatusCondition.BURN,
        display: "Burn",
    },
    {
        id: StatusCondition.FREEZE,
        display: "Freeze",
    },
];

export { getStatusConditionList };
export type { StatusConditionListItem };
