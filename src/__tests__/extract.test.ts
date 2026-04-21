import { expect, it } from 'vitest'
import { extract } from '../'

it('license type is object', () => {
  const extracted = extract({
    license: {
      type: 'MIT',
    },
  })
  expect(extracted.license).toBe('MIT')
})

it('licenses', () => {
  const extracted = extract({
    licenses: [{ type: 'MIT' }, { type: 'Apache-2.0' }],
  })
  expect(extracted.license).toBe('MIT, Apache-2.0')
})

it('homepage with hash', () => {
  const extracted = extract({
    homepage: 'http://example.com#readme',
  })
  expect(extracted.homepage).toBe('http://example.com/#readme')
})

it('homepage with searchParams', () => {
  const extracted = extract({
    homepage: 'http://example.com?query=string&query2=string2',
  })
  expect(extracted.homepage).toBe('http://example.com/?query=string&query2=string2')
})

it('homepage with hash and searchParams', () => {
  const extracted = extract({
    homepage: 'http://example.com?query=string&query2=string2#readme',
  })
  expect(extracted.homepage).toBe('http://example.com/?query=string&query2=string2#readme')
})

it('homepage `github.com` with hash', () => {
  const extracted = extract({
    homepage: 'http://github.com#readme',
  })
  expect(extracted.homepage).toBe('http://github.com/')
})

it('homepage `github.com` with hash (not #readme)', () => {
  const extracted = extract({
    homepage: 'http://github.com#repo-meta-edit',
  })
  expect(extracted.homepage).toBe('http://github.com/#repo-meta-edit')
})

it('homepage `github.com` with searchParams', () => {
  const extracted = extract({
    homepage: 'http://github.com?query=string&query2=string2',
  })
  expect(extracted.homepage).toBe('http://github.com/?query=string&query2=string2')
})

it('homepage `github.com` with hash and searchParams', () => {
  const extracted = extract({
    homepage: 'http://github.com?query=string&query2=string2#readme',
  })
  expect(extracted.homepage).toBe('http://github.com/?query=string&query2=string2')
})

it('homepage `github.com` with hash (not #reaeme) and searchParams', () => {
  const extracted = extract({
    homepage: 'http://github.com?query=string&query2=string2#repo-meta-edit',
  })
  expect(extracted.homepage).toBe('http://github.com/?query=string&query2=string2#repo-meta-edit')
})

it('homepage invalid url', () => {
  const extracted = extract({
    homepage: 'homepage',
  })
  expect(extracted.homepage).toBe('homepage')
})

it('name and version are passed through', () => {
  const extracted = extract({ name: 'foo', version: '1.0.0' })
  expect(extracted.name).toBe('foo')
  expect(extracted.version).toBe('1.0.0')
})

it('private package', () => {
  const extracted = extract({ private: true })
  expect(extracted.private).toBe(true)
  expect(extracted.name).toBeUndefined()
})

it('author is string', () => {
  const extracted = extract({ author: 'foo' })
  expect(extracted.author).toBe('foo')
})

it('author with email only (no name)', () => {
  const extracted = extract({ author: { email: 'a@example.com' } })
  expect(extracted.author).toBe('<a@example.com>')
})

it('author with neither name nor email', () => {
  const extracted = extract({ author: {} })
  expect(extracted.author).toBe('')
})

it('licenses is string', () => {
  const extracted = extract({ licenses: 'MIT' })
  expect(extracted.license).toBe('MIT')
})

it('licenses is array of strings', () => {
  const extracted = extract({ licenses: ['MIT', 'Apache-2.0'] })
  expect(extracted.license).toBe('MIT, Apache-2.0')
})

it('maintainers is string', () => {
  const extracted = extract({ maintainers: 'foo' })
  expect(extracted.maintainers).toBe('foo')
})

it('contributors is string', () => {
  const extracted = extract({ contributors: 'foo' })
  expect(extracted.contributors).toBe('foo')
})
