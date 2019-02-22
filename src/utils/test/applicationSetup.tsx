// document.head.insertAdjacentHTML(
//   'beforeend',
//   `<meta charset="utf-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
//       <meta name="theme-color" content="#000000">
//       <title>React + Parcel App</title>`
// )

import { mount, ReactWrapper } from 'enzyme';
import { createHashHistory, History } from 'history';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import 'whatwg-fetch';
import configureStore from '../../main/configureStore';
import Main from '../../main/main';
import { ApplicationState } from '../../store';
import { countryIndicatorInitialState } from '../../store/countryIndicator';
import { layoutInitialState } from '../../store/layout';
import { recordViewInitialState } from '../../store/recordView';
import { searchInitialState } from '../../store/search';
import { wait } from './waitUtil';
(window as any).React = React // needed for jst / jsdom

// declare jest custom matcher toMatchImageSnapshot
declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchImageSnapshot(): R
    }
  }
}

const REUSE_SAME_WRAPPER = false

export async function getApplicationWrapper(
  path?: string,
  forceNewWrapperCreation = false
): Promise<ReactWrapper> {
  const reuse = REUSE_SAME_WRAPPER && currentWrapper && currentHistory && !forceNewWrapperCreation
  if (!reuse && currentWrapper) {
    // console.log('detach');
    currentWrapper.detach()
  }
  const r = reuse
    ? { wrapper: currentWrapper, history: currentHistory }
    : await setupApplicationWrapper()
  currentWrapper = r.wrapper
  currentHistory = r.history
  // if (reuse) {
  //   currentWrapper!.setState(getInitialApplicationState(currentHistory!))
  // }
  path && currentHistory!.location.hash !== path && currentHistory!.push(path || '/')
  await wait(10)
  currentWrapper!.update()
  return currentWrapper!
}
export let currentHistory: History | undefined
let currentWrapper: ReactWrapper | undefined

export function getInitialApplicationState(history: History): ApplicationState {
  return {
    layout: layoutInitialState,
    countryIndicator: countryIndicatorInitialState,
    recordView: recordViewInitialState,
    router: {
      location: history.location,
      action: 'PUSH'
    },
    search: searchInitialState
  }
}

export function initTest() {}

async function setupApplicationWrapper(): Promise<{
  wrapper: ReactWrapper
  history: History
  initialState: ApplicationState
  store: Store
}> {
  const history: History = createHashHistory()
  const initialState: ApplicationState = getInitialApplicationState(history)
  const store = configureStore(history, initialState)
  const app = (
    <Provider store={store}>
      <Main history={history} />
    </Provider>
  )
  const wrapper = attachAndMount(app)
  return { wrapper, history, initialState, store }
}

export function attachAndMount(app: JSX.Element) {
  const oldEl = document.getElementById('root')
  oldEl && oldEl.remove()
  document.body.innerHTML = ''
  const rootEl = document.createElement('div')
  rootEl.setAttribute('id', 'root')
  document.body.appendChild(rootEl)
  const wrapper = mount(app, { attachTo: rootEl })
  return wrapper
}
