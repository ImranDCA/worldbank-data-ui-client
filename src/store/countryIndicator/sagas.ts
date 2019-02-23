import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { getUrlApi } from '../../utils/callApi';
import { fetchCountries, fetchError, fetchSuccess, showCountries, showSources, showIndicators, fetchSearch, showSearch } from './actions';
import { CountryIndicatorActionTypes, CountryResult, SourceResult, IndicatorResult } from './types';
import { ResponseError, isResponseError } from '../commonTypes';


const SERVER = 'http://localhost:9000'
function* handleFetchSources(action: ReturnType<typeof fetchCountries>) {
  try {
    const res: (SourceResult|ResponseError) = yield call(getUrlApi, `get`, `${SERVER}/v2/source?format=json`)
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
    const url = action.payload.source ? `${SERVER}/v2/sources/${action.payload.source}/country?format=json` : `${SERVER}/v2/country?format=json`
    const res: (CountryResult|ResponseError) = yield call(getUrlApi, `get`, url)
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
    const url = action.payload.source ? `${SERVER}/v2/sources/${action.payload.source}/series?format=json` : `${SERVER}/v2/indicator?format=json`
    const res: (IndicatorResult|ResponseError) = yield call(getUrlApi, `get`, url)
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

function* handleFetchSearch(action: ReturnType<typeof fetchSearch>) {
  try {
    // https://api.worldbank.org/v2/sources/57/country/USA;ARG/series/ER.GDP.FWTL.M3.KD;SH.DYN.AIDS.FE.ZS/time/all/version/201404/data?mrv=7&gapfill=Y
    const url = `${SERVER}/v2/sources/${action.payload.source}/country/${action.payload.countries.join(';')}/series/${action.payload.indicators.join(';')}/time/all/version/201404/data?mrv=7&gapfill=Y&format=json`
    // debugger
    const res: (IndicatorResult|ResponseError) = yield call(getUrlApi, `get`, url)
    if (isResponseError(res)) {
      yield put(fetchError(res))
    } else {
      yield put(fetchSuccess(res))
      yield put(showSearch(res as any))
    }
  } catch (err) {
    yield put(fetchError(err))
  }
}

function* watchFetchRequest() {
  yield takeEvery(CountryIndicatorActionTypes.FETCH_COUNTRIES, handleFetchCountries)
  yield takeEvery(CountryIndicatorActionTypes.FETCH_SOURCES, handleFetchSources)
  yield takeEvery(CountryIndicatorActionTypes.FETCH_INDICATORS, handleFetchIndicators)
  yield takeEvery(CountryIndicatorActionTypes.FETCH_SEARCH, handleFetchSearch)
}

export function* countryIndicatorSaga() {
  yield all([fork(watchFetchRequest)])
}
