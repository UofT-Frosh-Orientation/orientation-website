module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  env: {
    es6: true,
    node: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': ['error', { before: false, after: true }],
    'no-multiple-empty-lines': ['error'],
    'no-new-symbol': ['error'],
    'no-trailing-spaces': ['error'],
    'no-undef': ['error'],
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    'object-curly-spacing': ['error', 'always'],
    'object-shorthand': ['error'],
    'prefer-const': 2,
    'space-in-parens': ['error', 'never'],
    'no-eval': ['error'],
    'no-console': ['warn'],
    strict: [2, 'never'],
  },
};
