import initialState from 'app/redux/store/initialState'
import { SET_UNIT } from './types'

export default function (state = initialState.settings, action) {
  switch (action.type) {
    case SET_UNIT:
      return Object.assign({}, state, { isUnitDegrees: !state.isUnitDegrees })

    default: {
      return state
    }
  }
}
