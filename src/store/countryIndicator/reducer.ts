import { Reducer } from 'redux'
import { CountryIndicatorState, CountryIndicatorActionTypes, ShowCountriesOptions, FetchCountryOptions, ShowSourcesOptions, FetchSourceOptions } from './types'
// import { getSearchRecordTypes } from '../../nstypes/search';
import { ErrorOptions } from '../commonTypes';

export const countryIndicatorInitialState: CountryIndicatorState = {
  // recordTypes: ['item', 'commercecategory'],  // getSearchRecordTypes(),
  per_page: 50,
  page: 1
}

const reducer: Reducer<CountryIndicatorState> = (state = countryIndicatorInitialState, action): CountryIndicatorState => {
  switch (action.type) {
    case CountryIndicatorActionTypes.FETCH_COUNTRIES: {
      const options = action.payload as FetchCountryOptions
      // console.log('FETCH_COUNTRIES', options);
      return { ...state, ...options, error: undefined, loading: true }
    }
    case CountryIndicatorActionTypes.SHOW_COUNTRIES: {
      const options = action.payload as ShowCountriesOptions
      // console.log('SHOW_COUNTRIES', options);
      return { ...state, ...options, countryResults: options.result, error: undefined, loading: false }
    }
    case CountryIndicatorActionTypes.FETCH_SOURCES: {
      const options = action.payload as FetchSourceOptions
      // console.log('FETCH_SOURCES', options);
      return { ...state, ...options, error: undefined, loading: true }
    }
    case CountryIndicatorActionTypes.SHOW_SOURCES: {
      const options = action.payload as ShowSourcesOptions
      // console.log('SHOW_SOURCES', options);
      return { ...state, ...options, sourceResults: options.result, error: undefined, loading: false }
    }
    case CountryIndicatorActionTypes.FETCH_ERROR: {
      const options = action.payload as ErrorOptions
      return {
        ...state, error: options, loading: false
      }
    }
    case CountryIndicatorActionTypes.FETCH_SUCCESS: {
      // const options = action.payload as ErrorOptions
      return {
        ...state, error: undefined, loading: false
      }
    }
    default: {
      return state
    }
  }
}

export { reducer as countryIndicatorReducer }
