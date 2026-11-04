import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'

const MODULES = [
  '@api/clients',
  '@api/models',
  '@web/pages',
  '@web/components',
  '@web/labels',
  '@config',
  '@core',
  '@factories',
  '@fixtures',
  '@utils',
  '@test-data',
]

// The dependency rules from docs/ARCHITECTURE.md. A layer may always import from itself.
const LAYERS = [
  {
    files: ['tests/**/*.ts'],
    allow: ['@fixtures', '@factories', '@web/labels', '@api/models', '@core', '@test-data'],
  },
  {
    files: ['src/fixtures/**/*.ts'],
    allow: [
      '@fixtures',
      '@api/clients',
      '@api/models',
      '@web/pages',
      '@web/components',
      '@web/labels',
      '@config',
      '@core',
      '@utils',
    ],
  },
  {
    files: ['src/api/clients/**/*.ts'],
    allow: ['@api/clients', '@api/models', '@config', '@core', '@utils'],
  },
  { files: ['src/api/models/**/*.ts'], allow: ['@api/models', '@core'] },
  {
    files: ['src/web/pages/**/*.ts'],
    allow: ['@web/pages', '@web/components', '@web/labels', '@core', '@utils'],
  },
  {
    files: ['src/web/components/**/*.ts'],
    allow: ['@web/components', '@web/labels', '@core', '@utils'],
  },
  { files: ['src/web/labels/**/*.ts'], allow: ['@web/labels', '@core'] },
  { files: ['src/factories/**/*.ts'], allow: ['@factories', '@api/models', '@core', '@utils'] },
  { files: ['src/config/**/*.ts'], allow: ['@config', '@core'] },
  { files: ['src/utils/**/*.ts'], allow: ['@utils', '@core'] },
  { files: ['src/core/**/*.ts'], allow: ['@core'] },
]

const layerRules = LAYERS.map(({ files, allow }) => {
  const banned = MODULES.filter((name) => !allow.includes(name))
  return {
    files,
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: banned.flatMap((name) => [name, `${name}/**`]),
              message:
                'This layer may not import this module. See the dependency rules in docs/ARCHITECTURE.md.',
            },
          ],
        },
      ],
    },
  }
})

export default tseslint.config(
  { ignores: ['node_modules/', 'artifacts/', 'playwright-report/', 'test-results/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.ts', 'tests/**/*.ts', 'playwright.config.ts'],
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      'no-restricted-properties': [
        'error',
        {
          object: 'process',
          property: 'env',
          message: 'Only src/config reads environment variables.',
        },
      ],
    },
  },
  ...layerRules,
  {
    files: ['src/config/**/*.ts'],
    rules: { 'no-restricted-properties': 'off' },
  },
  prettier,
)
