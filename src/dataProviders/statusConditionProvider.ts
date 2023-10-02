import { StatusCondition } from "@/enum/statusCondition";

interface StatusConditionListInterface {
  id: number;
  display: string;
}

const statusConditionList = function (): StatusConditionListInterface[] {
  return [
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
};

export { statusConditionList };
export type { StatusConditionListInterface };
