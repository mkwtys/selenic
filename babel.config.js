module.exports = {
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: {
          node: 6
        }
      }
    ]
  ],
  plugins: ['add-module-exports'],
  env: {
    test: {
      presets: ['power-assert']
    }
  }
}
