import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

/** @type {import('eslint').Linter.Config} */
export default {
  overrides: [
    {
      files: ["**/*.{js,mjs,cjs,ts}"], // Apply to JavaScript & TypeScript files
      languageOptions: {
        globals: globals.node, // Use Node.js global variables
        parser: tsParser,      // Parse TypeScript files with the correct parser
      },
      extends: [
        "eslint:recommended",                  // ESLint recommended base rules
        "plugin:@typescript-eslint/recommended", // TypeScript recommended rules
      ],
      rules: {
        "no-unused-vars": "error",  // Throw an error for unused variables
        "@typescript-eslint/no-unused-vars": "error", // TypeScript specific rule for unused variables
      },
      ignorePatterns: ["node_modules/", "dist/"], // Ignore these folders to avoid unnecessary linting
    },
  ],
};
