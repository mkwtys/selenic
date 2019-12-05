import assert from 'assert'
import { extract } from '../'

it('license type is object', () => {
  const extracted = extract({
    license: {
      type: 'MIT'
    }
  })
  assert.equal(extracted.license, 'MIT')
})

it('licenses', () => {
  const extracted = extract({
    licenses: [{ type: 'MIT' }, { type: 'Apache-2.0' }]
  })
  assert.equal(extracted.license, 'MIT, Apache-2.0')
})

it('homepage with hash', () => {
  const extracted = extract({
    homepage: 'http://example.com#readme'
  })
  assert.equal(extracted.homepage, 'http://example.com/#readme')
})

it('homepage with searchParams', () => {
  const extracted = extract({
    homepage: 'http://example.com?query=string&query2=string2'
  })
  assert.equal(
    extracted.homepage,
    'http://example.com/?query=string&query2=string2'
  )
})

it('homepage with hash and searchParams', () => {
  const extracted = extract({
    homepage: 'http://example.com?query=string&query2=string2#readme'
  })
  assert.equal(
    extracted.homepage,
    'http://example.com/?query=string&query2=string2#readme'
  )
})

it('homepage `github.com` with hash', () => {
  const extracted = extract({
    homepage: 'http://github.com#readme'
  })
  assert.equal(extracted.homepage, 'http://github.com/')
})

it('homepage `github.com` with hash (not #readme)', () => {
  const extracted = extract({
    homepage: 'http://github.com#repo-meta-edit'
  })
  assert.equal(extracted.homepage, 'http://github.com/#repo-meta-edit')
})

it('homepage `github.com` with searchParams', () => {
  const extracted = extract({
    homepage: 'http://github.com?query=string&query2=string2'
  })
  assert.equal(
    extracted.homepage,
    'http://github.com/?query=string&query2=string2'
  )
})

it('homepage `github.com` with hash and searchParams', () => {
  const extracted = extract({
    homepage: 'http://github.com?query=string&query2=string2#readme'
  })
  assert.equal(
    extracted.homepage,
    'http://github.com/?query=string&query2=string2'
  )
})

it('homepage `github.com` with hash (not #reaeme) and searchParams', () => {
  const extracted = extract({
    homepage: 'http://github.com?query=string&query2=string2#repo-meta-edit'
  })
  assert.equal(
    extracted.homepage,
    'http://github.com/?query=string&query2=string2#repo-meta-edit'
  )
})

it('homepage invalid url', () => {
  const extracted = extract({
    homepage: 'homepage'
  })
  assert.equal(extracted.homepage, 'homepage')
})
