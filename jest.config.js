module.exports = {
  collectCoverageFrom: ['packages/*/src/**/*.(ts|js)'],
  coveragePathIgnorePatterns: ['/node_modules/', 'fixtures'],
  testPathIgnorePatterns: ['/node_modules/', 'fixtures']
}
