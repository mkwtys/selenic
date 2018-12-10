export type Person =
  | string
  | {
      name?: string
      email?: string
      url?: string
    }

export type License =
  | string
  | {
      type?: string
      url?: string
    }

export type Package = {
  private?: boolean
  name?: string
  version?: string
  homepage?: string
  license?: License
  licenses?: License[]
  author?: Person
  contributors?: Person[]
  maintainers?: Person[]
  [k: string]: any
}

export type ExtractedPackage = {
  private?: boolean
  name?: string
  version?: string
  homepage?: string
  license?: string
  licenses?: string
  author?: string
  contributors?: string
  maintainers?: string
  [k: string]: any
}
