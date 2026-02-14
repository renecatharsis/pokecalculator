import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";

export default function Resources() {
    return (
        <div className="md:w-3/5 border border-gray-200 bg-secondary shadow-xs rounded-lg px-6 lg:px-8 py-4 lg:py-4">
            <div className="mx-8 text-base/7">
                <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">Resources</h1>
                <div className="mt-10 max-w-2xl">
                    <p>
                        A massive Thank you to the authors behind all these awesome resources.
                        <br />
                        Without them, none of this would have been possible.
                    </p>
                    <ul className="mt-8 max-w-xl space-y-4">
                        <li className="flex gap-x-3">
                            <ArrowTopRightOnSquareIcon aria-hidden="true" className="size-5 flex-none" />
                            <span>
                                <a href="https://www.pokewiki.de" target="_blank" rel="noopener">
                                    <strong className="font-semibold">PokéWiki</strong> Detailed German resources on
                                    pretty much everything Pokémon.
                                </a>
                            </span>
                        </li>
                        <li className="flex gap-x-3">
                            <ArrowTopRightOnSquareIcon aria-hidden="true" className="size-5 flex-none" />
                            <span>
                                <a
                                    href="https://bulbapedia.bulbagarden.net/wiki/Main_Page"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    <strong className="font-semibold">Bulbapedia</strong> Detailed English resources on
                                    pretty much everything Pokémon.
                                </a>
                            </span>
                        </li>
                        <li className="flex gap-x-3">
                            <ArrowTopRightOnSquareIcon aria-hidden="true" className="size-5 flex-none" />
                            <span>
                                <a href="https://github.com/PokeAPI" target="_blank" rel="noopener">
                                    <strong className="font-semibold">PokéAPI</strong> Computable Pokémon data from all
                                    generations. This includes the sprites used here.
                                </a>
                            </span>
                        </li>
                        <li className="flex gap-x-3">
                            <ArrowTopRightOnSquareIcon aria-hidden="true" className="size-5 flex-none" />
                            <span>
                                <a
                                    href="https://pokemon-speedrunning.github.io/Gen1CatchRateCalculator/"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    <strong className="font-semibold">Pokémon Speedrunning</strong> Catchrate calculator
                                    to countercheck results.
                                </a>
                            </span>
                        </li>
                        <li className="flex gap-x-3">
                            <ArrowTopRightOnSquareIcon aria-hidden="true" className="size-5 flex-none" />
                            <span>
                                <a href="https://www.dragonflycave.com/" target="_blank" rel="noopener">
                                    <strong className="font-semibold">The Cave of Dragonflies</strong> Catchrate
                                    calculator to countercheck results and detailed explanations on maths.
                                </a>
                            </span>
                        </li>
                        <li className="flex gap-x-3">
                            <ArrowTopRightOnSquareIcon aria-hidden="true" className="size-5 flex-none" />
                            <span>
                                <a href="https://pycosites.com/pkmn/index.php" target="_blank" rel="noopener">
                                    <strong className="font-semibold">Pycosites</strong> Stat calculator to verify math.
                                </a>
                            </span>
                        </li>
                        <li className="flex gap-x-3">
                            <ArrowTopRightOnSquareIcon aria-hidden="true" className="size-5 flex-none" />
                            <span>
                                <a href="https://github.com/pret/pokered" target="_blank" rel="noopener">
                                    <strong className="font-semibold">pokered</strong> Pokémon Red/Blue disassembly to
                                    verify math.
                                </a>
                            </span>
                        </li>
                        <li className="flex gap-x-3">
                            <ArrowTopRightOnSquareIcon aria-hidden="true" className="size-5 flex-none" />
                            <span>
                                <a href="https://github.com/pret/pokegold" target="_blank" rel="noopener">
                                    <strong className="font-semibold">pokegold</strong> Pokémon Gold/Silver disassembly
                                    to verify math.
                                </a>
                            </span>
                        </li>
                        <li className="flex gap-x-3">
                            <ArrowTopRightOnSquareIcon aria-hidden="true" className="size-5 flex-none" />
                            <span>
                                <a
                                    href="https://glitchcity.wiki/wiki/Catch_rate_glitches_(Generation_II)"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    <strong className="font-semibold">Glitch City Wiki</strong> for Gen 2 specific
                                    glitch information
                                </a>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
