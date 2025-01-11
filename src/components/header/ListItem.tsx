import React from "react";

type ListItemParams = {
    children: string;
    NavLink: string;
};

export default function ListItem({ children, NavLink }: ListItemParams) {
    return (
        <>
            <li>
                <a
                    href={NavLink}
                    className="flex py-2 text-base font-bold hover:text-secondary lg:ml-12 lg:inline-flex lg:py-6 text-secondary lg:text-white"
                >
                    {children}
                </a>
            </li>
        </>
    );
}
