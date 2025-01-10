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
                    className="text-dark flex py-2 text-base font-medium hover:text-secondary lg:ml-12 lg:inline-flex lg:py-6 lg:text-white"
                >
                    {children}
                </a>
            </li>
        </>
    );
}
