module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: [
    '@typescript-eslint',
  ],
  globals: {
    document: true,
    graphql: true,
    window: true,
  },
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  rules: {
    "react/prop-types": 0,  // covered by typescript
  },
};
