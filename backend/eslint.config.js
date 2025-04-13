import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"]},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    languageOptions: {
      globals: {
        process: true
      }
    },
    rules: {
      "no-undef": "off"
    },
    ignores: ["dist/**/*"]
  }
];