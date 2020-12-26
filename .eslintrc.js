module.exports = {
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:prettier/recommended",
    "prettier",
    "prettier/react",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  plugins: ["prettier"],
  root: true,
  globals: {
    graphql: true,
  },
  rules: {
    "prettier/prettier": "error",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "airbnb-typescript",
        "airbnb/hooks",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:prettier/recommended",
        "prettier",
        "prettier/@typescript-eslint",
        "prettier/react",
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
      },
      plugins: ["@typescript-eslint", "prettier"],
      rules: {
        "react/prop-types": 0, // covered by typescript
        "prettier/prettier": "error",
      },
    },
  ],
};
