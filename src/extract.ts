import { License, Package, Person } from './types'
import { URL } from 'url'

function extractPerson(person: string | Person) {
  if (typeof person === 'object') {
    if (person.email) {
      return `${person.name} <${person.email}>`
    }
    return person.name
  }
  return person
}

function extractLicense(license: string | License) {
  if (typeof license === 'object') {
    return license.type
  }
  return license
}

function extractHomepage(homepage: string) {
  try {
    const url = new URL(homepage)
    return `${url.protocol}//${url.host}${url.pathname}`
  } catch {
    return ''
  }
}

export function extract(pkg: Package): Package {
  if (pkg.private) {
    return {
      private: pkg.private
    }
  }

  return {
    name: pkg.name,
    version: pkg.version,
    license: Array.isArray(pkg.licenses)
      ? pkg.licenses.map(extractLicense).join(', ')
      : pkg.license
      ? extractLicense(pkg.license)
      : pkg.license,
    author: pkg.author ? extractPerson(pkg.author) : pkg.author,
    maintainers: Array.isArray(pkg.maintainers)
      ? pkg.maintainers.map(extractPerson).join(', ')
      : pkg.maintainers,
    contributors: Array.isArray(pkg.contributors)
      ? pkg.contributors.map(extractPerson).join(', ')
      : pkg.contributors,
    homepage: pkg.homepage ? extractHomepage(pkg.homepage) : ''
  }
}
