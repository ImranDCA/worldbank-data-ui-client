import { Reducer } from 'redux'
import {
  CountryIndicatorState,
  CountryIndicatorActionTypes,
  ShowCountriesOptions,
  FetchCountryOptions,
  ShowSourcesOptions,
  FetchSourceOptions,
  FetchIndicatorsOptions,
  ShowIndicatorsOptions
} from './types'
// import { getSearchRecordTypes } from '../../nstypes/search';
import { ErrorOptions } from '../commonTypes'

export const countryIndicatorInitialState: CountryIndicatorState = {
  // recordTypes: ['item', 'commercecategory'],  // getSearchRecordTypes(),
  per_page: 50,
  page: 1
}

const reducer: Reducer<CountryIndicatorState> = (state = countryIndicatorInitialState, action): CountryIndicatorState => {
  switch (action.type) {

    case CountryIndicatorActionTypes.FETCH_SOURCES: {
      const options = action.payload as FetchSourceOptions
      return { ...state, ...options, error: undefined, loading: true }
    }
    case CountryIndicatorActionTypes.SHOW_SOURCES: {
      const options = action.payload as ShowSourcesOptions
      return { ...state, ...options, sourceResults: options.result, error: undefined, loading: false }
    }

    case CountryIndicatorActionTypes.FETCH_COUNTRIES: {
      const options = action.payload as FetchCountryOptions
      return { ...state, ...options, error: undefined, loading: true }
    }
    case CountryIndicatorActionTypes.SHOW_COUNTRIES: {
      const options = action.payload as ShowCountriesOptions
      return { ...state, ...options, countryResults: options.result, error: undefined, loading: false }
    }

    case CountryIndicatorActionTypes.FETCH_INDICATORS: {
      const options = action.payload as FetchIndicatorsOptions
      return { ...state, ...options, error: undefined, loading: true }
    }
    case CountryIndicatorActionTypes.SHOW_INDICATORS: {
      const options = action.payload as ShowIndicatorsOptions
      return { ...state, ...options, indicatorResults: options.result, error: undefined, loading: false }
    }

    case CountryIndicatorActionTypes.FETCH_ERROR: {
      const options = action.payload as ErrorOptions
      return { ...state, error: options, loading: false }
    }
    case CountryIndicatorActionTypes.FETCH_SUCCESS: {
      return {
        ...state,
        error: undefined,
        loading: false
      }
    }
    default: {
      return state
    }
  }
}

export { reducer as countryIndicatorReducer }
