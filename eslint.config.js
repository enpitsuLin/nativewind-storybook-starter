const { antfu } = require('@antfu/eslint-config')

module.exports = antfu(
  {
    react: true,
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'ts/no-var-requires': 'off',
      'ts/no-require-imports': 'off',
      'import/no-mutable-exports': 'off',
    },
  },
)
