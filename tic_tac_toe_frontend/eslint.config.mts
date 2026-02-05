import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // App/source files
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
    settings: {
      react: {
        // Avoid the "React version not specified" warning
        version: "detect",
      },
    },
    plugins: {
      react: pluginReact,
      "react-hooks": reactHooks,
    },
    rules: {
      // Ensure hooks rules are available and enforced
      ...reactHooks.configs.recommended.rules,
    },
  },

  // TypeScript-eslint + React recommended defaults
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  // Node/JS config files: allow commonjs `require`
  {
    files: ["**/*.config.{js,cjs,mjs}", "**/metro.config.js", "**/vite.config.ts"],
    languageOptions: { globals: globals.node },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
]);
