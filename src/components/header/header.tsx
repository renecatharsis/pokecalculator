"use client";

import ListItem from "@/components/header/listItem";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="bg-primary flex w-full items-center">
            <div className="container mx-auto">
                <div className="relative flex items-center justify-between py-2 md:py-0">
                    <div className="w-60 max-w-full px-4">
                        <span className="text-white text-2xl font-extrabold">
                            <Link href="/">PokéCalculator</Link>
                        </span>
                    </div>
                    <div className="flex w-full items-center justify-between px-4">
                        <div>
                            <button
                                onClick={() => setOpen(!open)}
                                className={` ${
                                    open && "navbarTogglerActive"
                                } ring-primary absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] focus:ring-2 lg:hidden`}
                            >
                                <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                                <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                                <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                            </button>
                            <nav
                                className={`absolute right-4 z-50 top-full w-full max-w-[250px] rounded-lg bg-white py-1 md:py-0 px-6 shadow lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:shadow-none ${
                                    !open && "hidden"
                                } `}
                            >
                                <ul className="block lg:flex">
                                    <ListItem NavLink="/catchrate">Catch simulator</ListItem>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
