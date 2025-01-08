// @ts-check

import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

const compat = new FlatCompat({
    // import.meta.dirname is available after Node.js v20.11.0
    baseDirectory: import.meta.dirname,
});

const eslintConfig = [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    eslintPluginPrettier,
    ...compat.config({
        extends: ["next"],
    }),
    {
        rules: {
            "prettier/prettier": [
                "error",
                {
                    tabWidth: 4,
                    printWidth: 120,
                },
            ],
        },
    },
];
export default eslintConfig;
