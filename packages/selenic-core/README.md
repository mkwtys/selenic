# @selenic/core

`selenic` core

## Install

```sh
npm install --save-dev @selenic/core
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
    }
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
//  */
```

## API

### `createLicenseHeader`

```ts
function createLicenseHeader(options: {
  main?: Package
  deps?: {
    [key: string]: Package
  }
}): string
```
