
export interface ErrorOptions {
  error?: Error | ResponseError,
  responseText?: string
}
export interface ResponseError {
  name: string
  message: string
  stack: string
  asString: string
}

export type FieldValueSimpleType = string | Date | boolean | number
export type FieldValueType = FieldValueSimpleType | FieldValueSimpleType[]



export interface Result<R extends ResultBase> {
  0: ResultPagination
  1: R[]
}

export interface ResultBase {
  id: string,
}
export interface ValuedResult extends ResultBase {
  value: string
}
export interface  Concept extends ValuedResult {
  concept: string
}

export interface PaginationOptions {
  page: number
  per_page: number
}
export interface ResultPagination extends PaginationOptions {
  pages: number
  total: number
}

export interface CountryProp extends ResultBase {
  value: string
  iso2code: string
}
export interface Country extends ResultBase {
  adminregion: CountryProp
  capitalCity: string
  incomeLevel: CountryProp
  latitude: string
  lendingType: CountryProp
  longitude: string
  name: string
  region: CountryProp
}
type SBoolean = 'Y' | 'N'
export interface Source extends ResultBase {
  lastupdated: string
  code: string
  description: string
  url: string
  dataavailability: SBoolean
  metadataavailability: SBoolean
  concepts: number
  name: string
  region: CountryProp
}
interface IndicatorProp extends ResultBase {
  value: string
}
export interface Indicator extends ResultBase {
  name: string
  source: IndicatorProp
  sourceNote: string
  sourceOrganization: string
  topics: IndicatorProp[]
  unit: string
}



export interface ResponseError {
  0: { message: { id: string, key: string, value: string }[] }
}

export function isResponseError(e: any): e is ResponseError {
  return Array.isArray(e) && e.length === 1 && typeof e[0].messagge !== 'undefined' && typeof e[0].messagge.id === 'string'
}
