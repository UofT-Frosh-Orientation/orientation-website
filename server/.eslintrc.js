module.exports = {
  plugins: ['jest'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  parser: '@babel/eslint-parser',
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
    'no-undef': ['warn'],
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
