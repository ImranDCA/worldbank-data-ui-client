import { Reducer } from 'redux'
import { LayoutState, LayoutActionTypes } from './types'

export const layoutInitialState: LayoutState = {
  theme: 'light'
}

const reducer: Reducer<LayoutState> = (state = layoutInitialState, action) => {
  switch (action.type) {
    case LayoutActionTypes.SET_THEME: {
      return { ...state, theme: action.payload }
    }
    default: {
      return state
    }
  }
}

export { reducer as layoutReducer }
