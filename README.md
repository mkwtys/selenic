[![Build Status](https://travis-ci.org/mkwtys/selenic.svg?branch=master)](https://travis-ci.org/mkwtys/selenic)
[![codecov](https://codecov.io/gh/mkwtys/selenic/branch/master/graph/badge.svg)](https://codecov.io/gh/mkwtys/selenic)

# @selenic/core

selenic is create license header of packages.

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
