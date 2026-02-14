import { Generation } from "@/enum/Generation";

interface GenerationListItem {
    id: Generation;
    classAppendix: GenerationListItemHighlight[];
    displayName: string;
}

interface GenerationListItemHighlight {
    displayShortcut: string;
    classNameAppendix: string;
}

const getGenerationsList = (): GenerationListItem[] => [
    {
        id: Generation.GEN1_RB,
        classAppendix: [
            { displayShortcut: "R", classNameAppendix: "red" },
            { displayShortcut: "B", classNameAppendix: "blue" },
        ],
        displayName: "Gen1",
    },
    {
        id: Generation.GEN1_Y,
        classAppendix: [{ displayShortcut: "Y", classNameAppendix: "yellow" }],
        displayName: "Gen1",
    },
    {
        id: Generation.GEN2_GS,
        classAppendix: [
            { displayShortcut: "G", classNameAppendix: "gold" },
            { displayShortcut: "S", classNameAppendix: "silver" },
        ],
        displayName: "Gen2",
    },
    {
        id: Generation.GEN2_C,
        classAppendix: [{ displayShortcut: "C", classNameAppendix: "crystal" }],
        displayName: "Gen2",
    } /*,
        {
            id: Generation.GEN3,
            classAppendix: [
                { displayShortcut: "R", classNameAppendix: "ruby" },
                { displayShortcut: "S", classNameAppendix: "sapphire" },
                { displayShortcut: "E", classNameAppendix: "emerald" },
                { displayShortcut: "FR", classNameAppendix: "firered" },
                { displayShortcut: "LG", classNameAppendix: "leafgreen" },
            ],
            displayName: "Gen3",
        },
        {
            id: Generation.GEN4,
            classAppendix: [
                { displayShortcut: "D", classNameAppendix: "diamond" },
                { displayShortcut: "P", classNameAppendix: "pearl" },
                { displayShortcut: "PT", classNameAppendix: "platinum" },
                { displayShortcut: "HG", classNameAppendix: "heartgold" },
                { displayShortcut: "SS", classNameAppendix: "soulsilver" },
            ],
            displayName: "Gen4",
        },
        {
            id: Generation.GEN5,
            classAppendix: [
                { displayShortcut: "B", classNameAppendix: "black" },
                { displayShortcut: "W", classNameAppendix: "white" },
                { displayShortcut: "B2", classNameAppendix: "black2" },
                { displayShortcut: "W2", classNameAppendix: "white2" },
            ],
            displayName: "Gen5",
        },
        {
            id: Generation.GEN6,
            classAppendix: [
                { displayShortcut: "X", classNameAppendix: "x" },
                { displayShortcut: "Y", classNameAppendix: "y" },
                { displayShortcut: "OR", classNameAppendix: "omegaruby" },
                { displayShortcut: "AS", classNameAppendix: "alphasapphire" },
            ],
            displayName: "Gen6",
        },
        {
            id: Generation.GEN7,
            classAppendix: [
                { displayShortcut: "S", classNameAppendix: "sun" },
                { displayShortcut: "M", classNameAppendix: "moon" },
                { displayShortcut: "US", classNameAppendix: "ultrasun" },
                { displayShortcut: "UM", classNameAppendix: "ultramoon" },
            ],
            displayName: "Gen7",
        },
        {
            id: Generation.GEN8,
            classAppendix: [
                { displayShortcut: "SW", classNameAppendix: "sword" },
                { displayShortcut: "SH", classNameAppendix: "shield" },
                { displayShortcut: "BD", classNameAppendix: "brilliantdiamond" },
                { displayShortcut: "SP", classNameAppendix: "shiningpearl" },
            ],
            displayName: "Gen8",
        },
        {
            id: Generation.GEN9,
            classAppendix: [
                { displayShortcut: "S", classNameAppendix: "scarlet" },
                { displayShortcut: "V", classNameAppendix: "violet" },
            ],
            displayName: "Gen9",
        },*/,
];

export { getGenerationsList };
export type { GenerationListItem, GenerationListItemHighlight };
