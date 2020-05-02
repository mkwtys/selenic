# @selenic/core

[![Actions Status](https://github.com/mkwtys/selenic/workflows/Node%20CI/badge.svg)](https://github.com/mkwtys/selenic/actions?query=workflow%3A%22Node+CI%22)
[![codecov](https://codecov.io/gh/mkwtys/selenic/branch/master/graph/badge.svg)](https://codecov.io/gh/mkwtys/selenic)
[![npm version](https://badge.fury.io/js/%40selenic%2Fcore.svg)](https://badge.fury.io/js/%40selenic%2Fcore)

> selenic is create license header of packages.

## Install

```sh
npm install @selenic/core
```

## Usage

```js
import { createLicenseHeader } from '@selenic/core'

createLicenseHeader({
  main: {
    name: 'main-pakcage',
    license: 'MIT'
  },
  deps: {
    'dep-package': {
      name: 'dep-package',
      license: 'MIT'
    },
    'dep-package2': [
      {
        name: 'dep-package2',
        version: '1.0.0',
        license: 'MIT'
      },
      {
        name: 'dep-package2',
        version: '2.0.0',
        license: 'MIT'
      },
      {
        name: 'dep-package2',
        version: '3.0.0',
        license: 'ISC'
      }
    ]
  }
})

// /**
//  * @license
//  *
//  * main-pakcage:
//  *   license: MIT
//  *
//  * dep-package:
//  *   license: MIT
//  *
//  * dep-package2:
//  *   version: 1.0.0, 2.0.0
//  *   license: MIT
//  *
//  *   version: 3.0.0
//  *   license: ISC
//  *
//  */
```

## Related

- [@selenic/webpack-plugin](https://github.com/mkwtys/selenic-webpack-plugin) - webpack plugin for selenic

## License

MIT © [mkwtys](https://github.com/mkwtys)
