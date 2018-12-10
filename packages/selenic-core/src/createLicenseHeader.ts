import { ExtractedPackage, Package } from './types'
import { extract } from './extract'

function createEachHeader(pkg: ExtractedPackage) {
  if (pkg.private || !pkg.name) {
    return ''
  }
  const props = [
    'version',
    'license',
    'author',
    'maintainers',
    'contributors',
    'homepage'
  ]
  return ` *
 * ${pkg.name}:
${props
    .map(prop =>
      pkg[prop]
        ? ` *   ${prop}: ${pkg[prop]}
`
        : ''
    )
    .join('')}`
}

export function createLicenseHeader({
  main,
  deps
}: {
  main?: Package | ExtractedPackage
  deps?: { [key: string]: Package | ExtractedPackage }
} = {}) {
  const mainHeader = main ? createEachHeader(extract(main)) : ''
  const depsHeader = deps
    ? Object.keys(deps)
        .sort()
        .map(key => createEachHeader(extract(deps[key])))
        .join('')
    : ''
  if (mainHeader + depsHeader === '') {
    return ''
  }
  return `/**
 * @license
${mainHeader}${depsHeader} *
 */
`
}
