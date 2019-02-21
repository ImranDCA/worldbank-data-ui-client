import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { getUrlApi } from '../../utils/callApi';
import { fetchCountries, fetchError, fetchSuccess, showCountries, showSources } from './actions';
import { CountryIndicatorActionTypes, CountryResult, SourceResult } from './types';
import { ResponseError, isResponseError } from '../commonTypes';


function* handleFetchCountries(action: ReturnType<typeof fetchCountries>) {
  try {
    const res: (CountryResult|ResponseError) = yield call(getUrlApi, 'get', 'http://api.worldbank.org/v2/country?format=json')
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

function* watchFetchRequest() {
  yield takeEvery(CountryIndicatorActionTypes.FETCH_COUNTRIES, handleFetchCountries)
  yield takeEvery(CountryIndicatorActionTypes.FETCH_SOURCES, handleFetchSources)
}

export function* countryIndicatorSaga() {
  yield all([fork(watchFetchRequest)])
}
