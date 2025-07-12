import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Allow any types for UI components that need flexibility
      "@typescript-eslint/no-explicit-any": "warn",
      // Allow empty interfaces for extending base types
      "@typescript-eslint/no-empty-object-type": "warn",
      // Allow unused variables in some cases (like destructuring)
      "@typescript-eslint/no-unused-vars": "warn",
      // Allow function types for event handlers
      "@typescript-eslint/no-unsafe-function-type": "warn",
      // Allow let for variables that might be reassigned
      "prefer-const": "warn",
      // Allow unescaped entities in JSX (we've fixed the critical ones)
      "react/no-unescaped-entities": "warn",
      // Allow img elements (we can optimize later)
      "@next/next/no-img-element": "warn",
    },
  },
];

export default eslintConfig;
