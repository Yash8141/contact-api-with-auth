import js from "@eslint/js";

export default [
  {
    ignores: ["node_modules/**"],
  },
  {
    ...js.configs.recommended,
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        global: "readonly",
      },
    },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-console": "off",
      semi: ["error", "always"],
      quotes: ["error", "double"],
      indent: ["error", 2],
      "no-trailing-spaces": "error",
      "eol-last": "error",
    },
  },
];
