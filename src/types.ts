export interface Language {
  name: string
  code: string
}

export type DocumentDirection = 'ltr' | 'rtl'

export interface Location {
  alpha2: string
  name: string
  flag?: string // Path to the flag image on the file system
}

export interface CountryBaseInfo {
  id: number
  alpha2: string
  alpha3: string
}

export interface CountryLocaleToName {
  [key: string]: string
}

export interface Country {
  baseInfo: CountryBaseInfo
  localeToNames: CountryLocaleToName
}

export interface CountriesJsonEntry {
  [key: string]: string | number
}

export type CountriesJson = CountriesJsonEntry[]

export type RandStrFn = () => string

export type DirectionalString = {
  ltr: string
  rtl: string
}

export type DirStringKey =
  | 'full name'
  | 'country of residence'
  | 'optional info'
  | 'user info importance'
  | 'email recipients'
  | 'reset'
  | 'apply'

export interface FieldResolverError {
  message?: string
}
export type FieldResolverReturnType = null | FieldResolverError
export type FieldResolver<T = unknown> = (value: T) => FieldResolverReturnType

export interface TextFieldSchemaOptions {
  optional: boolean
  min?: number
  max?: number
}
