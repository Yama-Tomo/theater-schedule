module.exports = {
  root: true,
  plugins: ['babel', 'prettier'],
  globals: {
    NodeJS: true,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  rules: {
    semi: 'off',
    'babel/semi': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      },
    ],
    '@typescript-eslint/no-empty-interface': [
      'error',
      { allowSingleExtends: true },
    ],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        exports: 'always-multiline',
        imports: 'always-multiline',
        objects: 'always-multiline',
        functions: 'never',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier/recommended',
    'prettier',
  ],
};
