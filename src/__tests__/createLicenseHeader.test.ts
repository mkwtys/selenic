import { createLicenseHeader, extract } from '../'

it('no package', () => {
  expect(createLicenseHeader()).toMatchSnapshot()
})

it('main package only', () => {
  expect(
    createLicenseHeader({
      main: {
        name: 'main',
        version: '0.0.0',
        license: 'MIT'
      }
    })
  ).toMatchSnapshot()
})

it('deps package sort by name', () => {
  expect(
    createLicenseHeader({
      main: {
        name: 'main',
        version: '0.0.0',
        license: 'MIT'
      },
      deps: {
        b: {
          name: 'b',
          version: '0.0.0',
          license: 'MIT'
        },
        a: {
          name: 'a',
          version: '0.0.0',
          license: 'MIT'
        },
        c: {
          name: 'c',
          version: '0.0.0',
          license: 'MIT'
        }
      }
    })
  ).toMatchSnapshot()
})

it('author', () => {
  expect(
    createLicenseHeader({
      main: {
        name: 'main',
        version: '0.0.0',
        license: 'MIT',
        author: 'a'
      }
    })
  ).toMatchSnapshot()
  expect(
    createLicenseHeader({
      main: {
        name: 'main',
        version: '0.0.0',
        license: 'MIT',
        author: { name: 'a' }
      }
    })
  ).toMatchSnapshot()
  expect(
    createLicenseHeader({
      main: {
        name: 'main',
        version: '0.0.0',
        license: 'MIT',
        author: { name: 'a', email: 'a@example.com' }
      }
    })
  ).toMatchSnapshot()
})

it('maintainers', () => {
  expect(
    createLicenseHeader({
      main: {
        name: 'main',
        version: '0.0.0',
        license: 'MIT',
        maintainers: [
          {
            name: 'm1',
            email: 'm1'
          }
        ]
      }
    })
  ).toMatchSnapshot()
  expect(
    createLicenseHeader({
      main: {
        name: 'main',
        version: '0.0.0',
        license: 'MIT',
        maintainers: [
          {
            name: 'm1'
          },
          {
            name: 'm2',
            email: 'm2@example.com'
          }
        ]
      }
    })
  ).toMatchSnapshot()
})

it('contributors', () => {
  expect(
    createLicenseHeader({
      main: {
        name: 'main',
        version: '0.0.0',
        license: 'MIT',
        contributors: [
          {
            name: 'c1',
            email: 'c1@example.com'
          }
        ]
      }
    })
  ).toMatchSnapshot()
  expect(
    createLicenseHeader({
      main: {
        name: 'main',
        version: '0.0.0',
        license: 'MIT',
        contributors: [
          {
            name: 'c1'
          },
          {
            name: 'c2',
            email: 'c2@example.com'
          }
        ]
      }
    })
  ).toMatchSnapshot()
})

it('homepage', () => {
  expect(
    createLicenseHeader({
      main: {
        name: 'main',
        version: '0.0.0',
        license: 'MIT',
        homepage: 'http://example.com'
      }
    })
  ).toMatchSnapshot()
})

it('private package', () => {
  expect(
    createLicenseHeader({
      main: {
        name: 'main',
        version: '0.0.0',
        license: 'MIT',
        private: true
      }
    })
  ).toMatchSnapshot()
  expect(
    createLicenseHeader({
      main: {
        name: 'main',
        version: '0.0.0',
        license: 'MIT',
        private: true
      },
      deps: {
        a: {
          name: 'a',
          version: '0.0.0',
          license: 'MIT',
          private: true
        },
        b: {
          name: 'b',
          version: '0.0.0',
          license: 'MIT'
        }
      }
    })
  ).toMatchSnapshot()
})

it('deps only', () => {
  expect(
    createLicenseHeader({
      deps: {
        b: {
          name: 'b',
          version: '0.0.0',
          license: 'MIT'
        },
        a: {
          name: 'a',
          version: '0.0.0',
          license: 'MIT'
        }
      }
    })
  ).toMatchSnapshot()
})

it('pkg is extracted', () => {
  expect(
    createLicenseHeader({
      main: extract({
        name: 'main',
        version: '0.0.0',
        license: 'MIT'
      }),
      deps: {
        b: extract({
          name: 'b',
          version: '0.0.0',
          license: 'MIT'
        }),
        a: extract({
          name: 'a',
          version: '0.0.0',
          license: 'MIT'
        }),
        c: extract({
          name: 'c',
          version: '0.0.0',
          license: 'MIT'
        })
      }
    })
  ).toMatchSnapshot()
})

it('multi versions: different license', () => {
  expect(
    createLicenseHeader({
      deps: {
        c: [
          {
            name: 'c',
            version: '2.0.0',
            license: 'ISC'
          },
          {
            name: 'c',
            version: '1.0.0',
            license: 'MIT'
          },
          {
            name: 'c',
            version: '3.0.0',
            license: 'MIT OR ISC'
          }
        ]
      }
    })
  ).toMatchSnapshot()
})

it('multi versions: same info', () => {
  expect(
    createLicenseHeader({
      deps: {
        c: [
          {
            name: 'c',
            version: '2.0.0',
            license: 'MIT'
          },
          {
            name: 'c',
            version: '1.0.0',
            license: 'MIT'
          },
          {
            name: 'c',
            version: '3.0.0',
            license: 'MIT'
          }
        ]
      }
    })
  ).toMatchSnapshot()
})

it('multi versions: some same info', () => {
  expect(
    createLicenseHeader({
      deps: {
        c: [
          {
            name: 'c',
            version: '3.0.0',
            license: 'ISC'
          },
          {
            name: 'c',
            version: '2.0.0',
            license: 'MIT'
          },
          {
            name: 'c',
            version: '1.0.0',
            license: 'MIT OR ISC'
          },
          {
            name: 'c',
            version: '4.0.0',
            license: 'MIT'
          }
        ]
      }
    })
  ).toMatchSnapshot()
})

it('multi versions: semver sort', () => {
  expect(
    createLicenseHeader({
      deps: {
        a: [
          {
            name: 'a',
            version: '3.0.0-alpha.1',
            license: 'MIT'
          },
          {
            name: 'a',
            version: 'v2.0.0',
            license: 'MIT'
          },
          {
            name: 'a',
            version: '1.0.0',
            license: 'MIT'
          },
          {
            name: 'a',
            version: '4.0.0-rc.1',
            license: 'MIT'
          }
        ]
      }
    })
  ).toMatchSnapshot()
})
