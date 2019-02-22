import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { getUrlApi } from '../../utils/callApi';
import { fetchCountries, fetchError, fetchSuccess, showCountries, showSources, showIndicators } from './actions';
import { CountryIndicatorActionTypes, CountryResult, SourceResult, IndicatorResult } from './types';
import { ResponseError, isResponseError } from '../commonTypes';


function* handleFetchSources(action: ReturnType<typeof fetchCountries>) {
  try {
    const res: (SourceResult|ResponseError) = yield call(getUrlApi, 'get', 'http://api.worldbank.org/v2/source?format=json')
    if (isResponseError(res)) {
      yield put(fetchError(res))
    } else {
      yield put(fetchSuccess(res))
      yield put(showSources({result: res}))
    }
  } catch (err) {
    yield put(fetchError(err))
  }
}

function* handleFetchCountries(action: ReturnType<typeof fetchCountries>) {
  try {
    // debugger
    const url = action.payload.source ? `http://api.worldbank.org/v2/sources/${action.payload.source}/country?format=json` : 'http://api.worldbank.org/v2/country?format=json'
    const res: (CountryResult|ResponseError) = yield call(getUrlApi, 'get', url)
    if (isResponseError(res)) {
      yield put(fetchError(res))
    } else {
      yield put(fetchSuccess(res))
      yield put(showCountries({result: res}))
    }
  } catch (err) {
    yield put(fetchError(err))
  }
}


function* handleFetchIndicators(action: ReturnType<typeof fetchCountries>) {
  try {
    // debugger
    const url = action.payload.source ? `http://api.worldbank.org/v2/sources/${action.payload.source}/series?format=json` : 'http://api.worldbank.org/v2/indicator?format=json'
    const res: (IndicatorResult|ResponseError) = yield call(getUrlApi, 'get', url)
    if (isResponseError(res)) {
      yield put(fetchError(res))
    } else {
      yield put(fetchSuccess(res))
      yield put(showIndicators({result: res}))
    }
  } catch (err) {
    yield put(fetchError(err))
  }
}
function* watchFetchRequest() {
  yield takeEvery(CountryIndicatorActionTypes.FETCH_COUNTRIES, handleFetchCountries)
  yield takeEvery(CountryIndicatorActionTypes.FETCH_SOURCES, handleFetchSources)
  yield takeEvery(CountryIndicatorActionTypes.FETCH_INDICATORS, handleFetchIndicators)
}

export function* countryIndicatorSaga() {
  yield all([fork(watchFetchRequest)])
}
