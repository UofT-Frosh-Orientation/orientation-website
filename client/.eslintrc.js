module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'off',
    'no-prototype-builtins': 'off',
  },
  globals: {
    describe: 'readonly',
    it: 'readonly',
    cy: 'readonly',
    Cypress: 'readonly',
    beforeEach: 'readonly',
    before: 'readonly',
  },
};
