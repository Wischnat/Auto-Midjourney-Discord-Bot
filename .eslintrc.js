/* eslint-env node */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "no-loops"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "no-console": 1,
    "no-loops/no-loops": 2,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-inferrable-types": 0,
  },
};
