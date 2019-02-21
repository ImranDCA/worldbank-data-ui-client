import { action } from 'typesafe-actions'

import { CountryIndicatorActionTypes, CountryResult, FetchCountryOptions as FetchCountriesOptions, ShowCountriesOptions, FetchSourceOptions, ShowSourcesOptions } from './types'
import { ResponseError, Result } from '../commonTypes';
export const fetchRequest = () => action(CountryIndicatorActionTypes.FETCH_REQUEST)

export const fetchSuccess = (data:  Result<any>) => action(CountryIndicatorActionTypes.FETCH_SUCCESS, data)
export const fetchError = (r: ResponseError|Error) => action(CountryIndicatorActionTypes.FETCH_ERROR, r)

export const fetchCountries = (options: FetchCountriesOptions) => {
  return action(CountryIndicatorActionTypes.FETCH_COUNTRIES, options)
}
export const showCountries = (options: ShowCountriesOptions) => {
  return action(CountryIndicatorActionTypes.SHOW_COUNTRIES, options)
}

export const fetchSources = (options: FetchSourceOptions) => {
  return action(CountryIndicatorActionTypes.FETCH_SOURCES, options)
}
export const showSources = (options: ShowSourcesOptions) => {
  return action(CountryIndicatorActionTypes.SHOW_SOURCES, options)
}


