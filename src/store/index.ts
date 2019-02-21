import { combineReducers, Dispatch, Action, AnyAction, compose } from 'redux'
import { all, fork } from 'redux-saga/effects'
import { LayoutState, layoutReducer } from './layout'
import { CountryIndicatorState } from './countryIndicator/types'
import { countryIndicatorReducer } from './countryIndicator/reducer'
import { countryIndicatorSaga } from './countryIndicator/sagas';
import { RecordViewState, recordViewReducer } from './recordView';
import { recordViewSaga } from './recordView/sagas';
import { SearchState, searchReducer } from './search';
import { ErrorOptions } from './commonTypes';
import { searchSaga } from './search/sagas';
import { RouterState, connectRouter } from 'connected-react-router';
import { History } from 'history';

export interface ApplicationState {
  layout: LayoutState
  countryIndicator: CountryIndicatorState
  recordView: RecordViewState
  search: SearchState
  common?: CommonAppState
  router: RouterState
}
interface CommonAppState {
  readonly loading?: boolean
  readonly error?: ErrorOptions
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>
}

export const rootReducer = (history: History) => compose(combineReducers<ApplicationState>({
  layout: layoutReducer,
  countryIndicator: countryIndicatorReducer,
  recordView: recordViewReducer,
  search: searchReducer,
  router: connectRouter(history)
}))

export function* rootSaga() {
  yield all([fork(countryIndicatorSaga), fork(recordViewSaga), fork(searchSaga)])
}
