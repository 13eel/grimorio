import baseConfig from "@tooling/eslint-config/base";
import reactConfig from "@tooling/eslint-config/react";

export default [
  {
    ignores: ["dist/**"],
  },
  ...baseConfig,
  ...reactConfig,
  { languageOptions: { parserOptions: { project: "./tsconfig.json" } } },
];
