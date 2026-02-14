export default function Maths() {
    return (
        <div className="md:w-3/5 border border-gray-200 bg-secondary shadow-xs rounded-lg px-6 lg:px-8 py-4 lg:py-4">
            <div className="mx-8 text-base/7">
                <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
                    A tale of technicalities
                </h1>
                <div className="mt-10 max-w-4xl">
                    <p>
                        In theory, there&#39;s relatively simple maths behind all the formulas used to calculate, or
                        rather, estimate the catch rate of an encounter. Reality looks quite a bit different though.
                        With differences throughout all generations, sometimes even within a generation, straight up
                        errors made by the devs and limitations of hardware, plenty of little things have to be
                        considered. Let&#39;s get into it. Our cute little friend Rattata is gonna help us out here and
                        there.
                    </p>
                </div>
                <h2 className="mt-5 text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">Gen 1</h2>
                <div className="mt-5 max-w-4xl">
                    <p>
                        Gen 1 is a really interesting one. Being different from all other generations, this one is full
                        of surprises that made creating a calculator quite the trial-and-error experience.
                        <br /> Also, our cute little Rattata&#39;s mom, Raticate, has a lower capture rate in Gen 1 and
                        Gen 2 from all other games.
                    </p>
                    <h3 className="mt-2 text-pretty text-xl font-semibold tracking-tight">
                        Floating point numbers aren&#39;t real
                    </h3>
                    <p className="mt-2">
                        Calculating anything from a Pokémon&#39;s stats to variable factors can result in decimals. Gen
                        1 doesn&#39;t support, or rather, consider that, however. Instead of mathematically rounding
                        values (down until .4 and up beginning with .5), Gen 1 simply cuts off the decimals, essentially
                        flooring all values.
                    </p>
                    <h3 className="mt-2 text-pretty text-xl font-semibold tracking-tight">RNG isn&#39;t real either</h3>
                    <p className="mt-2">
                        There&#39;s no such thing as true randomness on computers. Since a random factor is being used
                        in the Gen 1 formula, though, this means the results in these games are sometimes different from
                        what the math would suggest when using Great Balls or Ultra Balls. This is explained really well
                        on{" "}
                        <a
                            className="font-bold underline"
                            target="_blank"
                            rel="noopener"
                            href="https://www.dragonflycave.com/mechanics/gen-i-capturing#rng"
                        >
                            The Cave of dragonflies
                        </a>
                        , so I won&#39;t even try to repeat it here in my own words.
                        <br />
                        We&#39;re showing intended catch rate here, not actual catch rate.
                    </p>
                    <h3 className="mt-2 text-pretty text-xl font-semibold tracking-tight">The ball factor</h3>
                    <p className="mt-2">
                        Great Balls have a different factor attached to it than all the other balls. Due to how the
                        capture formula works, however, this can result in a Great Ball being a better option than an
                        Ultra Ball. (see the RNG section) This effects mostly Pokémon at high or full HP and Pokémon
                        with a high capture rate.
                    </p>
                    <h3 className="mt-2 text-pretty text-xl font-semibold tracking-tight">
                        Differences between Red/Blue and Yellow
                    </h3>
                    <p className="mt-2">
                        Pokémon Yellow uses different reroll counts (see the RNG section) effecting the actual catch
                        rate.
                    </p>
                    <p className="mt-2">
                        Besides that, the only differences are the lower capture rates of Dragonair and Dragonite.
                    </p>
                </div>

                <h2 className="mt-5 text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">Gen 2</h2>
                <div className="mt-5 max-w-4xl">
                    <p>
                        Gen 2 is the beginning of more streamlined formulas that are less convoluted, but, due to its
                        implementation in the games, still heavily buggy and sometimes even gamebreaking.
                        <br /> For Pokémon differences, there&#39;s still only Raticate with a lower capture rate before
                        Gen 3.
                    </p>
                    <h3 className="mt-2 text-pretty text-xl font-semibold tracking-tight">
                        Once upon a time in a world that wasn&#39;t tested properly
                    </h3>
                    <p className="mt-2">
                        The majority of unexpected results stem from implementation errors surrounding the different new
                        Pokéball variants. The Fast Ball, Heavy Ball, Love Ball and Moon Ball do not (always) work as
                        intended. To make matters worse, the only status effects that improve the catch rate at all are
                        Sleep and Freeze. An in-depth explanation can be found, once again, on&nbsp;
                        <a
                            className="font-bold underline"
                            target="_blank"
                            rel="noopener"
                            href="https://www.dragonflycave.com/mechanics/gen-ii-capturing"
                        >
                            The Cave of dragonflies
                        </a>
                        .
                    </p>
                    <h3 className="mt-2 text-pretty text-xl font-semibold tracking-tight">
                        Differences between Gold/Silver and Crystal
                    </h3>
                    <p className="mt-2">
                        Pokémon Crystal reads Kadabra&#39;s, Tauros&#39; and Sunflower&#39;s weight incorrectly and thus
                        assumes the max weight tier when trying to capture them using a Heavy Ball.
                    </p>
                </div>

                <h2 className="mt-5 text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">
                    Things that cannot be
                </h2>
                <p className="mt-5">
                    All of a Pokémon&#39;s stats are non-decimal values. Whenever you are choosing a percentage of HP
                    left, however, this could in theory result in a decimal value. This cannot happen during combat. An
                    attack&#39;s damage is always non-decimal, too. This means that we have to make a decision on what
                    to do with impossible solutions like this. An example:
                    <br />A level 50 Rattata with 0 DVs/IVs is gonna have 90 HP at full health.
                    <br />
                    If you were to set its health to 35%, you&#39;d end up with 31.5 HP. That&#39;s impossible in-game.
                    No matter how much damage had been dealt and how, it would have always ended up with either 31 HP or
                    32 HP.
                    <br />
                    Since Gen 1 floors all values, we&#39;ve decided to floor situations like this, too. Doing this
                    might end up causing different results to other websites providing calculations and this is the most
                    likely reason for it.
                </p>
                <h2 className="mt-5 text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">
                    Rounding up or down?
                </h2>
                <p className="mt-5">
                    Just like rounding during the calculations and when deciding on HP values using percentages,
                    rounding is done when displaying the final results. We decided to mathematically round each decimal
                    from the last decimals all the way to the integer part. This is technically neither right nor wrong,
                    since the games will only ever work with one specific IV/HP/XYZ set of Pokémon wheras we simulate
                    all kinds of possible encounters and then display the average. This means that other websites may
                    show slightly different catch rates, sometimes off by just 0.01.
                </p>
            </div>
        </div>
    );
}
