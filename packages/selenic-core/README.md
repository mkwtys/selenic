# @selenic/core

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

## API

### createLicenseHeader

```ts
function createLicenseHeader({ main, deps }?: {
    main?: Package;
    deps?: {
        [key: string]: Package | Package[];
    };
}): string;
```
