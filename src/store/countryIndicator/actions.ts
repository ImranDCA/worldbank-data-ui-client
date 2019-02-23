import { action } from 'typesafe-actions'

import { CountryIndicatorActionTypes, CountryResult, FetchCountryOptions as FetchCountriesOptions, ShowCountriesOptions, FetchSourceOptions, ShowSourcesOptions, FetchIndicatorsOptions, ShowIndicatorsOptions, FetchSearchOptions } from './types'
import { ResponseError, Result } from '../commonTypes';
import { ShowSearchOptions } from '../search';
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



export const fetchIndicators = (options: FetchIndicatorsOptions) => {
  return action(CountryIndicatorActionTypes.FETCH_INDICATORS, options)
}
export const showIndicators = (options: ShowIndicatorsOptions) => {
  return action(CountryIndicatorActionTypes.SHOW_INDICATORS, options)
}


export const fetchSearch = (options: FetchSearchOptions) => {
  return action(CountryIndicatorActionTypes.FETCH_SEARCH, options)
}
export const showSearch = (options: ShowSearchOptions) => {
  return action(CountryIndicatorActionTypes.SHOW_SEARCH, options)
}

