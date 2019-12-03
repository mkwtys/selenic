import { compare } from 'semver'
import { Package } from './types'
import { extract } from './extract'

function createEachHeader(pkg: Package, options: { hierarchy?: number } = {}) {
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
  return ` *${
    !options.hierarchy || options.hierarchy === 1
      ? `
 * ${pkg.name}:`
      : ''
  }
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
  main?: Package
  deps?: { [key: string]: Package | Package[] }
} = {}) {
  const mainHeader = main ? createEachHeader(extract(main)) : ''
  let depsHeader = ''
  if (deps) {
    depsHeader = Object.keys(deps)
      .sort()
      .map(packageName => {
        const depsPkgs = deps[packageName]
        if (!Array.isArray(depsPkgs)) {
          return createEachHeader(extract(depsPkgs))
        }
        const results: Package[] = []
        depsPkgs
          .sort((a, b) => compare(a.version, b.version))
          .forEach(pkg => {
            const samePkgs = results.filter(
              resultPkg =>
                pkg.license === resultPkg.license &&
                pkg.author === resultPkg.author &&
                pkg.maintainers === resultPkg.maintainers &&
                pkg.contributors === resultPkg.contributors &&
                pkg.homepage === resultPkg.homepage
            )
            samePkgs.length
              ? (samePkgs[0].version = `${samePkgs[0].version}, ${pkg.version}`)
              : results.push(pkg)
          })
        return results
          .map((pkg, i) =>
            createEachHeader(extract(pkg), { hierarchy: i === 0 ? 1 : 2 })
          )
          .join('')
      })
      .join('')
  }
  if (mainHeader + depsHeader === '') {
    return ''
  }
  return `/**
 * @license
${mainHeader}${depsHeader} *
 */
`
}
