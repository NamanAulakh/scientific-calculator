import initialState from 'app/redux/store/initialState'
import { SET_UNIT, SET_ANS, SET_HISTORY } from './types'

export default function (state = initialState.settings, action) {
  switch (action.type) {
    case SET_UNIT:
      return Object.assign({}, state, { isUnitDegrees: !state.isUnitDegrees })
    case SET_ANS:
      return Object.assign({}, state, { ans: action.payload })
    case SET_HISTORY:
      return Object.assign({}, state, { history: state.history.concat([action.payload]) })

    default: {
      return state
    }
  }
}
