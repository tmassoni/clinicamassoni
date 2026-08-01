import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// eslint-config-next v16 ships native flat configs, so they are spread
// directly. Routing them through FlatCompat (which expects legacy eslintrc
// objects) makes ESLint try to serialize plugin objects that reference
// themselves, and it dies with "Converting circular structure to JSON".
const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
];

export default eslintConfig;
