import { PokeBalls } from "@/enum/PokeBalls";

interface PokeballListItem {
    id: number;
    display: string;
    thumbnail: string;
}

const getPokeballList = (): PokeballListItem[] => [
    {
        id: PokeBalls.BEAST_BALL,
        display: "Beast Ball",
        thumbnail: "sprites/pokeballs/beast-ball.png",
    },
    {
        id: PokeBalls.CHERISH_BALL,
        display: "Cherish Ball",
        thumbnail: "sprites/pokeballs/cherish-ball.png",
    },
    {
        id: PokeBalls.DIVE_BALL,
        display: "Dive Ball",
        thumbnail: "sprites/pokeballs/dive-ball.png",
    },
    {
        id: PokeBalls.DREAM_BALL,
        display: "Dream Ball",
        thumbnail: "sprites/pokeballs/dream-ball.png",
    },
    {
        id: PokeBalls.DUSK_BALL,
        display: "Dusk Ball",
        thumbnail: "sprites/pokeballs/dusk-ball.png",
    },
    {
        id: PokeBalls.FAST_BALL,
        display: "Fast Ball",
        thumbnail: "sprites/pokeballs/fast-ball.png",
    },
    {
        id: PokeBalls.FRIEND_BALL,
        display: "Friend Ball",
        thumbnail: "sprites/pokeballs/friend-ball.png",
    },
    {
        id: PokeBalls.GREAT_BALL,
        display: "Great Ball",
        thumbnail: "sprites/pokeballs/great-ball.png",
    },
    {
        id: PokeBalls.HEAL_BALL,
        display: "Heal Ball",
        thumbnail: "sprites/pokeballs/heal-ball.png",
    },
    {
        id: PokeBalls.HEAVY_BALL,
        display: "Heavy Ball",
        thumbnail: "sprites/pokeballs/heavy-ball.png",
    },
    {
        id: PokeBalls.LEVEL_BALL,
        display: "Level Ball",
        thumbnail: "sprites/pokeballs/level-ball.png",
    },
    {
        id: PokeBalls.LOVE_BALL,
        display: "Love Ball",
        thumbnail: "sprites/pokeballs/love-ball.png",
    },
    {
        id: PokeBalls.LURE_BALL,
        display: "Lure Ball",
        thumbnail: "sprites/pokeballs/lure-ball.png",
    },
    {
        id: PokeBalls.LUXURY_BALL,
        display: "Luxury Ball",
        thumbnail: "sprites/pokeballs/luxury-ball.png",
    },
    {
        id: PokeBalls.MASTER_BALL,
        display: "Master Ball",
        thumbnail: "sprites/pokeballs/master-ball.png",
    },
    {
        id: PokeBalls.MOON_BALL,
        display: "Moon Ball",
        thumbnail: "sprites/pokeballs/moon-ball.png",
    },
    {
        id: PokeBalls.NEST_BALL,
        display: "Nest Ball",
        thumbnail: "sprites/pokeballs/nest-ball.png",
    },
    {
        id: PokeBalls.NET_BALL,
        display: "Net Ball",
        thumbnail: "sprites/pokeballs/net-ball.png",
    },
    {
        id: PokeBalls.POKE_BALL,
        display: "Poké Ball",
        thumbnail: "sprites/pokeballs/poke-ball.png",
    },
    {
        id: PokeBalls.PREMIER_BALL,
        display: "Premier Ball",
        thumbnail: "sprites/pokeballs/premier-ball.png",
    },
    {
        id: PokeBalls.QUICK_BALL,
        display: "Quick Ball",
        thumbnail: "sprites/pokeballs/quick-ball.png",
    },
    {
        id: PokeBalls.REPEAT_BALL,
        display: "Repeat Ball",
        thumbnail: "sprites/pokeballs/repeat-ball.png",
    },
    {
        id: PokeBalls.SAFARI_BALL,
        display: "Safari Ball",
        thumbnail: "sprites/pokeballs/safari-ball.png",
    },
    {
        id: PokeBalls.TIMER_BALL,
        display: "Timer Ball",
        thumbnail: "sprites/pokeballs/timer-ball.png",
    },
    {
        id: PokeBalls.ULTRA_BALL,
        display: "Ultra Ball",
        thumbnail: "sprites/pokeballs/ultra-ball.png",
    },
];

export { getPokeballList };
export type { PokeballListItem };
