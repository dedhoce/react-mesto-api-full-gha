module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'airbnb-base/legacy'
  ],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    quotes: ["error", "double"],  // Использовать двойные кавычки.
    semi: ["error", "always"],  // Всегда добавлять точку с запятой в конце утверждения.
    indent: ["error", 2],  // Отступ — это два пробела.
    "no-underscore-dangle": ["error", { "allow": ["_id"]}],
    "no-console": "error",  // Избегать использования в коде методов на консоли (`console`).
    "linebreak-style": 0,
    "func-names": 0,
    "consistent-return": 0,
    "no-shadow": 0,
    "no-unused-vars": 0,
    "no-useless-escape": 0,
    "prefer-regex-literals": ["error", {"disallowRedundantWrapping": false}],
    "max-classes-per-file": ["error", { ignoreExpressions: true , "max": 3}],
    "no-multi-assign": ["error", { "ignoreNonDeclaration": true }],
    "no-undef": "error",
    strict: 0 // Отключить use strict.
  }
}