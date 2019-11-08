import assert from 'assert'
import { extract } from '../'

describe('@selenic/core: extract', () => {
  it('minimal', () => {
    const extracted = extract({
      name: 'name',
      version: '0.0.0'
    })
    assert(extracted.name)
    assert(extracted.version)
  })

  it('add url to license', () => {
    const extracted = extract({
      license: 'MIT'
    })
    assert(extracted.license === 'MIT')
  })

  it('license type is object', () => {
    const extracted = extract({
      license: {
        type: 'MIT'
      }
    })
    assert(extracted.license === 'MIT')
  })

  it('licenses', () => {
    const extracted = extract({
      licenses: [{ type: 'MIT' }, { type: 'Apache-2.0' }]
    })
    assert(extracted.license === 'MIT, Apache-2.0')
  })

  it('author', () => {
    const extracted = extract({
      author: 'a'
    })
    assert(extracted.author === 'a')
  })

  it('author is person object', () => {
    let extracted = extract({
      author: {
        name: 'a'
      }
    })
    assert(extracted.author === 'a')
    extracted = extract({
      author: {
        name: 'a',
        email: 'a@example.com'
      }
    })
    assert(extracted.author === 'a <a@example.com>')
  })

  it('maintainers', () => {
    const extracted = extract({
      maintainers: ['m1', 'm2 <m2@example.com>']
    })
    assert(extracted.maintainers === 'm1, m2 <m2@example.com>')
  })

  it('maintainer is person object', () => {
    const extracted = extract({
      maintainers: [{ name: 'm1' }, { name: 'm2', email: 'm2@example.com' }]
    })
    assert(extracted.maintainers === 'm1, m2 <m2@example.com>')
  })

  it('maintainers is string', () => {
    const extracted = extract({
      maintainers: 'm1, m2 <m2@example.com>'
    })
    assert(extracted.maintainers === 'm1, m2 <m2@example.com>')
  })

  it('contributors', () => {
    const extracted = extract({
      contributors: ['c1', 'c2 <c2@example.com>']
    })
    assert(extracted.contributors === 'c1, c2 <c2@example.com>')
  })

  it('contributor is person object', () => {
    const extracted = extract({
      contributors: [{ name: 'c1' }, { name: 'c2', email: 'c2@example.com' }]
    })
    assert(extracted.contributors === 'c1, c2 <c2@example.com>')
  })

  it('contributor is string', () => {
    const extracted = extract({
      contributors: 'c1, c2 <c2@example.com>'
    })
    assert(extracted.contributors === 'c1, c2 <c2@example.com>')
  })

  it('homepage', () => {
    const extracted = extract({
      homepage: 'http://example.com'
    })
    assert(extracted.homepage === 'http://example.com')
  })

  it('private package', () => {
    const extracted = extract({
      private: true
    })
    assert(extracted.private)
  })
})