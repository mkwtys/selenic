import { License, ExtractedPackage, Package, Person } from './types'

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

export function extract(pkg: Package | ExtractedPackage): ExtractedPackage {
  if (pkg.private) {
    return {
      private: pkg.private
    }
  }

  return {
    name: pkg.name,
    version: pkg.version,
    license: Array.isArray(pkg.licenses)
      ? pkg.licenses.map(license => extractLicense(license)).join(', ')
      : pkg.license
      ? extractLicense(pkg.license)
      : pkg.license,
    author: pkg.author ? extractPerson(pkg.author) : pkg.author,
    maintainers: Array.isArray(pkg.maintainers)
      ? pkg.maintainers.map(maintainer => extractPerson(maintainer)).join(', ')
      : pkg.maintainers,
    contributors: Array.isArray(pkg.contributors)
      ? pkg.contributors
          .map(contributor => extractPerson(contributor))
          .join(', ')
      : pkg.contributors,
    homepage: pkg.homepage
  }
}
