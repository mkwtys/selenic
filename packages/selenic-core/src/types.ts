export type Person = {
  name?: string
  email?: string
  url?: string
}

export type License = {
  type?: string
  url?: string
}

export type Package = {
  private?: boolean
  name?: string
  version?: string
  homepage?: string
  license?: string | License
  licenses?: string | (string | License)[]
  author?: string | Person
  contributors?: string | (string | Person)[]
  maintainers?: string | (string | Person)[]
  [k: string]: any
}
