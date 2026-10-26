module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  testMatch: ['<rootDir>/**/*.test.ts'],
  collectCoverageFrom: [
    '../shared-core/src/**/*.ts',
    '!../shared-core/src/**/*.test.ts',
    '!../shared-core/src/index.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  moduleNameMapper: {
    '^@erp/(.*)$': '<rootDir>/../$1/src',
  },
};
