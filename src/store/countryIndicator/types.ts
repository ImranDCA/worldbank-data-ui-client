import { ErrorOptions, ResultPagination, PaginationOptions, Result, Country, Indicator, Source } from '../commonTypes';

export enum CountryIndicatorActionTypes {
  FETCH_COUNTRIES = '@@countryIndicator/FETCH_COUNTRIES',
  SHOW_COUNTRIES = '@@countryIndicator/SHOW_COUNTRIES',
  FETCH_REQUEST = '@@countryIndicator/FETCH_REQUEST',
  FETCH_SUCCESS = '@@countryIndicator/FETCH_SUCCESS',
  FETCH_ERROR = '@@countryIndicator/FETCH_ERROR',
  FETCH_SOURCES = "@@countryIndicator/FETCH_SOURCES",
  SHOW_SOURCES = "@@countryIndicator/SHOW_SOURCES"
}

export interface CountryIndicatorState extends PaginationOptions {
  readonly country?: string
  readonly countryResults?: CountryResult
  readonly indicator?: string
  readonly indicatorResults?: IndicatorResult
  source?: string
  sourceResults?: SourceResult
  readonly loading?: boolean
  readonly error?: ErrorOptions
}

export interface CountryResult extends Result<Country> {
}

export interface IndicatorResult extends Result<Indicator> {
  }
  export interface SourceResult extends Result<Source> {
    }

export interface FetchCountryOptions extends PaginationOptions{
}
export interface ShowCountriesOptions {
  readonly result: CountryResult
}

export interface FetchSourceOptions extends PaginationOptions{
}

export interface ShowSourcesOptions {
  readonly result: SourceResult
}

