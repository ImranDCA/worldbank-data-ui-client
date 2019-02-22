import { ErrorOptions, ResultPagination, PaginationOptions, Result, Country, Indicator, Source } from '../commonTypes'

export enum CountryIndicatorActionTypes {
  FETCH_COUNTRIES = '@@countryIndicator/FETCH_COUNTRIES',
  SHOW_COUNTRIES = '@@countryIndicator/SHOW_COUNTRIES',
  FETCH_REQUEST = '@@countryIndicator/FETCH_REQUEST',
  FETCH_SUCCESS = '@@countryIndicator/FETCH_SUCCESS',
  FETCH_ERROR = '@@countryIndicator/FETCH_ERROR',
  FETCH_SOURCES = '@@countryIndicator/FETCH_SOURCES',
  SHOW_SOURCES = '@@countryIndicator/SHOW_SOURCES',
  FETCH_INDICATORS = '@@countryIndicator/FETCH_INDICATORS',
  SHOW_INDICATORS = '@@countryIndicator/SHOW_INDICATORS'
}

export interface CountryIndicatorState extends PaginationOptions {
  readonly countries?: string[]
  readonly countryResults?: CountryResult
  readonly indicators?: string[]
  readonly indicatorResults?: IndicatorResult
  readonly sources?: string[]
  readonly sourceResults?: SourceResult
  readonly loading?: boolean
  readonly error?: ErrorOptions
}

export interface FetchSourceOptions extends PaginationOptions {}
export interface ShowSourcesOptions {
  readonly result: SourceResult
}
export interface SourceResult extends Result<Source> {}

export interface FetchCountryOptions extends PaginationOptions {
  source: string
}
export interface CountryResult extends Result<Country> {}
export interface ShowCountriesOptions {
  readonly result: CountryResult
}

export interface FetchIndicatorsOptions extends PaginationOptions {
  source: string
}
export interface IndicatorResult extends Result<Indicator> {}
export interface ShowIndicatorsOptions {
  readonly result: IndicatorResult
}
