/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const { library } = require('@project-rouge/service-core-eslint');

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,

  env: {
    node: true,
    commonjs: true,
    es6: true,
  },

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: { jsx: true },
    sourceType: 'module',
    project: './tsconfig.json',
  },

  ...library,
};
