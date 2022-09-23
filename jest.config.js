module.exports = {
  coverageProvider: 'babel',
  collectCoverageFrom: ['src/**/*.ts', 'src/**/*.tsx', '!src/**/*.stories.tsx'],
  coverageReporters: ['lcov', 'json'],
  coverageDirectory: 'build/coverage-jest',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/(?=.*\\.html$)',
    '.storybook',
    'src/graphql',
    'index.tsx',
    'app.tsx',
    'aws-exports.ts',
  ],
  testEnvironment: 'jsdom',
  testMatch: ['**/*.test.ts'],
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  modulePathIgnorePatterns: ['node_modules', 'coverage'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@sb/(.*)': '<rootDir>/.storybook/$1',
  },
};
